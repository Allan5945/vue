<template>
    <div class="hello">
        <RouterView></RouterView>
        <h1>{{name}}</h1>
        <input type="text">
        <img src="./../assets/logo.png" alt="">
        <p>
            For guides and recipes on how to configure / customize this project,<br>
            check out the
            <a href="https://github.com/vuejs/vue-cli/tree/dev/docs" target="_blank">vue-cli documentation</a>.
        </p>
    </div>
</template>

<script>


    export default {
        name: 'HelloWo',
        data() {
            return {

            }
        },
        props: {
            msg: String
        },
        mounted() {
        },
        computed: {
            name() {
                console.log(this.$store)
                return this.$store.state.name
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
