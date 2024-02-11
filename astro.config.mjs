import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import storyblok from "@storyblok/astro";
import netlify from "@astrojs/netlify";

import { loadEnv } from "vite";
const env = loadEnv("", process.cwd(), "STORYBLOK");
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://astro.build/config
export default defineConfig({
  output: env.STORYBLOK_IS_PREVIEW === "yes" ? "server" : "static",

  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
  integrations: [
    tailwind(),
    storyblok({
      accessToken:
        env.STORYBLOK_IS_PREVIEW === "yes"
          ? env.STORYBLOK_PREVIEW_TOKEN
          : env.STORYBLOK_PUBLIC_TOKEN,
      components: {
        projectDetails: "components/storyblok/ProjectDetails",
        portfolioGrid: "components/storyblok/PortfolioGrid",
        page: "components/storyblok/Page",
      },
      bridge: env.STORYBLOK_IS_PREVIEW === "yes" ? true : false,
    }),
    react(),
  ],
  prefetch: true,
  adapter: netlify(),
});
