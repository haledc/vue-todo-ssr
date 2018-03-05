<template>
  <div id="app">
    <Header></Header>
    <todo></todo>
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
    height 600px
    margin 50px auto
    background yellow
    position relative
</style>
