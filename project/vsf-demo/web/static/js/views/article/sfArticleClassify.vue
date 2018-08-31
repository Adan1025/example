<template>
    <div class="articletype">
      <template v-if="articleClassify && articleClassify.length > 0">
        <article class="sf-article sf-article-type-list" v-for="item in articleClassify" :key="item.id">
            <router-link :to="`/articlelist/${type}/${item.id}`">
                {{item.classify}} <span class="sf-article-type-num">({{item.num}})</span>
            </router-link>
        </article>
      </template>
      <template v-else>
            <article class="sf-article sf-article-list-item">
                暂无文章分类
            </article>
        </template>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
const httpUrl = {
    type: `/restapi/articletype/findAllGroupType`,
    lable: `/restapi/articlelable/findAllGroupLable`,
}
export default {
  name: "sf-articletype",
  data(){
    return {
        type: null
    }
  },
  computed: {
    ...mapState("article", {
      articleClassify: state => state.articleClassify
    })
  },
  created() {
    this.loadData();
  },
  updated(){
    // html首次挂在完成
    let items = document.querySelectorAll('.sf-article-type-list');
    Array.from(items).forEach( (item, index) => {
        setTimeout( () =>{
          item.className += ' sf-article-type-list-animate';
        }, index * 50)
    });
  },
  methods: {
    ...mapMutations("article", {
      setArticleClassify: "setArticleClassify"
    }),
    loadData(){
      this.type = this.$route.params.type;
      this.getArticleList();
    },
    getArticleList() {
      this.$.get(httpUrl[this.type]).then(results => {
        this.setArticleClassify(results);
      });
    }
  },
  watch:{
    '$route'(nowRoute, oldRoute){
      this.loadData();
    }
  },
  beforeDestroy(){
      this.setArticleClassify();
  }
};
</script>
<style scoped  lang="scss" type="text/css">
@import "../../../css/views/article.scss";
</style>
