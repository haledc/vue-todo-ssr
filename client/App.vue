<template>
  <div id="app">
    <div id="cover"></div>
    <Header/>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <Footer/>
    <div id="loading" v-show="loading">
      <loading/>
    </div>
  </div>
</template>

<script>
  import Header from './layout/header'
  import Footer from './layout/footer'
  import Loading from './components/loading'
  import {mapGetters} from 'vuex'

  export default {
    metaInfo: {
      title: 'My todo'
    },
    components: {
      Header,
      Footer,
      Loading
    },
    computed: {
      ...mapGetters(['loading'])
    },
    methods: {
      notify() {
        this.$notify({
          content: 'test $notify',
          btn: 'close'
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .fade-enter-active, fade-leave-active
    transition opacity 0.5s
  .fade-enter, .fade-leave-to
    opacity 0
</style>


