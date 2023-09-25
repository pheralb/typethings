import type { ReactNode } from "react";
import { cn } from "@/utils";
import { buttonVariants } from "../ui/button";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

interface PageNavbarProps {
  title: string;
  border?: boolean;
  children?: ReactNode;
}

const PageNavbar = (props: PageNavbarProps) => {
  return (
    <nav className="sticky top-0 flex flex-col w-full bg-neutral-900 z-50">
      <div
        className={cn(
          "flex w-full items-center justify-between px-4 pt-1",
          props.border ? "border-b border-neutral-800" : "",
        )}
      >
        <p className="text-sm text-neutral-300">{props.title}</p>
        <Link
          to="/"
          className={buttonVariants({
            variant: "ghost",
            className: "p-2 rounded-full",
            size: "icon"
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
