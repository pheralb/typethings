import { useState } from "react";
import { cn } from "@/utils";
import { useFilesStore } from "@/store/filesStore";
import { desktopDir } from "@tauri-apps/api/path";
import { readFile } from "@/functions/readFiles";
import {
  FileText,
  ArrowRight,
  Trash,
  MoreVertical,
  ChevronRight,
  FileEdit,
  Files,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// From Sidebar (shared classes & icon size):
import { SidebarItemClasses, SidebarItemIconSize } from "../sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

interface iFileItemProps {
  filename: string;
  extension: string;
  active?: boolean;
}

const FileItem = (props: iFileItemProps) => {
  const selectFile = useFilesStore((state) => state.setSelectedFile);
  const selectedFile = useFilesStore((state) => state.selectedFile);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const router = useNavigate();

  const handleOpenFile = async () => {
    try {
      const desktopPath = await desktopDir();
      const file = await readFile({
        directory: desktopPath,
        folder: "taurifiles",
        filename: props.filename,
        extension: props.extension,
      });
      selectFile({
        filename: props.filename,
        extension: props.extension,
        content: file,
      });
      router("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      variant="ghost"
      className={cn(
        SidebarItemClasses,
        "cursor-default text-sm text-neutral-500 duration-75",
        selectedFile?.filename === props.filename && "text-neutral-100",
        props.active && "text-neutral-100",
        dropdownOpen && "text-neutral-100",
      )}
      onClick={handleOpenFile}
    >
      <div className="flex w-full items-center justify-between space-x-3 overflow-hidden">
        <div className="flex items-center">
          <span className="truncate">{props.filename}</span>
          <span>.{props.extension}</span>
        </div>
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger className="focus:outline-none">
            <MoreVertical size={SidebarItemIconSize} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleOpenFile}>
              <div className="flex items-center space-x-2">
                <FileText size={SidebarItemIconSize} />
                <span>Open</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center space-x-2">
                <FileEdit size={SidebarItemIconSize} />
                <span>Rename</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center space-x-2">
                <Files size={SidebarItemIconSize} />
                <span>Make a copy</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center space-x-2">
                <Trash size={SidebarItemIconSize} />
                <span>Delete</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Button>
  );
};

export default FileItem;
