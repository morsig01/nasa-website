import { Image } from "../atoms/Image";
import { Video } from "../atoms/Video";

interface MediaContainerProps {
  url: string;
  title: string;
  mediaType: 'image' | 'video';
}

export function MediaContainer({ url, title, mediaType }: MediaContainerProps) {
  return (
    <section className="relative h-[calc(100vh-8rem)] overflow-hidden">
      {mediaType === "image" ? (
        <Image src={url} alt={title} />
      ) : (
        <Video src={url} title={title} />
      )}
    </section>
  );
}