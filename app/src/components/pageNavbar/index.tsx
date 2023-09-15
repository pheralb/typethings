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
    <>
      <nav
        className={cn(
          "flex w-full items-center justify-between px-4 pt-2 sticky top-0",
          props.border ? "border-b border-neutral-800" : "",
        )}
      >
        <p className="text-sm text-neutral-300">{props.title}</p>
        <Link
          to="/"
          className={buttonVariants({
            variant: "ghost",
            className: "p-2",
          })}
        >
          <X size={16} />
        </Link>
      </nav>
      {props.children}
    </>
  );
};

export default PageNavbar;
