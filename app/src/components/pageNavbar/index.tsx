import type { ReactNode } from "react";
import { cn, buttonVariants, Button } from "@typethings/ui";
import { SidebarClose, SidebarOpen, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppStore } from "@/store/appStore";

interface PageNavbarProps {
  title: string;
  border?: boolean;
  children?: ReactNode;
}

const PageNavbar = (props: PageNavbarProps) => {
  const toggleDrawer = useAppStore((state) => state.toggleDrawer);
  const openDrawer = useAppStore((state) => state.openDrawer);
  return (
    <nav className="sticky top-0 z-50 flex w-full flex-col bg-neutral-100 dark:bg-neutral-900">
      <div
        className={cn(
          "flex w-full items-center justify-between py-1 pr-2",
          props.border
            ? "border-b border-neutral-300/50 pb-1 dark:border-neutral-800"
            : "",
        )}
      >
        <div className="flex items-center space-x-0">
          <Button
            variant="ghost"
            className={buttonVariants({
              variant: "ghost",
              className:
                "p-1 text-neutral-400 hover:bg-transparent dark:text-neutral-500 dark:hover:bg-transparent",
            })}
            size="icon"
            onClick={() => toggleDrawer()}
          >
            {openDrawer ? (
              <SidebarClose size={14} />
            ) : (
              <SidebarOpen size={14} />
            )}
          </Button>
          <p className="text-sm text-neutral-800 dark:text-neutral-300">
            {props.title}
          </p>
        </div>
        <Link
          to="/"
          className={buttonVariants({
            variant: "ghost",
            className: "rounded-full p-2",
            size: "icon",
          })}
        >
          <X size={16} />
        </Link>
      </div>
      <div>{props.children}</div>
    </nav>
  );
};

export default PageNavbar;
