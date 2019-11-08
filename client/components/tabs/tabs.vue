<script>
import TabContainer from './tab-container'

export default {
  name: 'Tabs',
  components: {
    TabContainer
  },
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      panes: []
    }
  },
  methods: {
    onChange(index) {
      this.$emit('change', index)
    }
  },
  render(h) {
    return (
      <div class="tabs">
        <ul class="tabs-header">{this.$slots.default}</ul>
        <tab-container panes={this.panes} />
      </div>
    )

    // return h('div', { class: 'tabs' }, [
    //   h('ul', { class: 'tabs-header' }, this.$slots.default),
    //   h(TabContainer, { props: { panes: this.panes } })
    // ])
  }
}
</script>

<style lang="scss" scoped>
.tabs-header {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  border-bottom: 2px solid #ededed;
}
</style>
