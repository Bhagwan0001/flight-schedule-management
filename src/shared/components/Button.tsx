export const Button = ({ children, ...props }: any) => {
  return (
    <button className="btn" {...props}>
      {children}
    </button>
  );
};