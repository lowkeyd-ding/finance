const http = require('http');
const fs = require('fs');
const path = require('path');

const dist = '/Users/lowkeyd/Desktop/finance-dist';
const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  let filePath = path.join(dist, req.url === '/' ? 'index.html' : req.url);
  
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  
  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`\n✨ 服务已启动`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`\n在浏览器中打开以上地址即可使用\n`);
});
