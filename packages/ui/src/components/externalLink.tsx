"use client";

import type { ReactNode } from "react";
import { cn } from "..";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  className?: string;
  underline?: boolean;
}

export const ExternalLink = (props: LinkProps) => {
  return (
    <a
      href={props.href}
      rel="noreferrer"
      target="_blank"
      className={cn(props.underline && "underline", props.className)}
      {...props}
    >
      {props.children}
    </a>
  );
};
