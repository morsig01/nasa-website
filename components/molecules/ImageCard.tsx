import Image from "next/image";

export default function ImageCard({ src }: { src: string }) {
  return (
    <div className="rounded-md overflow-hidden shadow-sm">
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
