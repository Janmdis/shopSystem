import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: resolve => require(['../components/view/login/Login.vue'], resolve)
    },
    {
      path: '',
       component: resolve => require(['../components/common/home/home.vue'], resolve),
      children: [
        {
          path: '',
      	  redirect: '/index'
        },
        {
          path: '/index', // 首页
          component: resolve => require(['../components/view/index/index.vue'], resolve)
        }
      ]
    }
  ]
})
