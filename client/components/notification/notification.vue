<template>
  <transition
    name="fade"
    @after-leave="afterLeave"
    @after-enter="afterEnter"
  >
    <div
      class="notification"
      :style="style"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="createTimer"
    >
      <div class="content">{{content}}</div>
      <div
        class="btn"
        @click="handleClose"
      >{{btn}}</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    content: {
      type: String,
      required: true
    },
    btn: {
      type: String,
      default: '关闭'
    }
  },
  data() {
    return {
      visible: true,
      height: 0
    }
  },
  computed: {
    // 属性占位，用来给扩展组件替换
    style() {
      return {}
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    afterLeave() {
      this.$emit('closed')
    },
    // 方法占位，用来给扩展组件替换
    afterEnter() {},
    clearTimer() {},
    createTimer() {}
  }
}
</script>

<style lang="stylus" scoped>
.notification
  display: inline-flex
  background-color: #303030
  color: rgba(255, 255, 255, 1)
  align-items: center
  padding: 20px
  min-width: 280px
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)
  flex-wrap: wrap
  transition: all 0.3s

  .content
    padding: 0

  .btn
    color: #ff4081
    padding-left: 24px
    margin-left: auto
    cursor: pointer

  &.fade-enter-active, &.fade-leave-active
    transition: opacity 0.5s

  &.fade-enter, &.fade-leave-to
    opacity: 0
</style>
