const { Client } = require('pg');

async function testConnection(url) {
  const client = new Client({ connectionString: url });
  try {
    await client.connect();
    console.log(`✅ Success connecting to: ${url}`);
    await client.end();
  } catch (err) {
    console.error(`❌ Failed for ${url}:`, err.message);
  }
}

async function run() {
  const pass = '702512Tol_Database';
  const urls = [
    // Current one
    `postgresql://postgres.oxnntnvtkngfoorkleay:${pass}@aws-1-eu-west-1.pooler.supabase.com:6543/postgres`,
    // Without project ref in user, port 6543
    `postgresql://postgres:${pass}@aws-1-eu-west-1.pooler.supabase.com:6543/postgres`,
    // Direct domain, port 5432 (IPv6 usually, might fail if no IPv6)
    `postgresql://postgres:${pass}@db.oxnntnvtkngfoorkleay.supabase.co:5432/postgres`,
    // Direct domain, port 6543
    `postgresql://postgres.oxnntnvtkngfoorkleay:${pass}@db.oxnntnvtkngfoorkleay.supabase.co:6543/postgres`
  ];

  for (const url of urls) {
    await testConnection(url);
  }
}

run();
