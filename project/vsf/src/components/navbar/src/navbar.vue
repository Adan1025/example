<template>
    <div class="navbar">
        <span class="navbar-left"><slot name="left"></slot></span>
        <span class="navbar-title"><slot name="center"><span>{{title}}</span></slot></span>
        <span class="navbar-right">more</span>
    </div>
</template>
<script>
    export default{
        name: 'sf-navbar',
        props:{
            title: String
        },
        methods:{
            _back(){
                if(this.$router){
                    this.$router.go(-1);
                } else {
                    window.location.back();
                }
            }
        }
    }
</script>
<style scoped>
    .navbar{
        height: .8rem;
        line-height: .8rem;
        border-bottom: 2px solid #ccc;
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