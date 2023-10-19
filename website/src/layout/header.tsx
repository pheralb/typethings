import React from "react";
import Link from "next/link";
import { GithubIcon, TwitterIcon } from "lucide-react";
import { ExternalLink, buttonVariants, cn } from "@typethings/ui";

import TypethingsIcon from "@/components/icon";
import { ModeToggle } from "@/components/themeToggle";
import Container from "@/components/container";

export const headerIconSize = 20;
export const headerIconClassname = cn("");
export const headerLinkClassname = cn(
  "text-neutral-900 dark:text-neutral-400 tracking-wide transition-colors dark:hover:text-white text-sm",
);

const headerLinks = [
  {
    title: "Download",
    href: "/download",
  },
  {
    title: "Docs",
    href: "/docs",
  },
];

const Header = () => {
  return (
    <nav className={cn("flex w-full items-center pb-4 pt-5")}>
      <Container>
        <div className="flex w-full items-center justify-between">
          <Link href="/" className="group">
            <div className="flex items-center space-x-3 transition">
              <TypethingsIcon
                height={29}
                className="transition-transform duration-500 group-hover:-translate-y-0.5 animate-in fade-in-50"
              />
              <span className="text-xl font-medium tracking-tighter dark:text-neutral-200">
                Typethings
              </span>
            </div>
          </Link>
          <div className="grid grid-cols-2 gap-5 divide-x">
            <div className="flex items-center space-x-6">
              {headerLinks.map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  className={headerLinkClassname}
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-1 pl-3">
              <ExternalLink
                href="https://github.com/pheralb/typethings"
                title="Github"
                className={buttonVariants({
                  variant: "ghost",
                  className: headerIconClassname,
                  size: "icon",
                })}
              >
                <GithubIcon size={headerIconSize} />
              </ExternalLink>
              <ExternalLink
                href="https://twitter.com/pheralb_"
                title="Twitter"
                className={buttonVariants({
                  variant: "ghost",
                  className: headerIconClassname,
                  size: "icon",
                })}
              >
                <TwitterIcon size={headerIconSize} />
              </ExternalLink>
              <ModeToggle />
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Header;
