'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

import listStore from './modules/list.js';
import metroStore from './modules/metro.js';
import conditionStore from './modules/condition.js';

Vue.use(Vuex);

let store = new Vuex.Store({
    // 插件挂载
    // 很多插件不推荐在生产用 所以借助构建工具来处理Webpack 或 Browserify
    // PRODUCTION  webpack.config 中 new webpack.DefinePlugin定义
    plugins: !!PRODUCTION ? [createLogger()] : [],
    modules:{
        list: listStore,
        condition: conditionStore,
        metro: metroStore
    },
    // 组件调用store.state.xxx
    state: {
        count: 0,
        houseList: [],
        houseHomeList: [],
        $404Msg: 'word god, 404啦'
    },
    getters,
    actions,
    mutations
});
console.log(store.state.list)
// 注册模块 `list`
// store.registerModule('list', listStore);
export default store;