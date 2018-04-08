<template>
  <!-- 橱窗组件开始 -->
    <div id="windowss2" class="borderHover" :index='dataid'>
      <!-- 橱窗1开始 -->
      <div>
        <el-row>
        <el-col :span="8" v-for='(item,index) in imglist' :key='index'>
             <div class="imgConet">
               
                <div>
                  <img :src="item.img" class="img">
                </div>
                <!-- 主标题 -->
                <!-- <p class="title1">主标题</p> -->
                <!-- 副标题 -->
                <!-- <p class="title2">副标题</p> -->
                <!-- 条框div -->
                <div class="boxesDiv" v-bind:class="item.boxesDivStyle"></div>
                <!-- 线框div -->
                <div class="lineDiv" v-bind:class="item.lineDivStyle"></div>
             </div>
        </el-col>
        <div style="clear:both;"></div>
        </el-row>
        <div class="hoverClick">
            <span data-toggle="modal" data-target="#delModal" @click='deletedep'>删除</span>
            <span><a href="#addnewContent" style="color:#fff">添加新内容</a></span>
        </div>
      </div>
      <!-- 橱窗1结束 -->
       <div class="template-editContent-div" >
            <div class="arrow"></div>
            <div>
                <div style="margin:25px 0px 15px 24px;color:black;text-align:left;">选择图片：
                    <!-- <span class="add-new-Btn" @click="addNewImg">添加图片</span> -->
                </div>
                <div class="imgLists">
                  <ul class="imgListUL">
                      <li v-for='(item,index) in imglist' :key='index'>
                          <div class="carouselListInfo">
                              <div class="imgShowDiv">
                                  <div class="chooseImg">
                                      <div class="center">
                                          <img class="microImg" :src="item.img">
                                      </div>
                                  </div>
                                  <div class="reLoadingImg">
                                       <el-upload
                                            class="avatar-uploader"
                                            :action="windowDate.importFileUrl"
                                            :show-file-list="false"
                                            :data="windowDate.admin"
                                            name='fileUpload'
                                            :on-success="handleAvatarSuccess"
                                            @change.native="imgUploads(index)"
                                            :before-upload="beforeAvatarUpload" style="position:absolute;top:0;left:0;width:100%;height:100%;">
                                        </el-upload>
                                      <p style="line-height: 1178%;text-align: center;">重新上传 建议比例（1:1）</p>
                                      <!-- <div class="delete-img" @click="deleteImgAd(index)">&times;</div> -->
                                  </div>
                              </div>
                              <div class="editStyleDiv">
                                  <div class="styleBtn">
                                      <ul>
                                          <li class="styleTitle">样式：</li>
                                          <li class="styleBorderBtn" v-bind:class="item.notDivBtn" @click="notBorder(index)">无框</li>
                                          <li class="styleBorderBtn" v-bind:class="item.lineDivBtn" @click="lineBorder(index)">线框</li>
                                          <li class="styleBorderBtn" v-bind:class="item.boxesDivBtn" @click="boxesBorder(index)">条框</li>
                                      </ul>
                                      <div style="clear:both;"></div>
                                  </div>
                                  <!-- <div class="mainTitleDiv">
                                      <span class="mainTitle">主标题：</span>
                                      <el-input v-model="input" class="mainTitleInput"></el-input>
                                      <div style="clear:both;"></div>
                                  </div>
                                  <div class="subtitleDiv">
                                      <span class="subtitle">副标题：</span>
                                      <el-input v-model="input" class="subtitleInput"></el-input>
                                      <div style="clear:both;"></div>
                                  </div> -->
                                  <div class="dropdown"  style="padding-left: 18px;">
                                      <el-dropdown trigger="click"  style="min-width: 76px;">
                                          <span class="el-dropdown-link" style="width:100%;height:100%;display:inline-block;">
                                          链接到页面地址<i class="el-icon-arrow-down el-icon--right" style="display: inline;"></i>
                                      </span>
                                      <el-dropdown-menu slot="dropdown" style="min-width: 7%;font-size:12px;">
                                          <el-dropdown-item @click.native="opendialogPro(index)" style="margin-top:10px;">商品详情</el-dropdown-item>
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
    <!-- 橱窗组件结束 -->
