import { useState, type ReactNode } from "react";
import {
  FolderClosed,
  FolderIcon,
  FolderOpen,
  FolderOpenIcon,
  X,
} from "lucide-react";
import { cn } from "@/utils";

import { SidebarItemClasses, SidebarItemIconSize } from "./sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { useWorkspaceStore } from "@/store/workspaceStore";

interface FolderProps {
  name: string;
  path: string;
  children: ReactNode;
}

const Folder = (props: FolderProps) => {
  const [openCollapsible, setOpenCollapsible] = useState<boolean>(false);
  const deleteWorkspace = useWorkspaceStore((state) => state.deleteWorkspace);
  const selectWorkspace = useWorkspaceStore((state) => state.selectWorkspace);

  const handleDeleteWorkspace = (path: string) => {
    selectWorkspace(null);
    deleteWorkspace(path);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
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
                "my-0 flex cursor-default items-center space-x-3 text-sm text-neutral-400 duration-75",
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
              "ml-3 border-l border-neutral-700/50 pl-3 pt-1 transition-all duration-100",
              openCollapsible ? "animate-in fade-in" : "",
            )}
          >
            {props.children}
          </CollapsibleContent>
        </Collapsible>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => setOpenCollapsible(!openCollapsible)}>
          <div className="flex items-center space-x-2">
            {openCollapsible ? (
              <FolderClosed size={SidebarItemIconSize} />
            ) : (
              <FolderOpen size={SidebarItemIconSize} />
            )}
            <span>{openCollapsible ? "Hide" : "Show"} files</span>
          </div>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => handleDeleteWorkspace(props.path)}>
          <div className="flex items-center space-x-2">
            <X size={SidebarItemIconSize} />
            <span>Close workspace</span>
          </div>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default Folder;
