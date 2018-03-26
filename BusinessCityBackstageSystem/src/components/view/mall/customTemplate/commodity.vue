<template>
   <!-- 商品组件开始 -->
    <div id="commodityss" class="borderHover" :index='dataid'>
      <!-- 商品开始 -->
      <div>
        <el-row>
        <el-col :span="this.commodityDate.bigImg">
          <div class="imgConet">
               <!-- 图片-->
               <img :src="this.commodityDate.productImgSrc1" class="img">
             </div>
        </el-col>
        <el-col :span="this.commodityDate.smallImg">
          <div class="imgConet">
               <!-- 图片-->
               <img :src="this.commodityDate.productImgSrc2" class="img">
             </div>
        </el-col>
        <el-col :span="this.commodityDate.bigsImg">
          <div class="imgConet">
               <!-- 图片-->
               <img :src="this.commodityDate.productImgSrc3" class="img">
             </div>
        </el-col>
        </el-row>
        <div class="hoverClick">
            <span data-toggle="modal" data-target="#delModal" @click='deletedep'>删除</span>
            <span><a href="#addnewContent" style="color:#fff">添加新内容</a></span>
        </div>
      </div>
      <!-- 商品结束 -->
      <div class="template-editContent-div" >
            <div class="arrow"></div>
            <div>
                <div class="imgLists">
                  <div class="carouselListInfo">
                        <div class="editStyleDiv">
                            <p class="styleTitle">列表样式：</p>
                            <div class="styleBtn">
                                <ul class="styleUl">
                                    <li @click='switchbtn($event,1)' class="styleBorderBtn" v-bind:class="this.commodityDate.bigImgBtn">大图</li>
                                    <li @click='switchbtn($event,2)' class="styleBorderBtn" v-bind:class="this.commodityDate.smImgBtn">小图</li>
                                    <li @click='switchbtn($event,3)' class="styleBorderBtn" v-bind:class="this.commodityDate.bsImgBtn">一大两小</li>
                                </ul>
                                <div style="clear:both;"></div>
                            </div>
                        </div>
                        <ul>
                            <li>
                                <div class="carouselListInfos">
                                    <div class="imgShowDiv">
                                        <div class="chooseImg">
                                            <div class="center">
                                                <img class="microImg" :src="this.commodityDate.productImgSrc1">
                                            </div>
                                        </div>
                                        <div class="reLoadingImg">
                                            <el-upload
                                                class="avatar-uploader"
                                                :action="commodityDate.importFileUrl"
                                                :show-file-list="false"
                                                :data="commodityDate.admin"
                                                name='fileUpload'
                                                :on-success="handleAvatarSuccess"
                                                @change.native="commodityUpload(1)"
                                                :before-upload="beforeAvatarUpload" style="position:absolute;top:0;left:0;width:100%;height:100%;">
                                            </el-upload>
                                            <p style="line-height: 1178%;text-align: center;">重新上传 建议比例（5:3）</p>
                                        </div>
                                    </div>
                                    <div class="editStyleDivs">
                                        <div class="linkTips" style="">设置链接到页面地址</div>
                                        <div class="dropdown"  style="padding-left: 18px;">
                                            <el-dropdown trigger="click"  style="min-width: 76px;">
                                                <span class="el-dropdown-link" style="width:100%;height:100%;display:inline-block;">
                                                链接到页面地址<i class="el-icon-arrow-down el-icon--right" style="display: inline;"></i>
                                            </span>
                                            <el-dropdown-menu slot="dropdown" style="min-width: 7%;font-size:12px;">
                                                <!-- <el-dropdown-item @click.native="opendialogPro" style="margin-top:10px;">商品详情</el-dropdown-item> -->
                                                <el-dropdown-item @click.native="opendialogSelf(1)" style="margin-top:10px;">自定义</el-dropdown-item>
                                            </el-dropdown-menu>
                                            </el-dropdown>
                                        </div>
                                    </div>
                                    <div style="clear:both"></div>
                                </div>
                            </li>
                            <li>
                                <div class="carouselListInfos">
                                    <div class="imgShowDiv">
                                        <div class="chooseImg">
                                            <div class="center">
                                                <img class="microImg" :src="this.commodityDate.productImgSrc2">
                                            </div>
                                        </div>
                                        <div class="reLoadingImg">
                                            <el-upload
                                                class="avatar-uploader"
                                                :action="commodityDate.importFileUrl"
                                                :show-file-list="false"
                                                :data="commodityDate.admin"
                                                name='fileUpload'
                                                :on-success="handleAvatarSuccess"
                                                @change.native="commodityUpload(2)"
                                                :before-upload="beforeAvatarUpload" style="position:absolute;top:0;left:0;width:100%;height:100%;">
                                            </el-upload>
                                            <p style="line-height: 1178%;text-align: center;">重新上传 建议比例（5:3）</p>
                                        </div>
                                    </div>
                                    <div class="editStyleDivs">
                                        <div class="linkTips" style="">设置链接到页面地址</div>
                                        <div class="dropdown"  style="padding-left: 18px;">
                                            <el-dropdown trigger="click"  style="min-width: 76px;">
                                                <span class="el-dropdown-link" style="width:100%;height:100%;display:inline-block;">
                                                链接到页面地址<i class="el-icon-arrow-down el-icon--right" style="display: inline;"></i>
                                            </span>
                                            <el-dropdown-menu slot="dropdown" style="min-width: 7%;font-size:12px;">
                                                <!-- <el-dropdown-item @click.native="opendialogPro" style="margin-top:10px;">商品详情</el-dropdown-item> -->
                                                <el-dropdown-item @click.native="opendialogSelf(2)" style="margin-top:10px;">自定义</el-dropdown-item>
                                            </el-dropdown-menu>
                                            </el-dropdown>
                                        </div>
                                    </div>
                                    <div style="clear:both"></div>
                                </div>
                            </li>
                            <li>
                                <div class="carouselListInfos">
                                    <div class="imgShowDiv">
                                        <div class="chooseImg">
                                            <div class="center">
                                                <img class="microImg" :src="this.commodityDate.productImgSrc3">
                                            </div>
                                        </div>
                                        <div class="reLoadingImg">
                                            <el-upload
                                                class="avatar-uploader"
                                                :action="commodityDate.importFileUrl"
                                                :show-file-list="false"
                                                :data="commodityDate.admin"
                                                name='fileUpload'
                                                :on-success="handleAvatarSuccess"
                                                @change.native="commodityUpload(3)"
                                                :before-upload="beforeAvatarUpload" style="position:absolute;top:0;left:0;width:100%;height:100%;">
                                            </el-upload>
                                            <p style="line-height: 1178%;text-align: center;">重新上传 建议比例（5:3）</p>
                                        </div>
                                    </div>
                                    <div class="editStyleDivs">
                                        <div class="linkTips" style="">设置链接到页面地址</div>
                                        <div class="dropdown"  style="padding-left: 18px;">
                                            <el-dropdown trigger="click"  style="min-width: 76px;">
                                                <span class="el-dropdown-link" style="width:100%;height:100%;display:inline-block;">
                                                链接到页面地址<i class="el-icon-arrow-down el-icon--right" style="display: inline;"></i>
                                            </span>
                                            <el-dropdown-menu slot="dropdown" style="min-width: 7%;font-size:12px;">
                                                <!-- <el-dropdown-item @click.native="opendialogPro" style="margin-top:10px;">商品详情</el-dropdown-item> -->
                                                <el-dropdown-item @click.native="opendialogSelf(3)" style="margin-top:10px;">自定义</el-dropdown-item>
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
    </div>
    <!-- 商品组件结束 -->
