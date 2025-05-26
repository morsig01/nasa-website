export async function getApod() {
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch APOD data');
  }

  return response.json();
}