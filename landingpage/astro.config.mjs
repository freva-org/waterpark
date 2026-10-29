// @ts-check
import { unified } from "@astrojs/markdown-remark";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import mermaid from "astro-mermaid";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import starlightLinksValidator from "starlight-links-validator";

import { PREPARED, freva, remarkFreva } from "./integrations/freva.mjs";
import { nav } from "./src/nav.mjs";

export default defineConfig({
  site: "https://waterpark.dkrz.de",
  // Directory-style URLs, as on the MkDocs site, so existing links keep working.
  trailingSlash: "always",
  // Same port as before, which is where the dev proxy expects the site.
  server: { port: 8000 },
  markdown: {
    // $...$ and $$...$$ maths, as pymdownx.arithmatex rendered it, and the
    // runnable Python blocks (integrations/freva.mjs).
    processor: unified({ remarkPlugins: [remarkMath, remarkFreva], rehypePlugins: [rehypeKatex] }),
  },
  integrations: [
    // Before Starlight, so the files are in dist/ when the links are checked.
    freva({
      staticDirs: {
        assets: "assets",
        // Example scripts offered for download next to their figures.
        "assets/examples": ".cache/examples/assets/examples",
        app: () => `${PREPARED}/app`,
        notebook: () => `${PREPARED}/notebook`,
      },
    }),
    mermaid({ autoTheme: true }),
    starlight({
      title: "Waterpark",
      description: "The HEALPix data hub on S3",
      logo: { src: "./assets/logo.svg", alt: "Waterpark" },
      favicon: "/assets/favicon.ico",
      head: [{ tag: "link", attrs: { rel: "apple-touch-icon", href: "/assets/apple-touch-icon.png" } }],
      sidebar: nav,
      customCss: [
        "@fontsource-variable/instrument-sans",
        "@fontsource-variable/jetbrains-mono",
        "katex/dist/katex.min.css",
        "./src/styles/theme.css",
        "./src/styles/freva.css",
      ],
      components: {
        Head: "./src/components/Head.astro",
        Header: "./src/components/Header.astro",
        Hero: "./src/components/Hero.astro",
        Banner: "./src/components/Banner.astro",
        Footer: "./src/components/Footer.astro",
      },
      expressiveCode: {
        themes: ["github-light", "github-dark-dimmed"],
        styleOverrides: { borderRadius: "0.5rem" },
      },
      lastUpdated: false,
      credits: false,
      plugins: [
        starlightLinksValidator({
          // Served next to the site by nginx, or built by prepare.mjs.
          exclude: ["/notebook/**", "/app/**", "/tech/**", "/api/**"],
        }),
      ],
    }),
  ],
});
