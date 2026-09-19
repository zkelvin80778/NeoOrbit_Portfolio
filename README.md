# NeoOrbit

The static portfolio for [neoorbit.org](https://neoorbit.org), featuring the solar concentrator and rPET Machine V0 projects.

## Structure

- `index.html`: mission, projects, and contact links.
- `Pages/`: project case studies; existing URLs are retained.
- `style.css`: shared visual styles and responsive layouts.
- `site.js`: keeps section-link offsets aligned with the fixed navigation height.
- `assets/`: original photographs, diagrams, Nasalization font, and project reports.

No build step or runtime dependencies are required. Serve the repository with any static HTTP server for local preview.

## Validation

Run `node scripts/check-site.cjs` and `node --check site.js`. The same checks run on GitHub for pushes and pull requests. Check all three pages at narrow, tablet, and desktop widths when changing layout; verify section links below the fixed menu and test keyboard navigation.

## Hosting and contact

The custom domain is `neoorbit.org`. Keep `CNAME`, canonical URLs, Open Graph URLs, and `sitemap.xml` consistent when changing the domain.

The existing contact mailbox and social account handles are retained independently of the website domain and display name. Change them only after confirming their actual destinations.

## Asset recovery

`assets/optics-diagram-2.png` and `assets/rPET-hotend.png` were restored unchanged from commit `5b242dc` to repair broken WebP references. All assets already present at the start of the cleanup were preserved byte for byte. The existing logo is reused as the favicon.
