<script>
export default {
  name: 'Tab',
  props: {
    index: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      default: 'tab'
    }
  },
  mounted() {
    // 把本组件添加到父组件中
    this.$parent.panes.push(this)
  },
  computed: {
    active() {
      // 父组件的value和本组件的index一致时设为active
      return this.$parent.value === this.index
    }
  },
  methods: {
    handleClick() {
      // 调用父组件的方法，但是传入的是本组件的值
      this.$parent.onChange(this.index)
    }
  },
  render(h) {
    // 设为label插槽来填值或者直接填入值
    const tab = this.$slots.label || <span>{this.label}</span>
    const classNames = {
      tab: true,
      active: this.active
    }
    return (
      <li class={classNames} on-click={this.handleClick}>
        {tab}
      </li>
    )
  }
}
</script>

<style lang="stylus" scoped>
.tab
  list-style: none
  line-height: 40px
  margin-right: 30px
  position: relative
  bottom: -2px
  cursor: pointer

  &.active
    border-bottom: 2px solid blue

  &:last-child
    margin-right: 0
</style>

