<template>
  <div class="item" :class="{'finished':item.isCompleted === true}">
    <span class="checkbox">
      <input type="checkbox" v-model="item.isCompleted"/>
    </span>
    <label class="content">{{item.content}}</label>
    <span class="operation">
      <span class="delete" @click="deleteItem">Delete</span>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      deleteItem() {
        this.$emit('delete', this.item.id)
      }
    },
    props: {
      item: {
        type: Object,
        require: true
      }
    }
  }
</script>

<style scoped lang="stylus">
  .item
    display flex
    height 40px
    position relative
    border-radius 5px
    border 1px solid #ccc
    margin 0 20px 10px
    &.finished
      .content
        text-decoration line-through
    .checkbox
      flex 0 0 20px
      width 20px
      height 40px
      line-height 40px
      padding 0 10px
      input
        width 20px
        height 40px
    .content
      flex 1
      display inline-block
      line-height 40px
    .operation
      flex 0 0 80px
      width 80px
      position absolute
      display inline-block
      line-height 40px
      right 0
      text-align center
      padding 0 10px
      span
        &:hover
          cursor pointer
          color #f00
</style>
