import sharedConfig from "@typethings/tailwind-config/tailwind.config";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [
    {
      ...sharedConfig,
      content: [
        "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
        "../packages/ui/src/**/*{.js,.ts,.jsx,.tsx}",
      ],
    },
  ],
};
