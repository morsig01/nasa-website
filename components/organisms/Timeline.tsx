import TimelineEventCard from "../molecules/TimelineEventCard";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface NasaEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  media: {
    video: string | undefined;
    image(image: any): unknown;
    _type: string;
    asset: {
      _ref: string;
    };
  };
  tags: string[];
  importance: number;
}

async function getTimelineEvents() {
  const events = await client.fetch(`*[_type == "nasaEvent"] {
    id,
    title,
    date,
    description,
    media,
    tags,
    importance
  }`);
  return events;
}

export default async function Timeline() {
  const events = await getTimelineEvents();
  
  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-6xl font-bold mb-6">NASA Historical Timeline</h2>
      <div>
        {events.map((event: NasaEvent) => (
          <TimelineEventCard 
            key={event.id} 
            event={{
              ...event,
              media: {
                image:
                  event.media?.image && typeof event.media.image === "object" && "asset" in event.media.image
                    ? urlFor(event.media.image).url()
                    : undefined,
                video: event.media?.video
              }
            }} 
          />
        ))}
      </div>
    </section>
  );
}
