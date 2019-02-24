export default {
  filterTodos: (state, todos) => {
    state.todos = todos
  },
  addTodo: (state, todo) => {
    state.todos.unshift(todo)
  },
  updateTodo: (state, { id, todo }) => {
    const index = state.todos.findIndex(t => t.id === id)
    // state.todos[index] = todo
    state.todos.splice(index, 1, todo)
  },
  deleteTodo: (state, id) => {
    const index = state.todos.findIndex(t => t.id === id)
    state.todos.splice(index, 1)
  },
  deleteCompleted: state => {
    state.todos = state.todos.filter(t => !t.completed)
  },
  doLogin: (state, userInfo) => {
    state.user = userInfo
  },
  startLoading: state => {
    state.loading = true
  },
  endLoading: state => {
    state.loading = false
  }
}
