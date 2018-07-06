<template>
  <div class="header">
    <div class="title">
      {{title}}
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: 'My Todo'
      }
    }
  }
</script>

<style lang="stylus" scoped>
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

