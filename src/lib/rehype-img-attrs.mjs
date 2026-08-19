import { visit } from "unist-util-visit"
import { imageDimensions } from "./image-dimensions.mjs"
import path from "node:path"

const dimensions = new Map()

function intrinsicSize(src) {
  if (dimensions.has(src)) return dimensions.get(src)
  let size = null
  try {
    size = imageDimensions(path.join("public", src))
  } catch {
    size = null
  }
  dimensions.set(src, size)
  return size
}

/**
 * Post images are large scientific figures that all sit below the fold, so
 * they load lazily. Lazy images with no intrinsic size shift the layout as
 * they arrive, which was costing ~0.1 of cumulative layout shift, so the
 * real dimensions are stamped on at build time to reserve the space.
 *
 * Applies to raw <img> tags in the markdown too, which Astro leaves alone.
 */
export function rehypeImgAttrs() {
  return tree => {
    visit(tree, "element", node => {
      if (node.tagName !== "img") return
      node.properties ??= {}
      node.properties.loading ??= "lazy"
      node.properties.decoding ??= "async"

      const src = node.properties.src
      if (typeof src !== "string" || !src.startsWith("/")) return
      if (node.properties.width || node.properties.height) return

      const size = intrinsicSize(src)
      if (!size?.width || !size?.height) return
      node.properties.width = size.width
      node.properties.height = size.height
    })
  }
}
