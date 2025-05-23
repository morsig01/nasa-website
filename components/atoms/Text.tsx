interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export function Text({ children, className = '' }: TextProps) {
  return (

    <p className="p-6 bg-black text-white rounded-xs shadow-md">
      {children}
    </p>
  );
}