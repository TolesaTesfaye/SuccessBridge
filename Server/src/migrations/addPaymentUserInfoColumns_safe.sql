-- Safe migration to add user payment information columns
-- This script checks if columns exist before adding them

DO $$ 
BEGIN
    -- Add accountNumber column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'payments' AND column_name = 'accountNumber'
    ) THEN
        ALTER TABLE payments ADD COLUMN "accountNumber" VARCHAR(255);
        RAISE NOTICE 'Added accountNumber column';
    ELSE
        RAISE NOTICE 'accountNumber column already exists';
    END IF;

    -- Add payerPhone column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'payments' AND column_name = 'payerPhone'
    ) THEN
        ALTER TABLE payments ADD COLUMN "payerPhone" VARCHAR(50);
        RAISE NOTICE 'Added payerPhone column';
    ELSE
        RAISE NOTICE 'payerPhone column already exists';
    END IF;

    -- Add payerNote column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'payments' AND column_name = 'payerNote'
    ) THEN
        ALTER TABLE payments ADD COLUMN "payerNote" TEXT;
        RAISE NOTICE 'Added payerNote column';
    ELSE
        RAISE NOTICE 'payerNote column already exists';
    END IF;
END $$;

-- Add comments for documentation
COMMENT ON COLUMN payments."accountNumber" IS 'User account or phone number used for payment';
COMMENT ON COLUMN payments."payerPhone" IS 'User contact phone number';
COMMENT ON COLUMN payments."payerNote" IS 'Additional note from user about the payment';

-- Verify columns
SELECT 
  column_name,
  data_type,
  character_maximum_length,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'payments' 
  AND column_name IN ('accountNumber', 'payerPhone', 'payerNote')
ORDER BY column_name;
