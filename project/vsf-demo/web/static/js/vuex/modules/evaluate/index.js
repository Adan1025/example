import actions from './actions.js';
const getters = {};
const mutations = {};

export default {
    // 命名空间  局部
    namespaced: true,
    state: {
        userinfo: {
            id: 0,
            name: '--',
            position: '--'
        },
        curriculumList: []
    },
    getters,
    actions,
    mutations
}
