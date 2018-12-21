'use strict';
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router/route.js';

import Element from 'element-ui';
// import {Row, Button, Menu, Table, Col, MenuItem, Breadcrumb,Dialog,Input, Form, FormItem, BreadcrumbItem,TableColumn,Upload,Alert,Loading,MessageBox,Message, Submenu, MenuItemGroup, Select, Option, Pagination, Tag, Radio, RadioGroup, DatePicker, Checkbox,CheckboxGroup} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios';

Vue.use(VueRouter);
Vue.use(Element);

// 创建子类，避免配置污染全局
let axiosIns = axios.create({});

// 设定子类的配置信息
// axiosIns.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
axiosIns.defaults.baseURL = 'http://result.eolinker.com/XCWDk8vf3194a900bd181efd99f88335ecd69c25691d3f0?uri=';
// 子类的拦截器，对结果是否正常做出判断
axiosIns.interceptors.response.use(
    res => {
        // 对响应数据做点什么
        let data = res.data;
        let status = res.status;
        if (status === 200 || status === 304 || status === 201) {
            status = data.status;
            if (status === 998) {
                app.$router.push({
                    path: '/login',
                    query: { redirect: app.$route.fullPath }
                });
            } else if (status === 997) {
                // app.$message.error(data.errmsg);
                app.$message.error(data.errmsg);
                return Promise.reject(res);
            } else if (status == 1) {
                return data.results;
            } else {
                app.$message.error(data.errmsg);
                return Promise.reject(res);
            }
        } else {
            return Promise.reject(res);
        }
    },
    error => {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

let ajaxMethod = ['get', 'post'];
let api = {};
ajaxMethod.forEach(method => {
    api[method] = function(uri, data, config) {
        // 对axios包装的一层
        return new Promise(function(resolve, reject) {
            if (!uri) {
                app.$message.error('request url不能为空');
            }
            if (!config || config.cache != false) {
                uri += (uri.indexOf('?') > 0 ? '&' : '?') + '_r=' + Date.now();
            }
            let loading = Element.Loading.service({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            if (method == 'get' && data) {
                data = {
                    params: data
                };
            }
            axiosIns[method](uri, data, config)
                .then(json => {
                    resolve(json);
                    loading.close();
                })
                .catch(response => {
                    // 拦截器里reject都会走到这里
                    if (response.status === 200 && response.data.status == 0) {
                        app.$message(response.data.errmsg);
                    }
                    loading.close();
                });
        });
    };
});
Vue.prototype.$ = api;

const router = new VueRouter({
    // 默认hash
    // mode: 'hash',
    routes
});

import IndexComponents from '@views/index.vue';

const app = new Vue({
    el: '#app',
    components: {
        [IndexComponents.name]: IndexComponents
    },
    router
    // store
});
