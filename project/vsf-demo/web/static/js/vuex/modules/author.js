const getters = {
}
const actions = {
};
const mutations = {
    setAuthorInfo( state, authorInfo){
        state.authorInfo = authorInfo;
        document.title = authorInfo.nickName + ' | 天冰博客'
    },
    setAuthorList(state, authorList){
        state.authorList = authorList;
    }
};


export default {
    // 命名空间  局部
    namespaced: true,
    state: {
        authorInfo: {},
        authorList: []
    },
    getters,
    actions,
    mutations
}


