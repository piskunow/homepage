import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { site } from "../data/site"
import type { APIContext } from "astro"

export async function GET(context: APIContext) {
  const posts = (await getCollection("posts")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  )

  return rss({
    title: `${site.name} — writing`,
    description:
      "Notes on building software products, Python packaging and computational physics.",
    site: context.site ?? site.url,
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/${post.id}/`,
    })),
  })
}
