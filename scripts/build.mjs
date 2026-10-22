import { mkdir, rm, copyFile, writeFile, stat } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { company, services } from '../src/content.mjs';
import { homePage, servicePage, aboutPage, authorizationPage, contactPage, casesPage, notFoundPage } from '../src/templates.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'dist');
await rm(output, { recursive: true, force: true });
await mkdir(join(output, 'assets'), { recursive: true });
const pages = new Map([
  ['index.html', homePage()],
  ['about/index.html', aboutPage()],
  ['authorization/index.html', authorizationPage()],
  ['contact/index.html', contactPage()],
  ['cases/index.html', casesPage()],
  ['404.html', notFoundPage()],
  ...services.map(service => [`services/${service.slug}/index.html`, servicePage(service)]),
]);
for (const [file, html] of pages) {
  await mkdir(dirname(join(output, file)), { recursive: true });
  await writeFile(join(output, file), html);
}
for (const [source, target] of [
  ['src/styles.css', 'assets/styles.css'],
  ['src/site.js', 'assets/site.js'],
  ['assets/favicon.svg', 'assets/favicon.svg'],
  ['assets/hero-architecture.svg', 'assets/hero-architecture.svg'],
]) await copyFile(join(root, source), join(output, target));
await writeFile(join(output, '.nojekyll'), '');
const bytes = (await stat(join(output, 'assets/hero-architecture.svg'))).size;
console.log(`Built ${pages.size} HTML pages for ${company.name}.`);
console.log(`Output: ${output}. Self-contained image: ${(bytes / 1024).toFixed(1)} KiB.`);
