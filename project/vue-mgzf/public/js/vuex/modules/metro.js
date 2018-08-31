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
    }
};


export default {
    // 命名空间  局部
    namespaced: true,
    state: {
        showTag: 'area',
        metroList: [],
    },
    getters,
    actions,
    mutations
}


