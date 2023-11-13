"use client";

import type { ReactNode } from "react";
import Container from "@/components/container";
import { Input, cn } from "@typethings/ui";
import { Rocket, Search } from "lucide-react";
import { allPages } from "contentlayer/generated";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface iLayoutProps {
  children: React.ReactNode;
}

const Layout = (props: iLayoutProps) => {
  const path = usePathname();

  const groups = [
    {
      icon: (
        <Rocket size={16} className="text-indigo-600 dark:text-indigo-300" />
      ),
      groupName: "App",
      pages: allPages,
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
          </div>
        </Container>
      </div>
      <Container className="w-full">
        {/* Create a grid, the left zone fixed with 300px and second full screen. */}
        <aside className="fixed h-full w-60 overflow-y-auto overflow-x-hidden pb-10">
          <div className="flex flex-col pt-6">
            <div className="relative mb-3 w-full">
              <Input placeholder="Search..." className="pl-9 shadow-none" />
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 transform"
              />
            </div>
            {groups.map((group) => (
              <div
                className="mt-2 flex flex-col space-y-3 pl-3"
                key={group.groupName}
              >
                {group.pages
                  .sort((a, b) => a.order - b.order)
                  .map((page) => (
                    <div key={page.slugAsParams}>
                      <Link
                        href={`/docs/${page.slugAsParams}`}
                        className={cn(
                          "block text-neutral-500 transition-colors duration-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white",
                          path === `/docs/${page.slugAsParams}` &&
                            "font-medium text-neutral-900 dark:text-white",
                        )}
                      >
                        {page.title}
                      </Link>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </aside>
        <main className="ml-60 w-full">
          <article
            className={cn("container flex max-w-5xl flex-col px-4 py-8")}
          >
            {props.children}
          </article>
        </main>
      </Container>
    </>
  );
};

export default Layout;
