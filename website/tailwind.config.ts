import sharedConfig from "@typethings/tailwind-config/tailwind.config";
import type { Config } from "tailwindcss";

const config: Pick<Config, "presets"> = {
  presets: [
    {
      ...sharedConfig,
      content: [
        "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue",
        "../packages/ui/src/**/*{.js,.ts,.jsx,.tsx}",
      ],
    },
  ],
};

export default config;