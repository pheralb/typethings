import { cn } from "@typethings/ui";
import type { ReactNode } from "react";

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

const Container = (props: ContainerProps) => {
  return (
    <main className={cn("container", props.className)}>{props.children}</main>
  );
};

export default Container;
