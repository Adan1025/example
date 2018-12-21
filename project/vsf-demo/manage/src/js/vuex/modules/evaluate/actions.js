// 异步提交
export default {
    getStudentInfo: function({ state, dispatch, commit, getters, rootGetters }, params){
        return rootGetters.$.get('/getStudentInfo')
                .then( data => {state.userinfo = data.results}, err => console.log(err));
    },
    getCurriculumListBiId: function({state, rootGetters}){
        rootGetters.$.post('getCurriculumListBiId', {studentId: state.userinfo.id})
            .then(data => state.curriculumList = data.results, err => console.log(err));
    }
}