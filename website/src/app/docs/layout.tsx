"use client";

import React from "react";
import Container from "@/components/container";
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Input,
  ProseClasses,
  cn,
} from "@typethings/ui";
import {
  ArrowDown,
  Book,
  ChevronDown,
  ChevronUp,
  Package,
  Rocket,
  Search,
} from "lucide-react";
import { allEditorPages, allPages } from "contentlayer/generated";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface iLayoutProps {
  children: React.ReactNode;
}

const Layout = (props: iLayoutProps) => {
  const path = usePathname();

  const groups = [
    {
      icon: <Rocket size={16} className="text-indigo-600 dark:text-indigo-300" />,
      groupName: "App",
      pages: allPages,
    },
    {
      icon: <Package size={16} className="text-rose-600 dark:text-rose-300" />,
      groupName: "typethings/editor",
      pages: allEditorPages,
    },
  ];

  return (
    <>
      <div className="sticky top-0 z-50 flex w-full flex-col border-b border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900">
        <Container>
          <div className="mx-auto mt-2 flex w-full flex-wrap items-center justify-between py-3">
            <div className="flex items-center space-x-2">
              <span className="self-center whitespace-nowrap font-normal tracking-tight dark:text-neutral-300">
                Documentation
              </span>
            </div>
            <div className="relative w-64">
              <Input placeholder="Search..." className="pl-9" />
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 transform"
              />
            </div>
          </div>
        </Container>
      </div>
      <Container className="w-full">
        {/* Create a grid, the left zone fixed with 300px and second full screen. */}
        <aside className="fixed h-full w-60 overflow-y-auto overflow-x-hidden pb-10">
          <div className="flex flex-col pt-8">
            {groups.map((group) => (
              <Collapsible key={group.groupName} defaultOpen={true}>
                <CollapsibleTrigger asChild className="mb-1">
                  <Button
                    variant="outline"
                    className="text-md flex h-10 w-full justify-between text-start shadow-none rounded-md border-dashed"
                  >
                    <div className="flex items-center space-x-3">
                      {group.icon}
                      <span>{group.groupName}</span>
                    </div>
                    <ChevronDown size={16} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-5">
                  <div className="mb-1 flex flex-col space-y-3 py-5">
                    {group.pages
                      .sort((a, b) => a.order - b.order)
                      .map((page) => (
                        <div key={page.slugAsParams}>
                          <Link
                            href={`/docs/${page.slugAsParams}`}
                            className={cn(
                              "block text-neutral-500 dark:text-neutral-400 transition-colors duration-100 hover:text-neutral-900 dark:hover:text-white",
                              path === `/docs/${page.slugAsParams}` &&
                                "text-neutral-900 dark:text-white font-medium",
                            )}
                          >
                            {page.title}
                          </Link>
                        </div>
                      ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </aside>
        <main className="ml-60 w-full">
          <article className={cn("container max-w-5xl flex flex-col px-4 py-8")}>
            {props.children}
          </article>
        </main>
      </Container>
    </>
  );
};

export default Layout;
