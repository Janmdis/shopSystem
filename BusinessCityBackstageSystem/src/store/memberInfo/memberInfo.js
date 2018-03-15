/* eslint-disable */
import axios from 'axios'

const state = {
    customerCategory: [],
    recommendedSource: [],
    shopInfo: []
};
const mutations = {
    editCatogery(state, data) {
        state.customerCategory = data;
    },
    editOrigin(state, data) {
        state.recommendedSource = data;
    },
    // shopMessage(state, data) {
    //     state.shopInfo = data;
    // }
};
const actions = {
    // 获取会员类型
    getCatogery({ commit, state }) {
        axios.post(
            '/api/customer/customerCategory/findCategory?key=id&value=name'
        ).then(function(response) {
            let data = response.data;
            if (data.msg == '查询成功') {
                commit({
                    type: 'editCatogery',
                    data: data.info
                });
            }
        }).catch(function(response) {
            console.log(response);
        });
    },
    getOrigin({ commit, state }) { //  获取推荐来源接口
        axios.post(
                '/api/customer/recommendedSource/findSource?key=id&value=name'
            ).then(function(response) {
                let data = response.data;
                if (data.msg == '查询成功') {
                    commit({
                        type: 'editOrigin',
                        data: data.info
                    });
                }
            })
            .catch(function(response) {
                console.log(response);
            });
    },
    // getShopMessage({ commit, state }, data) { //  获取订单详情信息
    //     axios.post(
    //             '/api/product/order/queryOrderDetails',
    //             data.id
    //         ).then(function(response) {
    //             let data = response.data;
    //             console.log(data)
    //             if (data.status == 200) {
    //                 commit({
    //                     type: 'shopMessage',
    //                     data: data.info
    //                 });
    //             }
    //         })
    //         .catch(function(response) {
    //             console.log(response);
    //         });
    // }
}
export default {
    state,
    mutations,
    actions
}