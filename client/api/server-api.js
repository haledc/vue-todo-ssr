import config from '../../app.config'
import createDb from '../../server/db'

const db = createDb(config.db.appId, config.db.appKey)

export default {
  getAllTodos() {
    return db.getAllTodos()
  }
}
