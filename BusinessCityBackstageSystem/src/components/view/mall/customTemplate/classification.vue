
<template>
  <!-- 分类组件开始 -->
    <div class="borderHover" :index='dataid'>
      <!-- 分类开始 -->
      <div style="overflow-x:scroll;">
          <el-row class="classNameContent" v-bind:style="classNameContent" style="overflow:hidden;">
             <el-col class="className" v-for='(item,index) in imglist' :key="index">
              <div class="classNameTitle">{{ item.classTitle }}</div>
              <img :src="item.img" class="img">
            </el-col>
          </el-row>
          <div class="hoverClick">
              <span data-toggle="modal" data-target="#delModal" @click='deletedep'>删除</span>
              <span><a href="#addnewContent" style="color:#fff">添加新内容</a></span>
          </div>
       </div>
       <!-- 分类结束 -->
       <div class="template-editContent-div" >
            <div class="arrow"></div>
            <div>
                <div style="margin:25px 0px 15px 24px;color:black;text-align:left;">选择图片：
                    <span class="add-newClass-Btn" @click="addNewImg">新增分类</span>
                </div>
                <div class="imgLists">
                    <ul class="imgListUL">
                        <li v-for='(item,index) in imglist' :key="index">
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
                                            :action="classDate.importFileUrl"
                                            :show-file-list="false"
                                            :data="classDate.admin"
                                            name='fileUpload'
                                            :on-success="handleAvatarSuccess"
                                            @change.native="imgUploads(index)"
                                            :before-upload="beforeAvatarUpload" style="position:absolute;top:0;left:0;width:100%;height:100%;">
                                        </el-upload>
                                      <p style="line-height: 1211%;font-size:13px;text-align: center;">重新上传 建议比例（4:4）</p>
                                      <div class="delete-img" @click="deleteImgAd(index)">&times;</div>
                                  </div>
                              </div>
                              <div class="editStyleDiv">
                                  <div class="classTitleDiv">
                                      <span class="classTitle">分类名称：</span>
                                      <el-input @input.native="classInputchange($event,index)" v-model="item.classTitle" class="classTitleInput"></el-input>
                                      <div style="clear:both;"></div>
                                  </div>
                                  <div class="linkTips" style="">设置分类链接到页面地址</div>
                                  <div class="dropdown">
                                      <el-dropdown trigger="click"  style="min-width: 76px;">
                                          <span class="el-dropdown-link" style="width:100%;height:100%;display:inline-block;">
                                          链接到页面地址<i class="el-icon-arrow-down el-icon--right" style="display: inline;"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown" style="min-width: 7%;font-size:12px;">
                                          <el-dropdown-item @click.native="opendialogPro" style="margin-top:10px;">商品详情</el-dropdown-item>
                                          <el-dropdown-item @click.native="opendialogSelf(index)" style="margin-top:10px;">自定义</el-dropdown-item>
                                        </el-dropdown-menu>
                                      </el-dropdown>
                                      <div style="clear:both;"></div>
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
    <!-- 分类组件结束 -->
