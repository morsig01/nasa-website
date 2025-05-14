interface TitleProps {
  children: React.ReactNode;
}

export function Title({ children }: TitleProps) {
  return (
    <h1 className="bg-white text-black py-4 px-8 text-4xl font-bold text-center -mt-8 mx-auto max-w-2xl z-10 shadow">
      {children}
    </h1>
  );
}