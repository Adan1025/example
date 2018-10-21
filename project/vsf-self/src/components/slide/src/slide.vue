<template>
    <div class="slide">
        <div class="slide-wrap" ref="slideWrap"
            @touchstart="_start"
            @touchmove="_move"
            @touchend="_end"
            :style="transition">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'sf-slide',
    data(){
        return {
            offsetWidth: 0,
            itemList: [],
            current:0,
            touches:{
                moveTag: 0, // 防止同时多次触发 1start 2move 3end
                direct: 1, // 方向
            },
            transition:{
                transform: '',
                speed: 0
            }
        }
    },
    created(){
    },
    mounted(){

    },
    methods: {
        init(){
            this.itemList = this.$children.filter(item => item.$options.name === 'sf-slide-item');
            this.offsetWidth = this.$refs.slideWrap.offsetWidth;
            console.log(this.itemList)
        },
        _start(event){
            const currentX = event.touches ? event.touches[0].clientX : event.clientX;
            const currentY = event.touches ? event.touches[0].clientY : event.clientY;
            this.touches.startX = currentX;
            this.touches.startY = currentY;
            if(this.touches.moveTag == 0){
                this.touches.moveTag = 1
            };
        },
        _move(event){
            const currentX = event.touches ? event.touches[0].clientX : event.clientX;
            const currentY = event.touches ? event.touches[0].clientY : event.clientY;
            const deltaSlide = currentX - this.touches.startX;
            let direct = deltaSlide > 0 ? 1 : -1;
            if(direct  == 1 && this.current == 0) {
                this.touches.moveTag = 2;
                return false;
            }
            if(direct  == -1 && this.current >= this.itemList.length - 1) {
                this.touches.moveTag = 2;
                return false;
            }
            this.touches.direct = direct;
            this.setTranslate(10, -this.current * this.offsetWidth + (deltaSlide));
            if(this.offsetWidth / 4 > Math.abs(deltaSlide)) {
                this.touches.moveTag = 2;
                return false;
            }
            this.touches.moveTag = 3;
        },
        _end(event){
            let {moveTag} = this.touches;
            if(moveTag == 2) {
                this.setTranslate(10, -this.current * this.offsetWidth);
            }
            if(this.touches.moveTag != 3) {return true;}
            const warpperSize = this.offsetWidth;
            let {direct} = this.touches;
            this.setTranslate(300, (direct == 1 ? --this.current: ++this.current) * warpperSize  * -1);

        },
        setTranslate(speed, translate) {
            this.transition.speed = speed + 'ms';
            this.transition.transform = 'translate3d(' + translate + 'px, 0, 0)';
        },
    }
}
</script>
<style>
.slide{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 500;
    background-color: #000;
    overflow: hidden;
}
.slide-wrap{
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
}
</style>