export async function GET() {
  try {
    const res = await fetch("http://ip-api.com/json"); // IP thật của client (nếu gọi từ client)
    const data = await res.json();

    const countryCode = data?.countryCode || "US";
    return Response.json({ country: countryCode });
  } catch {
    return Response.json({ country: "US" });
  }
}