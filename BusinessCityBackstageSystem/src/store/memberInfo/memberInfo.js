/* eslint-disable */
import axios from 'axios'

const state = {
    customerCategory: [],
    recommendedSource: []
};
const mutations = {
    editCatogery(state, data) {
        state.customerCategory = data;
    },
    editOrigin(state, data) {
        state.recommendedSource = data;
    }
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
                sessionStorage.setItem("member", JSON.stringify(data))
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
                    sessionStorage.setItem("findSource", JSON.stringify(data))
                }
            })
            .catch(function(response) {
                console.log(response);
            });
    }
}
export default {
    state,
    mutations,
    actions
}