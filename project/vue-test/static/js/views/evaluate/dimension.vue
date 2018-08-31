<template>
<div class="container">
    <div class="curriculum">
        维度列表
    </div>
</div>
</template>
<script>
    export default {
        name: 'evaluateList',
        data(){
            return {

            }
        }
    }
</script>
<style scoped>
.container{
    font-size: .3rem;
}
.dimension{
    display: block;
    padding: .2rem;
    overflow: hidden;
}
.curriculum-item{
    display: inline-block;
    float: left;
    margin-top: .1rem;
    width: 25%;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    box-sizing: border-box;
}
.curriculum-item > span{
    display: block;
    width: 80%;
    height: 100%;
    border: 1px solid #efefef;
    box-sizing: border-box;
}
</style>