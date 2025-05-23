interface Props {
  date: string;
}

export default function DateLabel({ date }: Props) {
  return (
    <div className="text-sm text-gray-500 mb-1">
      {new Date(date).toDateString()}
    </div>
  );
}
