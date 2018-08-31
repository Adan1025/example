<template>
<div class="container">
    <div class="student">
        <img src="" alt="" class="student-img">
        <div class="student-info">
            <span class="name">{{userinfo.name}}</span>
            <span class="position">{{userinfo.position}}</span>
        </div>
        <div class="student-other">
            <span class="time">开始时间：2017-08-08</span>
            <span class="time">结束时间：2017-09-08</span>
        </div>
    </div>
    <div class="curriculum">
        <ul>
            <li v-for="item in curriculumList" class="curriculum-item"><span>{{item.name + ' ' +item.score}}</span></li>
        </ul>
    </div>
</div>
</template>
<script>
    import {mapState} from 'vuex';
    export default {
        name: 'evaluateList',
        data(){
            console.log(this)
            return {
            }
        },
        computed: {
            ...mapState('evaluate', {
                userinfo: state => state.userinfo,
                curriculumList: state => state. curriculumList
            })
        },
        mounted() {
            this.$store.dispatch('getStudentInfo');
            // this.$.get('/getStudentInfo')
            //     .then( data => this.userinfo = data.results , err => console.log(err));
            // this.$.post('getCurriculumListBiId', {studentId: this.userinfo.id})
            //     .then(data => this.curriculumList = data.results, err => console.log(err));
        }
    }
</script>
<style scoped>
.container{
    font-size: .3rem;
}
.curriculum,
.dimension,
.student{
    display: block;
    padding: .2rem;
    overflow: hidden;
}
.student > * {
    display: inline-block;
    float: left;
}
.student-img{
    width: 1.5rem;
    height: 1.5rem;
}
.student-other span,
.student-info span{
    display: block;
    height: .75rem;
    line-height: .75rem;
}
.student-info{
    padding: .1rem .3rem;
    width: 2.5rem;
    height: 1.5rem;
    box-sizing: border-box;
}
.student-other{
    float: right;
}
.curriculum-item{
    display: inline-block;
    float: left;
    margin-top: .1rem;
    width: 25%;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    font-size: .2rem;
    box-sizing: border-box;
}
.curriculum-item > span{
    display: block;
    width: 80%;
    height: 100%;
    border: 1px solid #efefef;
    box-sizing: border-box;
}
</style>