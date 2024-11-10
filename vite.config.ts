import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Pages from "vite-plugin-pages";
import Sitemap from "vite-plugin-sitemap";
import generateSitemap from "vite-plugin-pages-sitemap";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Pages({
      onRoutesGenerated: (routes) => generateSitemap({ routes }),
    }),
    Sitemap({
      hostname: "https://www.kvmcmart.in/",
      dynamicRoutes: [
        "/shop",
        "/blog",
        "contact",
        "/cart",
        "/login",
        "/wishlist",
      ],
    }),
  ],
});
