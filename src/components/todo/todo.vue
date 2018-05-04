<template>
  <div>
    <div class="header">
      <div class="title">
        {{title}}
      </div>
    </div>
    <div class="todo">
      <div class="content-wrapper">
        <div class="input">
          <input type="text"
                 class="text"
                 autofocus="autofocus"
                 placeholder="e.g. what do you want to?"
                 ref="text"
                 @keyup.enter="addItem">
          <button type="submit" class="submit" @click="addItem">submit</button>
        </div>
        <div class="item-wrapper">
          <item
            v-for="item in filterItems"
            :key="item.id"
            :item="item"
            @delete="deleteItem"/>
        </div>
        <tab :filter="filter"
             :items="items"
             @toggle="toggleFilter"
             @clear="clearAllCompletedItem"/>
      </div>
    </div>
    <div class="footer">
      <div class="content">
        Happy Everyday
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Item from 'components/item/item'
  import Tab from 'components/tab/tab'

  export default {
    data() {
      return {
        title: 'My Todo',
        items: [],
        filter: 'All',
        show: false,
        lastestId: 0
      }
    },
    created() {
      let items = window.localStorage.getItem('todo')
      if (items) {
        this.items = JSON.parse(items)
        this.lastestId = parseInt(this.items[0].id)
      }
    },
    computed: {
      /**
       * 筛选项目列表
       */
      filterItems() {
        if (this.filter === 'All') {
          return this.items
        }
        const finished = this.filter === 'Completed'
        return this.items.filter(item => finished === item.isCompleted)
      }
    },
    watch: {
      'items'() {
        window.localStorage.setItem('todo', JSON.stringify(this.items))
      }
    },
    methods: {
      /**
       * 增加项目
       */
      addItem() {
        let content = this.$refs.text.value.trim()
        if (content === '') {
          return
        }
        let item = {
          id: this.lastestId++,
          content: content,
          isCompleted: false
        }
        this.items.unshift(item)
        this.$refs.text.value = ''
      },
      /**
       * 删除项目
       * @param id
       */
      deleteItem(id) {
        const message = confirm('Are you sure?')
        if (message) {
          this.items.splice(this.items.findIndex(item => item.id === id), 1)
        }
      },
      toggleFilter(state) {
        this.filter = state
      },
      /**
       * 清除完成项目
       */
      clearAllCompletedItem() {
        const message = confirm('Are you sure?')
        if (message) {
          this.items = this.items.filter(item => !item.isCompleted)
        }
      }
    },
    components: {
      Item,
      Tab
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .header
    margin 0 auto
    height 100px
    .title
      font-size 50px
      font-weight bolder
      font-family "Courier New"
      line-height 100px
      text-align center

  .todo
    width 80%
    margin 0 auto
    background rgb(199, 237, 203)
    border-radius 2px
    font-family "Courier New"
    .content-wrapper
      margin 20px 0
      box-sizing border-box
      .input
        height 40px
        text-align center
        font-family "Courier New"
        display flex
        padding 20px
        font-size 20px
        .text
          flex 1
          height 40px
          border-radius 5px
          padding 0 20px
          margin-right 20px
          border-color none
          &:focus {
            outline-color: #fff;
          }
        .submit
          flex 0 0 100px
          height 40px
          width 100px
          text-align center
          font-family "Courier New"
          font-size 16px
          font-weight bolder
          &:hover
            cursor pointer
            color #f00

  .footer
    height 60px
    margin 0 auto
    .content
      line-height 60px
      font-size 25px
      font-family "Courier New"
      text-align center
</style>
