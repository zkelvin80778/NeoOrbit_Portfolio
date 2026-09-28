# NeoOrbit

The static portfolio for [neoorbit.org](https://neoorbit.org), featuring the solar concentrator and rPET Machine V0 projects.

## Structure

- `index.html`: mission, projects, and contact links.
- `Pages/`: project case studies; existing URLs are retained.
- `style.css`: shared visual styles and responsive layouts.
- `site.js`: keeps section-link offsets aligned with the fixed navigation height.
- `assets/`: original photographs, diagrams, Nasalization font, and project reports.

No build step or runtime dependencies are required. Serve the repository with any static HTTP server for local preview.

## Layout

All three pages share the compact global navigation and image hero. Nasalization remains exclusive to the hero title; the existing system font stack is used everywhere else. Original assets and technical content are preserved.

The homepage presents two project cards side by side from 900px, with complete descriptions and explicit case-study links. Case studies use a 200px sticky section index from 1100px, a wrapping index below that width, and text/figure pairs from 900px. Figures use proportional sizing and remain fully visible. Anchor offsets track only `.site-nav`.

## Validation

Run `node scripts/check-site.cjs` and `node --check site.js`. The same checks run on GitHub for pushes and pull requests. Check all three pages at 360px, 768px, 1024px, and 1440px widths, plus 200% browser zoom, when changing layout; verify section links below the fixed menu and test keyboard navigation. Keep original URLs, heading levels, section IDs, report links, and asset files intact.

## Hosting and contact

The custom domain is `neoorbit.org`. Keep `CNAME`, canonical URLs, Open Graph URLs, and `sitemap.xml` consistent when changing the domain.

The existing contact mailbox and social account handles are retained independently of the website domain and display name. Change them only after confirming their actual destinations.

## Asset recovery

`assets/optics-diagram-2.png` and `assets/rPET-hotend.png` were restored unchanged from commit `5b242dc` to repair broken WebP references. All assets already present at the start of the cleanup were preserved byte for byte. The existing logo is reused as the favicon.
