"use client";

import type { ReactNode } from "react";
import { cn } from "..";
import { ArrowUpRight } from "lucide-react";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  className?: string;
  underline?: boolean;
  showIcon?: boolean;
}

export const ExternalLink = (props: LinkProps) => {
  return (
    <a
      href={props.href}
      rel="noreferrer"
      target="_blank"
      className={cn(
        props.underline && "underline underline-offset-4",
        props.className,
      )}
      {...props}
    >
      {props.children}
      {props.showIcon && <ArrowUpRight size={15} className="ml-1" />}
    </a>
  );
};
