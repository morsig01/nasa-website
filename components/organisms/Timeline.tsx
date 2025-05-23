import events from "../../data/nasa-events.json";
import TimelineEventCard from "../molecules/TimelineEventCard";

export default function Timeline() {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">NASA Historical Timeline</h2>
      <div>
        {sortedEvents.map(event => (
          <TimelineEventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
