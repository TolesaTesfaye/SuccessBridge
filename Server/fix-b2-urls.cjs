/**
 * One-time repair: rewrite legacy broken B2 hosts in stored resource URLs.
 *
 * Old bug: getB2PublicUrl built hosts from the BUCKET ID prefix
 *   (bucket ID f833725f... -> https://ff833.backblazeb2.com / https://f833.backblazeb2.com)
 * Those hosts don't exist. Correct friendly host comes from the REGION
 *   (us-east-005 -> https://f005.backblazeb2.com).
 *
 * Run:  node fix-b2-urls.cjs
 */
require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const { Client } = require('pg');

(async () => {
  const bucketId = process.env.B2_BUCKET_ID || '';
  const region = process.env.B2_REGION || process.env.B2_ENDPOINT || 'us-west-004';
  const regionCode = (region.match(/(\d{3})/) || ['004'])[1] ?? '004';

  const goodHost = `https://f${regionCode}.backblazeb2.com`;
  // The two wrong host shapes the old code produced:
  const badHosts = [
    `https://f${(bucketId || '').substring(0, 4)}.backblazeb2.com`, // b2Upload.ts style -> ff833...
    `https://${(bucketId || '').substring(0, 4)}.backblazeb2.com`,  // generic variant -> f833...
  ].filter((h) => h !== goodHost && !h.includes('https://f.backblazeb2.com'));

  console.log(`Correct host:  ${goodHost}`);
  console.log(`Legacy hosts:  ${badHosts.join(', ') || '(none)'}`);

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();

  let total = 0;
  for (const bad of badHosts) {
    for (const col of ['"fileUrl"', 'preview_image_url']) {
      const { rowCount } = await client.query(
        `UPDATE resources SET ${col} = replace(${col}, $1, $2)
         WHERE ${col} LIKE $3`,
        [bad, goodHost, `%${bad}%`]
      );
      console.log(`${col}: ${rowCount || 0} row(s) rewritten  (${bad} -> ${goodHost})`);
      total += rowCount || 0;
    }
  }
  console.log(`\nDone. ${total} URL(s) repaired.`);

  // Show remaining sanity sample
  const { rows } = await client.query(
    `SELECT title, "fileUrl", preview_image_url AS "previewImageUrl"
     FROM resources WHERE "fileUrl" LIKE '%backblazeb2%' ORDER BY "createdAt" DESC LIMIT 3`
  );
  for (const r of rows) {
    console.log(`- ${r.title}\n    file: ${r.fileUrl}\n    prev: ${r.previewImageUrl || '(none)'}`);
  }

  await client.end();
})().catch((e) => { console.error(e); process.exit(1); });
