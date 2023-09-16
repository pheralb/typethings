import { useState, type ReactNode } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { SidebarItemClasses, SidebarItemIconSize } from "./sidebar";
import { cn } from "@/utils";
import { FolderIcon, FolderOpenIcon } from "lucide-react";

interface FolderProps {
  name: string;
  children: ReactNode;
}

const Folder = (props: FolderProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Collapsible
      id={props.name}
      open={open}
      onOpenChange={() => setOpen(!open)}
    >
      <CollapsibleTrigger className="w-full">
        <Button
          variant="ghost"
          className={cn(
            SidebarItemClasses,
            "flex cursor-default items-center space-x-3 text-sm text-neutral-500 duration-75",
            open && "text-neutral-100",
          )}
        >
          {open ? (
            <FolderOpenIcon size={SidebarItemIconSize} />
          ) : (
            <FolderIcon size={SidebarItemIconSize} />
          )}
          <span>{props.name}</span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent
        className={cn(
          "ml-3 border-l border-neutral-800 pl-2 transition-all duration-100",
          open ? "animate-in fade-in" : "",
        )}
      >
        {props.children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Folder;
