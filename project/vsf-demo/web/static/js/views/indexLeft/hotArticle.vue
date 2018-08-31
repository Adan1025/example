<template>
    <div class="sf-hotpanel">
        <h3>{{title}}</h3>
        <ul class="sf-hotpanel-list">
            <li v-for="item in list" class="sf-hotpanel-item">
                <a href="javascript:void(0);" @click="toInfo(item.id)">
                    <span class="sf-hotpanel-item-title">
                        {{item.title}}
                    </span>
                    <span class="sf-hotpanel-item-time">
                        {{item.publishDate | time}}
                    </span>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
    name: "sf-hot-article",
    props:['list', 'title'],
    filters:{
        time(str) {
            return str.split(' ')[0]
        }
    },
    methods:{
        toInfo(id){
            this.$router.push(`/articleinfo/${id}`);
        }
    }
};
</script>
<style   lang="scss" type="text/css">@import "../../../css/views/hot-panel.scss";</style>