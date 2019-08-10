/**
 * 服务端渲染入口
 */
import { createApp } from './app.js'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    if (context.user) {
      store.state.user = context.user
    }

    // 设置服务端路由
    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }

      Promise.all(
        matchedComponents.map(component => {
          if (component.asyncData) {
            return component.asyncData({
              route: router.currentRoute,
              router,
              store
            })
          }
        })
      )
        .then(() => {
          context.meta = app.$meta()
          context.state = store.state
          context.router = router
          resolve(app)
        })
        .catch(error => console.log(error))
    })
  })
}
