<template>
<button :class="classes" :disabled="disabled"><slot></slot></button>
</template>
<script>
    import Util from '../../../util.js';
    export default{
        name: 'sf-btn',
        props:{
            disabled: Boolean,
            size:{
                // 自定义验证函数
                validator(val = '') {
                    return ['', 'small'].indexOf(val) > -1;
                },
                default: '',
            },
            type:{
                type: String,
                // 自定义验证函数
                validator(val){
                    return Util.typeValidator(val);
                },
                default: '',
            },
            shape:{
                validator(val) {
                    return ['', 'circular', 'half'].indexOf(val) > -1;
                },
                default: '',
            }
        },
        computed:{
            classes(){
                let {size, type, shape} = this;
                size = size ? `sf-btn-${size}` : `sf-btn`;
                shape = shape ? `sf-btn-${shape}` : ``;
                /*public 公共背景色测试*/
                // type = type ? `sf-btn-${type}` : ``;
                type = Util.typeClass(type);
                return `${size} ${type} ${shape}`;
            }
        }
    }
</script>
<style lang="scss" type="text/css">
    @import '../../../style/components/button.scss';
</style>