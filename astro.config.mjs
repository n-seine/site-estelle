import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import storyblok from "@storyblok/astro";
import netlify from "@astrojs/netlify";

import basicSsl from "@vitejs/plugin-basic-ssl";

// https://astro.build/config
export default defineConfig({
  output: import.meta.env.STORYBLOK_IS_PREVIEW === "yes" ? "server" : "static",

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
        import.meta.env.STORYBLOK_IS_PREVIEW === "yes"
          ? import.meta.env.STORYBLOK_PREVIEW_TOKEN
          : import.meta.env.STORYBLOK_PUBLIC_TOKEN,
      components: {
        projectDetails: "components/storyblok/ProjectDetails",
        portfolioGrid: "components/storyblok/PortfolioGrid",
        page: "components/storyblok/Page",
      },
      bridge: import.meta.env.STORYBLOK_IS_PREVIEW === "yes" ? true : false,
    }),
    react(),
  ],
  prefetch: true,
  adapter:
    import.meta.env.STORYBLOK_IS_PREVIEW === "yes"
      ? netlify({ imageCDN: false })
      : undefined,
});
