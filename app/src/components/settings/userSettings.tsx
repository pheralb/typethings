import { buttonVariants, cn } from "@typethings/ui";
import { useUserStore } from "@/store/userStore";
import { Settings } from "lucide-react";
import {
  SidebarItemClasses,
  SidebarItemIconSize,
  SidebarLinkActiveClasses,
} from "../sidebar/shared";
import { Link, useLocation } from "react-router-dom";
import { appWindow } from "@tauri-apps/api/window";
import Avatar from "boring-avatars";

const UserSettings = () => {
  const user = useUserStore((state) => state.user);
  const route = useLocation();
  return (
    <Link
      to="/settings"
      onClick={() => {
        appWindow.setTitle(`Inbox - Typethings`);
      }}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        SidebarItemClasses,
        route.pathname === "/settings" ? SidebarLinkActiveClasses : "",
      )}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-3 overflow-hidden transition">
          <Avatar size={SidebarItemIconSize} name={user} />
          <span className="truncate hover:text-clip">{user}</span>
        </div>
        <Settings
          size={SidebarItemIconSize}
          className="dark:text-neutral-500"
        />
      </div>
    </Link>
  );
};

export default UserSettings;
