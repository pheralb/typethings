import type { ReactNode } from "react";
import { cn } from "@/utils";

interface iFormGroupProps {
  children: ReactNode;
  className?: string;
}

const FormGroup = (props: iFormGroupProps) => {
  return (
    <div className={cn("flex flex-col space-y-2 mb-2", props.className)}>
      {props.children}
    </div>
  );
};

export default FormGroup;
