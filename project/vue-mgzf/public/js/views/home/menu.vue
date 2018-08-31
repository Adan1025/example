<template>
    <ul class="menu">
        <template  v-for="item in menuList">
            <router-link :to="item.path" tag="li" class="menu-item">
                <img class="menu-img" :src="item.imgUrl">
                <span class="menu-title">{{item.name}}</span>
            </router-link>
        </template>
    </ul>
</template>
<script>
const menuList = [
    {
        path: '/list?reload=1&labels=1',
        name: '整租',
        imgUrl: require('../../../image/menu/zf.png')
    }, {
        path: '/list?reload=1&labels=2',
        name: '合租',
        imgUrl: require('../../../image/menu/hz.png')
    }, {
        path: '/404',
        name: '月付房源',
        imgUrl: require('../../../image/menu/yffy.png')
    }, {
        path: '/404',
        name: '品牌专区',
        imgUrl: require('../../../image/menu/pp.png')
    }, {
        path: '/404',
        name: '通勤找房',
        imgUrl: require('../../../image/menu/dt.png')
    }, {
        path: '/404',
        name: '地图找房',
        imgUrl: require('../../../image/menu/ditu.png')
    }, {
        path: '/404',
        name: '报修服务',
        imgUrl: require('../../../image/menu/bx.png')
    }, {
        path: '/404',
        name: '支付房租',
        imgUrl: require('../../../image/menu/fz.png')
    }
]
export default {
    name: 'menu',
    data(){
        return {
            menuList
        }
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