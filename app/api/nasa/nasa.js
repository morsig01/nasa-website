export async function getApod() {
  const apiKey = process.env.NASA_API_KEY;
  if (!apiKey) {
    throw new Error("NASA_API_KEY is not configured. Please add it to .env.local");
  }

  const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.error?.message || `Failed to fetch APOD data: ${res.status} ${res.statusText}`);
  }
  return res.json();
}