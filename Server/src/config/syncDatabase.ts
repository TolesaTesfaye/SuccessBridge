import type { Sequelize } from "sequelize";

const RETRYABLE =
  /Connection terminated unexpectedly|ECONNRESET|ETIMEDOUT|ECONNREFUSED|Connection lost/i;

/** True only when explicitly enabled — avoids heavy ALTER on every dev restart (Supabase drops long sessions). */
export const shouldAlterSchema = (): boolean =>
  process.env.DB_SYNC_ALTER === "true";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Sync Sequelize models with optional retries after pooler disconnects.
 */
export async function syncModelsWithRetry(
  sequelize: Sequelize,
  options: { alter?: boolean; maxAttempts?: number } = {},
): Promise<void> {
  const alter = options.alter ?? shouldAlterSchema();
  const maxAttempts = options.maxAttempts ?? 3;

  if (alter) {
    console.log(
      "⚠️  DB_SYNC_ALTER=true: running schema migrations (slow; use Supabase direct port 5432 if this fails)",
    );
  }

  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await sequelize.sync({ alter });
      return;
    } catch (error) {
      lastError = error;
      const message =
        error instanceof Error ? error.message : String(error);
      const retryable = RETRYABLE.test(message);

      if (!retryable || attempt === maxAttempts) {
        throw error;
      }

      console.warn(
        `⚠️  Database sync attempt ${attempt}/${maxAttempts} failed (${message}). Retrying...`,
      );
      try {
        await sequelize.connectionManager.close();
      } catch {
        /* pool may already be closed */
      }
      await sleep(2000 * attempt);
      await sequelize.authenticate();
    }
  }

  throw lastError;
}
