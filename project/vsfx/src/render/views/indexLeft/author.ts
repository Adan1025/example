import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
@Component({
    // 所有的组件选项都可以放在这里
    template: `<div class="sf-author" >
                    <img :src="authorInfo.headimg || '../../../images/headimg.jpg'" >
                    <span class="sf-author-name" > {{ authorInfo.nickName }}</span>
                    <span class="sf-author-description" > {{ authorInfo.metto || '作者没有留下什么..' }}</span>
                </div>`
})
export default class SfLeftAuthor extends Vue {
    // 组件方法也可以直接声明为实例的方法
    name: "sf-left-author"
    @Prop()
    authorInfo: any
}

