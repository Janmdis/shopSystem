/* eslint-disable */
import axios from 'axios'

// Vue.use(Vuex)

const state = {
    deplisttree: [],
    deplistall: []
};
const mutations = {
    getDeplisttree(state, data) {
        state.deplisttree = [];
        state.deplisttree.push(data.data);
    },
    getDeplistall(state, data) {
        state.deplistall = data.data;
    }
}
const actions = {
    // 获取列表
    getDeplisttree({ commit, state }) {
        axios.post('/api/admin/manage/department/find?type=1&range=1&pageSize=0', {
                isActive: '1'
            })
            .then(function(response) {
                let data = response.data;
                if (data.msg == '查询成功') {
                    commit({
                        type: 'getDeplisttree',
                        data: data.info.treeAll
                    });
                }
            })
            .catch(function(response) {
                console.log(response);
            });
    },
    getDeplistall({ commit, state }) {
        // console.log(111);
        axios.post('/api/admin/manage/department/find?type=0&range=1&pageSize=0', {
                isActive: '1'
            })
            .then(function(response) {
                let data = response.data;
                if (data.msg == '查询成功') {
                    commit({
                        type: 'getDeplistall',
                        data: data.info.manageDepartmentResult
                    });
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