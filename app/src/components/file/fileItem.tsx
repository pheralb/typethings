import { Button } from "../ui/button";
import { cn } from "@/utils";
import { useFilesStore } from "@/store/filesStore";
import { desktopDir } from "@tauri-apps/api/path";
import { readFile } from "@/functions/readFiles";
import { FileText, ArrowRight, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

// From Sidebar (shared classes & icon size):
import { SidebarItemClasses, SidebarItemIconSize } from "../sidebar";

interface iFileItemProps {
  filename: string;
  extension: string;
  active?: boolean;
}

const FileItem = (props: iFileItemProps) => {
  const selectFile = useFilesStore((state) => state.setSelectedFile);
  const selectedFile = useFilesStore((state) => state.selectedFile);
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
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            SidebarItemClasses,
            "cursor-default text-sm text-neutral-500 duration-75",
            selectedFile?.filename === props.filename && "text-neutral-100",
          )}
          onClick={handleOpenFile}
        >
          <div className="flex items-center space-x-3 overflow-hidden">
            <FileText size={SidebarItemIconSize} />
            <div className="flex items-center">
              <span className="truncate">{props.filename}</span>
              <span>.{props.extension}</span>
            </div>
          </div>
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleOpenFile}>
          <div className="flex items-center space-x-2">
            <ArrowRight size={12} />
            <span>Open</span>
          </div>
        </ContextMenuItem>
        <ContextMenuItem>
          <div className="flex items-center space-x-2">
            <Trash size={12} />
            <span>Delete</span>
          </div>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default FileItem;
