import axios from 'axios'


const state={
    promiselist:[]
};
const mutations={
    getPromiselist(state,data){
        state.promiselist=data.data;
    }
}
const actions={
    // 获取列表
    getPromiselist({commit,state}){
        axios.post('/api/admin/permissions/find?type=1')
        .then(function (response) {
            let data=response.data;
            if(data.msg=='查询成功'){
                commit({
                    type:'getPromiselist',
                    data:data.info.allPermissionsList.children
                });
            }
        })
        .catch(function (response) {
            console.log(response);
        });
    },
}
export default{
    state,
    mutations,
    actions
}