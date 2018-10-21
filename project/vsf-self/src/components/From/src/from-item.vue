<template>
    <div class="sf-from-item">
        <div class="sf-from-left">
            <slot name="left"></slot>
        </div>
        <a :class="classes" v-if="type == 'a'" :href="link">
            <slot name="right"></slot>
        </a>
        <router-link :class="classes" v-else-if="type == 'link'" :to="link">
            <slot name="right"></slot>
        </router-link>
        <div :class="classes" v-else-if="type == 'radio'">
            <slot name="right"></slot>
        </div>
        <div :class="classes" v-else>
            <slot name="right"></slot>
        </div>

    </div>
</template>
<script>
export default{
    name: 'sf-from-item',
    props:{
        arrow:{
            type: Boolean,
            default: false
        },
        link:{
            type: String,
            default: '/#'
        },
        type:{
            type: [String],
            validator(val){
                return ['div', 'a', 'link', 'radio', 'checbox'].indexOf(val) > -1;
            },
            default: 'div'
        }
    },
    computed:{
        classes(){
            let classes = 'sf-from-right ';
            if(this.arrow) {
                classes += 'iconfont sf-from-arrow';
            }
            return classes;
        }
    }
}
</script>
<style lang="scss" type="text/css">
    @import '../../../style/components/from.scss';
</style>