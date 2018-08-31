import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import axios from '../common/axios.js';
import sfLeftAuthor from './indexLeft/author';
import sfLeftMenu from './indexLeft/menu';
import sfHotArticle from './indexLeft/hotArticle';

// @Component 修饰符注明了此类为一个 Vue 组件
@Component({
    components: {
        sfLeftMenu,
        sfLeftAuthor,
        sfHotArticle
    },
    // 所有的组件选项都可以放在这里
    template: `<div>
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
        <div class="sf-author" >
            <img :src="authorInfo.headimg || '../../../images/headimg.jpg'" >
            <span class="sf-author-name" > {{ authorInfo.nickName }}</span>
            <span class="sf-author-description" > {{ authorInfo.metto || '作者没有留下什么..' }}</span>
        </div>
    </div>
    <sf-hot-article v-if="isShowArticle" :title="'热门文章'" :list="articleList"></sf-hot-article>
    <sf-hot-article v-if="isShowNote" :title="'热门短记'" :list="noteList"></sf-hot-article>
</div>`

})
export default class SfLeftAuthor extends Vue {
    // 组件方法也可以直接声明为实例的方法
    name = "sf-left"
    @Prop()
    authorInfo: any
    isShowArticle = false
    isShowNote = false
    articleList = []
    noteList = []
    created() {
        axios.get(`/restapi/article/findHot`).then(results => {
            let { articleList = [], noteList = [] } = results;
            if (articleList.length > 0) {
                this.articleList = articleList;
                this.isShowArticle = true;
            }
            if (noteList.length > 0) {
                this.noteList = noteList;
                this.isShowNote = true;
            }
        })
    }
}

