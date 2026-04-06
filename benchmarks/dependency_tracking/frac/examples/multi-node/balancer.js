#!/usr/bin/env node
/**
 * Simple round-robin load balancer
 * Usage: node balancer.js <port> <worker-url1> <worker-url2> ...
 */

const http = require('http');

if (process.argv.length < 4) {
    console.error('Usage: node balancer.js <port> <worker-url1> <worker-url2> ...');
    process.exit(1);
}

const port = parseInt(process.argv[2]);
const workerUrls = process.argv.slice(3);
let currentWorker = 0;

console.log(`[balancer] starting on port ${port}`);
console.log(`[balancer] workers: ${workerUrls.join(', ')}`);

const server = http.createServer((req, res) => {
    // Round-robin worker selection
    const workerUrl = workerUrls[currentWorker];
    currentWorker = (currentWorker + 1) % workerUrls.length;
    
    // Parse worker URL
    const url = new URL(workerUrl);
    
    // Forward request to selected worker
    const options = {
        hostname: url.hostname,
        port: url.port,
        path: req.url,
        method: req.method,
        headers: req.headers
    };
    
    const proxyReq = http.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);
    });
    
    proxyReq.on('error', (err) => {
        console.log(`[balancer] worker ${workerUrl} error: ${err.message}`);
        res.writeHead(503, { 'Content-Type': 'text/plain' });
        res.end('Service unavailable\n');
    });
    
    req.pipe(proxyReq);
});

server.listen(port, () => {
    console.log(`[balancer] listening on port ${port}`);
});

process.on('SIGTERM', () => {
    console.log('[balancer] received SIGTERM, shutting down');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('[balancer] received SIGINT, shutting down');
    process.exit(0);
}); 