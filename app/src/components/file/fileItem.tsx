import type { FileEntry } from "@tauri-apps/api/fs";
import { appWindow } from "@tauri-apps/api/window";

import { useState } from "react";
import { cn } from "@typethings/ui";
import { useFilesStore } from "@/store/filesStore";
import { BookOpen, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { readFile } from "@/functions/readFiles";
import DeleteFile from "./deleteFile";

// From Sidebar (shared classes & icon size):
import { SidebarItemClasses, SidebarItemIconSize } from "../sidebar";

import {
  Button,
  Dialog,
  DialogTrigger,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@typethings/ui";

import { getFileNameWithoutExtension } from "@/functions/getFileName";

interface iFileItemProps extends FileEntry {
  active?: boolean;
}

const FileItem = (props: iFileItemProps) => {
  const selectFile = useFilesStore((state) => state.setSelectedFile);
  const selectedFile = useFilesStore((state) => state.selectedFile);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const router = useNavigate();

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
              selectedFile?.path === props.path &&
                "text-dark bg-neutral-700/60 dark:bg-neutral-700/60 dark:text-neutral-100 bg-neutral-400",
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
      <DeleteFile name={props.name} path={props.path} />
    </Dialog>
  );
};

export default FileItem;
