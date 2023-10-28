import { useTheme } from "@/providers/themeProvider";
import { Toaster } from "sonner";

const Providers = () => {
  const { theme } = useTheme();
  return (
    <>
      <Toaster
        theme={theme === "dark" ? "dark" : "light"}
        toastOptions={{
          style: {
            background: `${theme === "dark" ? "#171717" : "#fff"}`,
            border: `1px solid ${theme === "dark" ? "#262626" : "#e5e5e5"}`,
          },
          className: "bg-neutral-800 text-neutral-200 font-sans border-none",
          descriptionClassName: "text-neutral-400",
        }}
      />
    </>
  );
};

export default Providers;
