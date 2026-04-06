#!/usr/bin/env node
/**
 * Simple load generator that sends HTTP requests and logs results
 * Usage: node load.js <balancer-url>
 */

const http = require('http');
const fs = require('fs');

if (process.argv.length < 3) {
    console.error('Usage: node load.js <balancer-url>');
    process.exit(1);
}

const balancerUrl = process.argv[2];
const url = new URL(balancerUrl);

console.log(`[load] starting load generation to ${balancerUrl}`);
console.log(`[load] sending requests every 100ms`);

// CSV output
const csvFile = 'load_results.csv';
fs.writeFileSync(csvFile, 'timestamp,status,response_time_ms,response\n');

let requestCount = 0;
let running = true;

function sendRequest() {
    if (!running) return;
    
    const startTime = Date.now();
    const timestamp = new Date().toISOString();
    
    const options = {
        hostname: url.hostname,
        port: url.port,
        path: '/ping',
        method: 'GET'
    };
    
    const req = http.request(options, (res) => {
        const responseTime = Date.now() - startTime;
        let body = '';
        
        res.on('data', (chunk) => {
            body += chunk;
        });
        
        res.on('end', () => {
            const response = body.trim();
            fs.appendFileSync(csvFile, `${timestamp},${res.statusCode},${responseTime},"${response}"\n`);
            console.log(`[load] ${requestCount}: ${res.statusCode} ${responseTime}ms - ${response}`);
            requestCount++;
        });
    });
    
    req.on('error', (err) => {
        const responseTime = Date.now() - startTime;
        fs.appendFileSync(csvFile, `${timestamp},ERROR,${responseTime},"${err.message}"\n`);
        console.log(`[load] ${requestCount}: ERROR ${responseTime}ms - ${err.message}`);
        requestCount++;
    });
    
    req.end();
    
    // Schedule next request
    setTimeout(sendRequest, 100);
}

// Start sending requests
sendRequest();

process.on('SIGTERM', () => {
    console.log(`[load] received SIGTERM, stopping after ${requestCount} requests`);
    running = false;
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log(`[load] received SIGINT, stopping after ${requestCount} requests`);
    running = false;
    process.exit(0);
}); 