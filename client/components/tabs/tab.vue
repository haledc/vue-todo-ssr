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
    this.$parent.panes.push(this) // 挂载子组件时把本组件添加到父组件中
  },
  computed: {
    active() {
      return this.$parent.value === this.index // 父组件的 value 和本组件的 index 一致时设为 active
    }
  },
  methods: {
    handleClick() {
      this.$parent.onChange(this.index) // 调用父组件的方法，但是传入的是本组件的值
    }
  },
  render(h) {
    const tab = this.$slots.label || <span>{this.label}</span> // 设为 label 插槽来填值或者直接填入值
    const classNames = {
      tab: true,
      active: this.active
    }

    // return (
    //   <li class={classNames} on-click={this.handleClick}>
    //     {tab}
    //   </li>
    // )

    return h('li', { class: classNames, on: { click: this.handleClick } }, [
      tab
    ])
  }
}
</script>

<style lang="scss" scoped>
.tab {
  list-style: none;
  line-height: 40px;
  margin-right: 30px;
  position: relative;
  bottom: -2px;
  cursor: pointer;

  &.active {
    border-bottom: 2px solid blue;
  }

  &:last-child {
    margin-right: 0;
  }
}
</style>
