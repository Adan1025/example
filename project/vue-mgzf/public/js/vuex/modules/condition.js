const getters = {
    metroList: state => state.metroList,
    showTag: state => state.showTag,
    sort: state => state.sort,
}
const actions = {};
const mutations = {
    showMetroList: function(state, payload){
        state.metroList = payload.metroList;
        state.showTag = 'metro';
    },
    updateShowTag: function(state, tag){
        state.showTag = tag;
    }
};


export default {
    // 命名空间  局部
    namespaced: true,
    state: {
        showTag: null,
        sort: 'dest'
    },
    getters,
    actions,
    mutations
}


