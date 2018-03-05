<template>
  <div class="todo">
    <div class="content-wrapper">
      <div class="input">
        <input type="text"
               class="text"
               autofocus="autofocus"
               placeholder="e.g. 今天要做什么?"
               @keyup.enter="addItem">
        <button type="submit" class="submit" @click="addItem">确认</button>
      </div>
      <item-list
        :item="item"
        v-for="item in filterItems"
        :key="item.id"
        @delete="deleteItem"/>
      <tab :filter="filter"
           :items="items"
           @toggle="toggleFilter"
           @clear="clearALLFinishedItem"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ItemList from 'components/item-list/item-list'
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
      addItem(e) {
        console.log(e.target.value)
        if (e.target.value === ' ') {
          alert('请输入文字！')
          return
        }
        this.items.unshift({
          id: id++,
          content: e.target.value.trim(),
          isFinished: false
        })
        e.target.value = ''
      },
      deleteItem(id) {
        const message = confirm('确定要删除吗')
        if (message) {
          this.items.splice(this.items.findIndex(item => item.id === id), 1)
        }
      },
      toggleFilter(state) {
        this.filter = state
      },
      clearALLFinishedItem() {
        if (this.items.filter(item => item.isFinished).length === 0) {
          alert('没有已完成的项目')
          return
        }
        const message = confirm('确定要删除已完成的项目吗')
        if (message) {
          this.items = this.items.filter(item => !item.isFinished)
        }
      },
      showDetail() {
        this.show = true
      }
    },
    components: {
      ItemList,
      Tab
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .todo
    position absolute
    width 100%
    height 440px
    top 100px
    overflow hidden
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
