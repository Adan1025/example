<template>
    <div class="container">
        <search leftWidth="2">
            <i class="iconfont icon-fanhui" @click="back"></i>
        </search>
        <condition v-if="showCondition"></condition>
        <template v-for="item in houseList">
            <box v-bind:list="item.list">
            </box>
        </template>
    </div>
</template>
<script>
import {mapState} from 'vuex';
import search from './comm/search.vue';
import box from './comm/box.vue';
import condition from './comm/condition.vue';
    export default {
        name: 'list',
        data(){
            return {
                showCondition: true // false
            }
        },
        // created(){
        //     let {labels} = this.$route.query;
        //     if(labels) {
        //         this.showCondition = true;
        //     }
        // },
        components: {
            search,
            box,
            condition
        },
        computed: mapState({
            'houseList': 'houseList'
        }),
        mounted(){ // 编译好的html挂在到页面完成后
            this.$store.dispatch('getHouseList', this.$route.query || {});
        },
        methods: {
            // ...mapActions([
            //     'some/nested/module/list',
            // ])
            back() {
                this.$router.back();
            }
        }
    }
</script>
<style scoped>
.container{
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction:column;
}
</style>
