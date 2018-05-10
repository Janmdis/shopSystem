import axios from 'axios'
const state = {
    newslist: [],
    Backstage: [],
    BackstageList:[]
    
};
const mutations = {
    getJson(state,data) {
        state.newslist = data
    },
    getBackstage(state, data) {
        state.Backstage = data.data
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
    },
    getBackstage({commit,state}) {
        axios.post('/api/admin/manage/department/find?type=1&range=1&pageSize=0', {})
            .then((msg) => {
                if (msg.data.info) {
                    commit({
                        type: 'getBackstage',
                        data: msg.data.info
                    })
            }
           
            // this.translateArr = msg.data.info.treeAll.children;
            console.log(msg)
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