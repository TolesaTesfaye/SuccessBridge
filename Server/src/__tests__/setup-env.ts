// Loaded via `node --import` before any test file, so config/database.ts sees a
// DATABASE_URL at import time. No connection is made unless a query runs.
process.env.NODE_ENV = 'test'
process.env.DATABASE_URL =
  process.env.TEST_DATABASE_URL ||
  'postgres://test:test@127.0.0.1:5432/successbridge_test'
process.env.JWT_SECRET = 'test-secret'
delete process.env.REDIS_URL
delete process.env.REDIS_HOST
