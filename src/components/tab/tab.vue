<template>
  <div class="tab">
    <span class="left">{{ unFinishedItemLength }}条待办项目</span>
    <span class="middle">
        <span class="state"
              v-for="state in states"
              :key="state"
              :class="{'active': filter === state }"
              @click="toggleFilter(state)">{{ state }}</span>
      </span>
    <span>
        <span class="clear" @click="clearALLFinishedItem">清除已完成项目</span>
      </span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      filter: {
        type: String,
        require: true
      },
      items: {
        type: Array,
        require: true
      }
    },
    data() {
      return {
        states: ['所有项目', '待办项目', '已完成项目']
      }
    },
    computed: {
      unFinishedItemLength() {
        return this.items.filter(item => !item.isFinished).length
      }
    },
    methods: {
      toggleFilter(state) {
        this.$emit('toggle', state)
      },
      clearALLFinishedItem() {
        this.$emit('clear')
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .tab
    display flex
    height 50px
    font-size 20px
    line-height 40px
    .left
      flex 0 0 200px
      width 200px
    .middle
      display inline-block
      flex 1
      text-align center
      .state
        margin 0 10px
        padding 0 5px
        &.active
          border 1px solid #f00
        &:hover
          cursor pointer
    .clear
      flex 0 0 200px
      width 200px
      &:hover
        cursor pointer
</style>
