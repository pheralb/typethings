import { useState, useEffect } from "react";
import type { FileEntry } from "@tauri-apps/api/fs";

import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  cn,
} from "@typethings/ui";
import { SidebarItemClasses, SidebarItemIconSize } from "./sidebar";
import {
  ArrowLeft,
  Bug,
  File,
  Folder,
  Github,
  Link2Icon,
  Monitor,
  Moon,
  SearchIcon,
  Sun,
  Twitter,
} from "lucide-react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useTheme } from "@/providers/themeProvider";
import { openLink } from "@/utils/openLink";
import { readFilesFromFolder } from "@/functions/readFiles";

const Search = () => {
  const [open, setOpen] = useState(false);
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const { setTheme } = useTheme();
  const [pages, setPages] = useState<string[]>([]);
  const [files, setFiles] = useState<FileEntry[]>([]);
  const page = pages[pages.length - 1];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Shared styles:
  const sharedCommandItemStyles = cn("pl-1 flex items-center space-x-2");
  const iconSize = 15;

  // Read files from directory.
  // For search files in CommandGroup:
  const getFiles = async (path: string) => {
    const result = await readFilesFromFolder({
      path,
    });
    setFiles(result);
  };

  return (
    <>
      <Button
        variant="ghost"
        className={SidebarItemClasses}
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center space-x-3">
          <SearchIcon size={SidebarItemIconSize} />
          <span>Search</span>
        </div>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {!page && (
            <>
              <CommandGroup heading="Workspaces">
                {workspaces.map((file) => (
                  <CommandItem
                    key={file.folderName}
                    className={sharedCommandItemStyles}
                    onSelect={() => {
                      setPages([...pages, file.folderPath]);
                      getFiles(file.folderPath);
                    }}
                  >
                    <Folder size={iconSize} />
                    <span>{file.folderName}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandGroup heading="Theme">
                <CommandItem
                  className={sharedCommandItemStyles}
                  value="light theme"
                  onSelect={() => setTheme("light")}
                >
                  <Sun size={iconSize} />
                  <span>Light theme</span>
                </CommandItem>
                <CommandItem
                  className={sharedCommandItemStyles}
                  value="system theme"
                  onSelect={() => setTheme("system")}
                >
                  <Monitor size={iconSize} />
                  <span>System theme</span>
                </CommandItem>
                <CommandItem
                  className={sharedCommandItemStyles}
                  value="dark theme"
                  onSelect={() => setTheme("dark")}
                >
                  <Moon size={iconSize} />
                  <span>Dark theme</span>
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Social">
                <CommandItem
                  className={sharedCommandItemStyles}
                  value="website"
                  onSelect={() => openLink("https://typethings.vercel.app")}
                >
                  <Link2Icon size={iconSize} />
                  <span>Website</span>
                </CommandItem>
                <CommandItem
                  className={sharedCommandItemStyles}
                  value="github repo"
                  onSelect={() =>
                    openLink("https://github.com/pheralb/typethings")
                  }
                >
                  <Github size={iconSize} />
                  <span>Repository</span>
                </CommandItem>
                <CommandItem
                  className={sharedCommandItemStyles}
                  value="github bug"
                  onSelect={() =>
                    openLink("https://github.com/pheralb/typethings/issues/new")
                  }
                >
                  <Bug size={iconSize} />
                  <span>Report bug</span>
                </CommandItem>
                <CommandItem
                  className={sharedCommandItemStyles}
                  value="twitter/x"
                  onSelect={() => openLink("https://twitter.com/pheralb_")}
                >
                  <Twitter size={iconSize} />
                  <span>Twitter</span>
                </CommandItem>
              </CommandGroup>
            </>
          )}
          {page && (
            <>
              <CommandGroup>
                <CommandItem
                  className={sharedCommandItemStyles}
                  onSelect={() => setPages([])}
                >
                  <ArrowLeft size={iconSize} />
                  <span className="text-neutral-500 dark:text-neutral-400">
                    Back
                  </span>
                </CommandItem>
                {files.map((file) => (
                  <CommandItem
                    className={sharedCommandItemStyles}
                    onSelect={() => setPages([...pages, "file1"])}
                  >
                    <File size={iconSize} />
                    <span>{file.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Search;
