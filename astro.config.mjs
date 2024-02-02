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
  output: "hybrid",

  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
  integrations: [
    tailwind(),
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      components: {
        projectDetails: "components/storyblok/ProjectDetails",
        portfolioGrid: "components/storyblok/PortfolioGrid",
        page: "components/storyblok/Page",
      },
    }),
    react(),
  ],
  prefetch: true,
  adapter: netlify(),
});
