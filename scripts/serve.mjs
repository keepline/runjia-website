import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, join, dirname, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || '127.0.0.1';
const base = `/${(process.env.BASE_PATH || '').replace(/^\/+|\/+$/g, '')}`.replace(/\/$/, '');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.json': 'application/json; charset=utf-8' };
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    let pathname = decodeURIComponent(url.pathname);
    if (base && pathname !== base && !pathname.startsWith(`${base}/`)) throw new Error('Not found');
    pathname = pathname.slice(base.length);
    let path = resolve(root, `.${pathname || '/'}`);
    if (path !== root && !path.startsWith(`${root}${sep}`)) throw new Error('Not found');
    const info = await stat(path);
    if (info.isDirectory()) {
      if (!url.pathname.endsWith('/')) { res.writeHead(301, { Location: `${url.pathname}/${url.search}` }); res.end(); return; }
      path = join(path, 'index.html');
    }
    const data = await readFile(path);
    res.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(await readFile(join(root, '404.html')));
  }
}).listen(port, host, () => console.log(`Local: http://127.0.0.1:${port}${base}/ (bound to ${host})`));
