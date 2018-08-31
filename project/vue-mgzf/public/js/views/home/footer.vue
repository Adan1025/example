<template>
<div class="footer">
    <ul class="footer-box">
        <li class="footer-item cur">
            <i class="iconfont icon-zufang footer-icon"></i>
            <span>首页</span>
        </li>
        <li class="footer-item">
            <i></i>
            <span>心愿单</span>
        </li>
        <li class="footer-item">
            <i></i>
            <span>我</span>
        </li>
    </ul>
</div>
</template>
<script>
export default {
    name: 'footer',
    data(){
        return {}
    }
}
</script>
<style scoped>
.footer{
    /*position: fixed;
    bottom: 0;*/
    width: 100%;
    /*height: 2.8rem;*/
    /*flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto*/
    flex: 0 0 2.8rem;
}
.footer-box{
    display: flex;
    padding: .3rem;
    height: 2.2rem;
    justify-content: space-around;
    background-color: #fff;
    border-top: 1px solid #ededed;
    align-items: flex-end;
}

.footer-item{
    width: 3rem;
    text-align: center;
    font-size: .8rem;
}
.footer-icon{
    display: block;
    height: 1.2rem;
}
.cur{
    color: #FF5809;
};
</style>