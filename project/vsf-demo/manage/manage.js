
const http = require('http');
const path = require('path');
const express = global.express = require('express');
const app = global.app = express();

app.use(express.static(path.join(__dirname, './dist/')));

app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

// 错误处理中间件
app.use(function (err, req, res, next) {
    console.error('app.use error:  ' + err.message);
    res.status(500).send('Something broke!');
});

const server = http.createServer(app).listen(7776, function () {
    const { address, port } = server.address();
    console.log('Example app listening at http://%s:%s', address, port);
});