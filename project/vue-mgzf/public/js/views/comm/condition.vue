<template>
    <div class="condition">
        <ul class="condition-search">
            <li @click="searchMetro($event, 'metro')">地铁区域<i class="iconfont icon-xiala"></i></li>
            <li @click="searchMetro($event, 'price')">价格<i class="iconfont icon-xiala"></i></li>
            <li @click="searchMetro($event, 'sort')">推荐排序<i class="iconfont icon-xiala"></i></li>
            <li @click="searchMetro($event, 'more')">更多筛选<i class="iconfont icon-xiala"></i></li>
        </ul>
        <div class="condition-pannel">
            <metro v-if="showTag == 'metro'"></metro>
            <pannel v-else-if="!!showTag" v-bind:showTag="showTag"></pannel>
        </div>
    </div>
</template>
<script>
import metro from './condition/metro.vue';
import pannel from './condition/test-pannel.vue';
import {mapState, mapMutations} from 'vuex';
export default {
    name: 'condition',
    components:{
        'metro' : metro,
        'pannel' : pannel
    },
    computed: {
        ...mapState('condition', {
            showTag: state => state.showTag
        })
    },
    destroyed(){
        // 销毁前(离开前)隐藏pannel
        this.updateShowTag(null);
    },
    methods: {
        ...mapMutations('condition', {
            'updateShowTag': 'updateShowTag'
        }),
        searchMetro({target}, tag){
            this.$options.changCur(target).then( bool => this.updateShowTag(bool ? tag: null) );
        },
        ifsearch(){
            // mutations
            // this.$store.commit('getHouseHome');
            // 除了state分模块  其他都不分
            // this.$store.state.list.msg
            this.$store.dispatch('getList');
        }
    }
}
</script>
<style scoped>
.condition{
    display: block;
    border-bottom: 1px solid #ededed;
}
.condition-search{
    display: flex;
    height: 2.4rem;
    line-height: 2.4rem;
}
.condition-search li{
    flex: 1;
    text-align: center;
    font-size: .8rem;
    color: #9f9f9f;
    overflow: hidden;
}
.condition-search li ~ li:before{
    content: '|';
    float: left;
}
.condition-pannel{
    align-items: stretch;
    /*position: absolute;
    left: 0;
    right: 0;
    top: 0;*/
}

</style>