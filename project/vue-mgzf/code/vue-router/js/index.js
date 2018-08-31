import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);


const A = { template: '<div>this is a</div>' }
const B = { template: '<div>this is b</div>' }
const C = { template: '<div>this is c</div>' }

// 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
const routes = [
    {path: '/a', component: A},
    {path: '/b', component: B},
    {path: '/c', component: C}
];

// 创建routes实例
const router = new VueRouter({routes});

// 创建vue实例，通过router挂载路由
const app = new Vue({
    el: '#app',
    router
});
// const app = new Vue({
//     router
// }).$mount('#app');