/**
 * 创建 App
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Meta from 'vue-meta'

import App from './App'
import createRouter from './router'
import createStore from './store'
import Notification from './components/notification'
import Tabs from './components/tabs'

Vue.use(Meta)
Vue.use(Notification)
Vue.use(Tabs)

export function createApp() {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
