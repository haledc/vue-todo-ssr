<template>
  <div id="app">
    <todo/>
  </div>
</template>

<script type="text/ecmascript-6">
  import Todo from 'components/todo/todo'

  export default {
    components: {
      Todo
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  $deviceWidth = device-width
  #app
    width $deviceWidth
    min-width 800px
</style>
