'use strict';
import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

import author from './modules/author.js';
import article from './modules/article.js';

Vue.use(Vuex);



let store = new Vuex.Store({
    // 插件挂载
    // 很多插件不推荐在生产用 所以借助构建工具来处理Webpack 或 Browserify
    modules: {
        author,
        article
    },
    // 组件调用store.state.xxx
    state: {
        ix: 0
        // $: Vue.prototype.$
    },
    getters: {
        ...getters,
    },
    actions: {
        ...actions
    },
    mutations
});
// 注册模块 `list`
// store.registerModule('evaluate', evaluateStore);
export default store;