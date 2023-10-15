"use client";

import type { ReactNode } from "react";
import { cn } from "..";

interface iFormGroupProps {
  children: ReactNode;
  className?: string;
}

const FormGroup = (props: iFormGroupProps) => {
  return (
    <div className={cn("mb-2 flex flex-col space-y-2", props.className)}>
      {props.children}
    </div>
  );
};

export { FormGroup };
