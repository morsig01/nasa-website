import DateLabel from "../atoms/DateLabel";
import TagPill from "../atoms/TagPill";
import { Image } from "../atoms/Image";
import { Video } from "../atoms/Video";

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  media: {
    image?: string;
    video?: string;
  };
  tags: string[];
  importance: number;
}

export default function TimelineEventCard({ event }: { event: Event }) {
  return (
    <div className="border-l-4 p-6 pl-4 ml-4 relative">
      <span className="absolute -left-[10px] top-2 h-4 w-4 rounded-full bg-blue-600" />
      <DateLabel date={event.date} />
      <h3 className="text-blue-200 text-lg font-bold">{event.title}</h3>
      <p className="text-white mb-2">{event.description}</p>
      {event.media.image && (
        <div className="relative h-96 mb-4">
          <Image src={event.media.image} alt={event.title} />
        </div>
      )}
      {event.media.video && (
        <div className="relative h-96 mb-4">
          <Video src={event.media.video} title={event.title} />
        </div>
      )}      <div className="flex flex-wrap gap-2">
        {event.tags.filter(tag => tag != null).map(tag => (
          <TagPill key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
}