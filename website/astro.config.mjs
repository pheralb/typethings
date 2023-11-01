import { defineConfig } from "astro/config";

// Integrations:
import react from "@astrojs/react";

// Adapter:
import deno from "@astrojs/deno";

// Config:
export default defineConfig({
  integrations: [react()],
  output: "server",
  adapter: deno(),
});
