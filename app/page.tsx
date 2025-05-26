import { getApod } from "./api/nasa/nasa.js";
import { MediaContainer } from "@/components/molecules/MediaContainer";
import { Title } from "@/components/atoms/Title";
import { Text } from "@/components/atoms/Text";
import { AnimatedSection } from "@/components/molecules/AnimatedSection";

interface Apod {
  copyright: string;
  title: string;
  url?: string;
  media_type: "image" | "video";
  explanation: string;
}

export default async function Home() {
  let apod: Apod | null = null;
  let error: string | null = null;

  try {
    apod = await getApod();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load APOD data";
    console.error("Error fetching APOD:", e);
  }

  if (error || !apod) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="text-center p-8">
          <Title>Unable to load APOD</Title>
          <Text className="mt-4 text-red-600">
            {error || "Please check your NASA API key configuration"}
          </Text>
        </div>
      </main>
    );
  }  return (
    <main className="min-h-screen">
      <section className="w-full">
        {apod.url ? (
          <MediaContainer
            url={apod.url}
            title={apod.title}
            mediaType={apod.media_type}
          />
        ) : (
          <div className="aspect-video flex items-center justify-center bg-neutral-900">
            <Text className="text-white">No Image Available</Text>
          </div>
        )}

          <div className="h-[15vh] flex justify-center items-center text-center">
            <Title>{apod.title}</Title>
          </div>
      </section>
      <AnimatedSection className="container max-w-3xl mx-auto px-4 py-8">
        <div className="border-2 rounded-sm p-6">
          <Text className="text-lg leading-relaxed">{apod.explanation}</Text>
        </div>
      </AnimatedSection>
    </main>
  );
}