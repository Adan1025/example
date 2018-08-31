<template>
    <div>
        <sf-navbar title="测试">
            <span slot="left" @click="goBack"><返回</span>

        </sf-navbar>
        <transition :name="transitionName">
            <router-view class="child-view"></router-view>
        </transition>
    </div>
</template>
<script>
    import Navbar from '../../navbar/index.js';
    // import Route,{checkRoute} from './route.js';
    export default{
        name: 'sf-vpp',
        data(){
            return {
                defaultTransitionName: '', // 强制指定路由，借用数组的pop， 默认返回时调用
                transitionName: 'slide-left'  // 默认动态路由变化为slide-right
            }
        },
        components:{
            Navbar
        },
        methods:{
            goBack(){
                if(this.$router){
                    // this.defaultTransitionName = ['slide-left'];
                    this.defaultTransitionName = 'slide-left';
                    this.$router.go(-1);
                } else {
                    window.location.back();
                }
            }
        },
        watch: {
    　　　 '$route' (to, from) {
                    this.transitionName = !!this.defaultTransitionName ?
                                            this.defaultTransitionName : 'slide-right';
                    this.defaultTransitionName = null;
                // this.transitionName = this.defaultTransitionName.length > 0 ?
                //                             this.defaultTransitionName.pop() : 'slide-right'
                // 本地路由模式
                // this.transitionName = checkRoute(to.path, from.path) ? 'slide-right' : 'slide-left';
　　　　　　}
    　  }
    }
</script>
<style scoped>
    .navbar{
        height: .8rem;
        line-height: .8rem;
        border-bottom: 2px solid #ccc;
        font-size: .32rem;
        text-align: center;
    }
    .navbar-left{
        float: left;
        padding-left: .1rem;
    }
    .navbar-right{
        float: right;
        padding-right: .1rem;
    }
    .child-view {
        position: relative;
        transition: all .4s cubic-bezier(.55,0,.1,1);
        background-color: #fff;
        width: 100%;
        box-sizing: border-box;
    }
    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(-60px, 0);
        transform: translate(-60px, 0);
    }
    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(180px, 0);
        transform: translate(180px, 0);
    }
</style>
</style>