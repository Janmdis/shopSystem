import axios from 'axios'


const state={
    promiselist:[],
    loading:false
};
const mutations={
    getPromiselist(state,data){
        state.promiselist=data.data;
        state.loading=false;
    }
}
const actions={
    // 获取列表
    getPromiselist({commit,state}){
        state.loading=true;
        axios.post('/api/admin/permissions/find?type=1')
        .then(function (response) {
            // console.log(response);
            let data=response.data;
            if(data.msg=='查询成功'){
                commit({
                    type:'getPromiselist',
                    data:data.info.allPermissionsList.children
                });
            }
            console.log(data);
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