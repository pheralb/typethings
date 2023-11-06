import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["src/**/*.tsx", "src/**/*.ts"],
  format: ["esm"],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    };
  },
  dts: true,
  minify: true,
  clean: true,
  external: ["react"],
  ...options,
}));
