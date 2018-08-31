import axios from 'axios';
import CommFunc from './CommFunc';

// 创建子类，避免配置污染全局
let axiosIns = axios.create({});

// 设定子类的配置信息
// axiosIns.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

// axiosIns.defaults.baseURL = 'http://localhost:7779';
axiosIns.defaults.headers.post['Content-Type'] = 'application/jsoned';

// if(process.NODE_ENV=='develop'){
//     axiosIns.defaults.baseURL = 'https://localhost:3000';
// }
// 子类的拦截器，对结果是否正常做出判断
axiosIns.interceptors.response.use(res => {
    // 对响应数据做点什么
    let data = res.data;
    let status = res.status;
    if (status === 200 || status === 304 || status === 201) {
        status = data.status;
        if (status === 0) {
            // app.$message.error(data.errmsg);
            return Promise.reject(res);
        } else {
            return data.results;
        }
    } else {
        return Promise.reject(res);
    }
}, error => {
    // 对响应错误做点什么
    return Promise.reject(error)
});

interface apiConfg {
    cache?: boolean,
}
interface apiData {
    identity?: string,
}
interface apiObj {
    get?: any,
    post?: any,
}
let ajaxMethod = ['get', 'post'];
let api = <apiObj>{};
ajaxMethod.forEach((method) => {
    api[method] = function (uri, data = <apiData>{}, config = <apiConfg>{}) {
        // 对axios包装的一层
        return new Promise(function (resolve, reject) {
            if (!uri) {
                // app.$message.error('request url不能为空');
            }
            if (!config || config.cache != false) {
                uri += (uri.indexOf('?') > 0 ? '&' : '?') + '_r=' + Date.now();
            }
            let identity = CommFunc.getSessionStorage('authoridentity');
            if (identity) {
                if (method == 'post') {
                    data.identity = identity;
                } else {
                    uri += (uri.indexOf('?') > 0 ? '&' : '?') + 'identity=' + identity;
                }
            }
            axiosIns[method](uri, data, config).then((json) => {
                resolve(json);
            }).catch((response) => {
                // 拦截器里reject都会走到这里
                if (response.status === 200 && response.data.status == 0) {
                    // app.$message(response.data.errmsg);
                    console.log(response.data.errmsg)
                }
            })
        })
    }
});

export default api