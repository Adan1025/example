<template>
    <div class="container">
        <search>
            <template>
                <span>上海</span>
                <i class="iconfont icon-xiala"></i>
            </template>
        </search>
        <div class="main">
            <banner></banner>
            <menus></menus>
            <template v-for="item in houseHomeList">
                <box v-bind:list="item.list">
                    <div class="box-header">
                        <span class="header-title">{{item.name}}</span>
                        <span class="headet-more">更多</span>
                    </div>
                </box>
            </template>
        </div>
        <footers></footers>
    </div>
</template>
<script>
import {mapState} from 'vuex';
import search from './comm/search.vue';
import box from './comm/box.vue';
import banner from './home/banner.vue';
import menus from './home/menu.vue';
import footers from './home/footer.vue';
    export default {
        name: 'home',
        data(){
            return {
                a: 1
            }
        },
        components: {
            search,
            banner,
            menus,
            box,
            footers
        },
        computed: mapState({
            'houseHomeList': 'houseHomeList'
        }),
        mounted() {
            this.$store.dispatch('getHouseHome');
        }
    }
</script>
<style scoped>
.container{
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction:column;
}
.main{
    flex:1;
    overflow: scroll;
}
.box{
    display: block;
    margin-top: .8rem;
    background-color: #fff;
}
.box-header{
    padding: .5rem 1rem;
    height: 2rem;
    line-height: 2rem;
}
.header-title{
    font-weight: bold;
}
.headet-more{
    float: right;
    color: #999;
}
</style>