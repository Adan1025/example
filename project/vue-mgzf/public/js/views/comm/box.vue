<template>
<div class="box">
    <slot></slot>
    <div v-for="item in list" class="box-item">
        <div class="house">
            <div class="house-img">
                <img src="../../../image/house.jpg">
            </div>
            <div class="house-right">
                <h3>{{item.addr + '-' + item.houseName}}</h3>
                <span class="house-info">{{item.layout + '-' + item.area+'m²'}}</span>
                <span class="house-addr">位置 {{item.detailedAddress.join(' ')}}</span>
                <div class="house-info2">
                    <span class="house-label">{{item.label}}</span>
                    <span class="house-price">{{item.price}}元/月</span>
                </div>
            </div>
        </div>
        <div class="house-time">
            {{ item.createTime | dateDiff}}天前发布
        </div>
    </div>
</div>
</template>
<script>
import Vue from 'vue';
Vue.filter('dateDiff', function (date) {
    let times = +new Date() - +new Date(date);
    return parseInt(times / (24*60*60*1000));
})
export default {
    name: 'box',
    props: ['list']
}
</script>
<style scoped>
.box{
    display: block;
    background-color: #fff;
}

.box-item{
    padding: .8rem 1rem;
    border-bottom: 1px solid #ededed;
}
.house{
    display: -webkit-flex; /* Safari */
    display: flex;
    margin-bottom: .4rem;
    width: 100%;
    height: 7rem;
    box-sizing: border-box;
    color: #000;
}
.house-right{
    width: 100%;
}
.house-img{
    flex-shrink: 0;
    margin-right: 1rem;
    overflow: hidden;
    width: 40%;
    box-sizing: border-box;
}
.house-info,
.house-addr{
    display: block;
    height: 1.4rem;
    line-height: 1.4rem;
    font-size: .8rem;
}
.house-addr{
    color: #9f9f9f;
    margin-bottom: .8rem;
}
.house-info2{
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: space-between;
}
.house-label{
    padding: .2rem .5rem;
    border-radius: 5px;
    font-size: .8rem;
    background-color: #666;
    color: #fff;
}

.house-price{
    color: red;
}
.house-time{
    color: #868282;
    font-size: 0.8rem;
}
</style>