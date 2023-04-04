import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}
function Container({ children }: ContainerProps) {
  return <div className='container mx-auto max-w-6xl h-full'>{children}</div>;
}

export default Container;
