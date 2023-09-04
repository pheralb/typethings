import type { FileEntry } from "@tauri-apps/api/fs";

import { useState } from "react";
import { cn } from "@/utils";
import { useFilesStore } from "@/store/filesStore";
import { readFile } from "@/functions/readFiles";
import { FileText, MoreVertical, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeleteFile from "./deleteFile";

// From Sidebar (shared classes & icon size):
import { SidebarItemClasses, SidebarItemIconSize } from "../sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";

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
      console.log(file);
      selectFile({
        name: props.name!,
        path: props.path,
        content: file,
      });
      router("/editor");
    } catch (error) {
      console.error(error);
    }
  };

  // Why <Dialog> component wrap the <Dropdown> component?
  // https://ui.shadcn.com/docs/components/dialog#notes
  // Change line 105.

  return (
    <Button
      variant="ghost"
      className={cn(
        SidebarItemClasses,
        "cursor-default text-sm text-neutral-500 duration-75",
        selectedFile?.path === props.path && "text-neutral-100",
        props.active && "text-neutral-100",
        dropdownOpen && "text-neutral-100",
      )}
      onClick={handleOpenFile}
    >
      <div className="flex w-full items-center justify-between space-x-3 overflow-hidden">
        <div className="flex items-center space-x-3">
          <FileText size={SidebarItemIconSize} />
          <div className="flex items-center">
            <span className="truncate">{props.name}</span>
          </div>
        </div>
        <Dialog>
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger
              className="cursor-default focus:outline-none"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical size={SidebarItemIconSize} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleOpenFile}>
                <div className="flex items-center space-x-2">
                  <FileText size={SidebarItemIconSize} />
                  <span>Open</span>
                </div>
              </DropdownMenuItem>
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <div className="flex items-center space-x-2">
                    <Trash size={SidebarItemIconSize} />
                    <span>Delete</span>
                  </div>
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteFile name={props.name} path={props.path} />
        </Dialog>
      </div>
    </Button>
  );
};

export default FileItem;
