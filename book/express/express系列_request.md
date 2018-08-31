# Express Request

> [Request源码](https://github.com/expressjs/express/blob/master/lib/request.js)

## 文中常用短函数

req.get(name) 获取header

### 一、req.header(name)

```bash {.line-numbers}
req.get = req.header = function header(name) {
        // code...
        var lc = name.toLowerCase();

        // 兼容http1.0协议中错误写法Referer
        switch (lc) {
            case 'referer':
            case 'referrer':
                return this.headers.referrer ||
                    this.headers.referer;
            default:
                return this.headers[lc];
        }
    };
```

### 二、req.accepts(types)

检查给定的类型 types 是不是可以接受的类型,当是可接受的类型时返回最佳的匹配,否则返回 false(express4.x), 在这种情况下,应该返回406"Not Acceptable" 到客户端

#### 2.1 入参

```bash {.line-numbers}
req.accepts(['html', 'json']);
req.accepts('html', 'json');
req.accepts('html, json');
req.accepts('text/html');
req.accepts('html');
```

#### 2.2 源码分析

```bash {.line-numbers}
req.accepts = function() {
    // accepts接收request对象并生成新的accept对象
    var accept = accepts(this);
    return accept.types.apply(accept, arguments);
};
```

#### 2.3 例子

```bash {.line-numbers}
app.get('/', function (req, res, next) {
    switch (req.accepts(['json', 'html'])) {
        case 'json':
          res.setHeader('Content-Type', 'application/json')
          res.write('{"hello":"world!"}')
          break
        case 'html':
          res.setHeader('Content-Type', 'text/html')
          res.write('<b>hello, world!</b>')
          break
        default:
          // the fallback is text/plain, so no need to specify it above
          res.setHeader('Content-Type', 'text/plain')
          res.write('hello, world!')
          break
      }
    res.end();
});
```

#### 2.4 相关

req.acceptsCharsets(charset [,...arg])
根据请求的Accept-CharsetHTTP头字段返回指定字符集的第一个接受的字符集.如果未接受任何指定的字符集,则返回false.

req.acceptsEncodings(encoding [,...arg])
根据请求的Accept-EncodingHTTP头字段,返回指定编码的第一个接受编码.如果未接受任何指定的编码,则返回false.

req.acceptsLanguages(lang [,...arg])
根据请求的Accept-LanguageHTTP头字段返回指定语言的第一个接受语言.如果未接受任何指定语言,则返回false.

> [GitHub: accepts](https://github.com/jshttp/accepts)

### 三、 req.param(name, defaultValue)

获取指定key的参数,按顺序在req.params|req.body|req.query 中查找key对应的value,都不存在则返回默认值(官方并不推荐)

### 3.1 入参

```bash {.line-numbers}
req.param(name);
req.param(name, defaultValue);
```

```bash {.line-numbers}
// request url: http://127.0.0.1/;
req.param('age');
// Console => undefined
req.param('age', '0');
// Console => 0

// request url: http://127.0.0.1/?age=12;
req.param('age');
// Console => 12
req.param('age', '0');
// Console => 12
```

#### 3.2 源码分析

```bash {.line-numbers}
req.param = function param(name, defaultValue) {
    // 获取三个入参
    var params = this.params || {};
    var body = this.body || {};
    var query = this.query || {};

    // ...

    // 按顺序查找,找到则返回对应的value,没找到返回默认值
    if (null != params[name] && params.hasOwnProperty(name)) return params[name];
    if (null != body[name]) return body[name];
    if (null != query[name]) return query[name];

    return defaultValue;
};
```

### 五、 req.is(types)

如果传入请求的`content-type`HTTP标头字段与types参数指定的mime类型匹配,则返回匹配的内容类型,不匹配返回false.如果请求没有`content-type`,则返回null.

#### 5.1 入参

```bash {.line-numbers}
// 返回第一个匹配的types
req.param(type1 [, type2 [,...]]);
req.param([type1, type2 [,...]]);
```

```bash{.line-numbers}
// Content-Type: text/html; charset=utf-8

req.is('html');
// Console => html

req.is('text/html');
// Console => text/html

req.is('text/*');
// Console => text/*

req.is(['html', 'text/*']);
// Console => html

req.is('html', 'text/*');
// Console => html

req.is('json');
// Console => false

req.is(['json', 'application/json']);
// Console => false

// Content-Type: null
req.is('json')
// Console => null
```

#### 5.2 源码分析

```bash{.line-numbers}
req.is = function is(types) {
    var arr = types;

    // 如果第一个入参不是数组， 就把所哟逇入参都规整为数组
    if (!Array.isArray(types)) {
        arr = new Array(arguments.length);
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arguments[i];
        }
    }
    return typeis(this, arr);
};
```

> [GitHub: type-is](https://github.com/jshttp/type-is)

### 六、 req.range()

分段请求,  待实验~~~

### 七、 只读属性部分

1. req.protocol 获取协议
2. req.secure   是否是安全请求
3. req.ip  获取客户端ip地址
4. req.ips 获取客户端ip地址组
5. req.subdomains 获取子域名(二级域名、三级域名...)
6. req.path 请求地址(路由地址),域名后参数前的那一串
7. req.hostname  获取主机名，除开协议和端口的ip或者域名
8. req.host  和hostname一样，但是不推荐
9. req.xhr 通俗的说就是判断是不是ajax请求
10. req.stale 请求是否过期, 与fresh相反
11. req.fresh

```bash
请求是否“新鲜”。与req.stale相反。
如果cache-control请求标头没有no-cache指令并且满足以下任何条件，则为true：
1. if-modified-since请求报头中指定和last-modified请求头是等于或早于modified响应头。
2. if-none-match请求头是*。
3. if-none-match解析为其指令后，请求标头与etag响应标头不匹配。
```
