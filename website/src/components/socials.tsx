"use client";

import React from "react";
import { Twitter, Github } from "lucide-react";
import { ExternalLink, buttonVariants } from "@typethings/ui";

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
  return links.map((link) => (
    <ExternalLink
      key={link.name}
      href={link.url}
      title={link.name}
      rel="noopener noreferrer"
      className={buttonVariants({
        variant: "ghost",
        size: "icon",
      })}
    >
      <link.icon size={iconSize} />
    </ExternalLink>
  ));
};

export default Socials;
