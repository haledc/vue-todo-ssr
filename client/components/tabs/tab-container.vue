
<script type="text/jsx">
  export default {
    name: 'TabContainer',
    props: {
      panes: {
        type: Array,
        required: true
      }
    },
    render() {
      const contents = this.panes.map(pane => {
        return pane.active ? pane.$slots.default : null
      })
      return (
        <div className="tab-content">
          {contents}
        </div>
      )
    }
  }
</script>
