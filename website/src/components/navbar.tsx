import React from "react";
import Socials from "./socials";
import TypethingsIcon from "./icons/typethings";
import Link from "next/link";
import { buttonVariants } from "@typethings/ui";
import Container from "./container";
import { Global } from "@/global/data";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <nav className="sticky top-0 flex w-full">
      <Container>
        <div className="mx-auto flex w-full flex-wrap items-center justify-between pt-5">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-3">
              <TypethingsIcon className="h-8" />
              <span className="self-center whitespace-nowrap text-lg font-medium tracking-tight text-neutral-900 dark:text-white">
                Typethings
              </span>
            </Link>
            <Link
              href="/docs"
              className="ml-10 text-sm text-gray-400 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Docs
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Socials />
              <ModeToggle />
            </div>
            <Link
              href={Global.activateDownload ? "/download" : "#"}
              className={buttonVariants({
                variant: "default",
                className: `ml-4 ${
                  Global.activateDownload
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-50"
                }`,
              })}
            >
              Download
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
