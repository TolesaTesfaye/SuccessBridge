-- Add user payment information columns to payments table
-- This migration adds columns for storing user's payment details

-- Add accountNumber column (user's account/phone used for payment)
ALTER TABLE payments 
ADD COLUMN IF NOT EXISTS "accountNumber" VARCHAR(255);

-- Add payerPhone column (user's contact phone)
ALTER TABLE payments 
ADD COLUMN IF NOT EXISTS "payerPhone" VARCHAR(50);

-- Add payerNote column (additional note from user)
ALTER TABLE payments 
ADD COLUMN IF NOT EXISTS "payerNote" TEXT;

-- Add comments for documentation
COMMENT ON COLUMN payments."accountNumber" IS 'User account or phone number used for payment';
COMMENT ON COLUMN payments."payerPhone" IS 'User contact phone number';
COMMENT ON COLUMN payments."payerNote" IS 'Additional note from user about the payment';

-- Verify columns were added
SELECT 
  column_name,
  data_type,
  character_maximum_length,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'payments' 
  AND column_name IN ('accountNumber', 'payerPhone', 'payerNote')
ORDER BY column_name;
