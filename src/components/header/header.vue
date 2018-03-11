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
    margin 0 auto
    height 100px
    .title
      font-size 50px
      font-weight bolder
      font-family "Courier New"
      line-height 100px
      text-align center
</style>
