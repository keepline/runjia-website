import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
async function files(dir, prefix = '') {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? files(join(dir, e.name), `${prefix}${e.name}/`) : `${prefix}${e.name}`))).flat();
}
const paths = ['package.json', 'package-lock.json', '.gitignore', 'README.md'];
for (const dir of ['src', 'scripts', 'tests', 'docs', '.github']) for (const path of await files(join(root, dir))) paths.push(`${dir}/${path}`);
const tree = new Map();
for (const path of paths) tree.set(path, await readFile(join(root, path), 'utf8'));
for (const path of await files(join(root, 'dist'))) tree.set(path, await readFile(join(root, 'dist', path), 'utf8'));
const entries = [...tree].sort(([a], [b]) => a.localeCompare(b)).map(([path, content]) => ({ path, mode: '100644', type: 'blob', content }));
const output = resolve(root, '../runjia-website-public-tree.json');
await writeFile(output, JSON.stringify(entries));
console.log(`${entries.length} safe text entries written to ${output}`);
console.log(`Largest file: ${entries.map(e => [e.path, Buffer.byteLength(e.content)]).sort((a,b) => b[1]-a[1])[0].join(' — ')} bytes`);
