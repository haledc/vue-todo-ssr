<script>
export default {
  name: 'TabContainer',
  props: {
    panes: {
      type: Array,
      required: true
    }
  },
  render(h) {
    const contents = this.panes.map(pane => {
      return pane.active ? pane.$slots.default : null
    })

    // return <div className="tab-content">{contents}</div>

    return h('div', { class: 'tab-content' }, contents)
  }
}
</script>
