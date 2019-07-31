import Notification from './notification'
import notify from './function'

export default Vue => {
  Vue.component(Notification.name, Notification) // 全局注册
  Vue.prototype.$notify = notify // 在原型对象中赋值
}
