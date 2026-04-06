#!/usr/bin/env node
/**
 * Simple HTTP worker that responds to /ping requests
 * Usage: node worker.js <id> <port>
 */

const http = require('http');
const fs = require('fs');

if (process.argv.length < 4) {
    console.error('Usage: node worker.js <id> <port>');
    process.exit(1);
}

const workerId = process.argv[2];
const port = parseInt(process.argv[3]);

// Write PID to file so Python plugin can find it
fs.writeFileSync(`worker-${workerId}.pid`, process.pid.toString());

const server = http.createServer((req, res) => {
    if (req.url === '/ping' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`pong ${workerId}\n`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found\n');
    }
});

server.listen(port, () => {
    console.log(`[worker-${workerId}] listening on port ${port}, PID ${process.pid}`);
});

// Cleanup PID file on exit
process.on('SIGTERM', () => {
    console.log(`[worker-${workerId}] received SIGTERM, shutting down`);
    try {
        fs.unlinkSync(`worker-${workerId}.pid`);
    } catch (e) {}
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log(`[worker-${workerId}] received SIGINT, shutting down`);
    try {
        fs.unlinkSync(`worker-${workerId}.pid`);
    } catch (e) {}
    process.exit(0);
}); 