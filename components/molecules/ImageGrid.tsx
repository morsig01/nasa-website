import ImageCard from "./ImageCard";

export default function ImageGrid({ images }: { images: string[] }) {
  if (!images.length) return <p>No results found.</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {images.map((src, idx) => (
        <ImageCard key={idx} src={src} />
      ))}
    </div>
  );
}
