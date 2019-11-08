<script>
export default {
  data() {
    return {
      title: 'My Todo'
    }
  },
  render(h) {
    return h('div', { class: 'header' }, [
      h('div', { class: 'title' }, this.title)
    ])
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin: 0 auto;
  height: 100px;

  .title {
    font-size: 50px;
    font-weight: bolder;
    font-family: 'Courier New';
    line-height: 100px;
    text-align: center;
  }
}
</style>
