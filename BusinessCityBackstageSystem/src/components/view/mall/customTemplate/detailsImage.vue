<template>
<div id="detailsImagess" class="borderHover" :index='dataid' style="padding:0 0 0 0;">
  <!-- 详情图片开始 -->
        <div>
            <el-row>
                <el-col :span="24" v-for='(item,index) in imglist' :key='index'>
                    <div class="imgConet" style="font-size: 0;">
                    <!-- 图片-->
                     <img :src="item.img" class="Imgsize">
                    </div>
                </el-col>
            </el-row>
            <div class="hoverClick">
                <span data-toggle="modal" data-target="#delModal" @click='deletedep'>删除</span>
                <a href="#addnewContent"><span >添加新内容</span></a> 
            </div>
        </div>
    <!-- 详情图片结束 -->
        <div class="template-editContent-div" >
            <div class="arrow"></div>
            <div>
                <div style="margin:25px 0px 15px 24px;color:black;text-align:left;">选择图片：
                    <span class="add-new-Btn" @click="addNewImg">添加图片</span>
                </div>
                <div class="imgLists">
                    <ul class="imgListUL">
                         <li  v-for='(item,index) in imglist' :key='index'>
                            <div class="carouselListInfo">
                                <div class="bannerEditContent">
                                    <div class="chooseImgs" style="width: 222px;height:222px;">
                                        <div class="center">
                                        <img :src="item.img" class="microImg avatar">
                                        </div>
                                    </div>
                                    <div class="reLoadingImg">
                                        <el-upload
                                            class="avatar-uploader"
                                            :action="imgAdDate.importFileUrl"
                                            :show-file-list="false"
                                            :data="imgAdDate.admin"
                                            name='fileUpload'
                                            :on-success="handleAvatarSuccess"
                                            @change.native="imgUploads(index)"
                                            :before-upload="beforeAvatarUpload" style="position:absolute;top:0;left:0;width:100%;height:100%;">
                                        </el-upload>
                                        <p style="line-height: 1323%;text-align: center;">重新上传 建议比例（1:1）</p>
                                        <div class="delete-img" @click="deleteImgAd(index)">&times;</div>
                                    </div>
                                </div>
                                <div class="bannerLinkSrc">
                                    <div class="linkTips" style="">设置链接到页面地址</div>
                                    <div class="dropdown">
                                        <el-dropdown trigger="click" style="min-width: 76px;">
                                            <span class="el-dropdown-link" style="width:100%;height:100%;display:inline-block;">
                                            链接到页面地址<i class="el-icon-arrow-down el-icon--right" style="display: inline;"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown" style="min-width: 7%;font-size:12px;">
                                            <!-- <el-dropdown-item @click.native="opendialogPro" style="margin-top:10px;">商品详情</el-dropdown-item> -->
                                            <el-dropdown-item @click.native="opendialogSelf(index)" style="margin-top:10px;">自定义</el-dropdown-item>
                                        </el-dropdown-menu>
                                        </el-dropdown>
                                    </div>
                                </div>
                                <div style="clear:both"></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
     </div> 