</template>
<script>
import { mapState,mapMutations,mapGetters } from 'vuex'
    export default{
        data() {
            return{
                dataid:'',
                imglist:'',
                windowDate:'',
                imgIndex:'',
                images:'',
                imageUrl:''
            }
        },
        props:['templatedata'],
        created:function(){
          this.dataid=this.templatedata;
          // console.log(this.comlist[this.dataid])
          this.imglist=this.comlist[this.dataid].componentsData.ImgArr;
         // console.log(this.imglist)
          this.windowDate = this.comlist[this.dataid].componentsData
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
         notBorder(index){
              this.imglist[index].boxesDivStyle.boxesBorShow = false;
              this.imglist[index].boxesDivStyle.boxesBorHide = true;
              this.imglist[index].lineDivStyle.lineBorShow = false;
              this.imglist[index].lineDivStyle.lineBorHide = true;
              this.imglist[index].notDivBtn.notBtnShow = true;
              this.imglist[index].notDivBtn.notBtnHide = false;
              this.imglist[index].lineDivBtn.lineBtnShow = false;
              this.imglist[index].lineDivBtn.lineBtnHide = true;
              this.imglist[index].boxesDivBtn.boxesBtnShow = false;
              this.imglist[index].boxesDivBtn.boxesBtnHide = true;
              let indexs = index;
              let dataids = this.dataid
              this.$store.commit('notBorders',{dataids,indexs})//对应组件的标识
         },
         lineBorder(index){
             this.imglist[index].boxesDivStyle.boxesBorShow = false;
              this.imglist[index].boxesDivStyle.boxesBorHide = true;
              this.imglist[index].lineDivStyle.lineBorShow = true;
              this.imglist[index].lineDivStyle.lineBorHide = false;
              this.imglist[index].notDivBtn.notBtnShow = false;
              this.imglist[index].notDivBtn.notBtnHide = true;
              this.imglist[index].lineDivBtn.lineBtnShow = true;
              this.imglist[index].lineDivBtn.lineBtnHide = false;
              this.imglist[index].boxesDivBtn.boxesBtnShow = false;
              this.imglist[index].boxesDivBtn.boxesBtnHide = true;
              let indexs = index;
              let dataids = this.dataid
              this.$store.commit('lineBorders',{dataids,indexs})//对应组件的标识
         },
         boxesBorder(index){
              this.imglist[index].boxesDivStyle.boxesBorShow = true;
              this.imglist[index].boxesDivStyle.boxesBorHide = false;
              this.imglist[index].lineDivStyle.lineBorShow = false;
              this.imglist[index].lineDivStyle.lineBorHide = true;
              this.imglist[index].notDivBtn.notBtnShow = false;
              this.imglist[index].notDivBtn.notBtnHide = true;
              this.imglist[index].lineDivBtn.lineBtnShow = false;
              this.imglist[index].lineDivBtn.lineBtnHide = true;
              this.imglist[index].boxesDivBtn.boxesBtnShow = true;
              this.imglist[index].boxesDivBtn.boxesBtnHide = false;
              let indexs = index;
              let dataids = this.dataid
              this.$store.commit('boxesBorders',{dataids,indexs})//对应组件的标识
         },
          handleAvatarSuccess(res, file) {
            //this.imageUrl = URL.createObjectURL(file.raw);
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

            if (!isJPG && !isPNG && !isGIF && !isBMP) {
            this.common.errorTip('上传图片必须是JPG/GIF/PNG/BMP 格式!');
            }
            if (!isLt2M) {
            this.common.errorTip('上传图片大小不能超过 2MB!');
            }
            return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
        },
         opendialogPro(index){
           this.$root.$emit('opendialogProduct',true)
              let indexs = index;
             let dataids = this.dataid;
             let types = "imageAds";
            // alert(indexs)
             this.$root.$emit('customizeData',{indexs,dataids,types})
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
#windowss2 .avatar-uploader .el-upload {
   border: 1px dashed #ffffff !important;
}
#windowss2 .el-upload{
    filter:alpha(opacity=0) !important;  
    -moz-opacity:0 !important;  
    -khtml-opacity: 0 !important;  
    opacity: 0 !important;
    width: 100% !important; 
    height: 100% !important;
}
#windowss2 .carouselListInfo .el-input__inner{
    height: 30px;
}
</style>
<style scoped lang="less">
@import "../../../../assets/less/color";
.boxesBorShow{border: 10px solid #eeeeee}
.boxesBorHide{border: 0px solid #eeeeee}
.lineBorShow{border: 1px solid #eeeeee}
.lineBorHide{border: 0px solid #eeeeee}
.notBtnShow{background: #27a1f2;color:#ffffff;}
.notBtnHide{background: #ffffff;}
.lineBtnShow{background: #27a1f2;color:#ffffff;}
.lineBtnHide{background: #ffffff;}
.boxesBtnShow{background: #27a1f2;color:#ffffff;}
.boxesBtnHide{background: #ffffff;}
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
  cursor: pointer;
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
.borderHover:hover .hoverClick{
  display: block;
}
.current-style:hover .hoverClick{
  display: block;
}
//////
 .el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.imgConet{
  position:relative;
  margin:30px 30px;
}
.img{
  width: 100%;
  height: 100%;
}
 .boxesDiv{
       position: absolute;
    width: 92%;
    height: 92%;
    top: 0%;
    left: 0%;
  // border:10px solid #eeeeee;
 }
.lineDiv{
    position: absolute;
    width: 80%;
    height: 80%;
    top: 9%;
    left: 9%;
    //border: 1px solid #eeeeee;
}
.title1{    position: absolute;
font-size: 13px;
    top: 17%;
    left: 40%;}
.title2{position: absolute;
font-size: 13px;
    top: 72%;
    left: 40%;}

    //new add
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
.reLoadingImg:hover > .delete-img {background-color:red;}
.delete-img{font-size:23px;position:absolute;top:-6%;left:89%;padding:2px 6px;border-radius:50%;color:#fff;background-color:#fff;}
.center{width: 100%;height: 100%;}
.microImg{width: 100%;height: 100%;}
//样式 主标题 副标题 
 .carouselListInfo{padding:30px 30px 30px;border-bottom:1px solid #d2d2d2}
 .imgShowDiv{width:30%;background:#fff;margin-left:10px;margin-top:5px;float:left;position: relative;font-size: 12px;}
 .chooseImg{width:164px;height:141px;}
 .editStyleDiv{width:51%;background:#fff;margin-left:10px;margin-top:5px;float:left;}
 .styleBtn{font-size:16px;margin-top:10px;margin-bottom:20px;}
 .styleTitle{float:left;padding-left:16px;padding-top:5px;}
 .styleBorderBtn{float: left;border: 1px solid #a5a5a5;padding: 5px 11px;border-radius: 5px;margin-right: 14px;cursor: pointer;}
 .mainTitleDiv{margin-top:20px;margin-bottom:20px;}
 .mainTitle{display:inline-block;float:left;padding-top:6px}
 .mainTitleInput{display:inline-block;float:left;width:200px;}
 .subtitleDiv{margin-top:20px;margin-bottom:20px;}
 .subtitle{display:inline-block;float:left;padding-top:6px}
 .subtitleInput{display:inline-block;float:left;width:200px;}
 .el-dropdown{border: 1px solid #aaaaaa;padding: 7px;}
 .el-dropdown:hover{background-color: #f5f3f3;}
 .el-dropdown-link{border-radius: 3px;cursor: pointer;}
</style>
