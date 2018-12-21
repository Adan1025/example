var express = require('express');
var app = express();

app.use(express.json())
app.post('/', function (req, res, next) {
    console.log(req.body);
    res.send('###');
});

app.listen(3001, function () {
    console.log('启动成功，监听端口3001');
});

sen