</template>
<script>
import { mapState,mapMutations,mapGetters } from 'vuex'
    export default{
        data() {
            return{
                dataid:'',
                commodityDate:'',
                imgIndex:'',
                imageUrl:'',
                images:''
            }
        },
        props:['templatedata'],
        created:function(){
          this.dataid=this.templatedata;
          this.commodityDate = this.comlist[this.dataid].componentsData;
        },
        computed:mapState({
            comlist:state => state.adImageList.comlist
        }),
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
          handleAvatarSuccess(res, file) {
                console.log(res,file);
                let hostName = location.hostname;
                let port = location.port;
                this.images = res.info;
                this.imageUrl = 'http://101.89.175.155/api' + this.images; //  后台返回来的是绝对路径,而html显示的则是带http的相对地址,所以需要拼接本机域名和端口号
                console.log(this.imgIndex)
                if(this.imgIndex == 1){
                    this.commodityDate.productImgSrc1 = this.imageUrl //  显示图片需要 图片显示的地址
                    this.commodityDate.src1 = this.images //  上传后台需要 的图片地址
                }else if(this.imgIndex == 2){
                    this.commodityDate.productImgSrc2 = this.imageUrl //  显示图片需要 图片显示的地址
                    this.commodityDate.src2 = this.images //  上传后台需要 的图片地址
                }else if(this.imgIndex == 3){
                    this.commodityDate.productImgSrc3 = this.imageUrl //  显示图片需要 图片显示的地址
                    this.commodityDate.src3 = this.images //  上传后台需要 的图片地址
                }
                let indexs = this.imgIndex
                let dataid = this.dataid
                let imageUrls = this.imageUrl
                let imageSrc = this.images
                this.$store.commit('commodityUploadImage',{dataid,indexs,imageUrls,imageSrc})//对应组件的标识
            },
            commodityUpload(index){
                this.imgIndex = index
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
              //  alert(this.datatype);
              this.$root.$emit('opendialogProduct',true)
          },
         opendialogSelf(index){
             this.$root.$emit('opendialogSelf',true)
             let indexs = index;
             let dataids = this.dataid;
             let types = "commodity";
             this.$root.$emit('customizeData',{indexs,dataids,types})
         },
          switchbtn(e,index){
              if(index == 1){
                this.commodityDate.bigImg = 24;
                this.commodityDate.smallImg = 24;
                this.commodityDate.bigsImg = 24;
                this.commodityDate.bigImgBtn.onBtn = true;
                this.commodityDate.smImgBtn.onBtn = false;
                this.commodityDate.bsImgBtn.onBtn = false;
              }
              else if(index == 2){
                this.commodityDate.bigImg = 12;
                this.commodityDate.smallImg = 12;
                this.commodityDate.bigsImg = 12;
                this.commodityDate.bigImgBtn.onBtn = false;
                this.commodityDate.smImgBtn.onBtn = true;
                this.commodityDate.bsImgBtn.onBtn = false;
              }
              else if(index == 3){
                this.commodityDate.bigImg = 24;
                this.commodityDate.smallImg = 12;
                this.commodityDate.bigsImg = 12;
                this.commodityDate.bigImgBtn.onBtn = false;
                this.commodityDate.smImgBtn.onBtn = false;
                this.commodityDate.bsImgBtn.onBtn = true;
              }
              let switchIndex = index
              let dataid = this.dataid
              this.$store.commit('commoditySwitch',{dataid,switchIndex})//对应组件的标识
            //原生JS切换 改变class方法
            //   let target=e.target.tagName=='li'?e.target.parentNode:e.target;
            //   let lis=target.parentNode.getElementsByTagName('li');
            //   for(let i=0;i<lis.length;i++){
            //       lis[i].setAttribute('class','styleBorderBtn');
            //   }
            //   target.setAttribute('class','styleBorderBtn on');
          }
        }
    }
