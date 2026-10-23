-- Migration: Add telegramDownloadCount field to users table
-- This tracks how many resources a user has downloaded via Telegram bot
-- Free users are limited to 15 downloads before payment is required

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS "telegramDownloadCount" INTEGER DEFAULT 0 NOT NULL;

-- Update existing users to have 0 downloads
UPDATE users 
SET "telegramDownloadCount" = 0 
WHERE "telegramDownloadCount" IS NULL;
