const Index = resolve => {
    require.ensure(['../views/home'], () => {
        resolve(require('../views/home'))
    })
};
const Evaluate = resolve => {
    require.ensure(['../views/evaluate/student'], () => {
        resolve(require('../views/evaluate/student'))
    })
};
const Dimension = resolve => {
    require.ensure(['../views/evaluate/dimension'], () => {
        resolve(require('../views/evaluate/dimension'))
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
    path: '/evaluate/student',
    name: 'evaluate',
    component: Evaluate
},{
    path: '/evaluate/dimension',
    name: 'dimension',
    component: Dimension
}, {
    path: '/404',
    name: '404',
    component: $404
}]