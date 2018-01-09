import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: resolve => require(['../components/view/login/Login.vue'], resolve)
    }
  ]
})
