import { Button } from "../ui/button";
import { cn } from "@/utils";
import { useFilesStore } from "@/store/filesStore";
import { desktopDir } from "@tauri-apps/api/path";

// From Sidebar (shared classes & icon size):
import { SidebarItemClasses } from "../sidebar";
import { readFile } from "@/functions/readFiles";

interface iFileItemProps {
  filename: string;
  extension: string;
  active?: boolean;
}

const FileItem = (props: iFileItemProps) => {
  const selectFile = useFilesStore((state) => state.setSelectedFile);
  const selectedFile = useFilesStore((state) => state.selectedFile);

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
      )}
      onClick={handleOpenFile}
    >
      <div className="flex items-center justify-between overflow-hidden">
        <span className="truncate">{props.filename}</span>
        <span>.{props.extension}</span>
      </div>
    </Button>
  );
};

export default FileItem;
