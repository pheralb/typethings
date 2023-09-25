import { useState, type ReactNode } from "react";
import { FolderIcon, FolderOpenIcon } from "lucide-react";
import { cn } from "@/utils";

import { SidebarItemClasses, SidebarItemIconSize } from "./sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";

interface FolderProps {
  name: string;
  children: ReactNode;
}

const Folder = (props: FolderProps) => {
  const [openCollapsible, setOpenCollapsible] = useState<boolean>(false);
  return (
    <Collapsible
      id={props.name}
      open={openCollapsible}
      onOpenChange={() => setOpenCollapsible(!openCollapsible)}
    >
      <CollapsibleTrigger className="w-full" asChild>
        <Button
          variant="ghost"
          className={cn(
            SidebarItemClasses,
            "flex cursor-default items-center space-x-3 text-sm text-neutral-500 duration-75",
            openCollapsible && "text-neutral-100",
          )}
        >
          {openCollapsible ? (
            <FolderOpenIcon size={SidebarItemIconSize} />
          ) : (
            <FolderIcon size={SidebarItemIconSize} />
          )}
          <span>{props.name}</span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent
        className={cn(
          "ml-3 border-l border-neutral-700/60 pl-2 transition-all duration-100",
          openCollapsible ? "animate-in fade-in" : "",
        )}
      >
        {props.children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Folder;
