/**
 * 在原来的基础上扩展组件，增加属性和方法
 */
import Notification from './notification'

export default {
  extends: Notification, // 组件扩展
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
    // 定时关闭
    createTimer() {
      if (this.closeTime) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.closeTime)
      }
    },

    // 清除定时器
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },

    // 每个实例的高度赋值给 height
    afterEnter() {
      this.height = this.$el.offsetHeight
    }
  },
  beforeDestroy() {
    this.clearTimer()
  }
}
