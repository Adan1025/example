// 异步提交
import { houseList } from '../json/data.js';
export default {
    getHouseList: async function({state}, params){
        // await this.axios.post('/getHouseList', {userName, userPass});
        let dao = await sleep(),
            houseName = params.houseName || '',
            arr = [];
        arr.push({name: houseName || '长征佳苑', path: '/tj', list: dao.houseList(params)});
        console.log(arr);
        state.houseList = arr;
    },
    getHouseHome: async function({state}){
        let dao = await sleep(),
            arr = [];
        arr.push({name: '推荐房源', path: '/tj', list: dao.houseList()});
        arr.push({name: '热门房源', path: '/rm', list: dao.houseList()});
        console.log(arr);
        state.houseHomeList = arr
    }
}

var sleep = function () {
    return new Promise(function (resolve, reject) {
        console.log('开始请求假数据')
        setTimeout(function () {
            console.log('请求假数据成功，耗时500ms');
            resolve(require('../json/data.js'));
        }, 500);
    })
};