import { Button } from "../ui/button";
import { cn } from "@/utils";

// From Sidebar (shared classes & icon size):
import { SidebarItemClasses } from "../sidebar";

interface iFileItemProps {
  filename: string;
  extension: string;
  active?: boolean;
}

const FileItem = (props: iFileItemProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(SidebarItemClasses, "cursor-default transition-none")}
    >
      <div className="flex items-center overflow-hidden font-mono">
        <span className="truncate">{props.filename}</span>
        <span className="text-gray-500">.{props.extension}</span>
      </div>
    </Button>
  );
};

export default FileItem;
