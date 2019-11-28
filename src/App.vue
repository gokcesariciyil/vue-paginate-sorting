<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
    import Footer from "./components/layout/Footer";
    import Header from "./components/layout/Header";


    export default {
        components: {
            'app-header': Header,
            'app-footer': Footer,
        },
    }
</script>
<style lang="scss">

</style>
