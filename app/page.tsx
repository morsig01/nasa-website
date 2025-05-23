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
  }

  return (
    <main className="flex flex-col">
      <section className="min-h-screen">
        <div className="min-h-[80vh]">
          {apod.url ? (
            <MediaContainer
              url={apod.url}
              title={apod.title}
              mediaType={apod.media_type}
            />
          ) : (
            <div className="w-full flex items-center justify-center bg-gray-100">
              <Text>No Image Available</Text>
            </div>
          )}
        </div>
        <div className="text-center min-h-[15vh] flex items-center justify-center">
          <Title>{apod.title}</Title>
        </div>{" "}      </section>
      <AnimatedSection className="flex items-center justify-center bg-neutral-900 text-white text-lg max-w-2xl mx-auto rounded-xs p-4 mb-20">
        <Text>{apod.explanation}</Text>
      </AnimatedSection>
    </main>
  );
}
