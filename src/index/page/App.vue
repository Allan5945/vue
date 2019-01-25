<template>
    <div>
        <input type="text">
        <div>{{a}}</div>
    </div>
</template>
<script>
    export default {
        name: "App",
        data () {
            return {
                a: 99999
            }
        },
        mounted () {
            debugger
            console.log(666)
        }
    }
</script>

<style scoped lang="scss">
    div{
        display: flex;
    }
</style>