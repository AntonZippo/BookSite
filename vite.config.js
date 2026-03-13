import { defineConfig } from "vite";
import { readFileSync, writeFileSync, unlinkSync, existsSync } from "fs";
import { join } from "path";

function inlineStyles() {
  return {
    name: "inline-styles",
    closeBundle() {
      const outDir = join(process.cwd(), "dist");
      const htmlPath = join(outDir, "index.html");
      if (!existsSync(htmlPath)) return;

      let html = readFileSync(htmlPath, "utf-8");
      const linkMatch = html.match(
        /<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["'][^>]*>/
      );
      if (!linkMatch) return;

      const [, href] = linkMatch;
      const cssPath = join(outDir, href.replace(/^\//, ""));
      if (!existsSync(cssPath)) return;

      const css = readFileSync(cssPath, "utf-8");
      html = html.replace(linkMatch[0], `<style>${css}</style>`);
      writeFileSync(htmlPath, html);
      unlinkSync(cssPath);
    },
  };
}

export default defineConfig({
  root: ".",
  publicDir: "assets",
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    rollupOptions: {
      input: "index.html",
      output: {
        entryFileNames: "[name]-[hash].js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: (assetInfo) =>
          /\.svg$/.test(assetInfo.name ?? "")
            ? "assets/[name][extname]"
            : "[name]-[hash][extname]",
      },
    },
    minify: true,
  },
  plugins: [inlineStyles()],
});
