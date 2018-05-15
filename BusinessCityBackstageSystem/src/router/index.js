import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
    /* eslint-disable */
export default new Router({
    mode: 'history',
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
            children: [{
                    path: '',
                    redirect: '/login'
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
                    path: 'templateList', // 首页模板管理
                    name: 'templateList',
                    component: resolve => require(['@/components/view/mall/templateList/templateList.vue'], resolve)
                },
                {
                    path: 'eventTemplateList', // 活动模板管理
                    name: 'eventTemplateList',
                    component: resolve => require(['@/components/view/mall/eventTemplateList/templateList.vue'], resolve)
                },
                {
                    path: 'detailTemplateList', // 详情模板管理
                    name: 'detailTemplateList',
                    component: resolve => require(['@/components/view/mall/detailTemplateList/templateList.vue'], resolve)
                },
                {
                    path: 'mallSet', // 模板设置
                    name: 'mallSet',
                    component: resolve => require(['@/components/view/mall/customTemplate/templateSet.vue'], resolve)
                },
                {
                    path: 'eventmanage', // 活动列表管理
                    name: 'eventmanage',
                    component: resolve => require(['@/components/view/mall/eventmanage/templateList.vue'], resolve)
                },
                {
                    path: 'usermanage', // 用户管理
                    name: 'usermanage',
                    component: resolve => require(['@/components/view/organize/usermanage/usermanage.vue'], resolve)
                },
                {
                    path: 'Supplier', // 供应商列表页
                    name: 'Supplier',
                    component: resolve => require(['@/components/view/ProductOnline/supplier/supplier.vue'], resolve)
                },
                {
                    path: 'commodity', // 商品列表页
                    name: 'commodity',
                    component: resolve => require(['@/components/view/ProductOnline/commodity/commodity.vue'], resolve)
                },
                {
                    path: 'package', // 套餐列表页
                    name: 'package',
                    component: resolve => require(['@/components/view/ProductOnline/package/package.vue'], resolve)
                },
                {
                    path: 'product', // 产品列表页
                    name: 'product',
                    component: resolve => require(['@/components/view/ProductOnline/product/product.vue'], resolve)
                },
                {
                    path: 'operationlog', // 管理日志
                    name: 'operationlog',
                    component: resolve => require(['@/components/view/ManagementCenter/operationlog/operationlog.vue'], resolve)
                },
                {
                    path: 'channelmanagement', // 渠道管理
                    name: 'channelmanagement',
                    component: resolve => require(['@/components/view/ManagementCenter/channelmanagement/channelmanagement.vue'], resolve)
                },
                {
                    path: 'residentialquarters', // 小区
                    name: 'residentialquarters',
                    component: resolve => require(['@/components/view/ManagementCenter/residentialquarters/residentialquarters.vue'], resolve)
                },
                {
                    path: 'comment', // 评论
                    name: 'comment',
                    component: resolve => require(['@/components/view/ManagementCenter/comment/comment.vue'], resolve)
                },
                {
                    path: 'MessageCenter', // 消息中心
                    name: 'MessageCenter',
                    component: resolve => require(['@/components/view/ManagementCenter/MessageCenter/MessageCenter.vue'], resolve)
                },
                {
                    path: 'knowledgeBase', // 知识库
                    name: 'knowledgeBase',
                    component: resolve => require(['@/components/view/ManagementCenter/knowledgeBase/knowledgeBase.vue'], resolve)
                },
                {
                    path: 'concessionalRate', // 优惠劵管理
                    name: 'concessionalRate',
                    component: resolve => require(['@/components/view/ManagementCenter/concessionalRate/concessionalRate.vue'], resolve)
                },
                {
                    path: 'basicConfiguration', // 基础配置
                    name: 'basicConfiguration',
                    component: resolve => require(['@/components/view/ManagementCenter/basicconfiguration/configuration.vue'], resolve)
                },
                {
                    path: 'order', // 订单
                    name: 'order',
                    component: resolve => require(['@/components/view/order/order.vue'], resolve)
                },
                {
                    path: 'refund', // 退款申请订单
                    name: 'refund',
                    component: resolve => require(['@/components/view/order/refund.vue'], resolve)
                },
                {
                    path: 'invoice', // 发票申请管理
                    name: 'invoice',
                    component: resolve => require(['@/components/view/order/invoice.vue'], resolve)
                }
            ]

        },
        {
            path: '*',
            component: resolve => require(['@/components/view/Error/Error.vue'], resolve)
        }
    ]
})