import axios from 'axios'

import { createError } from '../utils/utils'

const request = axios.create({
  baseURL: '/'
})

const handleRequest = request => {
  return new Promise((resolve, reject) => {
    request
      .then(res => {
        const data = res.data
        if (!data) {
          return reject(createError(400, 'no data'))
        }
        if (!data.success) {
          reject(createError(400, data.message))
        }
        resolve(data.data)
      })
      .catch(error => {
        const res = error.response
        console.log('------------------------', res)
        if (res.status === 401) {
          reject(createError(401, 'need auth'))
        }
      })
  })
}

export default {
  getAllTodos() {
    return handleRequest(request.get('/api/todos'))
  },
  login(username, password) {
    return handleRequest(request.post('/user/login', { username, password }))
  },
  addTodo(todo) {
    return handleRequest(request.post('/api/todo', todo))
  },
  updateTodo(id, todo) {
    return handleRequest(request.put(`/api/todo/${id}`, todo))
  },
  deleteTodo(id) {
    return handleRequest(request.delete(`/api/todo/${id}`))
  },
  deleteCompleted(ids) {
    return handleRequest(request.post('/api/delete/completed', { ids }))
  }
}
