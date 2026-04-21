-- Migration: Add email verification fields to users table
-- Run this migration to add email verification support

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS is_email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS email_verification_token VARCHAR(255),
ADD COLUMN IF NOT EXISTS email_verification_expires TIMESTAMP;

-- Create index for faster token lookups
CREATE INDEX IF NOT EXISTS idx_users_email_verification_token 
ON users(email_verification_token);

-- Update existing users to have verified emails (optional - for backward compatibility)
-- Uncomment the line below if you want existing users to be automatically verified
-- UPDATE users SET is_email_verified = TRUE WHERE is_email_verified IS NULL OR is_email_verified = FALSE;
