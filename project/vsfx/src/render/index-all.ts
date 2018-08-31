
// router.js
const Vue = require('vue')
const { SfMain } = require('./views/index')
const { createRouter } = require('./router')
const renderToString = require('vue-server-renderer').createRenderer().renderToString
export const createApp = (data = {}) => {
    console.log(data)
    // 创建 router 实例
    const router = createRouter()
    const app = new Vue({
        // 注入 router 到根 Vue 实例
        template: '<sf-main :authorInfo="authorInfo"></sf-main>',
        router,
        data,
        components: {
            [SfMain.name]: SfMain
        }
    })

    // 返回 app 和 router
    return { app, router }
}

export const CheckRouter = (url, data) => {
    // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
    // 以便服务器能够等待所有的内容在渲染前，
    // 就已经准备就绪。
    return new Promise((resolve, reject) => {
        const { app, router } = createApp(data)
        // 设置服务器端 router 的位置
        router.push(url)

        // 等到 router 将可能的异步组件和钩子函数解析完
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            // 匹配不到的路由，执行 reject 函数，并返回 404
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }
            // Promise 应该 resolve 应用程序实例，以便它可以渲染
            resolve(app)
        }, reject)
    })
}
const renderer = async (url, data) => {
    let app = await CheckRouter(url, data);
    let html = await renderToString(app);
    console.log(html);
    return html;
}
export default renderer;