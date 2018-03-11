<template>
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
  import {saveToLocal} from 'common/js/store'

  let id = 0

  export default {
    data() {
      return {
        items: [],
        filter: 'All',
        show: false
      }
    },
    computed: {
      filterItems() {
        if (this.filter === 'All') {
          return this.items
        }
        const finished = this.filter === 'Completed'
        return this.items.filter(item => finished === item.isCompleted)
      }
    },
    methods: {
      addItem() {
        let content = this.$refs.text.value.trim()
        if (content === '') {
          return
        }
        this.items.unshift({
          id: id++,
          content: content,
          isCompleted: false
        })
        saveToLocal('hale', content, false)
        this.$refs.text.value = ''
      },
      deleteItem(id) {
        const message = confirm('Are you sure?')
        if (message) {
          this.items.splice(this.items.findIndex(item => item.id === id), 1)
        }
      },
      toggleFilter(state) {
        this.filter = state
      },
      clearALLFinishedItem() {
        const message = confirm('Are you sure?')
        if (message) {
          this.items = this.items.filter(item => !item.isCompleted)
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
          flex 0 0 120px
          height 40px
          width 120px
          text-align center
          font-family "Courier New"
          font-size 16px
          font-weight bolder
          &:hover
            cursor pointer
            color #f00
</style>
