import Vue from 'vue'
import App from './App'
// import './common/stylus/reset.styl'

import createRouter from './router'
import createStore from './store'

const router = createRouter()
const store = createStore()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
