<template>
    <div class="album-pop">
        <!-- <img: -->
    </div>
</template>
<script>
export default {
    name: 'sf-album-pop',
    props:['img'],
    data(){
        return {
            imgList: []
        }
    }
}
</script>
<style>
.album-pop{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, .3);
}
</style>