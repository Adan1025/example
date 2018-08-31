export
default [{
    path: '/',
    name: 'article',
    component: require('../views/article/sfArticle.vue')
    // component:  resolve => require(['@views/users/users.list.vue'], resolve),
},{
    path: '/article/:type?',
    name: 'article',
    component: resolve => require(['../views/article/sfArticle.vue'], resolve)
}, {
    path: '/articleinfo/:id',
    name: 'articleinfo',
    component: resolve => require(['../views/article/sfArticleInfo.vue'], resolve)
}, {
    path: '/articleclassify/:type',
    name: 'articleclassify',
    component: resolve => require(['../views/article/sfArticleClassify.vue'], resolve)
}, {
    path: '/articlelist/:type/:id',
    name: 'articlelist',
    component: resolve => require(['../views/article/sfArticleList.vue'], resolve)
}, {
    path: '/authorlist',
    name: 'authorlist',
    component: resolve => require(['../views/author/sfAuthorList.vue'], resolve)
}]