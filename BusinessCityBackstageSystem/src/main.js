// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import 'babel-polyfill'
// 挂载在全局
Vue.use(ElementUI)
Vue.config.productionTip = false

//路由限制跳转判断
router.beforeEach((transition, from, next) => {
  // 登录路径不执行
  if (transition.path.indexOf('login') == -1) {
      // 判断缓存信息是否存在，不存在则直接跳转登录页
        //return next({ path: '/login' })

  }
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
