import Notification from './notification'
import notify from './function'

export default (Vue) => {
  // 全局注册
  Vue.component(Notification.name, Notification)
  // 在原型对象中赋值
  Vue.prototype.$notify = notify
}
