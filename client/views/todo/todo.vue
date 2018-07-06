<template>
  <div>
    <div class="todo">
      <div class="tab-container">
        <tabs :value="filter" @change="handleChange">
          <tab :label="tab" :index="tab" v-for="tab in stats" :key="tab"></tab>
        </tabs>
      </div>
      <div class="content-wrapper">
        <div class="input">
          <input
            type="text"
            class="text"
            placeholder="e.g. what do you want to?"
            @keyup.enter="handleTodo">
        </div>
        <div class="item-wrapper">
          <item
            v-for="todo in filtertodos"
            :key="todo.id"
            :todo="todo"
            @delete="deleteTodo"
            @toggle="toggleTodoState"
          />
        </div>
        <helper
          :filter="filter"
          :todos="todos"
          @clear="clearAllCompleted"
        />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Item from '../../views/todo/item'
  import Helper from '../../views/todo/helper'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    asyncData({store, router}) {
      // 登录后才获取数据
      if (store.state.user) {
        return store.dispatch('fetchTodos')
      }
      router.replace('/login')
      return Promise.resolve()
    },
    data() {
      return {
        filter: 'All',
        stats: ['All', 'Active', 'Completed']
      }
    },
    computed: {
      /**
       * 筛选项目列表
       */
      filtertodos() {
        if (this.filter === 'All') {
          return this.todos
        }
        const finished = this.filter === 'Completed'
        return this.todos.filter(todo => finished === todo.completed)
      },
      ...mapGetters(['todos'])
    },
    mounted() {
      // 根据使用场景确认是否需要请求数据，用于服务端已有渲染数据后不再发送重复请求
      if (this.todos && this.todos.length < 1) {
        this.fetchTodos()
      }
    },
    methods: {
      handleTodo(e) {
        const content = e.target.value.trim()
        if (!content) {
          this.$notify({
            content: '必须输入内容！'
          })
          return
        }
        const todo = {
          content: content,
          completed: false
        }
        this.addTodo(todo)
        e.target.value = ''
      },
      toggleTodoState(todo) {
        this.updateTodo({
          id: todo.id,
          todo: Object.assign({}, todo, {
            completed: !todo.completed
          })
        })
      },
      clearAllCompleted() {
        this.deleteCompleted()
      },
      handleChange(index) {
        this.filter = index
      },
      ...mapActions(['fetchTodos', 'addTodo', 'deleteTodo', 'updateTodo', 'deleteCompleted'])
    },
    components: {
      Item,
      Helper
    }
  }
</script>

<style scoped lang="stylus">
  .todo
    width 80%
    margin 0 auto
    background rgb(199, 237, 203)
    border-radius 2px
    font-family "Courier New"
    .tab-container
      padding 0 20px
    .content-wrapper
      margin 20px 0
      box-sizing border-box
      .input
        height 40px
        text-align center
        font-family "Courier New"
        display flex
        padding 0 0 0 20px
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
      .item-wrapper
        margin-top 20px


</style>
