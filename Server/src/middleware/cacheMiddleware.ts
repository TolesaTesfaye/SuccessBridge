import { Request, Response, NextFunction } from "express";
import { getCache, setCache, generateCacheKey } from "../utils/cache.js";

export interface CacheMiddlewareOptions {
  ttl?: number;
  exclude?: string[]; // Paths to exclude from caching
}

/**
 * Cache middleware for GET requests
 */
export const cacheMiddleware = (options: CacheMiddlewareOptions = {}) => {
  const { ttl = 300, exclude = [] } = options;

  return async (req: Request, res: Response, next: NextFunction) => {
    // Only cache GET requests
    if (req.method !== "GET") {
      return next();
    }

    // Skip caching for excluded paths
    if (exclude.some((path) => req.path.includes(path))) {
      return next();
    }

    // Skip caching if skipCache query param is set
    if (req.query.skipCache === "true") {
      return next();
    }

    const cacheKey = generateCacheKey(req);

    try {
      // Try to get from cache
      const cached = await getCache(cacheKey);
      if (cached) {
        if (process.env.NODE_ENV === "development") {
          console.log(`💾 Cache hit: ${req.path}`);
        }
        return res.status(200).json({
          ...cached,
          _cached: true,
          _cacheKey: cacheKey,
        });
      }
    } catch (error) {
      console.error("Cache retrieval error:", error);
      // Continue to original request if cache fails
    }

    // Intercept res.json to cache the response
    const originalJson = res.json.bind(res);

    res.json = function (data: any) {
      // Only cache successful responses
      if (res.statusCode === 200) {
        setCache(cacheKey, data, ttl).catch((err) => {
          console.error("Cache set error:", err);
        });
      }

      return originalJson(data);
    };

    next();
  };
};
