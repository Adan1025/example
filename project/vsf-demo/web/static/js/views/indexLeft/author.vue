<template>
    <div class="sf-author">
        <div>
            <img :src="authorInfo.headimg || `../../../images/headimg.jpg`">
            <span class="sf-author-name">{{authorInfo.nickName}}</span>
            <span class="sf-author-description">{{authorInfo.metto || '作者没有留下什么..'}}</span>
        </div>
        <!-- <div class="sf-link">
            <span class="sf-link-item">
                <span class="link-item-count">145</span>
                <span class="link-item-type">文章</span>
            </span>
            <span class="sf-link-item">
                <span class="link-item-count">145</span>
                <span class="link-item-type">随记</span>
            </span>
        </div> -->
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "sf-left-author",
  computed: {
    ...mapState("author", {
      authorInfo: state => state.authorInfo
    })
  },
  created() {
    this.getAuthorInfo();
  },
  methods: {
    ...mapMutations("author", {
      setAuthorInfo: "setAuthorInfo"
    }),
    getAuthorInfo() {
      let identity = CommFunc.getSessionStorage('authoridentity');
      if(!identity){
        identity = 'NDkzNTQ5MTc0QHFxLmNvbQ==';
      }
      this.$.get(`/restapi/users/findOneByIdentity/${identity}`).then(results => {
          this.setAuthorInfo(results || {});
      });
    }
  }
};
</script>
<style   lang="scss" type="text/css">
@import "../../../css/views/author.scss";
</style>
