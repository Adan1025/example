<template>
    <div class="metro">
        <div class="metro-list">
            <div class="metor-left">
                <ul>
                    <li ref="area" @click="searchMetro($event, 'area')">区域</li>
                    <li  @click="searchMetro($event, 'metro')">地铁</li>
                </ul>
            </div>
            <div class="metor-right">
                <ul>
                    <template v-for="(item, index) in metroList">
                        <li @click="searchMetroSub($event, index)">{{item}}区</li>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex';
export default {
    name: 'menu',
    computed: {
        ...mapState('metro', {
            metroList: state => state.metroList
        })
    },
    mounted(){
        let ev = {target: this.$refs.area};
        // 首次加载区域
        this.searchMetro(ev, 'area');
    },
    methods:{
        ...mapMutations('metro', {
            'showMetroList': 'showMetroList'
        }),
        searchMetro({target},tag) {
            this.$options.changCur(target).then( bool => {
                if(bool) {
                    this.$.get('/metroList?tag='+ tag).then( data => {
                        let metroList = [];
                        if(data.status == 1) {
                            metroList = data.results;
                        } else {
                            metroList = false;
                        }
                        this.showMetroList({metroList: metroList, showTag: tag} );
                    }, err => {
                        let metroList = false;
                        this.showMetroList({metroList: metroList, showTag: tag} );
                    });
                    let arr = document.getElementsByClassName('metor-right')[0].getElementsByClassName('cur');
                    Array.from(arr).forEach( item => this.$options.removeClass(item));
                }
            })
        },
        searchMetroSub({target}, index) {
            this.$options.changCur(target);
        }
    }
}
</script>
<style scoped>
.metro{
    border: 1px solid #ababab;
    background-color: #fff;
    overflow-y: scroll;
    /*overflow: scroll;*/
}
.metro-list{
    height: 25rem;
    display: flex;
    align-items: flex-start;
}
.metor-left{
    flex-shrink: 0;
    display: inline-block;
}
.metor-right{
    width: 100%;
    display: inline-block;
    border-left: 1px solid #ababab;
}
.metro-list li{
    padding: .5rem 3.5rem .5rem 1rem;
}
.metro-list li{
    border-bottom: 1px solid #ababab;
}
.metro-list li.cur{
    color: #CC3300;
    background-color: #efefef;
}
</style>