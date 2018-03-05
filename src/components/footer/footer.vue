<template>
  <div class="footer">
    <div class="content">
      written by {{ author }}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        author: 'Hale'
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .footer
    width 100%
    position absolute
    bottom 0
    height 60px
    .content
      /*margin 0 auto*/
      line-height 60px
      font-size 25px
      text-align center
</style>
