/**
 * Regenerates public/og-image.png from the same Floquet model the hero draws,
 * so the social card and the page share one visual. Run: npm run og
 */
import sharp from "sharp"

const W = 1200
const H = 630

// Reuse the real solver rather than reimplementing it.
const mod = await import("../src/lib/floquet.ts")
const fig = mod.floquetFigure({ width: 1160, height: 300, eMax: 1.95 })

const GROUND = "#EDEEF0"
const INK = "#15171C"
const BAND = "#17555E"
const GAP = "#7A3B86"

const bands = fig.bands
  .map(
    b =>
      `<path d="${b.d}" fill="none" stroke="${BAND}" stroke-width="1.6" stroke-linecap="round" opacity="0.85"/>`,
  )
  .join("")

const gaps = fig.gaps
  .map(
    g =>
      `<circle cx="${g.x}" cy="${g.y}" r="${g.size}" fill="${GAP}" opacity="0.9"/>`,
  )
  .join("")

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${GROUND}"/>
  <g transform="translate(20, 300)">
    <line x1="0" y1="150" x2="1160" y2="150" stroke="${INK}" stroke-opacity="0.12" stroke-width="1" stroke-dasharray="2 5"/>
    ${bands}
    ${gaps}
  </g>
  <text x="72" y="150" font-family="Newsreader, Georgia, serif" font-size="76" fill="${INK}" letter-spacing="-1.5">Pablo Piskunow</text>
  <text x="72" y="205" font-family="IBM Plex Sans, system-ui, sans-serif" font-size="27" fill="#5B626C">I build and ship software products.</text>
  <text x="72" y="580" font-family="IBM Plex Mono, monospace" font-size="21" fill="${GAP}" letter-spacing="1">piskunow.com</text>
</svg>`

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile("public/og-image.png")
console.log("wrote public/og-image.png")
