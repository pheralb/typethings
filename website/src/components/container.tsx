import { cn } from "@typethings/ui";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = (props: ContainerProps) => {
  return (
    <div className={cn("container mx-auto", props.className)}>
      {props.children}
    </div>
  );
};

export default Container;
