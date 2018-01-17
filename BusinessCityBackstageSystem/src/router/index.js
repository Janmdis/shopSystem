import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
    /* eslint-disable */
export default new Router({
    //mode: 'history',
    routes: [{
            path: '/login',
            component: resolve => require(['@/components/view/login/Logining.vue'], resolve),
            children: [{
                    path: '', // 登录页面
                    component: resolve => require(['@/components/view/login/Login.vue'], resolve)
                },
                {
                    path: 'forgetPwd', //  忘记密码页面
                    name: 'forgetPwd',
                    component: resolve => require(['@/components/view/login/ForgetPwd.vue'], resolve)
                }
            ]
        },
        {
            path: '',
            component: resolve => require(['@/components/common/home/home.vue'], resolve),
            children: [
                {
                    path: '',
                    redirect: 'index'
                },
                {
                    path: 'index', // 首页
                    name: 'index',
                    component: resolve => require(['@/components/view/index/index.vue'], resolve)
                },
                {
                    path: 'member', // 会员管理
                    name: 'member',
                    component: resolve => require(['@/components/view/Member/Member.vue'], resolve)
                },
                {
                    path: 'depmanage', // 部门管理
                    name: 'depmanage',
                    component: resolve => require(['@/components/view/organize/depmanage/depmanage.vue'], resolve)
                },
                {
                    path: 'userInfos', // 个人信息
                    name: 'userInfos',
                    component: resolve => require(['@/components/view/userInfo/userInfos.vue'], resolve)
                },
                {
                    path: 'roleManage', // 角色管理
                    name: 'roleManage',
                    component: resolve => require(['@/components/view/organize/rolemanage/role.vue'], resolve)
                },
                {
                    path: 'usermanage', // 用户管理
                    name: 'usermanage',
                    component: resolve => require(['@/components/view/organize/usrmanage/User.vue'], resolve)
                },
                {
                    path: 'mallSet', // 商城模板
                    name: 'mallSet',
                    component: resolve => require(['@/components/view/mall/customTemplate/templateSet.vue'], resolve)
                },
                {
                    path: 'authoritymanage', // 权限管理
                    name: 'authoritymanage',
                    component: resolve => require(['@/components/view/organize/authmanage/authority.vue'], resolve)
                }
                
            ]
        },
        {
            path: '*',
            component: resolve => require(['@/components/view/Error/Error.vue'], resolve)
        }
    ]
})