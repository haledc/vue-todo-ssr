import api from 'api'
import notify from '../components/notification/function'
import bus from '../utils/bus'

const handleError = error => {
  if (error.code === 401) {
    notify({
      content: '请先登录！'
    })
    bus.$emit('auth')
  }
}

export default {
  fetchTodos: ({ commit }) => {
    commit('startLoading')
    return api
      .getAllTodos()
      .then(data => {
        commit('endLoading')
        // ~ todo根据创建时间进行排序 (ps: apiCloud 的数据是无序的)
        data = data.sort((x, y) => x.createdAt < y.createdAt)
        commit('filterTodos', data)
      })
      .catch(error => {
        commit('endLoading')
        handleError(error)
      })
  },
  addTodo: ({ commit }, todo) => {
    api
      .addTodo(todo)
      .then(data => {
        commit('addTodo', data)
        notify({
          content: '你又多了一件事要做！'
        })
      })
      .catch(error => handleError(error))
  },
  updateTodo: ({ commit }, { id, todo }) => {
    api
      .updateTodo(id, todo)
      .then(data => {
        commit('updateTodo', { id, todo: data })
        notify({
          content: '你更新了一件事！'
        })
      })
      .catch(error => handleError(error))
  },
  deleteTodo: ({ commit }, id) => {
    api
      .deleteTodo(id)
      .then(() => {
        commit('deleteTodo', id)
        notify({
          content: '你少了一件事要做！'
        })
      })
      .catch(error => handleError(error))
  },
  deleteCompleted: ({ commit, state }) => {
    const ids = state.todos.filter(t => t.completed).map(t => t.id)
    api
      .deleteCompleted(ids)
      .then(() => {
        commit('deleteCompleted')
        notify({
          content: '清理一下！'
        })
      })
      .catch(error => handleError(error))
  },
  login: ({ commit }, { username, password }) => {
    return new Promise((resolve, reject) => {
      api
        .login(username, password)
        .then(data => {
          commit('doLogin', data)
          notify({
            content: '登录成功！'
          })
          resolve()
        })
        .catch(error => {
          handleError(error)
          reject(error)
        })
    })
  }
}
