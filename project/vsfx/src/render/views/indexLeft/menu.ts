import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import axios from '../../common/axios.js';
@Component({
    // 所有的组件选项都可以放在这里
    template: `<ul class="sf-navbar">
<li v-for="(item,index) in menuList" :key="index" @click="tip(item.uri, index)"
        :class="'sf-navbar-item ' + (ix == index ? 'curr': '')">{{item.name}}</li>
</ul>`
})
export default class SfLeftAuthor extends Vue {
    // 组件方法也可以直接声明为实例的方法
    name = "sf-left-menu"
    @Prop()
    authorInfo: any
    tip(uri, index) {
        this.ix = index;
        location.href = '/#' + uri
    }
    ix = 0
    menuList = [
        {
            uri: "/article/1",
            name: "文章"
        },
        {
            uri: "/article/2",
            name: "短记"
        },
        {
            uri: "/articleclassify/type",
            name: "类型"
        },
        {
            uri: "/authorlist",
            name: "作者"
        },
        {
            uri: "",
            name: "搜索"
        }
    ]
}

