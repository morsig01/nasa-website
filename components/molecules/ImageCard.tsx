import Image from "next/image";

interface ImageCardProps {
  src: string;
  onClick?: () => void;
}

export default function ImageCard({ src, onClick }: ImageCardProps) {
  return (
    <div
      className="rounded-md overflow-hidden shadow-sm cursor-pointer transition-transform hover:scale-105"
      onClick={onClick}
    >
      <Image
        src={src}
        alt="NASA Media"
        width={400}
        height={300}
        className="object-cover w-full h-60"
      />
    </div>
  );
}