</template>
<script>
import { mapState,mapMutations,mapGetters } from 'vuex'

    export default{
        data() {
            return{
                imglist:'',
                imgAdDate:'',
                dataid:'',
                imgIndex:'',
                images:'',
                imageUrl:''

            }
        },
        props:['templatedata'],// templateInfo接受父组件传入的数据
        created:function(){
          this.dataid = this.templatedata;
         // console.log(this.comlist[this.dataid])
          this.imglist=this.comlist[this.dataid].componentsData.ImgArr;
         // console.log(this.imglist)
          this.imgAdDate = this.comlist[this.dataid].componentsData
        },
        computed:mapState({
            comlist:state => state.adImageList.comlist
        }),
        watch:{
            // imgAdDate(val,oldVal){
            //     this.imgAdDate = val
            // }
            // "$store.state.adImageList.comlist":function(){
            //     console.log(this.$store.state.adImageList.comlist)
            //    this.comlist = this.$emit.state.comlist
            // }
        },
        methods:{
          delete(){
              this.$store.commit('deleteTemplate',this.dataid)//对应组件的标识
                return{
                    type:'success',
                    message:'删除成功!'
                };
          },
          deletedep(){
            this.$confirm('确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                let msg=this.delete();
                this.$message(msg);
            }).catch(()=>{
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
            
         },
         deleteImgAd(index){
             //删除vuex 内部 state数据
              let indexs = index
              let dataid = this.dataid
              this.$store.commit('deleteImgAD',{dataid,indexs})//对应组件的标识
              //读取 vuex state 方法
            //   console.log(this.$store.state.adImageList)
            //   this.imglist = this.$store.state.adImageList.comlist[this.dataid].componentsData.ImgArr;
            //   this.imgAdDate = this.$store.state.adImageList.comlist[this.dataid].componentsData;
              //删除组件内部数据
               let list=[];
                for(let i=0;i<this.imglist.length;i++){
                    if(this.imglist.length <= 1){
                        this.$message({
                        type: 'warning',
                        message: '至少有一张详情图片！'
                        });
                        return false
                    }
                    if(index!=i){
                        list.push(this.imglist[i]);
                        this.$message({
                        type: 'success',
                        message: '删除成功！'
                        });
                    }
                }
                this.imglist=list;
         },
         addNewImg(){
            //  let adImagedefault = {
            //                 img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225304769&di=9dc8aef46668f5f48a87293a77a41282&imgtype=0&src=http%3A%2F%2Fpic110.nipic.com%2Ffile%2F20160927%2F20860925_093853370000_2.jpg",
            //                 url:'',
            //                 imgSrc:''
            //             }
             this.$store.commit('addNewImgDetail',this.dataid)//对应组件的标识
            // this.imglist.push(adImagedefault)
            this.imglist = this.$store.state.adImageList.comlist[this.dataid].componentsData.ImgArr;
            this.imgAdDate = this.$store.state.adImageList.comlist[this.dataid].componentsData;
         },
        handleAvatarSuccess(res, file) {
            // this.imgAdDate.imageUrl = URL.createObjectURL(file.raw);
             console.log(res,file);
            let hostName = location.hostname;
            let port = location.port;
            this.images = res.info;
            this.imageUrl = 'http://' + hostName + ':' + port + '/api' + this.images; //  后台返回来的是绝对路径,而html显示的则是带http的相对地址,所以需要拼接本机域名和端口号
            console.log(this.imgIndex)
            this.imglist[this.imgIndex].img = this.imageUrl; //  显示图片需要 图片显示的地址
            this.imglist[this.imgIndex].imgSrc = this.images; //  上传后台需要 的图片地址
            let indexs = this.imgIndex
            let dataid = this.dataid
            let imageUrls = this.imageUrl
            let imageSrc = this.images
            this.$store.commit('adUploadImage',{dataid,indexs,imageUrls,imageSrc})//对应组件的标识
        },
        imgUploads(index){
            //alert(index)
            this.imgIndex = index
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isGIF = file.type === 'image/gif';
            const isPNG = file.type === 'image/png';
            const isBMP = file.type === 'image/bmp';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG && !isPNG & !isGIF && !isBMP) {
               this.common.errorTip('上传图片必须是JPG/GIF/PNG/BMP 格式!');
            }
            if (!isLt2M) {
               this.common.errorTip('上传图片大小不能超过 2MB!');
            }
             return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
        },
         opendialogPro(){
             this.$root.$emit('opendialogProduct',true)

         },
         opendialogSelf(index){
             this.$root.$emit('opendialogSelf',true)
             let indexs = index;
             let dataids = this.dataid;
             let types = "imageAds";
            // alert(indexs)
             this.$root.$emit('customizeData',{indexs,dataids,types})
         }
        }
    }
</script>
<style>
/* 添加图片样式 */
#detailsImagess .avatar-uploader .el-upload {
   border: 1px dashed #ffffff !important;
}
#detailsImagess .el-upload{
    filter:alpha(opacity=0) !important;  
    -moz-opacity:0 !important;  
    -khtml-opacity: 0 !important;  
    opacity: 0 !important;
    width: 100% !important; 
    height: 100% !important;
}
#detailsImagess .carouselListInfo .avatar-uploader .el-upload {
    /* border: 1px dashed #d9d9d9; */
    /* background: #409EFF; */
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
#detailsImagess .avatar-uploader .el-upload:hover {
     border-color: #ffffff !important; }
