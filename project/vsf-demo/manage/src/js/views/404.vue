<template>
    <div>{{msg}}</div>
</template>
<script>
    export default {
        name: 'index',
        data() {
            return {
                msg: this.$store.state.$404Msg,
            }
        }
    }
</script>