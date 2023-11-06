import type { ReactNode } from "react";
import { cn } from "@typethings/ui";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = (props: ContainerProps) => {
  return (
    <main
      className={cn(
        "container mx-auto flex flex-col space-y-8 px-6 pb-8 pt-6",
        props.className,
      )}
    >
      {props.children}
    </main>
  );
};

export default Container;
