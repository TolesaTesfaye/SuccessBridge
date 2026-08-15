/**
 * Script to add new columns to payments table
 * Run this with: node add-payment-columns.js
 */

import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function addColumns() {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Connecting to database...');
    
    // Check if columns already exist
    const checkQuery = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'payments' 
        AND column_name IN ('accountNumber', 'payerPhone', 'payerNote')
    `;
    
    const existingColumns = await client.query(checkQuery);
    console.log(`✅ Found ${existingColumns.rows.length} existing columns`);
    
    // Add accountNumber if it doesn't exist
    if (!existingColumns.rows.find(row => row.column_name === 'accountNumber')) {
      console.log('➕ Adding accountNumber column...');
      await client.query('ALTER TABLE payments ADD COLUMN "accountNumber" VARCHAR(255)');
      console.log('✅ Added accountNumber column');
    } else {
      console.log('ℹ️  accountNumber column already exists');
    }
    
    // Add payerPhone if it doesn't exist
    if (!existingColumns.rows.find(row => row.column_name === 'payerPhone')) {
      console.log('➕ Adding payerPhone column...');
      await client.query('ALTER TABLE payments ADD COLUMN "payerPhone" VARCHAR(50)');
      console.log('✅ Added payerPhone column');
    } else {
      console.log('ℹ️  payerPhone column already exists');
    }
    
    // Add payerNote if it doesn't exist
    if (!existingColumns.rows.find(row => row.column_name === 'payerNote')) {
      console.log('➕ Adding payerNote column...');
      await client.query('ALTER TABLE payments ADD COLUMN "payerNote" TEXT');
      console.log('✅ Added payerNote column');
    } else {
      console.log('ℹ️  payerNote column already exists');
    }
    
    // Verify all columns were added
    const verifyQuery = `
      SELECT 
        column_name,
        data_type,
        character_maximum_length,
        is_nullable
      FROM information_schema.columns
      WHERE table_name = 'payments' 
        AND column_name IN ('accountNumber', 'payerPhone', 'payerNote')
      ORDER BY column_name
    `;
    
    const result = await client.query(verifyQuery);
    
    console.log('\n✅ Migration completed successfully!');
    console.log('\n📋 Column details:');
    console.table(result.rows);
    
  } catch (error) {
    console.error('❌ Error adding columns:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the migration
addColumns()
  .then(() => {
    console.log('\n🎉 All done! You can now restart your server.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  });
