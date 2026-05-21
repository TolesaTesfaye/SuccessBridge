import redisClient from "../config/redis.js";

export interface CacheOptions {
  ttl?: number; // Time to live in seconds
  key?: string; // Custom cache key
}

const DEFAULT_TTL = 300; // 5 minutes default

/**
 * Get value from cache
 */
export const getCache = async (key: string): Promise<any> => {
  if (!redisClient) return null;
  try {
    const cached = await redisClient.get(key);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error("Cache get error:", error);
    return null;
  }
};

/**
 * Set value in cache
 */
export const setCache = async (
  key: string,
  value: any,
  ttl = DEFAULT_TTL,
): Promise<void> => {
  if (!redisClient) return;
  try {
    await redisClient.setEx(key, ttl, JSON.stringify(value));
  } catch (error) {
    console.error("Cache set error:", error);
  }
};

/**
 * Delete cache key
 */
export const deleteCache = async (key: string): Promise<void> => {
  if (!redisClient) return;
  try {
    await redisClient.del(key);
  } catch (error) {
    console.error("Cache delete error:", error);
  }
};

/**
 * Clear cache by pattern (e.g., 'user:*')
 */
export const clearCachePattern = async (pattern: string): Promise<void> => {
  if (!redisClient) return;
  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  } catch (error) {
    console.error("Cache clear pattern error:", error);
  }
};

/**
 * Cache decorator for functions
 */
export const withCache = (ttl = DEFAULT_TTL) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      // Generate cache key from function name and arguments
      const cacheKey = `${propertyKey}:${JSON.stringify(args)}`;

      // Try to get from cache
      const cached = await getCache(cacheKey);
      if (cached) {
        if (process.env.NODE_ENV === "development") {
          console.log(`💾 Cache hit: ${cacheKey}`);
        }
        return cached;
      }

      // Execute original function
      const result = await originalMethod.apply(this, args);

      // Store in cache
      await setCache(cacheKey, result, ttl);

      return result;
    };

    return descriptor;
  };
};

/**
 * Generate cache key from request path and params
 */
export const generateCacheKey = (req: any): string => {
  const userId = req.user?.id || "anonymous";
  const path = req.path;
  const params = JSON.stringify(req.query);
  return `${userId}:${path}:${params}`;
};
