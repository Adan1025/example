<template>
    <div class="sf-author-list">
        <article class="sf-author-item" v-for="item in authorList" :key="item.id">
            <router-link :to="`/articleclassify/type`" @click.native="checkAuthor(item.identity)">
                {{item.nickName}} <span class="sf-article-type-num">({{item.count}})</span>
            </router-link>
        </article>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "sf-authorlist",
  data(){
    return {
        type: null
    }
  },
  computed: {
    ...mapState("author", {
      authorList: state => state.authorList
    }),
    ...mapState({
      ix: state => state.ix
    })
  },
  created() {
    this.loadAuthorList();
  },
  updated(){

    // html首次挂在完成
    let items = document.querySelectorAll('.sf-author-item');
    Array.from(items).forEach( (item, index) => {
        setTimeout( () =>{
          item.className += ' sf-author-item-animate';
        }, index * 50)
    });
  },
  methods: {
    ...mapMutations("author", {
      setAuthorList: "setAuthorList",
      setAuthorInfo: "setAuthorInfo"
    }),
    ...mapMutations({
      setMenuIX: "setMenuIX"
    }),
    loadAuthorList() {
      this.$.get(`/restapi/users/findAuthorList`).then(results => {
        this.setAuthorList(results);
      });
    },
    checkAuthor(identity){
      this.setMenuIX('2')
      CommFunc.setSessionStorage('authoridentity', identity);
      this.$.get(`/restapi/users/findOneByIdentity/${identity}`).then(results => {
          this.setAuthorInfo(results || {});
      });
    }
  }
};
</script>
<style scoped  lang="scss" type="text/css">
@import "../../../css/views/authorList.scss";
</style>