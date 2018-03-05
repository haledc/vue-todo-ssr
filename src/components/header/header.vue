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
    .title
      font-size 50px
      line-height 100px
      text-align center
</style>
