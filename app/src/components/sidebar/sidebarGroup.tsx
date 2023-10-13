import type { ReactNode } from "react";
import { cn } from "@typethings/ui";

interface SidebarGroupProps {
  border?: boolean;
  title?: string;
  children: ReactNode;
}

const SidebarGroup = (props: SidebarGroupProps) => {
  return (
    <div className={cn("mb-3 flex flex-col space-y-1 pb-2")}>
      {props.title && (
        <span className="mb-2 text-xs font-medium text-neutral-800 dark:text-neutral-500">
          {props.title}
        </span>
      )}
      {props.children}
    </div>
  );
};

export default SidebarGroup;
