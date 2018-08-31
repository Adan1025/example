// router.js
const Vue = require('vue')
const Router = require('vue-router')
Vue.use(Router)


const SfArticleInfo = () => import('./views/articleInfo')

export const createRouter = () => {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/articleinfo/:id',
                name: 'articleinfo',
                component: SfArticleInfo
            }
        ]
    })
}