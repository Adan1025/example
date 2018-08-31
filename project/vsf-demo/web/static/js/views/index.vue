<template>
    <div class="sf-container">
        <header class="sf-headband"></header>
        <div class="sf-main">
            <div class="sf-left">
                <index-left></index-left>
            </div>
            <div class="sf-right">
                <router-view v-if="isAlive"></router-view>
            </div>
            <div style="clear:both"></div>
        </div>
        <div class="sf-footer">
            <div class="sf-footer-about">
                <div class="sf-footer-about-icons">
                    <a href="#"><img src="../../images/github.png" alt="github"/></a>
                    <a href="#"><img src="../../images/zhihu.png" alt="知乎"/></a>
                    <a href="#"><img src="../../images/juejin.png" alt="掘金"/></a>
                </div>
            </div>
            <p class="sf-footer-credit">Copyright © 2017  <strong> <a class="site-link" href="http://blog.qualc.cn/" title="天冰日记" rel="home"><span>天冰日记 - qualc </span></a></strong> - <a target="_blank" href="http://www.miibeian.gov.cn" class="external">沪ICP备16026693号 </a>
					</p>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import indexLeft from "./indexLeft.vue";
import sfArticle from "./article/sfArticle.vue";
export default {
  name: "index-home",
  components: {
    indexLeft,
    sfArticle
  },
  data(){
        return {
            isAlive: true
        }
  },
  methods: {
    reload () {
        this.isAlive = false
        this.$nextTick(() => (this.isAlive = true))
    }
 }
};
</script>
<style   lang="scss" type="text/css">
@import "../../css/views/index.scss";
/* header{
        height: 5px;
        background: linear-gradient(to right, #ffa800, #ff6d25);
        background: -webkit-gradient(linear, left top, right top, color-stop(0%,#ffa800), color-stop(100%,#ff6d25));
        background: -webkit-linear-gradient(left, #ffa800, #ff6d25);
        background: -moz-linear-gradient(left, #ffa800, #ff6d25);
        background: -o-linear-gradient(left, #ffa800, #ff6d25);
        background: -ms-linear-gradient(left, #ffa800, #ff6d25);
        background: -webkit-linear-gradient(left, #ffa800, #ff6d25);
        background: -webkit-linear-gradient(left, #ffa800, #ff6d25);
    } */
</style>
