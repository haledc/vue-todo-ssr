<template>
  <div class="helper">
    <span class="left">
      {{ activeItemLength }} {{ activeItemLength > 1 ? 'items' : 'item' }} left
    </span>
    <span>
      <span class="clear" v-show="clearShow" @click="clearALLFinishedItem">
        clear completed
      </span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      required: true
    },
    todos: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      states: ['All', 'Active', 'Completed']
    }
  },
  computed: {
    activeItemLength() {
      return this.todos.filter(todo => !todo.completed).length
    },
    clearShow() {
      return this.todos.filter(todo => todo.completed).length > 0
    }
  },
  methods: {
    clearALLFinishedItem() {
      this.$emit('clear')
    }
  }
}
</script>

<style scoped lang="stylus">
.helper
  position: relative
  height: 50px
  width: auto
  line-height: 40px
  margin: 0 20px
  padding: 0 10px

  .left
    width: 120px

  .middle
    margin-left: 50px
    display: inline-block
    text-align: center

    .state
      margin: 0 5px
      padding: 0 5px

      &.active
        border: 1px solid #f00

      &:hover
        cursor: pointer
        color: #f00

  .clear
    position: absolute
    right: 10px
    width: 150px

    &:hover
      cursor: pointer
      color: #f00
</style>
