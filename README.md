# Harmanpreet Singh — Portfolio

[Live portfolio](https://harmanhanjra.github.io/portfolio/)

An obsidian-and-lime portfolio featuring 16 selected public projects across AI systems, applications, security tools, games, and systems labs. Project descriptions and repository links were reviewed on September 5, 2026. Private repositories are not linked or exposed.

## Run locally

```sh
python -m http.server 8073
```

Open http://localhost:8073. No build is required to serve the site. Three.js 0.180.0 is vendored locally with its MIT license, so the scene does not depend on a runtime JavaScript CDN. Google Fonts is optional; system font fallbacks are provided.

## Update content

Edit the project array or HTML template in `scripts/build-content.mjs`, then run:

```sh
node scripts/build-content.mjs
```

This regenerates `index.html`. All projects are in the static HTML, so their descriptions and links remain available without JavaScript.

## Motion and accessibility

- Three.js faceted core, wireframe shell, independently rotating orbital rings, satellite, particles, and pointer response.
- Scroll reveals, reading progress, and project artwork hover transitions.
- A keyboard-accessible motion toggle and automatic reduced-motion preference support.
- Animation stops outside the viewport and in hidden tabs. Drawing resolution is capped at 1.5 device pixels per CSS pixel.
- A CSS sculpture remains visible if WebGL is unavailable; project filtering and navigation are independent of Three.js.
- Semantic sections, a skip link, visible focus rings, live filter counts, and responsive layouts.

## Dependencies and checks

```sh
npm ci
npm run vendor
npm run check
```

Commit the `vendor/` output when changing the Three.js version. GitHub Pages serves the root of `main`; pushing the static files publishes the site.

Project illustrations are abstract artwork, not product screenshots. Trading projects are described as engineering work, without performance or return claims.

MIT — see `LICENSE` and `vendor/THREE-LICENSE.txt`.
