<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import '../static/style/reset.css';
  import '../static/style/viewport.scss';
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: 'app',

    mounted() {

    },

    methods: {
    }
  }
</script>

<style lang="scss" scoped>
</style>
