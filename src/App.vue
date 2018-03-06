<template>
  <div id="app">
    <Header></Header>
    <todo/>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from 'components/header/header'
  import Footer from 'components/footer/footer'
  import Todo from 'components/todo/todo'

  export default {
    components: {
      Header,
      Footer,
      Todo
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  #app
    width 80%
    min-height 600px
    margin 50px auto
    background #c7edcc
    position relative
    display flex
    flex-direction column
</style>
