import Notification from './notification'

export default {
  // 组件扩展
  extends: Notification,
  computed: {
    style() {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  data() {
    return {
      verticalOffset: 0,
      closeTime: 3000,
      visible: false
    }
  },
  mounted() {
    this.createTimer()
  },
  methods: {
    createTimer() {
      console.log(this.closeTime)
      if (this.closeTime) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.closeTime)
      }
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    afterEnter() {
      this.height = this.$el.offsetHeight
    }
  },
  beforeDestroy() {
    this.clearTimer()
  }
}
