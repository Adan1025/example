<template>
    <div class="sf-from-group">
        <span class="sf-from-group-title">{{title}}</span>
        <div class="sf-from-group-box">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default{
    name: 'sf-from-group',
    props:{
        title:{
            type: String,
            default: ''
        }
    }
}
</script>
