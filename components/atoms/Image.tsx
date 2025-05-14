import NextImage from "next/image";

interface ImageProps {
  src: string;
  alt: string;
}

export function Image({ src, alt }: ImageProps) {
  return (
    <NextImage
      src={src}
      alt={alt}
      fill
      className="rounded-sm shadow object-cover"
      priority
    />
  );
}