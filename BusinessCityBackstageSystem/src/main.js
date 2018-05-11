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
Vue.prototype.url_mobie='http://daojia.jingrunjia.com.cn';
Vue.prototype.url_img='http://47.100.51.41:8887/customer/resource/qrCode.png';

//路由限制跳转判断
router.beforeEach((transition, from, next) => {
        // 登录路径不执行
    console.log(transition)
        if (transition.path.indexOf('login') == -1) {
            console.log(transition.path.indexOf('login'))
            if (!sessionStorage.getItem('userInfo')) {
                return next({ path: '/login' })
            }
                // 判断缓存信息是否存在，不存在则直接跳转登录页
                // 

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