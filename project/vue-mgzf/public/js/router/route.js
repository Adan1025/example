const Index = resolve => {
    require.ensure(['../views/home'], () => {
        resolve(require('../views/home'))
    })
};
const List = resolve => {
    require.ensure(['../views/list'], () => {
        resolve(require('../views/list'))
    })
};
const $404 = resolve => {
    require.ensure(['../views/404'], () => {
        resolve(require('../views/404'))
    })
}
export
default [{
    path: '/',
    name: 'index',
    component: Index
}, {
    path: '/list',
    name: 'list',
    component: List
}, {
    path: '/404',
    name: '404',
    component: $404
}]