import { Image } from "../atoms/Image";
import { Video } from "../atoms/Video";

interface MediaContainerProps {
  url: string;
  title: string;
  mediaType: 'image' | 'video';
}

export function MediaContainer({ url, title, mediaType }: MediaContainerProps) {
  return (
    <section className="relative h-[80vh] overflow-hidden">
      {mediaType === "image" ? (
        <Image src={url} alt={title} />
      ) : (
        <Video src={url} title={title} />
      )}
    </section>
  );
}