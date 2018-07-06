import Vue from 'vue'
import Component from './notification-extend'

// 实例扩展，生成构造函数
const NotificationConstructor = Vue.extend(Component)

const instances = []
let seed = 1

/**
 * 在数组中删除实例
 * @param instance
 */
const removeInstance = (instance) => {
  if (!instance) return
  const len = instances.length
  const index = instances.findIndex(item => item.id === instance.id)

  // 在数组中删除实例
  instances.splice(index, 1)

  if (len <= 1) return
  // 删除实例的高度
  const removeHeight = instance.vm.height
  // 最终的高度需要减去删除实例的高度和间隙
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset = parseInt(instances[i].verticalOffset) - removeHeight - 16
  }
}

/**
 * 输出方法
 * @param options
 * @return {CombinedVueInstance<CombinedVueInstance<Vue, any, any, any, Record<never, any>> & Vue, object, object, object, Record<never, any>> | *}
 */
export default (options) => {
  // 服务端渲染返回
  if (Vue.prototype.$isServer) return

  const {closeTime, ...rest} = options

  // 通过构造函数生成vue实例
  const instance = new NotificationConstructor({
    propsData: rest,
    data: {
      closeTime: closeTime === undefined ? 3000 : closeTime
    }
  })

  const id = `notification_${seed++}`
  instance.id = id
  // 挂载但不指明目标，生产一个dom
  instance.vm = instance.$mount()

  // 挂载后设置为可见
  instance.vm.visible = true

  // 加入到页面的dom中
  document.body.appendChild(instance.vm.$el)

  // 初始化底部间隙
  let verticalOffset = 0

  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16

  // 赋值给实例
  instance.verticalOffset = verticalOffset

  instances.push(instance)

  // 实例监听事件
  instance.vm.$on('closed', () => {
    // 在数组中删除实例
    removeInstance(instance)
    // 在dom中删除
    document.body.removeChild(instance.vm.$el)
    // 销毁实例
    instance.vm.$destroy()
  })

  instance.vm.$on('close', function () {
    this.visible = false
  })

  return instance.vm
}
