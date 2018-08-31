import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import axios from '../common/axios.js';

import sfLeft from './left';

@Component({
    // 所有的组件选项都可以放在这里
    template: `<div class="sf-articleinfo">
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
</div>`
})
export class SfArticleInfo extends Vue {
    // 组件方法也可以直接声明为实例的方法
    name = "sf-article-info"
    @Prop()
    articleinfo: any
}

