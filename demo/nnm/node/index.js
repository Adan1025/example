const http = require('http');
const config = global.config = require('./config/configration.js');
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text-plain' });
    res.end(config.test);
}).listen(3000)