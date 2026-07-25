async function check() {
  try {
    const res = await fetch('https://oxnntnvtkngfoorkleay.supabase.co/auth/v1/health');
    console.log('Auth Health:', res.status, await res.text());
    
    const res2 = await fetch('https://oxnntnvtkngfoorkleay.supabase.co/rest/v1/');
    console.log('Rest API:', res2.status, await res2.text());
  } catch (err) {
    console.error('Error:', err.message);
  }
}
check();
