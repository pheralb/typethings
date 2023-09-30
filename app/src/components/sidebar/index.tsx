import { cn } from "@/utils";
import { Link, Outlet } from "react-router-dom";
import { Plus, Settings, Search, Folders, FilePlus2Icon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useWorkspaceStore } from "@/store/workspaceStore";

import CreateFile from "@/components/file/createFile";
import OpenFile from "@/components/file/openFile";
import FileList from "@/components/file/fileList";

import SidebarGroup from "@/components/sidebar/sidebarGroup";
import Folder from "@/components/folder";
import ManageWorkspaces from "@/components/workspaces/manageWorkspaces";
import { useEffect, useRef, useState } from "react";

// Global styles:
export const SidebarItemClasses = cn("w-full justify-start text-sm px-2");
export const SidebarItemIconSize = 16;

// Sidebar Config:
const [minWidth, maxWidth, defaultWidth] = [200, 300, 208];

const Sidebar = () => {
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const [width, setWidth] = useState<number>(defaultWidth);
  const isResized = useRef(false);

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
          "fixed left-0 top-0 h-full pb-10",
          "overflow-y-auto overflow-x-hidden",
          "bg-neutral-800/20",
          "border-r border-neutral-800",
        )}
        style={{ width: `${width / 16}rem` }}
      >
        <div className="w-full items-center px-4 py-5">
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
            <div className="flex flex-col space-y-1">
              {workspaces.map((workspace) => (
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
              ))}
            </div>
          </SidebarGroup>
        </div>
        <div
          className={cn(
            "absolute bottom-0 right-0 top-0",
            "w-1 hover:bg-neutral-800/50",
            "cursor-ew-resize",
          )}
          onMouseDown={() => {
            isResized.current = true;
          }}
        />
      </nav>
      <div style={{ marginLeft: `${width / 16}rem` }}>
        <Outlet />
      </div>
    </main>
  );
};

export default Sidebar;
