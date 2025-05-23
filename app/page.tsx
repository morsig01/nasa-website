import { getApod } from "./api/nasa/nasa.js";
import { MediaContainer } from "@/components/molecules/MediaContainer";
import { Title } from "@/components/atoms/Title";
import { Text } from "@/components/atoms/Text";
import Timeline from "@/components/organisms/Timeline";

interface Apod {
  copyright: string;
  title: string;
  url?: string;
  media_type: 'image' | 'video';
  explanation: string;
}

export default async function Home() {
  const apodData: Apod[] = await getApod();
  const apod: Apod = apodData[0];

  return (

    <main className="min-h-screen flex flex-col">
      {apod.url ? (
        <MediaContainer 
          url={apod.url} 
          title={apod.title} 
          mediaType={apod.media_type}
        />
      ) : (
        <div className="w-full min-h-[80vh] flex items-center justify-center">
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