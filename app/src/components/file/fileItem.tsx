import type { FileEntry } from "@tauri-apps/api/fs";
import { appWindow } from "@tauri-apps/api/window";

import { useState } from "react";
import { cn } from "@typethings/ui";
import { BookOpen, Trash } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { readFile, getFileNameWithoutExtension } from "@typethings/functions";
import DeleteFile from "./deleteFile";

// From Sidebar (shared classes & icon size):
import {
  SidebarItemClasses,
  SidebarItemIconSize,
} from "@/components/sidebar/shared";

import {
  Button,
  Dialog,
  DialogTrigger,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@typethings/ui";
import { useWorkspaceStore } from "@/store/workspaceStore";

interface iFileItemProps extends FileEntry {
  active?: boolean;
}

const FileItem = (props: iFileItemProps) => {
  const selectedWorkspace = useWorkspaceStore(
    (state) => state.selectedWorkspace,
  );
  const selectFile = useWorkspaceStore((state) => state.setSelectedFile);
  const selectedFile = useWorkspaceStore((state) => state.selectedFile);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const router = useNavigate();
  const location = useLocation();

  const handleOpenFile = async () => {
    try {
      const file = await readFile({
        path: props.path,
      });
      selectFile({
        path: props.path,
        content: file,
      });
      router("/editor");
      appWindow.setTitle(
        `${getFileNameWithoutExtension(props.name!)} - Typethings`,
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Why <Dialog> component wrap the <Dropdown> component?
  // https://ui.shadcn.com/docs/components/dialog#notes
  // Change line 105.

  return (
    <Dialog>
      <ContextMenu onOpenChange={setDropdownOpen}>
        <ContextMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              SidebarItemClasses,
              "cursor-default text-sm text-neutral-500 transition-none duration-75 dark:text-neutral-500",
              location.pathname === "/editor" &&
                selectedFile?.path === props.path &&
                "text-dark bg-neutral-400/20 dark:bg-neutral-700/50 dark:text-neutral-100",
              dropdownOpen && "text-neutral-900 dark:text-neutral-100",
            )}
            onClick={handleOpenFile}
          >
            <div className="flex w-full items-center justify-between space-x-3 overflow-hidden">
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="flex items-center overflow-hidden">
                  <span className="truncate">
                    {getFileNameWithoutExtension(props.name!)}
                  </span>
                </div>
              </div>
            </div>
          </Button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={handleOpenFile}>
            <div className="flex items-center space-x-2">
              <BookOpen size={SidebarItemIconSize} />
              <span>Open</span>
            </div>
          </ContextMenuItem>
          <DialogTrigger asChild>
            <ContextMenuItem>
              <div className="flex items-center space-x-2">
                <Trash size={SidebarItemIconSize} />
                <span>Delete</span>
              </div>
            </ContextMenuItem>
          </DialogTrigger>
        </ContextMenuContent>
      </ContextMenu>
      <DeleteFile file={props} workspace={selectedWorkspace?.folderPath!} />
    </Dialog>
  );
};

export default FileItem;
