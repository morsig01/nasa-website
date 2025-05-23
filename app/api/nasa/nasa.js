export async function getApod(count = 5) {
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&count=${count}`
  );
  return response.json();
}