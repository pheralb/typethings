import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  SidebarItemClasses,
  SidebarItemIconSize,
} from "@/components/sidebar/shared";
import {
  ArrowLeft,
  Bug,
  File,
  Folder,
  Github,
  Inbox,
  Link2Icon,
  Monitor,
  Moon,
  SearchIcon,
  Settings,
  Sun,
  Twitter,
} from "lucide-react";
import {
  readFile,
  getFolderName,
  getFileNameWithoutExtension,
} from "@typethings/functions";

import { useWorkspaceStore } from "@/store/workspaceStore";
import { useTheme } from "@/providers/themeProvider";
import { openLink } from "@/utils/openLink";
import { appWindow } from "@tauri-apps/api/window";
import { join } from "@tauri-apps/api/path";

const Search = () => {
  const [open, setOpen] = useState<boolean>(false);
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const selectFile = useWorkspaceStore((state) => state.setSelectedFile);
  const { setTheme } = useTheme();
  const router = useNavigate();
  const [folders, setfolders] = useState<string[]>([]);
  const [files, setFiles] = useState<FileEntry[]>([]);
  const folder = folders[folders.length - 1];

  console.log(workspaces);

  // Press CMD+K to open search:
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

  // Open Files:
  const handleOpenFile = async (filename: string) => {
    try {
      setOpen(false);
      const filepath = await join(folder, `${filename}`);
      const file = await readFile({
        path: filepath,
      });
      selectFile({
        path: filepath,
        content: file,
      });
      router("/editor");
      appWindow.setTitle(
        `${getFileNameWithoutExtension(filepath)} - Typethings`,
      );
    } catch (error) {
      console.error(error);
    }
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
        <CommandInput placeholder={folder ? `Search files...` : "Search"} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {!folder && (
            <>
              <CommandGroup heading="Workspaces">
                {workspaces.map((w) => (
                  <CommandItem
                    key={w.folderName}
                    className={sharedCommandItemStyles}
                    onSelect={() => {
                      setfolders([...folders, w.folderPath]);
                      setFiles(w.files);
                    }}
                  >
                    <Folder size={iconSize} />
                    <span>{w.folderName}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandGroup heading="Theme">
                <CommandItem
                  className={sharedCommandItemStyles}
                  value="light theme"
                  onSelect={() => {
                    setOpen(false);
                    setTheme("light");
                  }}
                >
                  <Sun size={iconSize} />
                  <span>Light theme</span>
                </CommandItem>
                <CommandItem
                  className={sharedCommandItemStyles}
                  value="system theme"
                  onSelect={() => {
                    setOpen(false);
                    setTheme("system");
                  }}
                >
                  <Monitor size={iconSize} />
                  <span>System theme</span>
                </CommandItem>
                <CommandItem
                  className={sharedCommandItemStyles}
                  value="dark theme"
                  onSelect={() => {
                    setOpen(false);
                    setTheme("dark");
                  }}
                >
                  <Moon size={iconSize} />
                  <span>Dark theme</span>
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Menu">
                <CommandItem
                  className={sharedCommandItemStyles}
                  value="Inbox Page"
                  onSelect={() => {
                    setOpen(false);
                    appWindow.setTitle(`Inbox - Typethings`);
                    router("/");
                  }}
                >
                  <Inbox size={iconSize} />
                  <span>Inbox</span>
                </CommandItem>
                <CommandItem
                  className={sharedCommandItemStyles}
                  value="Settings Page"
                  onSelect={() => {
                    setOpen(false);
                    appWindow.setTitle(`Settings - Typethings`);
                    router("/settings");
                  }}
                >
                  <Settings size={iconSize} />
                  <span>Settings</span>
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
          {folder && (
            <>
              <CommandGroup heading={getFolderName(folder)}>
                <CommandItem
                  className={sharedCommandItemStyles}
                  onSelect={() => setfolders([])}
                >
                  <ArrowLeft size={iconSize} />
                  <span className="text-neutral-500 dark:text-neutral-400">
                    Back
                  </span>
                </CommandItem>
                {files ? (
                  files.map((file) => (
                    <CommandItem
                      key={file.name}
                      className={sharedCommandItemStyles}
                      onSelect={() => handleOpenFile(file.name!)}
                    >
                      <File size={iconSize} />
                      <span>{file.name}</span>
                    </CommandItem>
                  ))
                ) : (
                  <CommandEmpty>No results found.</CommandEmpty>
                )}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Search;