</template>
<script>
import { mapState,mapMutations,mapGetters } from 'vuex'
    export default{
        data() {
            return{
                dataid:'',
                classNameContent:{
                    width:''
                },
                imglist:'',
                classDate:'',
                imgIndex:'',
                images:'',
                imageUrl:'',
            }
        },
        props:['templatedata'],
        created:function(){
          this.dataid=this.templatedata;
          this.imglist=this.comlist[this.dataid].componentsData.ImgArr;
         // console.log(this.imglist)
          this.classDate = this.comlist[this.dataid].componentsData
        },
        computed:mapState({
            comlist:state => state.adImageList.comlist
        }),
        mounted:function(){
          let classNames = document.querySelectorAll('.className');
          let length = this.imglist.length;
          let classNameWidth =  classNames[0].offsetWidth;
          let allWidth = classNameWidth * length;
          this.classNameContent.width = allWidth + 'px';
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
          classInputchange($event,index){
              console.log($event)
              console.log(index)
              this.imglist[index].classTitle = $event.target.value
              console.log(this.imglist[index].classTitle)
               let dataids = this.dataid;
               let indexs = index;
                let classNames = $event.target.value;
                console.log(this.imglist);
                // this.$store.commit('classNameInput',{dataids,indexs,classNames});//对应组件的标识
          },
          deleteImgAd(index){
            //删除vuex 内部 state数据
            let indexs = index
            let dataid = this.dataid
            this.$store.commit('deleteImgClass',{dataid,indexs})//对应组件的标识
            //删除组件内部数据
             let list=[];
            for(let i=0;i<this.imglist.length;i++){
                if(this.imglist.length <= 1){
                    this.$message({
                     type: 'warning',
                     message: '至少有一个分类！'
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
            let classNames = document.querySelectorAll('.className');
            let length = this.imglist.length;
            let classNameWidth =  classNames[0].offsetWidth;
            let allWidth = classNameWidth * length;
            this.classNameContent.width = allWidth + 'px';
         },
          addNewImg(){
              let classificationDefault = {
                    classTitle:'眼镜',
                    img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225304769&di=9dc8aef46668f5f48a87293a77a41282&imgtype=0&src=http%3A%2F%2Fpic110.nipic.com%2Ffile%2F20160927%2F20860925_093853370000_2.jpg",
                    url:'',
                    imgSrc:''
              };
              this.$store.commit('addNewImgClass',this.dataid)//对应组件的标识
             if(this.imglist.length >= 10){
                 this.$message({
                     type: 'warning',
                     message: '最多添加10个分类！'
                 });
                 let classNames = document.querySelectorAll('.className');
                let length = this.imglist.length;
                let classNameWidth =  classNames[0].offsetWidth;
                let allWidth = classNameWidth * length;
                this.classNameContent.width = allWidth + 'px';
                  return false
             }
            this.imglist.push(classificationDefault)
            let classNames = document.querySelectorAll('.className');
            let length = this.imglist.length;
            let classNameWidth =  classNames[0].offsetWidth;
            let allWidth = classNameWidth * length;
            this.classNameContent.width = allWidth + 40 + 'px';
         },
         handleAvatarSuccess(res, file) {
            console.log(res,file);
            let hostName = location.hostname;
            let port = location.port;
            this.images = res.info;
            this.imageUrl = 'http://' + hostName + ':' + port + '/api/sms' + this.images; //  后台返回来的是绝对路径,而html显示的则是带http的相对地址,所以需要拼接本机域名和端口号
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
.carouselListInfo .el-input__inner{
    height: 30px;
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
  padding:20px 20px;
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
.className{
    width:120px;padding:0 8px 0 8px
}
@media screen and (min-width:1200px){
.className{width:105px}
}
@media screen and (min-width:1700px){
.className{width:120px}
}
@media screen and (min-width:1800px){
.className{width:120px}
}
.img{
 width:100%;
 height:100%;
}
.classNameTitle{
  text-align: center;
  padding-bottom: 6px;
}
//add new

.add-newClass-Btn{
    line-height: 34px;
   border-radius: 5px;
  color: #fff;
  display:inline-block;
  padding: 0 15px 0 15px;
  margin-left: 12px;
  background: #27a1f2;
  position: relative;
  cursor: pointer;
}
.add-newClass-Btn:hover{
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
  left:92%;
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
//样式 主标题 副标题 
 .linkTips{font-size:16px;margin-top:38px;margin-bottom:20px;text-align: left;}
 .carouselListInfo{padding:30px 30px 30px;border-bottom:1px solid #d2d2d2}
 .imgShowDiv{width:30.5%;background:#fff;margin-left:10px;margin-right:65px;margin-top:5px;float:left;position: relative;}
 .chooseImg{width: 165px;height:165px;}
 .editStyleDiv{width:50%;background:#fff;margin-left:10px;margin-top:40px;float:left;}
 .calssTitleDiv{margin-top:20px;margin-bottom:20px;}
 .el-dropdown{border: 1px solid #aaaaaa;padding: 7px;}
 .el-dropdown:hover{background-color: #f5f3f3;}
 .el-dropdown-link{border-radius: 3px;cursor: pointer;}
 .classTitle{float: left;line-height: 27px;display: inline-block;}
 .classTitleInput{float: left;width: 50%;}
</style>
