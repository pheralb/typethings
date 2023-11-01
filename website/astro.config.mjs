import { defineConfig } from "astro/config";

// Integrations:
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// Adapter:
import deno from "@astrojs/deno";

// Config:
export default defineConfig({
  integrations: [react(), tailwind({ applyBaseStyles: false })],
  output: "server",
  adapter: deno(),
});
