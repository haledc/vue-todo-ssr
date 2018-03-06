<template>
  <div class="item" :class="{'finished':item.isFinished === true}">
    <input type="checkbox" class="toggle" v-model="item.isFinished">
    <label class="content">{{item.content}}</label>
    <span class="operation">
            <span class="delete" @click="deleteItem">删除</span>
            <span class="detail" @click="showDetail">详细</span>
          </span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      deleteItem() {
        this.$emit('delete', this.item.id)
      },
      showDetail() {
        alert('功能待完善')
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

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .item
    display block
    height 40px
    background #fff
    position relative
    margin-bottom 10px
    border-radius 5px
    &.finished
      .content
        text-decoration line-through
    .toggle
      display inline-block
      width 20px
      height 40px
      border-radius 50%
    .content
      display inline-block
      vertical-align top
      line-height 40px
      width 900px
      font-size 20px
    .operation
      position absolute
      display inline-block
      width 120px
      line-height 40px
      right 0
      text-align center
      span:hover
        cursor pointer

</style>
