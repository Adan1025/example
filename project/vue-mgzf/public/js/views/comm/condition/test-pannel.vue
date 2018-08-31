<template>
    <div class="test-pannel">test {{showTag}}</div>
</template>
<script>
export default {
    name: 'menu',
    props: ['showTag']
}
</script>
<style scoped>
.test-pannel{
    width: 100%;
    height: 25rem;
    background-color: #fff;
}
</style>