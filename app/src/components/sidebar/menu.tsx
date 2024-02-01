import { useEffect, useRef, useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import { cn, Button, buttonVariants } from "@typethings/ui";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Plus, Folders, Inbox } from "lucide-react";
import { useAppStore } from "@/store/appStore";

import Search from "@/components/search";
import SidebarGroup from "@/components/sidebar/sidebarGroup";
import Explorer from "@/components/explorer";
import CreateFile from "@/components/file/createFile";
import ManageWorkspaces from "@/components/workspaces/manageWorkspaces";
import UserSettings from "@/components/settings/userSettings";

import {
  SidebarItemClasses,
  SidebarItemIconSize,
  SidebarLinkActiveClasses,
} from "./shared";

const Sidebar = () => {
  const isResized = useRef(false);
  const route = useLocation();

  return (
    <main className="min-h-screen">
      <nav
        className={cn(
          "fixed left-0 top-0 h-full",
          "flex flex-col px-4 pb-3 pt-5",
          "overflow-y-auto overflow-x-hidden",
          "bg-neutral-200/40 dark:bg-neutral-800/20",
          "border-r border-neutral-300/50 dark:border-neutral-800",
        )}
      >
        <div className="flex w-full flex-1 flex-col">
          <SidebarGroup border={true}>
            <Link
              to="/"
              onClick={() => {
                appWindow.setTitle(`Inbox - Typethings`);
              }}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                SidebarItemClasses,
                route.pathname === "/" ? SidebarLinkActiveClasses : "",
              )}
            >
              <div className="flex items-center space-x-3 transition">
                <Inbox size={SidebarItemIconSize} />
                <span>Inbox</span>
              </div>
            </Link>
            <CreateFile
              trigger={
                <Button variant="ghost" className={SidebarItemClasses}>
                  <div className="flex items-center space-x-3 transition">
                    <Plus size={SidebarItemIconSize} />
                    <span>New</span>
                  </div>
                </Button>
              }
            />
            <ManageWorkspaces
              trigger={
                <Button variant="ghost" className={SidebarItemClasses}>
                  <div className="flex items-center space-x-3 transition">
                    <Folders size={SidebarItemIconSize} />
                    <span>Workspaces</span>
                  </div>
                </Button>
              }
            />
            <Search />
          </SidebarGroup>
          <SidebarGroup title="Workspaces">
            <Explorer />
          </SidebarGroup>
        </div>
        <div className="flex flex-col space-y-2">
          <UserSettings />
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
      <div>
        <Outlet />
      </div>
    </main>
  );
};

export default Sidebar;
