# piskunow.com

Portfolio and business site for Pablo Piskunow. Static, no client-side
JavaScript.

## Stack

- [Astro](https://astro.build) 5, static output to `dist/`
- Markdown content collection in `src/content/posts/`
- Self-hosted fonts via Fontsource (no Google Fonts request, so no third-party
  data transfer under GDPR)
- Firebase Hosting, project `pablopiskunow`

## Commands

| Command                  | Does                             |
| ------------------------ | -------------------------------- |
| `npm run dev`            | Dev server on :4321              |
| `npm run build`          | Static build into `dist/`        |
| `npm run preview`        | Serve the built site             |
| `npm run check`          | Astro/TypeScript diagnostics     |
| `npm run check:prettier` | Formatting check (CI runs this)  |
| `npm run og`             | Regenerate `public/og-image.png` |

### Gotcha

Astro's content layer caches rendered markdown in `node_modules/.astro/data-store.json`.
Changing a remark/rehype plugin will appear to do nothing locally until that
cache is cleared:

```sh
rm -rf node_modules/.astro .astro dist && npm run build
```

CI is a fresh checkout, so it never sees a stale cache.

## Deployment

Pushing to `main` deploys to production. Opening a pull request deploys a
preview channel. Both run through
`.github/workflows/firebase-hosting-*.yml` and authenticate with the
`FIREBASE_SERVICE_ACCOUNT_PABLOPISKUNOW` repository secret.

## URLs

Post URLs are flat (`/deep-questions/`, `/publications/`) and match what the
previous Gatsby site published, so nothing that was linked externally breaks.
`/writing/` is an index over them. Retired Gatsby routes (`/this-website/`,
`/tags/`, `/search/`, `/series/`) are 301'd in `firebase.json`.

## The hero figure

`src/lib/floquet.ts` computes a Floquet replica band structure — a driven
two-band lattice, three photon replicas, diagonalised per k-point — and emits
it as SVG paths at build time. The avoided crossings and their size hierarchy
are solved for, not drawn. Same model feeds the OG image.