#detailsImagess .carouselListInfo .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 141px;
    line-height: 178px;
    text-align: center;
  }
#detailsImagess .carouselListInfo .avatar {
    width: 248px;
    height: 178px;
    display: block;
  }
  /* input file 样式 */
#detailsImagess .carouselListInfo .el-upload--text{
    width: 100%;
    height: 100%;
}
</style>

<style scoped lang="less">
@import "../../../../assets/less/color";
.template-editContent-div{
    margin-top:40px;
    position: relative;
    position:absolute;
    top: 5%;
    left: 102%;
    min-width:600px;
    margin-left:10px;
    margin-right:280px;
    border: 1px solid #aaaaaa;
    border-bottom:none;
}
// 三角样式
.arrow{
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 8px 10px 8px 0;
    border-color: transparent #aaaaaa transparent transparent;
    position: absolute;
    left: -10px;
    top: 19px;
}
.arrow:after{
     content: "";
    border-right-color: #F4F6FC;
    left: 1px;
    top: -8px;
}
//选中的模块/鼠标停留的时候 边框样式
.current-style {
    border: 1px dashed red!important;
}
.borderHover{
  padding:5px 5px;
  margin-bottom: 3px;
  position: relative;
}
.borderHover:hover{
    border: 1px dashed red!important;
}
 .hoverClick{
    position: absolute;
    bottom: 2px;
    right: 0;
    font-size: 12px;
    display: none;
    z-index: 2000
}
.hoverClick span {
  color:#fff;
  background: rgb(250, 133, 133);
  display: inline-block;
  padding: 4px 10px;
  cursor: pointer;
}
.hoverClick span:hover {
  background: red;
}
.borderHover:hover .hoverClick{
  display: block;
}

//////
.Imgsize{
    width: 100%;
    height: 100%;
}
.add-new-Btn{
    line-height: 34px;
   border-radius: 5px;
  color: #fff;
  display:inline-block;
  padding: 0 15px 0 15px;
  margin-left: 12px;
  background: #27a1f2;
  cursor: pointer;
  position: relative;
}
.add-new-Btn:hover{
    background: #38abf8;
}
  @keyframes fadeIn {
    0% {
    opacity: 0; /*初始状态 透明度为0*/
    }
    50% {
    opacity: 0; /*中间状态 透明度为0*/
    }
    100% {
    opacity: 1; /*结尾状态 透明度为0.7*/
    }
    }

.reLoadingImg{
  width:100%;
  height:100%;
  color:#fff;
  background-color:rgba(0,0,0,.5);
  filter:alpha(opacity=0);
  -moz-opacity:0;
  -khtml-opacity: 0;
  opacity: 0;
   position:absolute;
   top:0;
   left:0;
}
.reLoadingImg:hover{
  filter:alpha(opacity=1);
  -moz-opacity:1;
  -khtml-opacity: 1;
  opacity: 1;
  cursor: pointer;
  animation-name: fadeIn; /*动画名称*/
  animation-duration: 0.4s; /*动画持续时间*/
  animation-iteration-count: 1; /*动画次数*/
  animation-delay: 0s; /*延迟时间*/
}
.reLoadingImg:hover > .delete-img {
    background-color:red;
}
.delete-img{
  font-size:23px;
  position:absolute;
  top:-6%;
  left:94%;
  padding:2px 6px;
  border-radius:50%;
  color:#fff;
  background-color:#fff;
}
.center{
 width: 100%;
height: 100%;
}
.microImg{
    width: 100%;
    height: 100%;
}
.carouselListInfo{padding:30px 30px 30px;border-bottom:1px solid #d2d2d2}
.bannerEditContent{width:41%;background:#fff;margin-left:10px;margin-top:5px;float:left;position: relative;}
.bannerLinkSrc{width:50%;background:#fff;margin-left:10px;margin-top:5px;float:left;}
.linkTips{font-size:16px;margin-top:20px;margin-bottom:20px;}
 .el-dropdown{border: 1px solid #aaaaaa;padding: 7px;}
 .el-dropdown:hover{background-color: #f5f3f3;}
 .el-dropdown-link{border-radius: 3px;cursor: pointer;}
</style>

