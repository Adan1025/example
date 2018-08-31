import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({
    // 所有的组件选项都可以放在这里
    template: `<div class="sf-hotpanel">
    <h3>{{title}}</h3>
    <ul class="sf-hotpanel-list">
        <li v-for="item in list" class="sf-hotpanel-item">
            <a href="javascript:void(0);" @click="toInfo(item.id)">
                <span class="sf-hotpanel-item-title">
                    {{item.title}}
                </span>
                <span class="sf-hotpanel-item-time">
                    {{item.publishDate | time}}
                </span>
            </a>
        </li>
    </ul>
</div>`
})
export default class SfLeftAuthor extends Vue {
    // 组件方法也可以直接声明为实例的方法
    name = "sf-hot-article"
    @Prop()
    title: string
    @Prop()
    list: any
    toInfo(id) {
        location.href = `/#/articleinfo/${id}`
    }
}

