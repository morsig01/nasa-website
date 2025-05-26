interface Props {
  tag: string;
}

export default function TagPill({ tag }: Props) {
  return (
    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
      #{tag}
    </span>
  );
}
