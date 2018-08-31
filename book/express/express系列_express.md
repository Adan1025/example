# Express express.js

> [Express源码](https://github.com/expressjs/express/blob/master/lib/express.js)

## 简述

通过createApplication()耦合了`EventEmitter`,`application`,`request`,`response`,  返回一个新的'Express'对象， 通过exports导出通过createApplication和其他一些模块

## 源码分析

```bash {.line-numbers}
// code ...

exports = module.exports = createApplication;

function createApplication() {
    var app = function (req, res, next) {
        // handle 继承自application模块，最终执行router.handle()
        app.handle(req, res, next);
    };

    // 耦合相关模块
    mixin(app, EventEmitter.prototype, false);
    mixin(app, proto, false);

    // create新的req对象，并挂载，
    app.request = Object.create(req, {
        app: { configurable: true, enumerable: true, writable: true, value: app }
    })

    app.response = Object.create(res, {
        app: { configurable: true, enumerable: true, writable: true, value: app }
    })

    // application模块的init，主要是设置一些默认的参数头
    app.init();
    return app;
}

// exports一些相关模块

// 已经删除了的内置的中间件，如果有引用则给出错误消息
[
    'bodyParser',
    'compress',
    'cookieSession',
    'session',
    'logger',
    'cookieParser',
    'favicon',
    'responseTime',
    'errorHandler',
    'timeout',
    'methodOverride',
    'vhost',
    'csrf',
    'directory',
    'limit',
    'multipart',
    'staticCache',
].forEach(function (name) {
    Object.defineProperty(exports, name, {
        get: function () {
            throw new Error('Most middleware (like ' + name + ') is no longer bundled with Express and must be installed separately. Please see https://github.com/senchalabs/connect#middleware.');
        },
        configurable: true
    });
});

```

## 相关

1. [request API](http://#)
2. [response API](http://#)
3. [application](http://#)