import { getApod } from "./api/nasa/nasa.js";
import { MediaContainer } from "@/components/molecules/MediaContainer";
import { Title } from "@/components/atoms/Title";
import { Text } from "@/components/atoms/Text";

interface Apod {
  title: string;
  url: string;
  media_type: 'image' | 'video';
  explanation: string;
}

export default async function Home() {
  const apod: Apod = await getApod();

  return (
    <main className="min-h-screen flex flex-col">
      <MediaContainer 
        url={apod.url} 
        title={apod.title} 
        mediaType={apod.media_type}
      />
      <Title>{apod.title}</Title>
      <section className="px-96 text-center mt-8">
        <Text>{apod.explanation}</Text>
      </section>
    </main>
  );
}