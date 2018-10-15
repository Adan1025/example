global['config'] = require('../config/configration');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
// const Middleware = require('../middleware');
const argv = require('minimist')(process.argv.slice(2));
const RedisStore = require('connect-redis')(session);

const Middleware = require('../middleware');
import { DefineRoute } from '../@common';

// 加载typeorm  依赖global.config
// import '../@common/db/orm';
// import redis from '../@common/db/redis';
/**
 * 设置views路径
 */
// app.set('views', './views');
// app.use('/static', express.static('static'));

app.use(Middleware.typeorm());
app.use(express.json({ limit: '5mb' }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    // store: new RedisStore({
    //     // client: redis,
    //     host: "127.0.0.1",
    //     port: 6379,
    //     prefix: 'hgk'
    // }),
    secret: 'pazq-node-website',
    // name: 'testapp', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: { maxAge: 1000 * 60 * 30 },
    resave: false,
    saveUninitialized: true,
}));
app.use(function (req: any, res: any, next: any) {
    console.log('Time:', Date.now());
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/restapi', DefineRoute(path.join(__dirname, '../controller/blog')));
app.use('/manage', DefineRoute(path.join(__dirname, '../controller/manage')));

app.use(function (req: any, res: any, next: any) {
    console.log('Time last:', Date.now());
    next();
});
/**
 * 错误处理
 */
app.use(function (err: any, req: any, res: any, next: any) {
    console.log(err.stack);
    res.status(500).send({ status: 0, errmsg: '系统发生异常' });
});

var server = app.listen(argv.port || 7779, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});