<template>
    <div class="search-pannel">

    </div>
</template>
<script>
export default {
    name: 'search-pannel',
    data(){
        return {msg:123}
    }
}
</script>
<style scoped>
.search-pannel{
    position: fixed;
    top: 3rem;
    left: 0;
    right: 0;
    height: 0;
    background-color: #fff;
    /*animation: begin .6s forwards;*/
}

@keyframes begin{
from {height: 0}
to {height: 100%}
}
@keyframes end{
from {height: 100%}
to {height: 0}
}
</style>