<template>
  <div class="todo">
    <div class="content-wrapper">
      <div class="input">
        <input type="text"
               id="text"
               class="text"
               autofocus="autofocus"
               placeholder="e.g. 今天要做什么?"
               ref="text"
               @keyup.enter="addItem">
        <button type="submit" class="submit" @click="addItem">确认</button>
      </div>
      <div class="item-wrapper">
        <item
          :item="item"
          v-for="item in filterItems"
          :key="item.id"
          @delete="deleteItem"/>
      </div>
      <tab :filter="filter"
           :items="items"
           @toggle="toggleFilter"
           @clear="clearALLFinishedItem"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Item from 'components/item/item'
  import Tab from 'components/tab/tab'

  let id = 0

  export default {
    data() {
      return {
        items: [],
        filter: '所有项目',
        show: false
      }
    },
    computed: {
      filterItems() {
        if (this.filter === '所有项目') {
          return this.items
        }
        const finished = this.filter === '已完成项目'
        return this.items.filter(item => finished === item.isFinished)
      }
    },
    methods: {
      addItem() {
        let content = document.getElementById('text').value.trim()
        if (content === '') {
          alert('请输入有效文字！')
          return
        }
        this.items.unshift({
          id: id++,
          content: content,
          isFinished: false
        })
        this.$refs.text.value = ''
      },
      deleteItem(id) {
        const message = confirm('确定要删除吗？')
        if (message) {
          this.items.splice(this.items.findIndex(item => item.id === id), 1)
        }
      },
      toggleFilter(state) {
        this.filter = state
      },
      clearALLFinishedItem() {
        if (this.items.filter(item => item.isFinished).length === 0) {
          alert('没有已完成的项目！')
          return
        }
        const message = confirm('确定要删除已完成的项目吗？')
        if (message) {
          this.items = this.items.filter(item => !item.isFinished)
        }
      },
      showDetail() {
        this.show = true
      }
    },
    components: {
      Item,
      Tab
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .todo
    width 100%
    top 100px
    overflow hidden
    flex 1
    .content-wrapper
      width 80%
      margin 0 auto
      position relative
      .input
        height 60px
        width 100%
        text-align center
        display flex
        font-size 20px
        .text
          flex 1
          height 40px
          margin 10px 0
          border-radius 5px
        .submit
          height 40px
          width 80px
          margin 10px
          text-align center
          font-size 16px
          font-weight bolder
          &:hover
            cursor pointer
</style>
