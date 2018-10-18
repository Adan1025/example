# Express express.js

> [Express源码](https://github.com/expressjs/express/blob/master/lib/express.js)

## 一、简述

通过createApplication()耦合了`EventEmitter`,`application`,`request`,`response`,  返回一个新的'Express'对象， 通过exports导出通过createApplication和其他一些模块

## 二、createApplication()

### 源码分析

```js {.line-numbers}
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
```

## 三、json 和 urlencoded

都是继承自`body-parser`的模块，也就是说express v4.16.0+ 版本之后抛弃了内置的bodyParser中间价， 而加入了`body-parser`模块的josn 和 urlencoded两个子模块

```js{.line-number}
var bodyParser = require('body-parser')
exports.json = bodyParser.json
exports.urlencoded = bodyParser.urlencoded
```

### express.json()

用于解析post请求入参的中间价，继承自`body-parser`模块,一路debug到`raw-body`模块的readStream方法。

``` js {.line-numbers}
// raw-body/index.js
function readStream(stream, encoding, length, limit, callback) {
    // 这里有一大堆代码

    // 这里给req注册data等事件监听
    stream.on('aborted', onAborted)
    stream.on('close', cleanup)
    stream.on('data', onData)
    stream.on('end', onEnd)
    stream.on('error', onEnd)
    // 这里又有一堆代码

    // 这这这
    // 这里就是熟悉的 `nodejs怎么接受post请求入参` 的代码啦
    function onData(chunk) {
        if (complete) return
        received += chunk.length
        if (limit !== null && received > limit) {
            done(createError(413, 'request entity too large', {...}))
        } else if (decoder) {
            buffer += decoder.write(chunk)
        } else {
            buffer.push(chunk)
        }
    }
    // 这里还是一堆代码
}

// body-parser/lib/read.js
// 至于为啥上面说stream.on()是给req注册事件...
function contentstream(req, debug, inflate) {
    var encoding = (req.headers['content-encoding'] || 'identity').toLowerCase()
    // 这有一段代码
    switch (encoding) {
        case 'deflate':
            stream = zlib.createInflate()
            debug('inflate body')
            req.pipe(stream)
            break
        case 'gzip':
            stream = zlib.createGunzip()
            debug('gunzip body')
            req.pipe(stream)
            break
        case 'identity':
            // 锵锵锵 没有设置`content-encoding`的时候，默认就是这了。
            stream = req
            stream.length = length
            break
        default:
            throw createError(415, 'unsupported content encoding "' + encoding + '"', {
                encoding: encoding,
                type: 'encoding.unsupported'
            })
    }

    return stream
}
```

```js {.line-numbers}

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