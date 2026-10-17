const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT || 4173);
const mime = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon', '.pdf': 'application/pdf', '.woff': 'font/woff',
  '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.otf': 'font/otf'
};

if (!fs.existsSync(path.join(root, 'build-resume', 'index.html'))) {
  console.error('Missing resume build. Run npm run resume:build first.');
  process.exit(1);
}

const server = http.createServer(async (req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(405, { Allow: 'GET, HEAD' }).end(); return;
  }
  try {
    const url = new URL(req.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    const segments = pathname.split(/[\\/]/);
    const file = path.resolve(root, '.' + pathname);
    if ((file !== root && !file.startsWith(root + path.sep)) ||
        segments.some(part => part.startsWith('.') || part === 'node_modules')) {
      res.writeHead(403).end('Forbidden'); return;
    }
    const stat = await fs.promises.stat(file);
    let target = file;
    if (stat.isDirectory()) {
      if (!pathname.endsWith('/')) {
        res.writeHead(301, { Location: encodeURI(pathname + '/') + url.search }).end(); return;
      }
      target = path.join(file, 'index.html');
    }
    const content = await fs.promises.readFile(target);
    res.writeHead(200, {
      'Content-Type': mime[path.extname(target).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff'
    });
    res.end(req.method === 'HEAD' ? undefined : content);
  } catch (error) {
    res.writeHead(error.code === 'ENOENT' || error.code === 'ENOTDIR' ? 404 : 400).end('File not found');
  }
});

server.on('error', error => {
  console.error(error.code === 'EADDRINUSE'
    ? `Port ${port} is already in use. Stop the other server or set PORT to another number.`
    : error.message);
  process.exit(1);
});
server.listen(port, '127.0.0.1', () => {
  console.log(`Resume builder: http://127.0.0.1:${port}/build-resume/`);
  console.log('Keep this terminal open. Press Ctrl+C to stop.');
});
