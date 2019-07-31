const sha1 = require('sha1')
const axios = require('axios')

const CLASS_NAME = 'todo'

const request = axios.create({
  baseURL: 'https://d.apicloud.com/mcm/api'
})

const createError = (code, res) => {
  const error = new Error(res.message)
  error.code = code
  return error
}

const handleRequest = ({ status, data, ...rest }) => {
  if (status === 200) {
    return data
  } else {
    throw createError(status, rest)
  }
}

module.exports = (appId, appKey) => {
  const getHeaders = () => {
    const now = Date.now()
    return {
      'X-APICloud-AppId': appId,
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }
  }
  return {
    async getAllTodos() {
      return handleRequest(
        await request.get(`/${CLASS_NAME}`, { headers: getHeaders() })
      )
    },
    async addTodo(todo) {
      return handleRequest(
        await request.post(`/${CLASS_NAME}`, todo, { headers: getHeaders() })
      )
    },
    async updateTodo(id, todo) {
      return handleRequest(
        await request.put(`/${CLASS_NAME}/${id}`, todo, {
          headers: getHeaders()
        })
      )
    },
    async deleteTodo(id) {
      return handleRequest(
        await request.delete(`/${CLASS_NAME}/${id}`, { headers: getHeaders() })
      )
    },
    async deleteCompleted(ids) {
      // requests是默认变量名，不能更改
      const requests = ids.map(id => {
        return {
          method: 'DELETE',
          path: `/mcm/api/${CLASS_NAME}/${id}`
        }
      })
      return handleRequest(
        await request.post('/batch', { requests }, { headers: getHeaders() })
      )
    }
  }
}
