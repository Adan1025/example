<template>
    <div>
        <div class="sf-sidebar">
            <div class="sf-brand">
                <div class="sf-brand-meta">
                    <span class="sf-brand-title">天冰博客</span>
                    <span>好记性不如烂笔头</span>
                </div>
            </div>
            <div class="sf-navbar">
                <sf-left-menu></sf-left-menu>
            </div>
        </div>
        <div class="sf-sidebar">
            <sf-left-author></sf-left-author>
        </div>
        <sf-hot-article v-if="isShowArticle" :title="'热门文章'" :list="articleList"></sf-hot-article>
        <sf-hot-article v-if="isShowNote" :title="'热门短记'" :list="noteList"></sf-hot-article>
    </div>
</template>
<script>
    import sfLeftAuthor from '../views/indexLeft/author.vue';
    import sfLeftMenu from '../views/indexLeft/menu.vue';
    import sfHotArticle from '../views/indexLeft/hotArticle.vue';
    export default{
        name: 'index-left',
        components:{
            sfLeftAuthor,
            sfLeftMenu,
            sfHotArticle
        },
        data(){
            return {
                isShowArticle: false,
                isShowNote: false,
                articleList: [],
                noteList:[]
            }
        },
        created(){
            this.loadHotList()
        },
        methods:{
            loadHotList(){
                this.$.get(`/restapi/article/findHot`).then( results => {
                    let {articleList = [], noteList = []} = results;
                    if(articleList.length > 0) {
                        this.articleList = articleList;
                        this.isShowArticle = true;
                    }
                    if(noteList.length > 0) {
                        this.noteList = noteList;
                        this.isShowNote = true;
                    }
                })
            }
        }
    }
</script>
<style   lang="scss" type="text/css">
    @import '../../css/views/indexLeft.scss';
</style>
