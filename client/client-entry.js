import createApp from './create-app'
import bus from './utils/bus'

const {app, router, store} = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

bus.$on('auth', () => {
  router.push('/login')
})

router.onReady(() => {
  app.$mount('#app')
})