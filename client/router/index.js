import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login/login'

Vue.use(Router)

export default function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        redirect: '/login'
      },
      {
        path: '/login',
        component: Login
      },
      {
        path: '/app',
        component: () =>
          import(/* webpackChunkName: 'todo' */ '../views/todo/todo')
      }
    ]
  })
}
