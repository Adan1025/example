<template>
    <div class="sf-articleinfo">
        <h1 class="sf-article-title">
            <span v-if="articleinfo.title">{{articleinfo.title}}</span>
            <span v-else class="white-seat w200 h36"></span>
        </h1>
        <div class="sf-articleinfo-meta">
            <span>
                发表于：<span v-if="articleinfo.publishDate">{{articleinfo.publishDate}}</span>
                <span v-else class="white-seat w125 h25"></span>
            </span>
            <span>分类：<span v-if="articleinfo.articleTypeName">{{articleinfo.articleTypeName}}</span>
                <span v-else class="white-seat w30 h25"></span></span>
            <span>阅读次数：<span v-if="articleinfo.visitors">{{articleinfo.visitors}}</span>
                <span v-else class="white-seat w30 h25"></span></span></span>
        </div>
        <div class="sf-articleinfo-content editor" v-html="articleinfo.content" v-if="articleinfo.content"></div>
        <div v-else class="sf-articleinfo-content white-seat h350"></div>
    </div>
</template>
<script>
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
import { mapState, mapMutations } from "vuex";
export default {
  name: "sf-articleinfo",
  data() {
    return {
      publishDate: "2017-11-09",
      articleTypeName: 0,
      visitors: 0,
      testhtml:''
    };
  },
  computed: {
    ...mapState("article", {
      articleinfo: state => state.articleinfo
    })
  },
  created() {
    this.getArticleInfo();
  },
  methods: {
    ...mapMutations("article", {
      setArticleInfo: "setArticleInfo"
    }),
    getArticleInfo() {
      // http://manage.qualc.cn/restapi/article/findAl
      this.$.get(`/restapi/article/info/${this.$route.params.id}`).then(results => {
        // this.articleList = res.results;
        this.setArticleInfo(results);
      });
    }
    },
    watch:{
        '$route'(nowRoute, oldRoute){
            this.getArticleInfo();
        }
    },
      beforeDestroy(){
          this.setArticleInfo();
      }

};
</script>
<style  lang="scss" type="text/css">
    @import "../../../css/views/articleinfo.scss";
    @import "../../../css/views/articleinfo-editor.scss";
</style>