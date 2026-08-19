import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/posts",
    // Posts live either as `slug.md` or `slug/index.md`; both must resolve to
    // the flat `/slug/` URLs the Gatsby site published.
    generateId: ({ entry }) =>
      entry.replace(/\/index\.md$/, "").replace(/\.md$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    update: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
  }),
})

export const collections = { posts }
