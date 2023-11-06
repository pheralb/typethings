"use client";

import * as React from "react";
import { cn } from "..";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "dark:border-neutral-800 border-neutral-300 placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-sm border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium dark:focus-visible:border-neutral-700 focus-visible:border-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        autoComplete="off"
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
