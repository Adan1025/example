<template>
    <div class="album">
        <sf-album-pop></sf-album-pop>
    </div>
</template>
<script>
import AlbumPop from './albumPop.vue';
export default {
    name: 'sf-album',
    data(){
        return {}
    },
    components:{
        [AlbumPop.name]: AlbumPop
    }
}
</script>
<style>
.album{
    display: flex;
    display: -webkit-flex;
}
</style>