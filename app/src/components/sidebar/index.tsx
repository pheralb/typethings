import { ExternalLink, cn } from "@typethings/ui";
import { Link, Outlet } from "react-router-dom";
import {
  Plus,
  Settings,
  Search,
  Folders,
  FilePlus2Icon,
  ArrowUpRight,
} from "lucide-react";
import { Button, buttonVariants } from "@typethings/ui";
import { useWorkspaceStore } from "@/store/workspaceStore";

import CreateFile from "@/components/file/createFile";
import OpenFile from "@/components/file/openFile";
import FileList from "@/components/file/fileList";

import SidebarGroup from "@/components/sidebar/sidebarGroup";
import Folder from "@/components/folder";
import ManageWorkspaces from "@/components/workspaces/manageWorkspaces";
import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store/appStore";

// Global styles:
export const SidebarItemClasses = cn("w-full justify-start text-sm px-2");
export const SidebarItemIconSize = 16;

// Sidebar Config:
const [minWidth, maxWidth, defaultWidth] = [200, 300, 208];

const Sidebar = () => {
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const [width, setWidth] = useState<number>(defaultWidth);
  const isResized = useRef(false);
  const openDrawer = useAppStore((state) => state.openDrawer);

  // Resize sidebar:
  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      if (!isResized.current) {
        return;
      }
      setWidth((previousWidth) => {
        const newWidth = previousWidth + e.movementX / 2;
        const isWidthInRange = newWidth >= minWidth && newWidth <= maxWidth;
        return isWidthInRange ? newWidth : previousWidth;
      });
    });

    window.addEventListener("mouseup", () => {
      isResized.current = false;
    });
  }, []);

  return (
    <main className="min-h-screen">
      <nav
        className={cn(
          "fixed left-0 top-0 h-full",
          "flex flex-col px-4 pb-3 pt-5",
          "overflow-y-auto overflow-x-hidden",
          "bg-neutral-200/40 dark:bg-neutral-800/20",
          "border-r border-neutral-300/50 dark:border-neutral-800",
          openDrawer ? "" : "hidden",
        )}
        style={openDrawer ? { width: `${width / 16}rem` } : { width: "0px" }}
      >
        <div className="flex w-full flex-1 flex-col">
          <SidebarGroup border={true}>
            <CreateFile
              trigger={
                <Button variant="ghost" className={SidebarItemClasses}>
                  <div className="flex items-center space-x-3">
                    <Plus size={SidebarItemIconSize} />
                    <span>New file</span>
                  </div>
                </Button>
              }
            />
            <OpenFile
              trigger={
                <Button variant="ghost" className={SidebarItemClasses}>
                  <div className="flex items-center space-x-3">
                    <FilePlus2Icon size={SidebarItemIconSize} />
                    <span>Open file</span>
                  </div>
                </Button>
              }
            />
            <ManageWorkspaces
              trigger={
                <Button variant="ghost" className={SidebarItemClasses}>
                  <div className="flex items-center space-x-3">
                    <Folders size={SidebarItemIconSize} />
                    <span>Workspaces</span>
                  </div>
                </Button>
              }
            />
            <Link
              to="/test"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                SidebarItemClasses,
              )}
            >
              <div className="flex items-center space-x-3">
                <Search size={SidebarItemIconSize} />
                <span>Search</span>
              </div>
            </Link>
            <Link
              to="/settings"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                SidebarItemClasses,
              )}
            >
              <div className="flex items-center space-x-3">
                <Settings size={SidebarItemIconSize} />
                <span>Settings</span>
              </div>
            </Link>
          </SidebarGroup>
          <SidebarGroup title="Workspaces">
            <div className="flex flex-col">
              {workspaces.length > 0 ? (
                workspaces.sort().map((workspace) => (
                  <Folder
                    key={workspace.folderPath}
                    name={workspace.folderName}
                    path={workspace.folderPath}
                  >
                    <FileList
                      directory={workspace.folderPath}
                      folder={workspace.folderName}
                    />
                  </Folder>
                ))
              ) : (
                <div className="flex flex-col justify-center space-y-2 rounded-md border border-dashed border-neutral-300 p-3 text-center text-xs text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
                  <p>Add a workspace to get started.</p>
                  <ManageWorkspaces
                    trigger={
                      <Button
                        variant="link"
                        className="flex w-full items-center space-x-2 text-xs h-0"
                      >
                        <span>Get started</span>
                      </Button>
                    }
                  />
                </div>
              )}
            </div>
          </SidebarGroup>
        </div>
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span className="cursor-default font-mono">v0.1.0</span>
          <ExternalLink
            href="https://github.com/pheralb/typethings"
            className="flex items-center space-x-1 transition-colors hover:text-neutral-700 dark:hover:text-neutral-300"
          >
            <span>GitHub</span>
            <ArrowUpRight size={12} />
          </ExternalLink>
        </div>
        <div
          className={cn(
            "absolute bottom-0 right-0 top-0",
            "w-1 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800/50",
            "cursor-ew-resize",
          )}
          onMouseDown={() => {
            isResized.current = true;
          }}
        />
      </nav>
      <div
        style={
          openDrawer
            ? { marginLeft: `${width / 16}rem` }
            : { marginLeft: "0px" }
        }
      >
        <Outlet />
      </div>
    </main>
  );
};

export default Sidebar;
