"use client";

import React from "react";
import { Twitter, Github } from "lucide-react";
import { ExternalLink } from "@typethings/ui";

const Socials = () => {
  const iconSize = 22;
  const links = [
    {
      name: "Twitter",
      url: "https://twitter.com/pheralb_",
      icon: Twitter,
    },
    {
      name: "Github",
      url: "https://github.com/pheralb/typethings",
      icon: Github,
    },
  ];
  return (
    <div className="flex items-center space-x-5">
      {links.map((link) => (
        <ExternalLink
          key={link.name}
          href={link.url}
          rel="noopener noreferrer"
          className="text-neutral-300 transition-colors duration-100 hover:text-white"
        >
          <link.icon size={iconSize} />
        </ExternalLink>
      ))}
    </div>
  );
};

export default Socials;
