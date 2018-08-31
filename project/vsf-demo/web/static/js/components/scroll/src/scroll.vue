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
    },
    mounted(){
        let $scroll = this.$refs.__scroll,
            isLoad = false;
        window.onscroll= () => {
            if(!this.isNext){
                window.onscroll = null;
                return;
            }
            let scrollTop = this.getScrollTop() + this.getClientHeight()
            if($scroll.scrollHeight - scrollTop < 30){
                if(isLoad) return;
                isLoad = true;
                this.load();
                setTimeout(() => {
                    isLoad = false;
                }, 300);
            }
        }
    },
    methods:{
        getScrollTop(){
            return  window.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop  || 0;
        },
        getClientHeight(){
            let clientHeight=0;
            if(document.body.clientHeight&&document.documentElement.clientHeight) {
                clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
            } else {
                clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
            }
            return clientHeight;
        }
    }
}
</script>