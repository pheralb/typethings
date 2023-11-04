import { useState, type ReactNode } from "react";
import {
  FolderClosed,
  FolderIcon,
  FolderOpen,
  FolderOpenIcon,
  X,
} from "lucide-react";

import { SidebarItemClasses, SidebarItemIconSize } from "@/components/sidebar/shared";

import {
  cn,
  Button,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@typethings/ui";

import { useWorkspaceStore } from "@/store/workspaceStore";

interface FolderProps {
  name: string;
  path: string;
  children: ReactNode;
}

const Folder = (props: FolderProps) => {
  const [openCollapsible, setOpenCollapsible] = useState<boolean>(false);
  const [openContextMenu, setOpenContextMenu] = useState<boolean>(false);
  const deleteWorkspace = useWorkspaceStore((state) => state.deleteWorkspace);
  const selectWorkspace = useWorkspaceStore((state) => state.selectWorkspace);

  const handleDeleteWorkspace = (path: string) => {
    selectWorkspace(null);
    deleteWorkspace(path);
  };

  return (
    <ContextMenu onOpenChange={setOpenContextMenu}>
      <ContextMenuTrigger asChild>
        <Collapsible
          id={props.name}
          open={openCollapsible}
          onOpenChange={() => setOpenCollapsible(!openCollapsible)}
        >
          <CollapsibleTrigger className="w-full" asChild>
            <Button
              title={props.name}
              variant="ghost"
              className={cn(
                SidebarItemClasses,
                "my-0 flex cursor-default items-center space-x-3 overflow-hidden truncate text-sm text-neutral-500 transition-none duration-75 dark:text-neutral-400",
                openCollapsible && "text-dark dark:text-neutral-100",
                openContextMenu && "text-neutral-900 dark:text-neutral-100",
              )}
            >
              <div>
                {openCollapsible ? (
                  <FolderOpenIcon size={SidebarItemIconSize} />
                ) : (
                  <FolderIcon size={SidebarItemIconSize} />
                )}
              </div>
              <span className="truncate">{props.name}</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent
            className={cn(
              "ml-3 border-l border-neutral-400/50 pl-4 pt-1 duration-100 dark:border-neutral-700/30",
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
