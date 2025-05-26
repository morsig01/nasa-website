import { Image } from "../atoms/Image";
import { Video } from "../atoms/Video";

interface MediaContainerProps {
  url: string;
  title: string;
  mediaType: 'image' | 'video';
}

export function MediaContainer({ url, title, mediaType }: MediaContainerProps) {
  return (
    <section className="relative w-full h-[80vh]">
      <div className="absolute inset-0 bg-black">
        {mediaType === "image" ? (
          <Image src={url} alt={title} />
        ) : (
          <Video src={url} title={title} />
        )}
      </div>
    </section>
  );
}