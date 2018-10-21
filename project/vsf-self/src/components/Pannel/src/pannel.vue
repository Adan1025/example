<template>
    <div :class="classesHeader">
        <div class="sf-pannel-header" @click="expand">
            <span class="sf-pannel-icon iconfont">&#xe678;</span>
            <span class="sf-pannel-title">{{title}}</span>
            <span class="sf-pannel-icon iconfont sf-pannel-expand"></span>
        </div>
        <div class="sf-pannel-body" v-if="isShow">
            <slot></slot>
        </div>
    </div>
</template>
<script>
// import Util from '../../../util.js';
export default {
    name: 'sf-pannel',
    props:{
        title: {
            type: String,
            default: ''
        },
        shape:{
            type: String,
            validator(val) {
                return ['', 'half'].indexOf(val) > -1;
            },
            default: '',
        },
        type:{
            // 自定义验证函数
            validator(val = 'gray1') {
                return ['', 'danger', 'fall', 'gray1'].indexOf(val) > -1;
            },
            default: 'gray1',
        },
        show:{
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
           isShow: this.show
        }
    },
    computed:{
        classesHeader(){
            let {type, shape} = this;
            shape = this.joinStr(shape);
            /*public 公共背景色测试*/
            type = this.joinStr(type);
            // pannel存在同时改变两个子元素的颜色 不适用
            // type = Util.typeClass(type);
            return `sf-pannel ${type} ${shape} ${!this.isShow ? 'sf-pannel-hide' : ''}`;
        }
    },
    methods:{
        joinStr(type){
            return type = type ? `sf-pannel-${type}` : '';
        },
        expand(){
            this.isShow = !this.isShow;
        }
    }
}
</script>
<style lang="scss" type="text/css" scoped>
    @import '../../../style/components/pannel.scss';
</style>