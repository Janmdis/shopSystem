<template>
<div class="borderHover" :index='dataid' style="padding:0 0 0 0;">
  <!-- 轮播开始 -->
        <div>
            <div class="block">
                <el-carousel trigger="click" width='614px'>
                    <el-carousel-item v-for='(item,index) in ImgArr' :key='index'>
                        <h3 class="Imgsize"><a href="javascript:;"><img class="Imgsize" :src="item.img" /></a></h3>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="hoverClick">
                <span data-toggle="modal" data-target="#delModal" @click='deletedep'>删除</span>
                <a href="#addnewContent" onclick="return false;"><span >添加新内容</span></a> 
            </div>
        </div>
    <!-- 轮播结束 -->
        <div class="template-editContent-div" >
            <div class="arrow"></div>
            <div>
                <div style="margin:25px 0px 15px 24px;color:black;text-align:left;">选择图片：
                    <span class="add-new-Btn" @click="addNewImg">添加图片</span>
                </div>
                <div class="imgLists">
                    <ul>
                        <li>
                            <div class="carouselListInfo">
                                <div class="bannerEditContent">
                                    <div class="chooseImg" style="width:246px;height:141px;">
                                        <div class="center">
                                        <img v-if="imageUrl" :src="imageUrl" class="microImg avatar">
                                        </div>
                                    </div>
                                    <div class="reLoadingImg">
                                        <el-upload
                                            class="avatar-uploader"
                                            :action="importFileUrl"
                                            :show-file-list="false"
                                            :data="urlImg"
                                            name='fileUpload'
                                            :type='admin'
                                            :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload" style="position:absolute;top:0;left:0;width:100%;height:100%;">
                                        </el-upload>
                                        <p style="line-height: 887%;text-align: center;">重新上传 建议比例（15:7）</p>
                                        <div class="delete-img" @click="deleteImgAd">&times;</div>
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
                                            <el-dropdown-item @click.native="opendialogPro" style="margin-top:10px;">商品详情</el-dropdown-item>
                                            <el-dropdown-item @click.native="opendialogSelf" style="margin-top:10px;">自定义</el-dropdown-item>
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
    export default{
        data() {
            return{
                ImgArr:[
                        {
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225304769&di=9dc8aef46668f5f48a87293a77a41282&imgtype=0&src=http%3A%2F%2Fpic110.nipic.com%2Ffile%2F20160927%2F20860925_093853370000_2.jpg",
                            url:''
                        },{
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225306681&di=b0cba1dd817a12c4793f9470e0862c52&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F140514%2F318754-1405140A44778.jpg",
                            url:''
                        },{
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517226158648&di=17f12755288182fb3d22662116b917aa&imgtype=0&src=http%3A%2F%2Fimg.sc115.com%2Fuploads1%2Fsc%2Fjpgs%2F1512%2Fapic16838_sc115.com.jpg",
                            url:''
                        },{
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225304770&di=fd7f38f44865d3dd961d24dea0e265f7&imgtype=0&src=http%3A%2F%2Fpic22.nipic.com%2F20120718%2F5135035_193813111000_2.jpg",
                            url:''
                        },{
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225304769&di=23cccc5f58a5cab6420036e616b83a5f&imgtype=0&src=http%3A%2F%2Fpic107.nipic.com%2Ffile%2F20160816%2F20860925_080643495000_2.jpg",
                            url:''
                        }
                    ],
                dataid:'',
                imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516962155831&di=322da642ba62380467a16fac4f07996b&imgtype=0&src=http%3A%2F%2Fpic30.photophoto.cn%2F20140217%2F0042040393387050_b.jpg'
            }
        },
        props:['templatedata'],
        created:function(){
          this.dataid=this.templatedata;
        },
        
        methods:{
          delete(){
            this.$root.$emit('test',this.dataid);
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
         addNewImg(){
            //  if(this.imgAdlist.length >= 5){
            //      this.$message({
            //         type: 'warning',
            //         message: '最多添加5张图片广告！'
            //     });
            //      return false
            //  }
         },
        handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isGIF = file.type === 'image/gif';
            const isPNG = file.type === 'image/png';
            const isBMP = file.type === 'image/bmp';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG && !isPNG && !isGIF && !isBMP) {
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
         opendialogSelf(){
             this.$root.$emit('opendialogSelf',true)
         }
        
        }
    }
</script>
<style>
/* 轮播图组件样式 */
.el-carousel__indicator.is-active button {
    opacity: 1;
    background-color: #109997;
}
.el-carousel__button {
    display: block;
    opacity: 1;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid #109997;
}
.el-carousel__arrow,el-carousel__arrow--left{
   filter:alpha(opacity=0);
   -moz-opacity:0;
    -khtml-opacity: 0;
    opacity: 0; 
}
/* 添加图片样式 */
.avatar-uploader .el-upload {
   border: 1px dashed #ffffff !important;
}
.carouselListInfo .avatar-uploader .el-upload {
    /* border: 1px dashed #d9d9d9; */
    /* background: #409EFF; */
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.avatar-uploader .el-upload:hover {
     border-color: #ffffff !important; }
 .carouselListInfo .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 141px;
    line-height: 178px;
    text-align: center;
  }
 .carouselListInfo .avatar {
    width: 248px;
    height: 178px;
    display: block;
  }
  /* input file 样式 */
 .carouselListInfo .el-upload--text{
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
    min-width:608px;
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
  background: #00adab;
  cursor: pointer;
  position: relative;
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
.bannerEditContent{width:45%;background:#fff;margin-left:10px;margin-top:5px;float:left;position: relative;}
.bannerLinkSrc{width:50%;background:#fff;margin-left:10px;margin-top:5px;float:left;}
.linkTips{font-size:16px;margin-top:20px;margin-bottom:20px;}
 .el-dropdown{border: 1px solid #aaaaaa;padding: 7px;}
 .el-dropdown:hover{background-color: #f5f3f3;}
 .el-dropdown-link{border-radius: 3px;cursor: pointer;}
</style>

