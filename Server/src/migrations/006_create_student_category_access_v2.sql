-- Migration: Create student_category_access and access_packages tables
-- Description: Implements category-based access control for one-time payment model
-- Version: 2.0 (Simplified and more robust)

-- ============================================
-- STEP 1: Create ENUM types
-- ============================================

-- Create student category enum type
DO $$ BEGIN
    CREATE TYPE student_category_enum AS ENUM (
        'GRADE_9', 'GRADE_10', 'GRADE_11', 'GRADE_12', 'REMEDIAL', 'FRESHMAN'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create access status enum type
DO $$ BEGIN
    CREATE TYPE access_status_enum AS ENUM ('active', 'expired', 'revoked');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- STEP 2: Create access_packages table
-- ============================================

CREATE TABLE IF NOT EXISTS access_packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    student_category student_category_enum NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'ETB',
    duration_days INTEGER,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create indexes for access_packages
CREATE INDEX IF NOT EXISTS idx_access_packages_student_category ON access_packages(student_category);
CREATE INDEX IF NOT EXISTS idx_access_packages_is_active ON access_packages(is_active);

-- ============================================
-- STEP 3: Create student_category_access table
-- ============================================

CREATE TABLE IF NOT EXISTS student_category_access (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    student_category student_category_enum NOT NULL,
    university_id UUID REFERENCES universities(id) ON DELETE SET NULL,
    payment_id UUID NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
    status access_status_enum NOT NULL DEFAULT 'active',
    granted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create partial unique index for active access per category
DO $$ BEGIN
    CREATE UNIQUE INDEX unique_active_user_category_university 
    ON student_category_access(user_id, student_category, COALESCE(university_id, '00000000-0000-0000-0000-000000000000'::UUID))
    WHERE status = 'active';
EXCEPTION
    WHEN duplicate_table THEN null;
END $$;

-- Create indexes for student_category_access
CREATE INDEX IF NOT EXISTS idx_student_category_access_user_id ON student_category_access(user_id);
CREATE INDEX IF NOT EXISTS idx_student_category_access_student_category ON student_category_access(student_category);
CREATE INDEX IF NOT EXISTS idx_student_category_access_payment_id ON student_category_access(payment_id);
CREATE INDEX IF NOT EXISTS idx_student_category_access_status ON student_category_access(status);
CREATE INDEX IF NOT EXISTS idx_student_category_access_expires_at ON student_category_access(expires_at);

-- ============================================
-- STEP 4: Alter payments table
-- ============================================

-- Add student_category column
DO $$ BEGIN
    ALTER TABLE payments ADD COLUMN student_category student_category_enum;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- Add package_id column
DO $$ BEGIN
    ALTER TABLE payments ADD COLUMN package_id UUID REFERENCES access_packages(id) ON DELETE SET NULL;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- Add provider column
DO $$ BEGIN
    ALTER TABLE payments ADD COLUMN provider VARCHAR(255) DEFAULT 'manual';
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- Add provider_transaction_id column
DO $$ BEGIN
    ALTER TABLE payments ADD COLUMN provider_transaction_id VARCHAR(255);
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- Add checkout_url column
DO $$ BEGIN
    ALTER TABLE payments ADD COLUMN checkout_url TEXT;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- Add paid_at column
DO $$ BEGIN
    ALTER TABLE payments ADD COLUMN paid_at TIMESTAMP WITH TIME ZONE;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- ============================================
-- STEP 5: Update payment status enum
-- ============================================

DO $$ 
BEGIN
    -- Check if payment_status_enum exists
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_status_enum') THEN
        -- Create it with all values
        CREATE TYPE payment_status_enum AS ENUM ('pending', 'approved', 'rejected', 'cancelled');
    ELSE
        -- Add 'cancelled' if it doesn't exist
        IF NOT EXISTS (
            SELECT 1 FROM pg_enum 
            WHERE enumlabel = 'cancelled' 
            AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'payment_status_enum')
        ) THEN
            ALTER TYPE payment_status_enum ADD VALUE 'cancelled';
        END IF;
    END IF;
END $$;

-- ============================================
-- STEP 6: Create indexes for payment columns
-- ============================================

CREATE INDEX IF NOT EXISTS idx_payments_student_category ON payments(student_category);
CREATE INDEX IF NOT EXISTS idx_payments_package_id ON payments(package_id);
CREATE INDEX IF NOT EXISTS idx_payments_provider ON payments(provider);

-- ============================================
-- STEP 7: Insert default packages
-- ============================================

INSERT INTO access_packages (name, student_category, price, currency, duration_days, description, is_active)
SELECT 'Grade 9 Full Access', 'GRADE_9', 200.00, 'ETB', NULL, 'Lifetime access to all Grade 9 resources', true
WHERE NOT EXISTS (SELECT 1 FROM access_packages WHERE student_category = 'GRADE_9');

INSERT INTO access_packages (name, student_category, price, currency, duration_days, description, is_active)
SELECT 'Grade 10 Full Access', 'GRADE_10', 200.00, 'ETB', NULL, 'Lifetime access to all Grade 10 resources', true
WHERE NOT EXISTS (SELECT 1 FROM access_packages WHERE student_category = 'GRADE_10');

INSERT INTO access_packages (name, student_category, price, currency, duration_days, description, is_active)
SELECT 'Grade 11 Full Access', 'GRADE_11', 200.00, 'ETB', NULL, 'Lifetime access to all Grade 11 resources', true
WHERE NOT EXISTS (SELECT 1 FROM access_packages WHERE student_category = 'GRADE_11');

INSERT INTO access_packages (name, student_category, price, currency, duration_days, description, is_active)
SELECT 'Grade 12 Full Access', 'GRADE_12', 200.00, 'ETB', NULL, 'Lifetime access to all Grade 12 resources', true
WHERE NOT EXISTS (SELECT 1 FROM access_packages WHERE student_category = 'GRADE_12');

INSERT INTO access_packages (name, student_category, price, currency, duration_days, description, is_active)
SELECT 'Remedial Full Access', 'REMEDIAL', 200.00, 'ETB', NULL, 'Lifetime access to all Remedial resources', true
WHERE NOT EXISTS (SELECT 1 FROM access_packages WHERE student_category = 'REMEDIAL');

INSERT INTO access_packages (name, student_category, price, currency, duration_days, description, is_active)
SELECT 'Freshman Full Access', 'FRESHMAN', 200.00, 'ETB', NULL, 'Lifetime access to all Freshman resources', true
WHERE NOT EXISTS (SELECT 1 FROM access_packages WHERE student_category = 'FRESHMAN');

-- ============================================
-- STEP 8: Create or replace trigger function
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- STEP 9: Create triggers
-- ============================================

DROP TRIGGER IF EXISTS update_access_packages_updated_at ON access_packages;
CREATE TRIGGER update_access_packages_updated_at
    BEFORE UPDATE ON access_packages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_student_category_access_updated_at ON student_category_access;
CREATE TRIGGER update_student_category_access_updated_at
    BEFORE UPDATE ON student_category_access
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- STEP 10: Add table and column comments
-- ============================================

COMMENT ON TABLE access_packages IS 'Configurable pricing packages for student category access';
COMMENT ON TABLE student_category_access IS 'Tracks student access to resource categories';
COMMENT ON COLUMN student_category_access.expires_at IS 'NULL means lifetime access';
COMMENT ON COLUMN access_packages.duration_days IS 'NULL means lifetime access';

-- ============================================
-- Migration Complete
-- ============================================
