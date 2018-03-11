<template>
  <div class="tab">
    <span class="left">{{ unFinishedItemLength }} item left</span>
    <span class="middle">
        <span class="state"
              v-for="state in states"
              :key="state"
              :class="{'active': filter === state }"
              @click="toggleFilter(state)">{{ state }}</span>
      </span>
    <span>
        <span class="clear" v-show="isShowClear" @click="clearALLFinishedItem">clear completed</span>
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
        states: ['All', 'Active', 'Completed']
      }
    },
    computed: {
      unFinishedItemLength() {
        return this.items.filter(item => !item.isCompleted).length
      },
      isShowClear() {
        if (this.items.filter(item => item.isCompleted).length > 0) {
          return true
        } else {
          return false
        }
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
    line-height 40px
    margin 0 20px
    padding 0 10px
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
          color #f00
    .clear
      flex 0 0 200px
      width 200px
      &:hover
        cursor pointer
        color #f00
</style>
