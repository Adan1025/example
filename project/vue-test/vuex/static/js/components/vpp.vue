<template>
    <div>
        <Navbar></Navbar>
        <transition :name="transitionName">
            <router-view class="child-view"></router-view>
        </transition>
    </div>
</template>
<script>
    import Navbar from './navbar.vue';
    export default{
        name: 'vpp',
        data(){
            return {
                transitionName: 'slide-left'  // 默认动态路由变化为slide-right
            }
        },
        components:{
            Navbar
        },
        watch: {
    　　　 '$route' (to, from) {
　　　　　　    const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                this.transitionName = toDepth > fromDepth ? 'slide-right' : 'slide-left';
　　　　　　}
    　  }
    }
</script>
<style scoped>
    .navbar{
        height: .8rem;
        line-height: .8rem;
        border-bottom: 1px solid #cdcdcd;
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
        position: absolute;
        transition: all .4s cubic-bezier(.55,0,.1,1);
        background-color: #fff;
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