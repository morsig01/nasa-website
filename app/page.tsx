import Image from "next/image";
import { getApod } from "./api/nasa/nasa.js";

interface Apod {
  title: string;
  url: string;
  media_type: 'image' | 'video';
  explanation: string;
}

// Convert to async server component
export default async function Home() {
  // Fetch data with revalidation
  const apod: Apod = await getApod();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">{apod.title}</h1>
      {apod.media_type === "image" ? (
        <Image
          src={apod.url}
          alt={apod.title}
          width={800}
          height={600}
          className="rounded shadow"
        />
      ) : (
        <iframe
          src={apod.url}
          title={apod.title}
          width="800"
          height="450"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}
      <p className="mt-4 text-gray-700">{apod.explanation}</p>
    </main>
  );
}