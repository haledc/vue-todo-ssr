import Vue from 'vue'
import Component from './notification-extend'

// 实例扩展，生成构造函数
const NotificationConstructor = Vue.extend(Component)

// 实例数组
const instances = []
let seed = 1

/**
 * 在数组中删除实例
 * @param {VueConstructor} instance
 */
const removeInstance = instance => {
  if (!instance) return
  const len = instances.length
  const index = instances.findIndex(item => item.id === instance.id)

  instances.splice(index, 1) // 在数组中删除实例

  if (len <= 1) return

  const removeHeight = instance.vm.height // 删除实例的高度

  // 最终的高度需要减去删除实例的高度和间隙
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset =
      parseInt(instances[i].verticalOffset) - removeHeight - 16
  }
}

/**
 * 输出方法
 * @param {Object} options
 */
const notify = options => {
  if (Vue.prototype.$isServer) return // 服务端渲染返回

  const { closeTime, ...rest } = options

  // 通过构造函数生成 vue 实例
  const instance = new NotificationConstructor({
    propsData: rest,
    data: {
      closeTime: closeTime === undefined ? 3000 : closeTime
    }
  })

  const id = `notification_${seed++}`
  instance.id = id

  instance.vm = instance.$mount() // 挂载但不指明目标，生成一个 dom

  instance.vm.visible = true // 挂载后设置为可见

  document.body.appendChild(instance.vm.$el) // 加入到页面的 dom 中

  let verticalOffset = 0 // 初始化底部间隙

  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16

  instance.verticalOffset = verticalOffset // 赋值给实例

  instances.push(instance)

  // 实例监听事件
  instance.vm.$on('closed', () => {
    removeInstance(instance) // 在数组中删除实例
    document.body.removeChild(instance.vm.$el) // 在 dom 中删除
    instance.vm.$destroy() // 手动销毁实例
  })

  instance.vm.$on('close', function() {
    this.visible = false
  })

  return instance.vm
}

export default notify
