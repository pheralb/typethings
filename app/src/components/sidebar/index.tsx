import { Link, Outlet } from "react-router-dom";
import { Plus, Settings, FolderOpen, Search } from "lucide-react";
import { cn } from "@/utils";

import CreateFile from "@/components/file/createFile";
import { Button, buttonVariants } from "@/components/ui/button";
import SidebarGroup from "./sidebarGroup";
import FileList from "../file/fileList";
import OpenFile from "../file/openFile";

// Global styles:
export const SidebarItemClasses = cn("w-full justify-start text-sm px-2");
export const SidebarItemIconSize = 16;

const SidebarContent = () => {
  return (
    <nav
      className={cn(
        "fixed left-0 top-0 h-full",
        "w-56 pb-10",
        "overflow-y-auto overflow-x-hidden",
        "bg-neutral-800/20",
        "border-r border-neutral-800",
      )}
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
                  <FolderOpen size={SidebarItemIconSize} />
                  <span>Open file</span>
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
          <FileList />
        </SidebarGroup>
      </div>
    </nav>
  );
};

const Sidebar = () => {
  return (
    <main className="min-h-screen">
      <SidebarContent />
      <div className="ml-56">
        <Outlet />
      </div>
    </main>
  );
};

export default Sidebar;
