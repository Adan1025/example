<template>
    <div class="slide-item">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'sf-slide-item',
    data(){
        return {}
    },
    mounted() {
        this.$nextTick(this.$parent.init);
    }
}
</script>
<style>
.slide-item{
    width: 100%;
    height: 90%;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    background-color: #fff;
}
.slide-item:nth-child(even) {
    background-color: green;
}
</style>