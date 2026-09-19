const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const pages = ['index.html', 'Pages/Project-SolarConcentrator.html', 'Pages/Project-rPET.html'];
let references = 0;
for (const file of pages) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, `${file}: duplicate IDs`);
  assert.equal((html.match(/<main\b/g) || []).length, 1, `${file}: one main landmark`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${file}: one primary heading`);
  assert(!html.includes('NeoOrbit Dynamics'), `${file}: stale brand name`);
  assert(html.includes('rel="canonical" href="https://neoorbit.org/'), `${file}: canonical URL`);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (/^(https?:|mailto:)/.test(url)) continue;
    const [target, fragment] = url.split('#');
    const resolved = path.resolve(root, path.dirname(file), decodeURIComponent(target || path.basename(file)));
    assert(fs.existsSync(resolved), `${file}: missing resource ${url}`);
    // Linux hosting is case sensitive even when local Windows paths are not.
    assert(fs.readdirSync(path.dirname(resolved)).includes(path.basename(resolved)), `${file}: wrong path case ${url}`);
    if (fragment) {
      const content = fs.readFileSync(resolved, 'utf8');
      assert(content.includes(`id="${fragment}"`), `${file}: missing fragment ${url}`);
    }
    references++;
  }
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    assert(/\balt="[^"]*"/.test(tag), `${file}: missing image alternative`);
    assert(/\bwidth="\d+"/.test(tag) && /\bheight="\d+"/.test(tag), `${file}: image dimensions missing`);
  }
}
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
for (const match of css.matchAll(/url\(['"]?([^)'"\n]+)['"]?\)/g)) {
  assert(fs.existsSync(path.join(root, match[1])), `CSS: missing ${match[1]}`);
  references++;
}
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
assert(!sitemap.includes('neoorbit.me'), 'Sitemap uses old domain');
assert.equal((sitemap.match(/<loc>/g) || []).length, pages.length);
for (const [i, file] of pages.entries()) assert(sitemap.includes(`https://neoorbit.org/${i ? file : ''}</loc>`));
assert.equal(fs.readFileSync(path.join(root, 'CNAME'), 'utf8').trim(), 'neoorbit.org');
for (const file of ['rPET-Report.pdf', 'SolarConcentrator-Report.pdf']) {
  assert.equal(fs.readFileSync(path.join(root, 'assets', file)).subarray(0,5).toString(), '%PDF-');
}
console.log(`Passed: ${pages.length} pages, ${references} local references, anchors, image dimensions, branding, sitemap, and PDF signatures.`);
