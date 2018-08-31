<template>
    <div class="navbar">
        <span class="navbar-left" @click="_back"><返回</span>
        <span class="navbar-title">title</span>
        <span class="navbar-right">more</span>
    </div>
</template>
<script>
    export default{
        name: 'navbar',
        methods:{
            _back(){
                this.$router.go(-1);
            }
        }
    }
</script>
<style scoped>
    .navbar{
        height: .8rem;
        line-height: .8rem;
        border-bottom: 1px solid #cdcdcd;
        font-size: .32rem;
        text-align: center;
    }
    .navbar-left{
        float: left;
        padding-left: .1rem;
    }
    .navbar-right{
        float: right;
        padding-right: .1rem;
    }
</style>