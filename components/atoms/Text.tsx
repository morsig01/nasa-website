interface TextProps {
  children: React.ReactNode;
}

export function Text({ children }: TextProps) {
  return (
    <p className="p-6 bg-black text-white rounded-xs shadow-md">
      {children}
    </p>
  );
}