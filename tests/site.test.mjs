import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { services } from '../src/content.mjs';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
async function list(dir) { const entries = await readdir(dir, { withFileTypes: true }); return (await Promise.all(entries.map(e => e.isDirectory() ? list(join(dir, e.name)) : join(dir, e.name)))).flat(); }
const allFiles = await list(root);
const htmlFiles = allFiles.filter(path => path.endsWith('.html'));
test('Build contains 11 content pages, six exact service detail pages, and a custom 404', async () => {
  assert.equal(htmlFiles.length, 12);
  for (const s of services) assert.ok((await readFile(join(root, `services/${s.slug}/index.html`), 'utf8')).includes(`<p class="service-name-label">${s.name}</p>`));
});
test('All pages have a language, unique title, one h1, and the correct phone', async () => {
  const titles = new Set();
  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    assert.match(html, /<html lang="zh-CN">/);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, file);
    assert.match(html, /tel:15165268668/);
    const title = html.match(/<title>(.*?)<\/title>/)[1];
    assert.ok(!titles.has(title), `Duplicate title: ${title}`);
    titles.add(title);
  }
});
test('All internal links, scripts, styles, images and anchor fragments resolve under GitHub Pages project path', async () => {
  const base = 'https://example.github.io/runjia-website/';
  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    const relative = file.slice(root.length + 1);
    const current = new URL(relative, base);
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const value = match[1];
      if (value.startsWith('tel:')) continue;
      const url = new URL(value, current);
      assert.equal(url.origin, new URL(base).origin, `Unexpected external dependency: ${value}`);
      assert.ok(url.pathname.startsWith('/runjia-website/'), `Escaped project base: ${value}`);
      let target = join(root, url.pathname.slice('/runjia-website/'.length));
      if ((await stat(target)).isDirectory()) target = join(target, 'index.html');
      assert.ok((await stat(target)).isFile(), `Missing target: ${value}`);
      if (url.hash) {
        const targetHtml = await readFile(target, 'utf8');
        assert.ok(targetHtml.includes(`id="${url.hash.slice(1)}"`), `Missing anchor: ${value}`);
      }
    }
  }
});
test('Public build includes no certificate, customer upload, tracking script, or collecting form', async () => {
  assert.ok(!allFiles.some(f => /\.(?:jpg|jpeg|pdf|docx|pptx)$/i.test(f)));
  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    assert.ok(!/<form\b|<input\b|<iframe\b|google-analytics|gtag\(/i.test(html));
  }
  const home = await readFile(join(root, 'index.html'), 'utf8');
  assert.match(home, /AI 生成，非自有项目案例/);
  assert.match(home, /自有项目案例正在整理中/);
  assert.match(home, /2026\.01\.01/);
  assert.match(home, /2026\.12\.31/);
  assert.match(home, /中国大陆境内/);
});
test('Hero is a self-contained SVG and public payload stays lightweight', async () => {
  const svg = await readFile(join(root, 'assets/hero-architecture.svg'), 'utf8');
  assert.match(svg, /data:image\/webp;base64,/);
  assert.ok(!/<script\b|<foreignObject\b|href="https?:/i.test(svg));
  assert.ok(Buffer.byteLength(svg) < 650_000);
  const total = (await Promise.all(allFiles.map(async f => (await stat(f)).size))).reduce((a, b) => a + b, 0);
  assert.ok(total < 1_000_000, `Public build too large: ${total} bytes`);
});
