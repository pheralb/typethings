import { Check, Monitor, Moon, Paintbrush, Sun } from "lucide-react";
import SettingsGroup from "./settingsGroup";
import { useTheme } from "@/providers/themeProvider";
import { Button } from "@typethings/ui";

const Appearance = () => {
  const { theme, setTheme } = useTheme();
  const iconSize = 24;

  const themes = [
    {
      theme: "light",
      icon: <Sun size={iconSize} />,
      action: () => setTheme("light"),
    },
    {
      theme: "dark",
      icon: <Moon size={iconSize} />,
      action: () => setTheme("dark"),
    },
    {
      theme: "system",
      icon: <Monitor size={iconSize} />,
      action: () => setTheme("system"),
    },
  ];

  return (
    <>
      <SettingsGroup title="Theme" icon={<Paintbrush size={14} />}>
        <div className="flex w-full items-center space-x-2">
          {themes.map((th) => (
            <Button
              key={th.theme}
              onClick={th.action}
              variant="outline"
              value={th.theme}
              className="relative flex h-20 w-full flex-col space-y-2"
            >
              <span>{th.icon}</span>
              <span>
                {th.theme.charAt(0).toUpperCase() + th.theme.slice(1)}
              </span>
              {theme === th.theme && (
                <Check size={16} className="absolute right-0 top-0 m-2" />
              )}
            </Button>
          ))}
        </div>
      </SettingsGroup>
    </>
  );
};

export default Appearance;
