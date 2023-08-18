import type { ReactNode } from "react";
import { cn } from "@/utils";

interface SidebarGroupProps {
  border?: boolean;
  title?: string;
  children: ReactNode;
}

const SidebarGroup = (props: SidebarGroupProps) => {
  return (
    <div
      className={cn(
        "mb-3 flex flex-col space-y-1 pb-2",
        props.border && "border-b border-neutral-700/50",
      )}
    >
      {props.title && (
        <span className="mb-2 text-xs font-medium text-neutral-500">
          {props.title}
        </span>
      )}
      {props.children}
    </div>
  );
};

export default SidebarGroup;
