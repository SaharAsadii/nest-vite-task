export const Title: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <h1 className="text-lg md:text-4xl text-primary font-bold mb-16 mt-8 text-center">
      {children}
    </h1>
  );
};
