'use strict';
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './vuex/store.js';
import routes from './router/route.js';
// import mixin from './common/mixin.js';
import Vpp from './components/vpp.vue';
import '../css/layout.css';
import '../css/iconfont/iconfont.css';

Vue.use(VueRouter);
// Vue.mixin(mixin)
const router = new VueRouter({
    // 默认hash
    // mode: 'history',
    routes
});

const app = new Vue({
    el: '#app',
    components:{
        Vpp: Vpp
    },
    router,
    store
});