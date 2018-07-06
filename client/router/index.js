import Vue from 'vue'
import Router from 'vue-router'

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
        component: () => import(/* webpackChunkName: "login-view" */ '../views/login/login')
      },
      {
        path: '/app',
        component: () => import(/* webpackChunkName: "todo-view" */ '../views/todo/todo')
      }
    ]
  })
}
