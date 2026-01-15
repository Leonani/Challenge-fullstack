type Props = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-screen overflow-hidden">
      {children}
    </div>
  );
};