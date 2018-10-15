// 用户管理
let UsertRouter = [{
    path: '/users',
    name: 'usersList',
    component: resolve => require(['@views/users/users.list.vue'], resolve),
}, {
    path: '/users/usersList',
    name: 'usersList',
    component: resolve => require(['@views/users/users.list.vue'], resolve),
}, {
    path: '/users/usersSave/:id?',
    name: 'usersSave',
    component: resolve => require(['@views/users/users.add.vue'], resolve)
}, {
    path: '/users/usersUpdate',
    name: 'usersUpdate',
    component: resolve => require(['@views/users/users.info.vue'], resolve)
}, {
    path: '/users/roleEmpoMenu/:id',
    name: 'roleEmpoMenu',
    component: resolve => require(['@views/users/role.empo.menu.vue'], resolve)
}, {
    path: '/users/roleEmpoInterface/:id',
    name: 'roleEmpoInterface',
    component: resolve => require(['@views/users/role.empo.interface.vue'], resolve)
}];

// 菜单接口管理
let PowerRouter = [{
    path: '/power',
    name: 'power',
    component: resolve => require(['@views/power/menu.list.vue'], resolve)
}, {
    path: '/power/menu',
    name: 'menu',
    component: resolve => require(['@views/power/menu.list.vue'], resolve)
}, {
    path: '/power/interface',
    name: 'interface',
    component: resolve => require(['@views/power/interface.list.vue'], resolve)
}]

// 资讯
let ArticleRouter = [{
    path: '/article',
    name: 'articleList',
    component: resolve => require(['@views/article/article.list.vue'], resolve),
}, {
    path: '/article/articleList',
    name: 'articleList',
    component: resolve => require(['@views/article/article.list.vue'], resolve),
}, {
    path: '/article/articlePulish/:id?',
    name: 'articlePulish',
    component: resolve => require(['@views/article/article.publish.vue'], resolve)
}];

// 图片
let pictureRouter = [{
    path: '/picture',
    name: 'pictureList',
    component: resolve => require(['@views/picture/picture.list.vue'], resolve)
}, {
    path: '/picture/pictureList',
    name: 'pictureList',
    component: resolve => require(['@views/picture/picture.list.vue'], resolve)
}]
export
    default [{
        path: '/',
        component: resolve => require(['@views/index.vue'], resolve)
    }, {
        path: '/login',
        name: 'login',
        component: resolve => require(['@views/login.vue'], resolve)
    }, {
        path: '/index',
        component: resolve => require(['@views/index.vue'], resolve),
        children: [{
            path: '/',
            name: 'home',
            component: resolve => require(['@views/home.vue'], resolve)
        }].concat(UsertRouter, ArticleRouter, PowerRouter)
    }]