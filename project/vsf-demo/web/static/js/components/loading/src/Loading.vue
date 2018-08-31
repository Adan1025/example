<template>
    <div class="sf-scroll" ref="__scroll">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'sf-scroll',
    props: {
        load: Function,
        isNext: Boolean
    }
}
</script>