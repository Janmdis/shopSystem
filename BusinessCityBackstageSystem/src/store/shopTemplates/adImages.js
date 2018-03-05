import axios from 'axios'

const state={
    templateID:'',//模板ID 新增默认为 0
    templateName:'基于VUE的商城模板组件',//模板名称
    templateType:'',//模板类别 
    comlist:[
        {
            componentsName:"imageAds",
            componentsData:{
                importFileUrl:'api/sms/file/fileUpload',
                admin:{
                    type:'product'
                },
                defaultImgObj:{
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225304769&di=9dc8aef46668f5f48a87293a77a41282&imgtype=0&src=http%3A%2F%2Fpic110.nipic.com%2Ffile%2F20160927%2F20860925_093853370000_2.jpg",
                            url:'',
                            imgSrc:''
                        },
                ImgArr:[
                        {
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225304769&di=9dc8aef46668f5f48a87293a77a41282&imgtype=0&src=http%3A%2F%2Fpic110.nipic.com%2Ffile%2F20160927%2F20860925_093853370000_2.jpg",
                            url:'',
                            imgSrc:''
                        },{
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225306681&di=b0cba1dd817a12c4793f9470e0862c52&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F140514%2F318754-1405140A44778.jpg",
                            url:'',
                            imgSrc:''
                        },{
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517226158648&di=17f12755288182fb3d22662116b917aa&imgtype=0&src=http%3A%2F%2Fimg.sc115.com%2Fuploads1%2Fsc%2Fjpgs%2F1512%2Fapic16838_sc115.com.jpg",
                            url:'',
                            imgSrc:''
                        },{
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225304770&di=fd7f38f44865d3dd961d24dea0e265f7&imgtype=0&src=http%3A%2F%2Fpic22.nipic.com%2F20120718%2F5135035_193813111000_2.jpg",
                            url:'',
                            imgSrc:''
                        },{
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225304769&di=23cccc5f58a5cab6420036e616b83a5f&imgtype=0&src=http%3A%2F%2Fpic107.nipic.com%2Ffile%2F20160816%2F20860925_080643495000_2.jpg",
                            url:'',
                            imgSrc:''
                        }
                    ]
            }
        }
    ]
}
const mutations={
    //新增/修改时 在action 里调用这个方法 （ajax 查询）
    INIT_STORE(state,data){
        state.templateID = data.templateID,
        state.templateName = data.templateName,
        state.templateType = data.templateType,
        state.comlist = data.comlist
    },
    //删除模块
    deleteTemplate(state,id){
        let list=[];
        for(let i=0;i<state.comlist.length;i++){
            if(id!=i){
                list.push(state.comlist[i]);
            }
        }
        state.comlist=list;
    },
    //新增图片广告模块
    imageAdsADD(state){
        let imageAdsDefault = {
            componentsName:"imageAds",
            componentsData:{
                importFileUrl:'api/sms/file/fileUpload',
                admin:{
                    type:'product'
                },
                defaultImgObj:{
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225304769&di=9dc8aef46668f5f48a87293a77a41282&imgtype=0&src=http%3A%2F%2Fpic110.nipic.com%2Ffile%2F20160927%2F20860925_093853370000_2.jpg",
                            url:'',
                            imgSrc:''
                        },
                ImgArr:[
                        {
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225304769&di=9dc8aef46668f5f48a87293a77a41282&imgtype=0&src=http%3A%2F%2Fpic110.nipic.com%2Ffile%2F20160927%2F20860925_093853370000_2.jpg",
                            url:'',
                            imgSrc:''
                        },{
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225306681&di=b0cba1dd817a12c4793f9470e0862c52&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F140514%2F318754-1405140A44778.jpg",
                            url:'',
                            imgSrc:''
                        },{
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517226158648&di=17f12755288182fb3d22662116b917aa&imgtype=0&src=http%3A%2F%2Fimg.sc115.com%2Fuploads1%2Fsc%2Fjpgs%2F1512%2Fapic16838_sc115.com.jpg",
                            url:'',
                            imgSrc:''
                        },{
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225304770&di=fd7f38f44865d3dd961d24dea0e265f7&imgtype=0&src=http%3A%2F%2Fpic22.nipic.com%2F20120718%2F5135035_193813111000_2.jpg",
                            url:'',
                            imgSrc:''
                        },{
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225304769&di=23cccc5f58a5cab6420036e616b83a5f&imgtype=0&src=http%3A%2F%2Fpic107.nipic.com%2Ffile%2F20160816%2F20860925_080643495000_2.jpg",
                            url:'',
                            imgSrc:''
                        }
                    ]
            }
        };
        state.comlist.push(imageAdsDefault)
    },
    //删除图片广告 图片的方法
    deleteImgAD(state,data){
            let list=[];
            let id = data.dataid;
            let index = data.indexs
            console.log(state.comlist[id])
            console.log(state.comlist[id].componentsData.ImgArr)

            for(let i=0;i<state.comlist[id].componentsData.ImgArr.length;i++){
                if(state.comlist[id].componentsData.ImgArr.length <= 1){
                    return false
                }
                if(index!=i){
                    list.push(state.comlist[id].componentsData.ImgArr[i]);
                }
            }
            state.comlist[id].componentsData.ImgArr=list;
    },
    //新增图片广告 图片的方法
    addNewImgAD(state,id){
        if(state.comlist[id].componentsData.ImgArr.length >= 5){
            // this.$message({
            //     type: 'warning',
            //     message: '最多添加5张图片广告！'
            // });
           // alert('最多添加5张图片广告！')
             return false
        }
        state.comlist[id].componentsData.ImgArr.push(state.comlist[id].componentsData.defaultImgObj)
    },
    //图片广告 图片上传更换方法
    adUploadImage(state,data){
        let id = data.dataid;
        let index = data.indexs;
        let imageUrl = data.imageUrls;
        let images = data.imageSrc
        state.comlist[id].componentsData.ImgArr[index].img = imageUrl
        state.comlist[id].componentsData.ImgArr[index].imgSrc = images
    },
    //自定义链接地址新增修改方法
    saveUrlZDY(state,data){
        let id = data.dataids;
        let indexs = data.index;
        let urls = data.inputs;
        state.comlist[id].componentsData.ImgArr[index].url = urls
    }
   };
const actions={
    // 获取后台数据发送给 mutations api 方法 从而改变 state （状态库）
   
};
export default{
    state,
    mutations,
    actions
}