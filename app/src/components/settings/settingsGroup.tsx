import type { ReactNode } from "react";
import { cn } from "@typethings/ui";

interface SettingsGroupProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

const SettingsGroup = (props: SettingsGroupProps) => {
  return (
    <section>
      <div className="mb-4 flex w-full items-center space-x-2 border-b border-neutral-300 pb-1 dark:border-neutral-800">
        {props.icon && props.icon}
        <p className="text-sm">{props.title}</p>
      </div>
      <div className={cn(props.className)}>{props.children}</div>
    </section>
  );
};

export default SettingsGroup;
