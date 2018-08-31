<template>
    <div class="container">
        <router-link to="/evaluate/student?t=1" class="lattice-menu">
            <img src="" alt="" class="lattice-icon">
            学业评价
        </router-link>
        <router-link to="/evaluate/student?t=2" class="lattice-menu">
            <img src="" alt="" class="lattice-icon">
            德育评价
        </router-link>

        <router-link to="/evaluate/student?t=1" class="lattice-menu">
            <img src="" alt="" class="lattice-icon">
            学业评价
        </router-link>
        <router-link to="/evaluate/student?t=2" class="lattice-menu">
            <img src="" alt="" class="lattice-icon">
            德育评价
        </router-link>

        <router-link to="/evaluate/student?t=1" class="lattice-menu">
            <img src="" alt="" class="lattice-icon">
            学业评价
        </router-link>
        <router-link to="/evaluate/student?t=2" class="lattice-menu">
            <img src="" alt="" class="lattice-icon">
            德育评价
        </router-link>
    </div>
</template>
<script>
    export default {
        name: 'home',
        data(){
            return {
            }
        },
        components: {
        },
        mounted() {
        }
    }
</script>
<style scoped>
.container{
}
.lattice-menu{
    display: inline-block;
    margin-top: .2rem;
    width: 2.45rem;
    font-size: .3rem;
    text-align: center;
}
.lattice-icon{
    display: block;
    margin: 0 auto;
    width: 2rem;
    height: 2rem;
    background-color: #fff;
}
</style>