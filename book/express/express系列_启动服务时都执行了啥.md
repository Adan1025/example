# Express express系列_启动服务和响应请求都执行了啥

## 启动服务

```bash{.line-numbers}
const createApplication = require('express');
const app = createApplication();
const router = express.Router();


router.get('/test', function (req, res, next) {
    res.end('router');
});
app.use(router)

app.get('/test1', function (req, res, next) {
    res.end('app');
});

var server = app.listen(3001, function () {
    let { address: host, port } = server.address();
    console.log('Example app listening at http://%s:%s', host, port);
});
```

1. 首先通过[express模块](http://#)导出的`createApplication()`创建一个app实例, 内部调用`app.init();`(继承自application模块),`app.init()`会调用`application.defaultConfiguration()`设置一些默认的参数头,其中有一个默认的参数头为"query parser", `this.set('query parser', 'extended');`,最终会得到`this.set('query parser fn', parseExtendedQueryString)`
2. `express.Router()`建立一个router中间件, 中间件本身存在一个自己的stack队列
3. `app.use(router)`挂载中间件, 内部调用的是`router.use()`,生成layer对象,加入app的stack队列中
4. 执行`app.get(path,fn);`(继承自application模块),内部先执行`lazyrouter()`创建基路由(懒加载router),
5. 在`lazyrouter()`中,如果this._router不存在则实例化一个Router对象,得到一个`this._router`对象,调用`router.use()`注册中间件,每调用一次`router.use()` 都会生成一个Layer对象,并添加在Router作用域(router/index.js)的stack队列中,在lazyrouter()中会调用两次`router.use()`;
6. `router.use()`第一次注册了一个`query()`中间件, `this._router.use(query(this.get('query parser fn')))`, 这个是把每次request的querystring从'key1=val1&key2=val2'转为对象'{key1: val1, key2: val2}'
7. `router.use()`第二次注册了一个`middleware.init()`中间件,`this._router.use(middleware.init(this))`, 这里面设置`x-powered-by`头,并且将每一次request的req,res对象的__protp__分别指向`app.req`, `app.res`
8. 之后继续执行`route = this._router.route(path);`,其中会分别实例化一个Route对象和Layer对象,`layer.route = route;this.stack.push(layer);`, 继续push到全局的`stack`中区
9. 然后调用`router[method].apply()`,其中也会分别实例化一个Route对象和Layer对象,`layer.route = route;this.stack.push(layer);`, 这个`stack`是Route作用域的`stack`,和Router的`stack`不是同一个对象,Router.stack存放所有的路由handle和中间件,而Route只存放路由handle
10. `app.listen(port, fn)`, 调用http模块的listen,监听端口并执行callback,启动完成

## express.Router()加载路由

1. `const router = express.Router()`, 调用`Router(router/index.js)`实例化一个router
2. 调用`proto[method]()` -> `router[method]()` -> `route[method]()`

## 响应request

在执行`createApplication()`创建一个app实例时, 有一个`app = (req,res,next)=>{app.handle(req,res,next);}`的定义, 接受请求从http_server响应到执行`app.bandle()`, 这个handle继承自application,  `app.handle()` -> `application.handle()` -> `router.handle()`, 在`router.handle()` 通过调用和传递局部next()函数遍历执行router.stack中的layer对象,如果layer.path存在,则先验证path,不通过就continue.如上实例代码,请求`http://localhost:3001/test1`; 依次执行name为`query`、`expressInit`(执行middleware.init()时注入)、`bound dispatch`(这个就是路由的layer对象了)的layer对象的handle, 如果handle中存在调用或间接调用`res.end()`(继承自OutgoingMessage.prototype.end())则响应请求,如果存在`next()` 调用则继续调用下一个路由|中间件.

### app.get()

1. _http_server响应请求并执行`app.handle`
2. 调用`router.handle()`, 执行局部定义的next()函数
3. next()中通过while遍历Router.stack中所有的layer对象,`layer = stack[idx++];`得到当前layer项,`match = matchLayer(layer, path);`如,果match得值为true,则跳出循环,等执行回调next()函数继续遍历
4. 跳出while后,如果match为false,直接执行handler
5. match为true,则调用self.process_params(layer, paramcalled, req, res, function callback(err){});
6. 如果传入的layer对象存在keys属性 并且存在值,。。。
7. keys属性为空或者空数组,调用callback(), 执行`layer.handle_request(req, res, next);`执行layer的handle函数,也就是路由或中间件的hanlde,layer存在route属性表示为路由对象,直接执行``layer.handle_request(req, res, next);`,不存在route属性表示为中间件,通过`trim_prefix()`来调用执行.
8. res.end()响应请求|next()下个路由|响应404

### router.get()

router.get() 和app.get() 1-7 相似,不同的是router也是一个中间件的形式存在, express.Router()形成了一个新的router对象, 通过`app.use(router)`以中间件的形式挂载在app中

```bash {.line-number}
// router/index.js
var proto = module.exports = function (options) {
    var opts = options || {};
    function router(req, res, next) {
        router.handle(req, res, next);
    }
    //...
    router.stack = [];
    return router;
};
```

1. 同上1-7
2. 执行到router layer对象时,handel是一个rouer函数, 执行函数调用router.handle(), 重复 'app.get()'步骤 '2-8'