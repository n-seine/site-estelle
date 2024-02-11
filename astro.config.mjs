import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import storyblok from "@storyblok/astro";
import netlify from "@astrojs/netlify";

import basicSsl from "@vitejs/plugin-basic-ssl";
const { STORYBLOK_IS_PREVIEW } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  ""
);
const { STORYBLOK_PREVIEW_TOKEN } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  ""
);
const { STORYBLOK_PUBLIC_TOKEN } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  ""
);
// https://astro.build/config
export default defineConfig({
  output: STORYBLOK_IS_PREVIEW === "yes" ? "server" : "static",

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
        STORYBLOK_IS_PREVIEW === "yes"
          ? STORYBLOK_PREVIEW_TOKEN
          : STORYBLOK_PUBLIC_TOKEN,
      components: {
        projectDetails: "components/storyblok/ProjectDetails",
        portfolioGrid: "components/storyblok/PortfolioGrid",
        page: "components/storyblok/Page",
      },
      bridge: STORYBLOK_IS_PREVIEW === "yes" ? true : false,
    }),
    react(),
  ],
  prefetch: true,
  adapter:
    STORYBLOK_IS_PREVIEW === "yes" ? netlify({ imageCDN: false }) : undefined,
});
