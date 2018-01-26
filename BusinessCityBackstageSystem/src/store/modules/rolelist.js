import axios from 'axios'


const state={
    roledata:[],
    loading:false
};
const getters={
    loading: state => state.loading
}
const mutations={
    getRolelist(state,data){
        // state.deplist=[];
        state.roledata=data.data;
        state.loading=false;
        console.log(state.roledata);
    }
}
const actions={
    // 获取列表
    getRolelist({commit,state},parm){
        let depid=parm.depid;
        let pagesize=parm.pagesize?parm.pagesize:0;
        let pageno=parm.pageno?parm.pageno:1;
        let roleName=parm.roleName;
        state.loading=true;
        console.log(depid);
        axios.post('/api/admin/manage/group/find?pageSize='+pagesize+'&pageNo='+pageno,{
            departmentId:depid,
            isActive:true,
            groupName:roleName
        })
        .then(function (response) {
            let data=response.data;
            if(data.msg=='查询成功'){
                // console.log(data);
                commit({
                    type:'getRolelist',
                    data:data.info
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