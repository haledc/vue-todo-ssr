<template>
  <div class="header">
    <div class="title">
      {{title}}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        title: 'My Todo'
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .header
    width 100%
    top 0
    left 0
    height 100px
    flex 0 0 100px
    .title
      font-size 50px
      font-weight bolder
      font-family "Courier New"
      line-height 100px
      text-align center
</style>
