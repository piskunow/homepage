import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import { rehypeImgAttrs } from "./src/lib/rehype-img-attrs.mjs"

export default defineConfig({
  site: "https://piskunow.com",
  trailingSlash: "always",
  build: {
    // Firebase Hosting serves /foo/ from /foo/index.html, matching the
    // flat post URLs the old Gatsby site published.
    format: "directory",
  },
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeImgAttrs],
    shikiConfig: {
      theme: "github-light-high-contrast",
      wrap: true,
    },
  },
})
