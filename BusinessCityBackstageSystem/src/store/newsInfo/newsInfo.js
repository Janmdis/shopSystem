import axios from 'axios'
const state = {
    newslist: [],
    Backstage: [],
    BackstageList:[],
    BackstageInfo: '',
    pageNum: 1, //当前页
    pageSize:10
    
};
const mutations = {
    getJson(state,data) {
        state.newslist = data
    },
    getBackstage(state, data) {
        state.Backstage = data.data
    },
    pageNum(state,n){
        state.pageNum = n;
    },
    getBackstageList(state,n){
        axios.post('/api/admin/account/multiConditionalQuery',{departmentId: n,pageSize:2,pageNum:state.pageNum}).then((msg) => {
            if(msg.data.info.list){
                state.BackstageList = msg.data.info
                
            }
            if (msg.data) {
                state.BackstageInfo = msg.data
            }
            
        }).catch((err) => {
            console.log(err)
        })
     }
};
const actions = {
    getJson({ commit,state }){
        axios.post('/api/customer/account/query?pageSize=2&page='+state.pageNum,{}).then((msg) => {
            if (msg.data.info.list) {
                commit({
                    type:'getJson',
                    data: msg.data.info.list,
                    list: msg.data.info
                })
            }
        }).catch((err) => {
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
        }).catch((err) => {
        })
    },
    
};

export default {
    state,
    mutations,
    actions
}