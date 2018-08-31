> 仿写一个蘑菇租房app的小demo， 练手
# koa-all

只是基于[Vue](https://github.com/vuejs/vue)vue的一个小demo。。

[![NPM version](https://img.shields.io/npm/v/express.svg)](https://www.npmjs.com/package/express)

## 一、简介

vue + vue-router + vuex实现

[Express](http://www.expressjs.com.cn/) 搭建web服务
[Webpack](http://webpack.github.io/docs/)构建打包

**注意：请确保你的运行环境中Nodejs的版本至少是`v4.0.0`，目前需要依赖Babel。**（当然26日凌晨`nodejs v7`已经release，你也可以不依赖Babel，直接通过`--harmony_async_await`模式启动。）

### 安装

执行命令：
```
$ git clone https://github.com/qualc/vue-mgzf.git
$ cd vue-all && npm install
```

### 运行

然后，执行命令：
```
$ npm run
```

然后访问：[http://127.0.0.1:3000](http://127.0.0.1:3000/) 就可以看到示例了！

## 三、案例说明
按照app首页写一个实现demo

### 目录结构

├── dist  
│   ├── css  
│   ├── images  
│   ├── iconfont  
│   ├── js  
│   └── index.html  
├── public  
│   ├── css  
│   ├── image  
│   ├── js  
│   ├── template  
│   └── index.html  
└── app.js  

```

其中：

* `dist`webpack编译后
* `public`前端开发
* `app`express启动文件

