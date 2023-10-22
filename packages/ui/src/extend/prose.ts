import { cn } from "..";

export const ProseClasses = cn(
  // Global Prose:
  "prose prose-quoteless prose-neutral dark:prose-invert",
  // Prose Code Block:
  "prose-pre:rounded-md prose-pre:overflow-x-auto prose-pre:overflow-y-hidden prose-pre:dark:bg-neutral-800/50 prose-pre:bg-neutral-200/50 prose-pre:font-mono prose-pre:text-neutral-900 prose-pre:dark:text-white prose-pre:border prose-pre:border-neutral-300 prose-pre:dark:border-neutral-800",
  // Prose Inline Code:
  "prose-code:font-mono",
  // Prose Text:
  "prose-a:cursor-pointer prose-a:underline-offset-4",
  "prose-p:leading-7 prose-p:[&:not(:first-child)]:mt-6",
  "prose-h1:text-4xl prose-h1:font-extrabold prose-h1:tracking-tight prose-h1:lg:text-5xl prose-h1:first:mt-8",
  "prose-h2:scroll-m-20 prose-h2:border-b prose-h2:dark:border-neutral-800 prose-h2:py-4 prose-h2:text-3xl prose-h2:font-medium prose-h2:tracking-tight prose-h2:first:mt-3",
  "prose-h3:scroll-m-20 prose-h3:text-2xl prose-h3:font-semibold prose-h3:tracking-tight",
  "prose-h4:scroll-m-20 prose-h4:text-xl prose-h4:font-semibold prose-h4:tracking-tight",
);
