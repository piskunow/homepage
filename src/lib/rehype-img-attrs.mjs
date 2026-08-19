import { visit } from "unist-util-visit"

/**
 * Post images are large scientific figures and all of them sit below the fold.
 * Applies to raw <img> tags in the markdown too, which Astro leaves untouched.
 */
export function rehypeImgAttrs() {
  return tree => {
    visit(tree, "element", node => {
      if (node.tagName !== "img") return
      node.properties ??= {}
      node.properties.loading ??= "lazy"
      node.properties.decoding ??= "async"
    })
  }
}
