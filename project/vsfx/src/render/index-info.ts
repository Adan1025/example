
const Vue = require('vue')
const { SfArticleInfo } = require('./views/articleInfo')
const renderToString = require('vue-server-renderer').createRenderer().renderToString
const renderHtml = async (data = { articleinfo: {} }) => {
    // 创建 router 实例
    const app = new Vue({
        data,
        template: '<sf-article-info :articleinfo="articleinfo"></sf-article-info>',
        components: {
            [SfArticleInfo.name]: SfArticleInfo
        }
    })
    return await renderToString(app);
}
export default renderHtml;