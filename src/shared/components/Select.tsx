export const Select = ({ children, ...props }: any) => {
  return <select className="select" {...props}>{children}</select>;
};