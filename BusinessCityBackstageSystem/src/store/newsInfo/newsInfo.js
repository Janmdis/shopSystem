import axios from 'axios'
const state = {
    newslist:[]
};
const mutations = {
    getJson(state,data) {
        state.newslist = data
    }
};
const actions = {
    getJson({ commit,state }){
        axios.post('/api/customer/account/query',{}).then((msg) => {
            if (msg.data.info.list) {
                commit({
                    type:'getJson',
                    data:msg.data.info.list
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    }
};

export default {
    state,
    mutations,
    actions
}