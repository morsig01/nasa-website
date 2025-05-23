import { getApod } from "./api/nasa/nasa.js";
import { MediaContainer } from "@/components/molecules/MediaContainer";
import { Title } from "@/components/atoms/Title";
import { Text } from "@/components/atoms/Text";

interface Apod {
  copyright: string;
  title: string;
  url: string;
  media_type: 'image' | 'video';
  explanation: string;
}

export default async function Home() {
  const apodData: Apod[] = await getApod();

  return (
    <main className="w-full">
      {apodData.map((apod, index) => (
        <section 
          key={index} 
          className="relative h-screen w-full"
          style={{
            backgroundImage: `url(${apod.url})`,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-8">
            <Title className="text-white">{apod.title}</Title>
            <Text className="text-white max-w-3xl mx-auto">{apod.explanation}</Text>
            <div className="mt-4 text-sm text-gray-300">
              <Text>Source: {apod.url}</Text>
              {apod.copyright && <Text>Copyright: {apod.copyright}</Text>}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}