const getters = {}
const actions = {};
const mutations = {
    setArticleList(state, articleList) {
        // state.firstLoad = false;
        if(!articleList){
            state.articleList = [];
        } else {
            state.articleList.push(...articleList);
        }
    },
    setArticleInfo(state, articleinfo = {}) {
        state.articleinfo = articleinfo;
    },
    setArticleClassify(state, articleClassify=[]) {
        state.articleClassify = articleClassify;
    }
};


export default {
    // 命名空间  局部
    namespaced: true,
    state: {
        firstLoad: true,
        articleList: [],
        articleClassify: [],
        articleinfo: {}
    },
    getters,
    actions,
    mutations
}