/* eslint-disable */
import axios from 'axios'

const state = {
    customerCategory: [],
    recommendedSource: [],
    memberHouse: []
};
const mutations = {
    editCatogery(state, data) {
        state.customerCategory = data;
    },
    editOrigin(state, data) {
        state.recommendedSource = data;
    },
    // editVillage(state, data) {
    //     state.memberHouse = data;
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
    // getVillage({ commit, state }, data) { //  获取会员房屋信息接口
    //     console.log(data)
    //     axios.get(
    //             '/api/customer/customerHousing/findHousingInfoPage?id=' + data.id + '&pageNum=' + data.pageNum + '&pageSize=' + data.pageSize
    //         ).then(function(response) {
    //             let data = response.data;
    //             if (data.status == 200) {
    //                 console.log(data.info.list);
    //                 commit({
    //                     type: 'editVillage',
    //                     data: data.info.list
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