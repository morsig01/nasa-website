interface VideoProps {
  src: string;
  title: string;
}

export function Video({ src, title }: VideoProps) {
  return (
    <iframe
      src={src}
      title={title}
      className="w-full h-full rounded-sm"
      frameBorder="0"
      allowFullScreen
    />
  );
}