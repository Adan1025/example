// 异步提交
export default {
    getStudentInfo: async function({ state, dispatch, commit, getters, rootGetters }, params){
        let data = await this.$.get('/getStudentInfo');
                //.then( data => this.userinfo = data.results , err => console.log(err));
        console.log(data);
    }
}