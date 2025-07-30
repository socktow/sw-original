export async function getCountryCodeFromIP(ip) {
  try {
    const res = await fetch(`https://ipapi.co/${ip}/country/`);
    const countryCode = await res.text();
    return countryCode.trim(); // e.g., 'VN'
  } catch (e) {
    console.error('Failed to get country from IP:', e);
    return 'US'; // fallback
  }
}
