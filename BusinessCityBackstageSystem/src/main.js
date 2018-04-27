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
import Blob from './excel/Blob.js'
import Export2Excel from './excel/Export2Excel.js'
import $ from 'jquery'

// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
Vue.component(CollapseTransition.name, CollapseTransition)
    // import store from './vuex/store'
    // 挂载在全局
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
// Vue.prototype.$=jquery

//路由限制跳转判断
router.beforeEach((to, from, next) => {
    if (to.path.indexOf("/login") == -1) {
        if (sessionStorage.getItem('userInfo')!= null) { 
            next();
        } else {
            next({path: '/login'})
        }
        next();
    } else {
        next();
    }
})

    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})