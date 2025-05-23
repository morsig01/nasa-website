interface TitleProps {
  children: string;
  className?: string;  // Make className optional
}

export const Title = ({ children, className = '' }: TitleProps) => {
  return (
    <h1 className={`text-4xl font-bold ${className}`}>
      {children}
    </h1>
  );
};