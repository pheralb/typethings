import { useEffect, useRef, useState } from "react";
import { ExternalLink, cn, Button, buttonVariants } from "@typethings/ui";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Plus, Settings, Folders, ArrowUpRight, Inbox } from "lucide-react";
import { useAppStore } from "@/store/appStore";

import Search from "@/components/search";
import SidebarGroup from "@/components/sidebar/sidebarGroup";
import Explorer from "@/components/explorer";
import CreateFile from "@/components/file/createFile";
import ManageWorkspaces from "@/components/workspaces/manageWorkspaces";

import {
  SidebarIconAnimation,
  SidebarItemClasses,
  SidebarItemIconSize,
  SidebarLinkActiveClasses,
} from "./shared";

// Sidebar Config:
const [minWidth, maxWidth, defaultWidth] = [200, 300, 208];

const Sidebar = () => {
  const [width, setWidth] = useState<number>(defaultWidth);
  const isResized = useRef(false);
  const openDrawer = useAppStore((state) => state.openDrawer);
  const route = useLocation();

  console.log(route);

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
            <Link
              to="/"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                SidebarItemClasses,
                route.pathname === "/" ? SidebarLinkActiveClasses : "",
              )}
            >
              <div className="flex items-center space-x-3 transition">
                <Inbox
                  size={SidebarItemIconSize}
                  className={SidebarIconAnimation}
                />
                <span>Inbox</span>
              </div>
            </Link>
            <CreateFile
              trigger={
                <Button variant="ghost" className={SidebarItemClasses}>
                  <div className="flex items-center space-x-3 transition">
                    <Plus
                      size={SidebarItemIconSize}
                      className={SidebarIconAnimation}
                    />
                    <span>New</span>
                  </div>
                </Button>
              }
            />
            <ManageWorkspaces
              trigger={
                <Button variant="ghost" className={SidebarItemClasses}>
                  <div className="flex items-center space-x-3 transition">
                    <Folders
                      size={SidebarItemIconSize}
                      className={SidebarIconAnimation}
                    />
                    <span>Workspaces</span>
                  </div>
                </Button>
              }
            />
            <Search />
            <Link
              to="/settings"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                SidebarItemClasses,
                route.pathname === "/settings" ? SidebarLinkActiveClasses : "",
              )}
            >
              <div className="flex items-center space-x-3 transition">
                <Settings
                  size={SidebarItemIconSize}
                  className={SidebarIconAnimation}
                />
                <span>Settings</span>
              </div>
            </Link>
          </SidebarGroup>
          <SidebarGroup title="Workspaces">
            <Explorer />
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
