import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import sfLeft from './left';

@Component({
    components: {
        sfLeft
    },
    // 所有的组件选项都可以放在这里
    template: `<div class="sf-container">
    <header class="sf-headband"></header>
    <div class="sf-main">
        <div class="sf-left">
            <sf-left :authorInfo="authorInfo"></sf-left>
        </div>
        <div class="sf-right">
            <router-view></router-view>
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
</div>`
})
export class SfMain extends Vue {
    // 组件方法也可以直接声明为实例的方法
    name = "sf-main"
    @Prop()
    authorInfo: any
}