</script>
<style>
#commodityss .avatar-uploader .el-upload {
   border: 1px dashed #ffffff !important;
}
#commodityss .el-upload{
    filter:alpha(opacity=0) !important;  
    -moz-opacity:0 !important;  
    -khtml-opacity: 0 !important;  
    opacity: 0 !important;
    width: 100% !important; 
    height: 100% !important;
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
.add-new-Btn{
    line-height: 34px;
   border-radius: 5px;
  color: #fff;
  display:inline-block;
  padding: 0 15px 0 15px;
  margin-left: 12px;
  background: #27a1f2;
  position: relative;
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
.test:hover .hoverClick{
  display: block;
}

///////////////
 .el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.imgConet{
  margin:5px 30px;
}
.img{
  width: 100%;
  height: 100%;
}

// new add

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
.carouselListInfo{padding:30px 30px 30px;border-bottom:1px solid #d2d2d2}
.carouselListInfos{padding-bottom:30px;}
 .editStyleDiv{width:100%;background:#fff;margin-left:10px;margin-top:32px;}
  .editStyleDivs{width:50%;background:#fff;margin-left:10px;margin-top:5px;float:left;}
 .styleBtn{font-size:16px;margin-top:10px;margin-bottom:30px;}
 .styleTitle{float:left;padding-left:16px;padding-top:5px;}
 .styleBorderBtn{    float: left;
    padding: 8px 11px;
    background: #27a1f2;
    color:#fff;
    width: 82px;cursor: pointer;
    text-align: center;}
    .styleUl :nth-child(1){
        border-radius: 5px 0px 0px 5px;
    }
    .styleUl :nth-child(2){
        border-radius: 0px;
    }
    .styleUl :nth-child(3){
       border-radius: 0px 5px 5px 0px;
    }
.onBtn{
   background:#0288e2;
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
.carouselListInfo .el-input__inner{
    height: 30px;
}
 .carouselListInfo{padding:30px 30px 30px;border-bottom:1px solid #d2d2d2}
 .imgShowDiv{width:40%;background:#fff;margin-left:10px;margin-top:5px;float:left;position: relative;font-size: 12px;}
  .chooseImg{width:218px;height:141px;}
  .center{width: 100%;height: 100%;}
  .microImg{width: 100%;height: 100%;}
  
  .linkTips{font-size:16px;margin-top:20px;margin-bottom:20px;}
 .el-dropdown{border: 1px solid #aaaaaa;padding: 7px;}
 .el-dropdown:hover{background-color: #f5f3f3;}
 .el-dropdown-link{border-radius: 3px;cursor: pointer;}
</style>
