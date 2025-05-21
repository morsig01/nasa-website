import { getApod } from "./api/nasa/nasa.js";
import { MediaContainer } from "@/components/molecules/MediaContainer";
import { Title } from "@/components/atoms/Title";
import { Text } from "@/components/atoms/Text";
import Timeline from "@/components/organisms/Timeline";

interface Apod {
  title: string;
  url?: string;
  media_type: 'image' | 'video';
  explanation: string;
}

export default async function Home() {
  const apod: Apod = await getApod();

  return (
    <main className="min-h-screen flex flex-col">
      {apod.url ? (
        <MediaContainer 
          url={apod.url} 
          title={apod.title} 
          mediaType={apod.media_type}
        />
      ) : (
        <div className="w-full min-h-[80vh] flex items-center justify-center bg-gray-100">
          <Text>No Image Today</Text>
        </div>
      )}
      <Title>{apod.title}</Title>
      <section className="px-96 text-center mt-8">
        <Text>{apod.explanation}</Text>
      </section>
      <section className="flex-grow mt-46">
        <Timeline />
      </section>
    </main>
  );
}