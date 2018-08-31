import actions from './actions.js';
const getters = {};
const mutations = {};

export default {
    // 命名空间  局部
    namespaced: true,
    state: {
        userinfo: {
            id: 1,
            name: '--',
            position: '--'
        },
        curriculumList: []
    },
    getters,
    actions,
    mutations
}
