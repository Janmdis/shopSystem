// 商品图片集合

import axios from 'axios'

const state={
    imglistcommodity:[]
};
// const getters={
//     loading: state => state.loading
// }
const mutations={
    getImglistcommodity(state,data){
        // state.deplist=[];
        state.imglistcommodity=data.data;
    }
}
const actions={
    // 获取商品图片列表
    getImglistcommodity({commit,state},parm){
        axios.post('/api/product/commodity/image/queryMap')
        .then(function (response) {
            let data=response.data;
            if(data.msg=='查询成功'){
                // console.log(data);
                commit({
                    type:'getImglistcommodity',
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