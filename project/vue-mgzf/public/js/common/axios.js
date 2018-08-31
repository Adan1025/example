import axios from 'axios';

// 返回值统一拦截
axios.interceptors.response.use(
    response => {
        return response.data;
    },
    ({response:{status, statusText, data}}) => {
        return Promise.reject({
            status,
            statusText,
            data
        })   // 返回接口返回的错误信息
});

export default {
    //核心部分，在我们使用Vue.use()时，自动调用的是install
    install(Vue){
　　　　Vue.prototype.$ = axios
    }
}

// exports.instal = Vue => Vue.prototype.$ = axios