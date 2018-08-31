# Express Response

> [response源码](https://github.com/expressjs/express/blob/master/lib/response.js)

## 文中常用短函数

res.set(field, val)  设置header  
res.get(field)   获取指定header的值  
res.type(type) 设置Content-type

## 一、res.send(arg1[,arg2])

响应请求，发送指定内容和状态到浏览器

### 1.1、入参  

```bash {.line-numbers}
res.send(any);
res.send(!number, number);
res.send(number, any);
```

### 1.2、源码分析

当参数有2个的时候

```bash {.line-numbers}
res.send = function send(body) {
    var chunk = body;
    // ...
    if (arguments.length === 2) {
        // 当第一个参数类型不是number 并且第二个参数类型是number的时候，第二个参数为statusCode
        if (typeof arguments[0] !== 'number' && typeof arguments[1] === 'number') {
            deprecate('res.send(body, status): Use res.status(status).send(body) instead');
            this.statusCode = arguments[1];
        } else {
            // 第一个参数是设置statusCode，第二个是设置body
            deprecate('res.send(status, body): Use res.status(status).send(body) instead');
            this.statusCode = arguments[0];
            chunk = arguments[1];
        }
    }
}
```

当arguments[0]类型不是number 并且arguments[1]类型是number的时候，第二个参数为statusCode，否则arguments[0]为number时，arguments[0]是设置statusCode，arguments[1]是设置body，如：

```bash {.line-numbers}
res.send('success', 200); // body: success,  statusCode: 200
res.send(200, 'success'); // body: success,  statusCode: 200
res.send(200, 13412341234); // body: 13412341234,  statusCode: 200
```

如果两个参数都是字符串呢？

```bash
res.send('abc', 'efg'); // Invalid status code： 0
```

因为statusCode不在100-999范围内，则抛出异常Invalid status code，定义如下：

```bash {.line-numbers}
// _http_server.js
statusCode |= 0;
ServerResponse.prototype.writeHead = function(statusCode, reason, obj) {
    // ...
    if (statusCode < 100 || statusCode > 999)
    throw new RangeError(`Invalid status code: ${statusCode}`);
    // ...
}
```

当statusCode 为字符串时,`statusCode |= 0`值为0。(|= 按位或),更多类型如下:

```bash {.line-numbers}
var a = undefined;
a | 0; // 0
var a = null;
a | 0; // 0
var a = true;
a | 0; // 1
var a = false;
a | 0; // 0
var a = 'a';
a | 0; // 0
var a = {};
a | 0; // 0
var a = [];
a | 0; // 0
var a = 404;
a | 0;  // 404
```

只有一个number参数的时候

```bash {.line-numbers}
if (typeof chunk === 'number' && arguments.length === 1) {
    // res.send(status) will set status message as text string
    if (!this.get('Content-Type')) {
        // 不存在content-type的时候，设置content-type为 text/plain
        this.type('txt');
    }
    deprecate('res.send(status): Use res.sendStatus(status) instead');
    this.statusCode = chunk;
    chunk = statuses[chunk]
}
```

只有一个number参数的时候，参数为statusCode， body根据code在配置(/node_module/statuses/codes.json)中获取其字符串表示形式,没有匹配到则为undefined。  

设置content-type，源码如下：

```bash {.line-numbers}
switch (typeof chunk) {
    // string defaulting to html
    case 'string':
        if (!this.get('Content-Type')) {
            this.type('html');
        }
        break;
    case 'boolean':
    case 'number':
    case 'object':
        如果是对象，并且不为null不为buffer。就执行this.json()
        if (chunk === null) {
            chunk = '';
        } else if (Buffer.isBuffer(chunk)) {
            if (!this.get('Content-Type')) {
                this.type('bin');
            }
        } else {
            return this.json(chunk);
        }
        break;
}
if (typeof chunk === 'string') {
        encoding = 'utf8';
        type = this.get('Content-Type');

        // reflect this in content-type
        if (typeof type === 'string') {
            this.set('Content-Type', setCharset(type, 'utf-8'));
        }
    }
```

如果参数类型是`boolean`、`number`、`object`，并且不为空和buffer类型，则会调用res.json(),在json()将chunk转换为字符串，再回调res.send()。执行`case 'string':`
如果chunk是字符串 给content-type加上编码

```bash {.line-numbers}
res.send({obj: 1}) === res.json({obj: 1}) // content-type: application/json
res.send('{obj:1}'); // text/html; charset=utf-8
```

剩下是设置conteng-length和缓存，不做描述。
最后调用`req.end()`结束整个请求。  
end() 继承自http模块

```bash {.line-numbers}
// _http_outgoing.js
OutgoingMessage.prototype.end = function(data, encoding, callback) {
    // ...
}
```

### 1.3、注意

官方貌似并不推荐res.send(body, code)写法

```bash {.line-numbers}
res.send(200, {status:1});
// Console -> express deprecated res.send(status, obj): Use res.status(status).send(obj) instead at xxx.js

res.send({status:1}, 200);
// Console -> express deprecated res.send(obj, status): Use res.status(status).send(obj) instead at
```

推荐

```bash
res.status(200).send({status:1});
```

res.json()、res.jsonp() 同理

## 二、res.json(arg1[,arg2])

### 2.1、入参  

```bash {.line-numbers}
res.JSON(any);
res.send(!number, number);
res.send(number, any);
```

### 2.2、源码分析

和req.send() 一样，当参数有2个并且arguments[1]类型是number时，第二个为statusCode， 否则arguments[1]为 body， 如果statusCode是字符串！！！后果如req.sned()

```bash {.line-numbers}
var val = obj;
if (arguments.length === 2) {
    if (typeof arguments[1] === 'number') {
        this.statusCode = arguments[1];
    } else {
        this.statusCode = arguments[0];
        val = arguments[1];
    }
}
```

之后就将body字符串话，设置默认content-type，调用req.send();

```bash {.line-numbers}
var app = this.app;
var escape = app.get('json escape')
var replacer = app.get('json replacer');
var spaces = app.get('json spaces');
var body = stringify(val, replacer, spaces, escape)

// content-type
if (!this.get('Content-Type')) {
    this.set('Content-Type', 'application/json');
}

return this.send(body);
```

## 三、res.jsonp(arg1[,arg2])

### 3.1、 入参

　　同 res.json()

### 3.2、 源码分析

jsonp()会先根据content-type的情况来判断是否设置header头，
如果参数中传了`callback=回调函数名`,则会强制设置header头`X-Content-Type-Options` 和 `Content-Type`.
> [X-Content-Type-Options介绍](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/X-Content-Type-Options)
最后、依然是调用req.send()

```bash {.line-numbers}
// 参数判断...

// JSONP回调名称,默认callback
var callback = this.req.query[app.get('jsonp callback name')];

// content-type
// 不管有没有callback，舍判断content-type，没有默认值则设置
if (!this.get('Content-Type')) {
    this.set('X-Content-Type-Options', 'nosniff');
    this.set('Content-Type', 'application/json');
}

// fixup callback
if (Array.isArray(callback)) {
    callback = callback[0];
}
// jsonp 存在callback参数
if (typeof callback === 'string' && callback.length !== 0) {
    this.set('X-Content-Type-Options', 'nosniff');
    this.set('Content-Type', 'text/javascript');

    // ...

    body = '/**/ typeof ' + callback + ' === \'function\' && ' + callback + '(' + body + ');';
}
return this.send(body);
```

自定义JSONP回调名称

```bash {.line-numbers}
const app = require('express')()
app.set('jsonp callback name', 'cbname')
res.jsonp({status:1})
// 请求： xxx/xx?cbname=cb
// 响应:  cb({status:1})
```

## 四、res.status(statusCode)

### 4.1、源码分析

```bash {.line-numbers}
res.status = function status(code) {
    // 设置此次请求返回的状态码，正常入参为100 - 999 之间的数字，非正常入参(如字符串)则会抛出异常`RangeError: Invalid status code:`，具体见res.send()  
    this.statusCode = code;
    // 最后返回当前response对象
    return this;
};
```

## 五、res.sendStatus(statusCode)

将响应HTTP状态代码设置为statusCode并将其字符串表示形式作为响应主体发送。

### 5.1、入参

同res.status()

### 5.2、源码分析

```bash {.line-numbers}
res.sendStatus = function sendStatus(statusCode) {
    // 获取到code对应的字符串表示形式，获取不到则为undefined,入参规则同res.status()
    var body = statuses[statusCode] || String(statusCode)

    // 设置状态码
    this.statusCode = statusCode;
    // 设置content-type为 text/plain
    this.type('txt');
    // 响应
    return this.send(body);
};
```

## 六、res.sendFile(path[, options][, callback])

获取指定地址的静态文件

### 6.1、入参

```bash {.line-numbers}
let opt = {
    root: '/homo/usersd'
}
res.sendFile('express.txt', opt, function(err){
    if (err) {
        next(err);
    } else {
        console.log('Sent success');
    }
})

```

- path 必须

文件地址

- options

|属性           |描述|默认|可用性|
|:-:|:-:|:-:|:-:|
|maxAge         |设置响应头的Cache-Control： max-age,单位为毫秒 | 0  |  |
|root           |文件的根目录 |  |   |
|lastModified   |返回文件在服务器中最后的修改时间，设置false则不返回 | true | 4.9.0+ |
|headers        |设置header头 |   |   |
|dotfiles       |怎么处理点文件，枚举值有：“allow“(不做处理), “deny”(拒绝，服务器返回403), “ignore”(假装不存在，返回404)  | ignore  |   |
|cacheControl   |启用或禁用设置Cache-Control响应标题。| true | 4.14+ |
|acceptRanges    |开启或禁用分段请求。| true | 4.14+ |
|immutable      |启用或禁用响应头中Cache-Control的immutable指令。如果启用，maxAge还应该指定该选项以启用缓存。该immutable指令将阻止受支持的客户端在maxAge选项生命周期内发出条件请求，以检查文件是否已更改。| false | 4.16+ |  
| |

- callback  

响应传输完成或发生错误,定了回调函数并且发生错误,则必须通过结束请求 - 响应循环或将控制权交给下一个路由

```bash {.line-numbers}
// options 在Response Headers的表现形式
// 默认Response Headers > (只显示相关的)
{
    Accept-Ranges: bytes
    Cache-Control: public, max-age=0
    Last-Modified: Tue, 29 May 2018 02:32:48 GMT
}

// 相关设置
{maxAge: 1000 * 60}
// Response Headers > Cache-Control: public, max-age=60

{immutable: true}
// Response Headers > Cache-Control: public, max-age=0, immutable

{lastModified: true}
// Response Headers > Last-Modified: Tue, 29 May 2018 02:17:42 GMT

{acceptRanges : true}
// Response Headers > Accept-Ranges: bytes

```

### 6.2、源码分析

```bash {.line-numbers}
res.sendFile = function sendFile(path, options, callback) {
    var done = callback;
    // ...
    var opts = options || {};

    // 文件地址必传
    if (!path) {
        throw new TypeError('path argument is required to res.sendFile');
    }

    // 解析入参
    if (typeof options === 'function') {
        done = options;
        opts = {};
    }

    // 如果没有传root参数，并且path不是绝对地址
    if (!opts.root && !isAbsolute(path)) {
        throw new TypeError('path must be absolute or specify root to res.sendFile');
    }

    var pathname = encodeURI(path);
    // 疑似转成stream流
    var file = send(req, pathname, opts);

    // 发送文件
    sendfile(res, file, opts, function(err) {
        if (done) return done(err);
        if (err && err.code === 'EISDIR') return next();

        // next() all but write errors
        if (err && err.code !== 'ECONNABORTED' && err.syscall !== 'write') {
            next(err);
        }
    });
};
```

## 七、res.sendfile(path[, options][, callback])

同res.sendFile(), 只是少了一些参数判断，应该是兼容旧版本写法所以保留，有提示如下

```bash
res.sendfile = deprecate.function(res.sendfile,'res.sendfile: Use res.sendFile instead');
```

终端显示如下

```bash
Tue, 29 May 2018 03:17:46 GMT express deprecated res.sendfile: Use res.sendFile instead at app.js:5:9
```

## 八、res.download(path [,filename] [,options] [,callback])

以附件的形式下载文件

### 8.1、入参

- filname下载文件名

- 其他同 `res.sendFile()`

### 8.2、源码解析

```bash {.line-numbers}
res.download = function download(path, filename, options, callback) {
    var done = callback;
    var name = filename;
    var opts = options || null

    // 解析入参...

    // 设置Content-Disposition头文件,通常出现在浏览器对话框中。
    var headers = {
        'Content-Disposition': contentDisposition(name || path)
    };

    // 获取配置中的headers配置，过滤掉Content-Disposition，
    if (opts && opts.headers) {
        var keys = Object.keys(opts.headers)
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i]
            if (key.toLowerCase() !== 'content-disposition') {
                headers[key] = opts.headers[key]
            }
        }
    }
    opts = Object.create(opts)
    // 新的headers
    opts.headers = headers

    var fullPath = resolve(path);

    // 调用res.sendFile()
    return this.sendFile(fullPath, opts, done)
};
```

## 九、res.contentType(type)

设置Content-Type

### 9.1、入参

- type  类型全称或简称  

  type入参存在`/` 时 会根据简称获取到对应的类型全名,(具体类型见[types](https://github.com/broofa/node-mime/tree/master/types)),
  匹配不到默认值为`application/octet-stream`。如果带`/`则入参是啥就设置啥。

```bash {.line-numbers}
res.contentType('txt');
// res.get('Content-Type') -> text/plain; charset=utf-8

res.contentType('html');
// res.get('Content-Type') -> text/html; charset=utf-8

res.contentType('aaaaaaa');
// res.get('Content-Type') -> application/octet-stream

res.contentType('application/json');
// res.get('Content-Type') -> application/json; charset=utf-8

res.contentType('aaa/bbb');
// res.get('Content-Type') -> aaa/bbb
```

### 9.2、源码分析

参数带'/'不处理直接set(),带'/'则通过mime.lookup(type)获取到对应的全称，更多规则见[mime](https://github.com/broofa/node-mime/blob/master/README.md)

```bash {.line-numbers}
res.contentType = res.type = function contentType(type) {
    // 判断是否需要mime.lookup
    var ct = type.indexOf('/') === -1 ?
        mime.lookup(type) :
        type;
    // 设置Content-Type
    return this.set('Content-Type', ct);
};
```

## 十、res.redirect([status,] url)

用于重定向
> [参考文献 CSDN](https://blog.csdn.net/yanyang1116/article/details/54837613)

### 10.1 入参

``` {.line-numbers}
res.redirect('/#');
res.redirect('http://blog.qualc.cn');
res.redirect(301, 'http://blog.qualc.cn');
res.redirect('../login');
res.redirect('http://blog.qualc.cn', 301);// 不推荐
```

### 10.2 源码分析

``` {.line-numbers}

res.redirect = function redirect(url) {
    var address = url;
    var body;
    var status = 302;

    // 分配参数，哪个是status那个是url
    if (arguments.length === 2) {
        // ...
    }

    // 设置location头
    address = this.location(address).get('Location');

    // 默认响应text、html、default
    // 请注意，这里没有res.send()之类的操作，只是按格式处理一下body
    this.format({
        text: function() {
            body = statuses[status] + '. Redirecting to ' + address
        },

        html: function() {
            var u = escapeHtml(address);
            body = '<p>' + statuses[status] + '. Redirecting to <a href="' + u + '">' + u + '</a></p>'
        },

        default: function() {
            body = '';
        }
    });

    // ...
    // 根据method决定是否有返回值
    if (this.req.method === 'HEAD') {
        this.end();
    } else {
        this.end(body);
    }
};
```

### 10.3 重定向

URL重定向是在浏览器端完成的，而URL重定向与HTTP状态码和Location头有关。浏览器首先会判断状态码，只有当状态码是：301或302时，才会根据Location头中的URL进行跳转。
如果res.redirect()中默认状态码为302，所以基本都能重定向成功，但是如果设置状态码非301或302，则无法重定向，如下

```bash
res.redirect(200, 'http://blog.qualc.cn');// 不能重定向
```

## 十一、res.location(url)

### 11.1 入参

url参数可以是一个绝对路径、相对路径、标准URL或是'back'。当path是'back'时，响应的Location头会被设置为当前请求的Referer头，当Referer头不存在时会被设置为'/'。
Express通过Location头将指定的URL字符串传递给浏览器，它并不会对指定的字符串进行验证（除'back'外）。而浏览器则负责将当前URL重定义到响应头Location中指定的URL。

```{.line-numbers}
res.location('/#');
res.location('http://blog.qualc.cn');
res.location('back');
```

### 11.2 源码分析

```{.line-numbers}
res.location = function location(url) {
    var loc = url;

    // 如果参数是back
    if (url === 'back') {
        loc = this.req.get('Referrer') || '/';
    }
    // 设置Location头
    return this.set('Location', encodeUrl(loc));
};
```

### 11.3 实现重定向

同res.redirect() 一样，区别是redirect() 默认设置了statuCode， 而location则需要开发手动设置

```{.line-numbers}
res.location('http://blog.qualc.cn');
res.statusCode = 301;
res.end('响应的内容');

// 或
res.location('http://blog.qualc.cn');
res.send(302);
```

## 十二、res.render()

### 12.1 入参

```{.line-numbers}
res.render(view, options);
res.render(view, (err, text)=>if(!err)=>res.send(text));
res.render(view, options, (err, text)=>if(!err)=>res.send(text));
```

如果callback不传，则render结束默认调用res.send(html)将结果推送给浏览器,如果传了callback，则由开发者自己决定什么时候调用send()

### 12.2 源码分析

```{.line-numbers}
var app = this.req.app;
    var done = callback;
    var opts = options || {};
    var req = this.req;
    var self = this;

    // 判断第二个参数是options还是callback
    if (typeof options === 'function') {
        done = options;
        opts = {};
    }

    // 将res.locals合并到options
    opts._locals = self.locals;

    // 这里是在没有传callback的情况下，默认直接调用res.send()；
    done = done || function(err, str) {
        if (err) return req.next(err);
        self.send(str);
    };

    // 调用application模块的render对象,req.app就是application
    app.render(view, opts, done);
```

>[Express Application(没开始)](http://blog.qualc.cn)

## 十三、 res.format(obj)

根据request heards accepts所能接受的格式，来响应不同的内容。

### 13.1 栗子

```{.line-numbers}
res.format({
    'text/plain': function(){
        res.send('hey');
    },
    'text/html': function(){
        res.send('<p>hey</p>');
    },
    'application/json': function(){
        res.send({ message: 'hey' });
    },
    'default': function() {
        res.status(406).send('Not Acceptable');
    }
});
```

### 13.2 源码分析

```{.line-numbers}
res.format = function(obj) {
    // ...

    // 获取default执行方法，并从obj中删除该节点，方便检查accepts类型
    var fn = obj.default;
    if (fn) delete obj.default;
    var keys = Object.keys(obj);

    // 是否存在符合request heards接受的sccepts格式，req.accepts()返回一个符合的key
    var key = keys.length > 0 ?
        req.accepts(keys) :
        false;

    this.vary("Accept");

    if (key) { // key有， 设置头并执行函数体
        this.set('Content-Type', normalizeType(key).value);
        obj[key](req, this, next);
    } else if (fn) {// key没有，但是存在defalut函数体
        fn();
    } else {// 默认回应406状态,并抛出Not Acceptable异常
        var err = new Error('Not Acceptable');
        err.status = err.statusCode = 406;
        err.types = normalizeTypes(keys).map(function(o) { return o.value });
        next(err);
    }

    return this;
};
```

## 十四、res.vary(field)

设置vary header头  
vary介绍，我百度了一下大概介绍。
> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Vary)  
> [恩恩先生的博客](https://www.cnblogs.com/engeng/articles/5981582.html) ☆

### 14.1、入参

参数为一个字符串或者一个数组

```bash {.line-numbers}
res.vary('Accept')
res.vary(['Accept', 'User-Agent'] )
```

### 14.2、源码分析

```bash {.line-numbers}
// response.js
res.vary = function(field) {
    // 判断入参
    if (!field || (Array.isArray(field) && !field.length)) {
        deprecate('res.vary(): Provide a field name');
        return this;
    }
    // 添加field到当前res对象
    vary(this, field);

    return this;
};
```

入参追到vary header的操作在node_modules/vary模块

```bash {.line-numbers}
vary/index.js
function vary(res, field) {
    if (!res || !res.getHeader || !res.setHeader) {
        // quack quack
        throw new TypeError('res argument is required')
    }
    // 判断入参类型
    var val = res.getHeader('Vary') || ''
    var header = Array.isArray(val) ?
        val.join(', ') :
        String(val)
    // 合并入参得到新的vary value,设置给Vary头
    if ((val = append(header, field))) {
        res.setHeader('Vary', val)
    }
}
```

## 十五、 res.append(field, val)

为指定的field头附加值，如果field未设置则创建改field头并赋值

### 15.1 栗子

```{.line-numbers}
res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
res.append('Warning', '199 Miscellaneous warning');
```

### 15.2 源码分析

```{.line-numbers}
res.attachment = function attachment(filename) {
    // 设置content-type
    if (filename) {
        this.type(extname(filename));
    }
    // 设置Content-Disposition头
    this.set('Content-Disposition', contentDisposition(filename));
    return this;
};
```

### 十六、res.attachment(filename)

添加附件

### 16.1 源码分析

```{.line-numbers}
res.attachment = function attachment(filename) {
    // 设置content-type
    if (filename) {
        this.type(extname(filename));
    }
    // 设置Content-Disposition头
    this.set('Content-Disposition', contentDisposition(filename));

    return this;
};
```

### 十七、res.set(field [, value])、res.header(field [, value])

设置响应头信息，两个是相等的

### 17.1 入参

当存在两个入参时，field为head头字段，value为值,可以是字符串，可以是数组。当只存在一个参数时，field必须为对象

```{.line-numbers}
res.set('Accept', ['application/json', 'text/plan']); // 会生成两个Accept头
res.set('Accept', 'application/json');
res.set({ Accept: 'text/plan', "X-API-key": 'tobi' });
```

其他格式入参，则会产生异常或者设置无效头

```{.line-numbers}
res.set('abc');
// 响应头会添加  0:a   1:b  2:c 三个无效的头信息

res.set(['application/json', 'text/plan']);
// 响应头会添加  0:application/json   1:text/plan  三个无效的头信息

res.set({ Accept: 'text/plan', "X-API-key": 'tobi' }, 'tobi');
// 会抛出异常  TypeError: field.toLowerCase is not a function (源码是先判断了参数个数，而非先判断第一个参数的类型是不是对象)

res.set('Content-Type', ['text/plan', 'text/html']);
// 这个也是错的，Content-Type的值不能是数组  TypeError: Content-Type cannot be set to an Array
```

### 17.2 源码分析

```{.line-numbers}
res.set = res.header = function header(field, val) {
    // 嘛，判断参数是2个，就直接进入if，如果第一个参数是非字符串~~全挂。
    // TypeError: field.toLowerCase is not a function
    if (arguments.length === 2) {
        // ...

        // 这里决定了参数是两个后，第一个参数必须是字符串~~
        // 多content-type做特殊处理，判断value非数组，补齐charset
        if (field.toLowerCase() === 'content-type') {
            if (Array.isArray(value)) {
                throw new TypeError('Content-Type cannot be set to an Array');
            }
            if (!charsetRegExp.test(value)) {
                var charset = mime.charsets.lookup(value.split(';')[0]);
                if (charset) value += '; charset=' + charset.toLowerCase();
            }
        }
        // 设置头, 继承自http.ServerResponse
        this.setHeader(field, value);
    } else {
        // 其他参数情况， 只遍历第一个参数。是虫是马还是bug就看入参类型了
        for (var key in field) {
            this.set(key, field[key]);
        }
    }
    return this;
};
```

## 十八、 res.cookie(name，value [，options])

设置cookie

### 18.1 入参　　

```{.line-number}
res.cookie('test', {value: 'test'});
res.cookie('test2', 'test', {maxAge: 1000 * 1000 * 6})
```

- name 名称key, 不能是中文
- value 值
- options

|属性|类型|描述
|:-:|:-:|:-:|:-:|
|domain|string  | Cookie的域名。默认为应用程序的域名。
encode|function |用于cookie值编码的同步函数。默认为encodeURIComponent。
expires|date|以GMT格式的cookie的有效日期。如果未指定或设置为0，则创建会话cookie。
httpOnly|boolean|将cookie标记为仅可由Web服务器访问。
maxAge|number|方便的选项，用于设置相对于当前时间的到期时间（以毫秒为单位）。
path|string|Cookie的路径。默认为“/”。
secure|boolean|将cookie标记为仅与HTTPS一起使用。
signed|boolean|指示是否应该对cookie进行签名。 req.secret必须有值
sameSite|boolean 或 string|“SameSite” Set-Cookie属性的值。更多信息请访问[tools.ietf.org](https://tools.ietf.org/html/draft-ietf-httpbis-cookie-same-site-00#section-4.1.1)。

### 18.2 源码分析

```{.line-numbers}
res.cookie = function(name, value, options) {
    var opts = merge({}, options);
    var secret = this.req.secret;
    var signed = opts.signed;

    if (signed && !secret) {
        throw new Error('cookieParser("secret") required for signed cookies');
    }
    // 如果是对象，stringify并标记j:
    var val = typeof value === 'object' ?
        'j:' + JSON.stringify(value) :
        String(value);
    // 如果加密。标记s: 并加密
    if (signed) {
        val = 's:' + sign(val, secret);
    }

    // 设置有效时间
    if ('maxAge' in opts) {
        opts.expires = new Date(Date.now() + opts.maxAge);
        opts.maxAge /= 1000;
    }

    if (opts.path == null) {
        opts.path = '/';
    }

    // 最佳set-cookid头，  cookie.serialize中对参数和optiosn各项进行类型验证
    this.append('Set-Cookie', cookie.serialize(name, String(val), opts));

    return this;
};
```

## 十八、 res.clearCookie(name [，options])

清除cookie, 其实就是重新设置一个cookie，把值设为'',过期时间设为1970年。

```{.line-numbers}
res.cookie('test', 'value');
res.clearCookie('test');
// 响应头会添加两条set-Cookie
// Set-Cookie: test=value; Path=/
// Set-Cookie: test=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT
```

### 18.1 源码分析

```{.line-number}
res.clearCookie = function clearCookie(name, options) {
    // 默认expires 为过期时间
    var opts = merge({ expires: new Date(1), path: '/' }, options);
    // 设置一个''值
    return this.cookie(name, '', opts);
};
```