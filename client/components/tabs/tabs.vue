<script type="text/jsx">
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
    render() {
      return (
        // 注意：vue中的jsx的标签类名可以直接写模板语法中的class而不是react的className
        <div class="tabs">
          <ul class="tabs-header">
            {this.$slots.default}
          </ul>
          {/*通过组件来更新过*/}
          <tab-container panes={this.panes}/>
        </div>
      )
    }
  }
</script>

<style lang="stylus" scoped>
  .tabs-header
    display flex
    list-style none
    margin 0
    padding 0
    border-bottom 2px solid #ededed
</style>
