'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../common/axios.js';
import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

import evaluateStore from './modules/evaluate/index';

Vue.use(Vuex);
Vue.use(axios);

let store = new Vuex.Store({
    // 插件挂载
    // 很多插件不推荐在生产用 所以借助构建工具来处理Webpack 或 Browserify
    // PRODUCTION  webpack.config 中 new webpack.DefinePlugin定义
    plugins: !!PRODUCTION ? [createLogger()] : [],
    modules:{
        evaluate: evaluateStore,
    },
    // 组件调用store.state.xxx
    state: {
        // $: Vue.prototype.$
    },
    getters:{
        ...getters,
        $: Vue.prototype.$
    },
    actions,
    mutations
});
// 注册模块 `list`
// store.registerModule('evaluate', evaluateStore);
export default store;