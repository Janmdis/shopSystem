// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import 'babel-polyfill'
import echarts from 'echarts'
import axios from 'axios'
import store from './store'

// import store from './vuex/store'
// 挂载在全局
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts 
Vue.prototype.$http= axios

//路由限制跳转判断
router.beforeEach((transition, from, next) => {
  // 登录路径不执行
  if (transition.path.indexOf('login') == -1) {
    console.log(transition.path.indexOf('login'))
      // 判断缓存信息是否存在，不存在则直接跳转登录页
        //return next({ path: '/login' })

  }
  next();
})
// router.afterEach((to, from, next) => {
//   alert(to.name);
//   document.title = to.name;
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
