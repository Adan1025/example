'use strict';
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './vuex/store.js';
import routes from './router/route.js';
import axios from './common/axios.js';
import '../js/common/CommFunc.js';
import '../css/layout.scss';
import Components from './components/index.js';
import IndexVue from './views/index.vue';

Vue.use(VueRouter);
Vue.use(Components);
Vue.use(axios);


const router = new VueRouter({
    // 默认hash
    // mode: 'history',
    routes
});

const app = new Vue({
    el: '#app',
    components: {
        [IndexVue.name]: IndexVue
    },
    router,
    store
});