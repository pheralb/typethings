import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const ChangeTheme = () => {
  const [theme, setTheme] = useState<string>(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    } else {
      return "light";
    }
  });

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      if (theme === "light") {
        htmlElement.classList.remove("dark");
      } else {
        htmlElement.classList.add("dark");
      }
    }
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return <Button onClick={handleChangeTheme}>Change Theme</Button>;
};

export default ChangeTheme;
