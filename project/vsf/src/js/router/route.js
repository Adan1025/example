// 用户管理
let UsertRouter = [{
    path: '/users/usersList',
    name: 'usersList',
    component: resolve => require(['@views/users/usersList.vue'], resolve)
}];

// 菜单接口管理
let PowerRouter = [];

// 资讯
let ArticleRouter = [];

// 图片
let pictureRouter = [];

// 默认首页 并合并其他模块的路由
export default [
    {
        path: '/',
        component: resolve => require(['@views/index.vue'], resolve)
    },
    {
        path: '/login',
        name: 'login',
        component: resolve => require(['@views/login.vue'], resolve)
    },
    {
        path: '/index',
        component: resolve => require(['@views/index.vue'], resolve),
        children: [
            {
                path: '/',
                name: 'home',
                component: resolve => require(['@views/index.vue'], resolve)
            }
        ].concat(UsertRouter, ArticleRouter, PowerRouter, pictureRouter)
    }
];

// @views  是在config/webpack.base.js 的 resolve.alias 配置中定义的别名，只要在这里定义了key:value之后就可以用别名来访问文件了
// key是别名，  value是某个目录的绝对地址
// 如@views 就表示项目的/src/js/views 目录
// @views/index.vue 就是/src/js/views/index.vue文件了
