<template>
    <ul class="menu">
        <li class="menu-item">
            <img class="menu-img" src="../../.../../../image/menu/zf.png">
            <span class="menu-title">整租</span>
        </li>
        <li class="menu-item">
            <img class="menu-img" src="../../../image/menu/hz.png">
            <span class="menu-title">合租</span>
        </li>
        <li class="menu-item">
            <img class="menu-img" src="../../../image/menu/yffy.png">
            <span class="menu-title">月付房源</span>
        </li>
        <li class="menu-item">
            <img class="menu-img" src="../../../image/menu/pp.png">
            <span class="menu-title">品牌专区</span>
        </li>
        <li class="menu-item">
            <img class="menu-img" src="../../../image/menu/dt.png">
            <span class="menu-title">通勤找房</span>
        </li><li class="menu-item">
            <img class="menu-img" src="../../../image/menu/ditu.png">
            <span class="menu-title">地图找房</span>
        </li>
        <li class="menu-item">
            <img class="menu-img" src="../../../image/menu/bx.png">
            <span class="menu-title">报修服务</span>
        </li>
        <li class="menu-item">
            <img class="menu-img" src="../../../image/menu/fz.png">
            <span class="menu-title">支付房租</span>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'menu',
    data(){
        return {}
    }
}
</script>
<style scoped>
.menu{
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    background-color: #fff;
}
.menu-item{
    width: 25%;
    margin: 1rem 0;
    text-align: center;
}
.menu-img{
    display: block;
    margin: 0 auto;
    margin-bottom: .5rem;
    width: 2rem;
}
</style>