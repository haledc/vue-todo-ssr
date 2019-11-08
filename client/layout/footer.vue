<script>
export default {
  data() {
    return {
      content: 'Happy Everyday'
    }
  },
  render(h) {
    return h('div', { class: 'footer' }, [
      h('div', { class: 'content' }, this.content)
    ])
  }
}
</script>

<style lang="scss" scoped>
.footer {
  height: 60px;
  margin: 0 auto;

  .content {
    line-height: 60px;
    font-size: 25px;
    font-family: 'Courier New';
    text-align: center;
  }
}
</style>
