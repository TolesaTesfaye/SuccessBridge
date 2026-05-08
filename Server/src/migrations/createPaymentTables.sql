-- Payment System Database Migration
-- Run this SQL script if you need to manually create the payment tables
-- (The server will auto-create these in development mode)

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "subjectId" UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) NOT NULL DEFAULT 'ETB',
  "paymentMethod" VARCHAR(50) NOT NULL CHECK ("paymentMethod" IN ('bank_transfer', 'telebirr', 'cbe_birr', 'mpesa', 'other')),
  "screenshotUrl" TEXT NOT NULL,
  "transactionReference" VARCHAR(255),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  "approvedBy" UUID REFERENCES users(id) ON DELETE SET NULL,
  "approvedAt" TIMESTAMP WITH TIME ZONE,
  "rejectionReason" TEXT,
  notes TEXT,
  "educationLevel" VARCHAR(20) NOT NULL CHECK ("educationLevel" IN ('high_school', 'university')),
  grade VARCHAR(50),
  stream VARCHAR(50),
  "universityId" UUID REFERENCES universities(id) ON DELETE SET NULL,
  "departmentId" UUID REFERENCES departments(id) ON DELETE SET NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create subject_access table
CREATE TABLE IF NOT EXISTS subject_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "subjectId" UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  "paymentId" UUID NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
  "accessGrantedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "expiresAt" TIMESTAMP WITH TIME ZONE,
  "educationLevel" VARCHAR(20) NOT NULL CHECK ("educationLevel" IN ('high_school', 'university')),
  grade VARCHAR(50),
  stream VARCHAR(50),
  "universityId" UUID REFERENCES universities(id) ON DELETE SET NULL,
  "departmentId" UUID REFERENCES departments(id) ON DELETE SET NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE("userId", "subjectId")
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments("userId");
CREATE INDEX IF NOT EXISTS idx_payments_subject_id ON payments("subjectId");
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments("createdAt");

CREATE INDEX IF NOT EXISTS idx_subject_access_user_id ON subject_access("userId");
CREATE INDEX IF NOT EXISTS idx_subject_access_subject_id ON subject_access("subjectId");
CREATE INDEX IF NOT EXISTS idx_subject_access_payment_id ON subject_access("paymentId");
CREATE INDEX IF NOT EXISTS idx_subject_access_expires_at ON subject_access("expiresAt");

-- Add comments for documentation
COMMENT ON TABLE payments IS 'Stores payment requests from students for subject access';
COMMENT ON TABLE subject_access IS 'Tracks which subjects users have paid for and can access';

COMMENT ON COLUMN payments.amount IS 'Payment amount in the specified currency';
COMMENT ON COLUMN payments.currency IS 'Currency code (default: ETB for Ethiopian Birr)';
COMMENT ON COLUMN payments."paymentMethod" IS 'Method used for payment (bank_transfer, telebirr, cbe_birr, mpesa, other)';
COMMENT ON COLUMN payments."screenshotUrl" IS 'URL to the uploaded payment screenshot';
COMMENT ON COLUMN payments.status IS 'Payment status: pending, approved, or rejected';
COMMENT ON COLUMN payments."approvedBy" IS 'Admin user who approved/rejected the payment';
COMMENT ON COLUMN payments."rejectionReason" IS 'Reason provided when payment is rejected';

COMMENT ON COLUMN subject_access."accessGrantedAt" IS 'When the user was granted access to the subject';
COMMENT ON COLUMN subject_access."expiresAt" IS 'Optional expiration date for the access (NULL = lifetime access)';

-- Sample data for testing (optional)
-- Uncomment to insert test data

/*
-- Insert a test payment (replace UUIDs with actual IDs from your database)
INSERT INTO payments (
  "userId",
  "subjectId",
  amount,
  currency,
  "paymentMethod",
  "screenshotUrl",
  "transactionReference",
  status,
  notes,
  "educationLevel",
  grade
) VALUES (
  'your-student-user-id',
  'your-subject-id',
  500.00,
  'ETB',
  'bank_transfer',
  'https://example.com/screenshot.jpg',
  'TXN123456',
  'pending',
  'Test payment',
  'university',
  'freshman'
);
*/

-- Verify tables were created
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_name IN ('payments', 'subject_access')
ORDER BY table_name;

-- Show table structures
\d payments
\d subject_access
