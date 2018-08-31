<template>
    <div class="search">
        <div v-bind:style="{width: !panelShow ? (leftWidth || 5) + 'rem' : '0'}" class="search-left">
            <slot></slot>
        </div>
        <div class="search-input">
            <form action="#" onSubmit="return false">
                <i class="iconfont icon-sousuo"></i>
                <input @keyup.13="submitFn($event)" type="search"
                    v-on:focus.self="show" placeholder="小区、商圈、地铁">
            </form>
        </div>
        <div :style="{width: panelShow ? '3rem' : '0'}"  @click="hide" class="search-cannel">取消</div>
        <search-panel
            :style="{animation: animation + ' .6s forwards'}"
            ref="panel"></search-panel>
    </div>
</template>
<script>
import searchPanel from './search-panel.vue';
export default {
    name: 'search',
    data(){
        return {
            panelShow: null
        }
    },
    props: ['leftWidth'],
    computed: {
        animation() {
            return this.panelShow == null ? '' : this.panelShow ? 'begin' : 'end'
        }
    },
    components:{
        'search-panel' : searchPanel
    },
    methods: {
        show() {
            this.panelShow = true;
        },
        hide() {
            // let obj = this.$refs.panel.$el;
            // obj.style.animation="end .6s forwards"
            // setTimeout( () => this.panelShow = false , 500)
            this.panelShow = false;
        },
        // @keyup.13
        // 键盘代码13  回车 or 搜索 按钮
        submitFn({target}) {
            if(this.$route.query.reload == 1) {
                this.$router.replace('/list?houseName=' + target.value);
                this.$router.go(0)
            } else {
                this.$router.push('/list?reload=1&houseName=' + target.value)
            }

            // this.$router.push('/list?houseName=' + target.value)
            //this.$router.go({name: 'user', params: {userId: 1}});
        }
    },
    // vue-router 导航钩子
    beforeRouteLeave(){

    }
}
</script>
<style scoped>
    .search{
        display: -webkit-flex; /* Safari */
        display: flex;
        /*flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto*/
        flex: 0 0 3rem;
        padding: 0 1rem;
        /*height: 3rem;*/
        line-height: 3rem;
        border-bottom: 1px solid #ddd;
    }
    .search-left,
    .search-input,
    .search-cannel{
        float: left;
        margin-top: .6rem;
        height: 1.8rem;
        line-height: 1.8rem;
    }
    .search-left,
    .search-cannel{
        /*flex-shrink: 0;*/
        flex-grow: 1;
        transition: width .6s;
        overflow: hidden;
    }
    .search-left{
        /*margin-right: 1rem;*/
        /*width: 5rem;*/
        text-align: center;
    }
    .search-cannel{
        margin-left: 1rem;
        color: #666;
        width: 3rem;
    }

    /*移除搜索框的叉叉图标*/
    /*::-webkit-search-cancel-button { display: none; }*/
    .search-input{
        flex-grow: 2;
        width: 100%;
        padding-left: .5rem;
        border-radius: .3rem;
        background-color: #efefef;
    }
    .search-input input{
        margin-left: .2rem;
        width: 88%;
    }
</style>