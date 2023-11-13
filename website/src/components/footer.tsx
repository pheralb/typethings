import React from "react";
import { Bug, Heart } from "lucide-react";
import Container from "./container";
import { ExternalLink } from "@typethings/ui";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 flex w-full items-center border-t border-neutral-200 bg-neutral-100 py-3 dark:border-neutral-800 dark:bg-neutral-900">
      <Container>
        <div className="flex w-full items-center justify-between">
          <ExternalLink
            href="https://github.com/pheralb/typethings/issues/new"
            className="flex items-center text-gray-500 hover:text-neutral-900 dark:text-white"
            showIcon={true}
          >
            <div className="flex items-center space-x-1 text-sm tracking-wide">
              <Bug size={16} className="mr-1 text-indigo-500" />
              <p>Open Issue</p>
            </div>
          </ExternalLink>
          <ExternalLink
            href="https://github.com/pheralb"
            className="flex items-center text-gray-500 hover:text-neutral-900 dark:text-white"
            showIcon={true}
          >
            <div className="flex items-center space-x-1 text-sm tracking-wide">
              <Heart size={16} className="mr-1 text-red-500" />
              <p>Built by pheralb</p>
            </div>
          </ExternalLink>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
