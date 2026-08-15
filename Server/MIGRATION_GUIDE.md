# Database Migration Guide

## Payment User Information Fields Migration

### Date: 2026-08-15

### Purpose
Added new columns to the `payments` table to capture additional user payment information:
- `accountNumber`: User's account or phone number used for payment
- `payerPhone`: User's contact phone number
- `payerNote`: Additional note from the user

### How to Apply

#### Option 1: Manual Migration (Recommended for Production)
Run the SQL migration file directly on your database:

```bash
# Connect to your PostgreSQL database
psql -h your-host -U your-user -d your-database -f src/migrations/addPaymentUserInfoColumns.sql
```

#### Option 2: Automatic Migration (Development Only)
If you have `DB_SYNC_ALTER=true` in your `.env` file, Sequelize will automatically add the columns when you restart the server.

**⚠️ Warning:** Do NOT use `DB_SYNC_ALTER=true` in production as it may cause data loss.

### Verification

After running the migration, verify the columns were added:

```sql
SELECT 
  column_name,
  data_type,
  character_maximum_length,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'payments' 
  AND column_name IN ('accountNumber', 'payerPhone', 'payerNote')
ORDER BY column_name;
```

Expected output:
```
   column_name   |     data_type      | character_maximum_length | is_nullable
-----------------+--------------------+--------------------------+-------------
 accountNumber   | character varying  |                      255 | YES
 payerNote       | text               |                          | YES
 payerPhone      | character varying  |                       50 | YES
```

### Rollback

To remove these columns (if needed):

```sql
ALTER TABLE payments DROP COLUMN IF EXISTS "accountNumber";
ALTER TABLE payments DROP COLUMN IF EXISTS "payerPhone";
ALTER TABLE payments DROP COLUMN IF EXISTS "payerNote";
```

### Impact
- **Backward Compatible**: Yes, all columns are nullable
- **API Changes**: The payment API now accepts and returns these new fields
- **Frontend Changes**: Payment form now includes these fields; admin dashboard displays them
- **Data Loss**: None - existing payments will have NULL values for these fields

### Testing
1. Submit a new payment with the new fields filled in
2. Verify the fields are saved in the database
3. Check the admin dashboard to ensure the fields are displayed
4. Verify existing payments still work correctly

## Other Migrations

### Payment System Tables
Location: `src/migrations/createPaymentTables.sql`

This creates the core payment tables:
- `payments`: Stores payment requests
- `subject_access`: Tracks subject access granted via payments

Run this migration if you're setting up the payment system for the first time.
