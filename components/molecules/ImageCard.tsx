import Image from "next/image";
import { useState } from "react";

interface ImageCardProps {
  src: string;
  onClick?: () => void;
}

export default function ImageCard({ src, onClick }: ImageCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className="relative w-full h-60 rounded-md overflow-hidden shadow-sm cursor-pointer bg-gray-100/50"
      onClick={onClick}
      style={{ 
        opacity: isLoaded ? 1 : 0,
        transform: `scale(${isLoaded ? 1 : 0.98})`,
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
      }}
    >
      {!hasError && (
        <Image
          src={src}
          alt="NASA Media"
          fill
          className="object-cover"
          loading="lazy"
          onLoadingComplete={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
    </div>
  );
}
