import ImageCard from "./ImageCard";

interface NasaImage {
  url: string;
  title: string;
}

interface ImageGridProps {
  images: NasaImage[];
  onImageClick: (image: NasaImage) => void;
}

export default function ImageGrid({ images, onImageClick }: ImageGridProps) {
  if (!images.length) return <p>No results found.</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {images.map((image, idx) => (
        <ImageCard
          key={idx}
          src={image.url}
          onClick={() => onImageClick(image)}
        />
      ))}
    </div>
  );
}
