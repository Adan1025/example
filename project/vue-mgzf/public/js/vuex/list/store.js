import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

// 如果启用命名空间后 变成私有  getters等不在公用
export default {
    state: {
        showTag: '1',
        sort: 'dest',
        metroList: [],
    },
    getters,
    actions,
    mutations
}
