import { cp, readdir } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'dist');
for (const entry of await readdir(output)) await cp(join(output, entry), join(root, entry), { recursive: true });
console.log('Synced generated static pages to repository root for GitHub Pages main / (root).');
