<template>
   <!-- 商品组件开始 -->
    <div class="borderHover" :index='dataid'>
      <!-- 商品开始 -->
      <div>
        <el-row>
        <el-col :span="bigImg">
          <div class="imgConet">
               <!-- 图片-->
               <img :src="productImgSrc1" class="img">
             </div>
        </el-col>
        <el-col :span="smallImg">
          <div class="imgConet">
               <!-- 图片-->
               <img :src="productImgSrc2" class="img">
             </div>
        </el-col>
        <el-col :span="bigsImg">
          <div class="imgConet">
               <!-- 图片-->
               <img :src="productImgSrc3" class="img">
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
                                    <li @click='switchbtn($event,1)' class="styleBorderBtn on">大图</li>
                                    <li @click='switchbtn($event,2)' class="styleBorderBtn">小图</li>
                                    <li @click='switchbtn($event,3)' class="styleBorderBtn">一大两小</li>
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
                                                <img class="microImg" src="./../../../../assets/templateImg.jpg">
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
                                                <el-dropdown-item @click.native="opendialogPro" style="margin-top:10px;">商品详情</el-dropdown-item>
                                                <el-dropdown-item @click.native="opendialogSelf" style="margin-top:10px;">自定义</el-dropdown-item>
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
                                                <img class="microImg" src="./../../../../assets/templateImg.jpg">
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
                                                <el-dropdown-item @click.native="opendialogPro" style="margin-top:10px;">商品详情</el-dropdown-item>
                                                <el-dropdown-item @click.native="opendialogSelf" style="margin-top:10px;">自定义</el-dropdown-item>
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
                                                <img class="microImg" src="./../../../../assets/templateImg.jpg">
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
    </div>
    <!-- 商品组件结束 -->
</template>
<script>
    export default{
      props:['templatedata'],
        data() {
            return{
                dataid:'',
                indexInfo:1, // 1 商品模块
                bigImg:24,
                smallImg:24,
                bigsImg:24, // 列表风格 0 大图 1 小图 2 一大两小
                productImgURL1:'',//商品1链接地址
                productImgSrc1:require('./../../../../assets/templateImg.jpg'),//商品1图片地址
                productImgURL2:'',//商品2链接地址
                productImgSrc2:require('./../../../../assets/templateImg.jpg'),//商品2图片地址
                productImgURL3:'',//商品3链接地址
                productImgSrc3:require('./../../../../assets/templateImg.jpg'), //商品3图片地址
                importFileUrl:'',
                admin:'',
                urlImg:''
            }
        },
        created:function(){
          console.log(this.dataid)
          this.dataid=this.templatedata;
        },
        methods:{
          delete(){
            this.$root.$emit('deleteID',this.dataid);
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
              //  alert(this.datatype);
              this.$root.$emit('opendialogProduct',true)
          },
         opendialogSelf(){
             this.$root.$emit('opendialogSelf',true)
         },
          switchbtn(e,index){
              if(index == 1){
                this.bigImg = 24;
                this.smallImg = 24;
                this.bigsImg = 24;
              }
              else if(index == 2){
                this.bigImg = 12;
                this.smallImg = 12;
                this.bigsImg = 12;
              }
              else if(index == 3){
                this.bigImg = 24;
                this.smallImg = 12;
                this.bigsImg = 12;
              }
              let target=e.target.tagName=='li'?e.target.parentNode:e.target;
              let lis=target.parentNode.getElementsByTagName('li');
              for(let i=0;i<lis.length;i++){
                  lis[i].setAttribute('class','styleBorderBtn');
              }
              target.setAttribute('class','styleBorderBtn on');
          }
        }
    }
</script>
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
  background: #00adab;
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
    background: #00adab;
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
.on{
   background:#018a88;
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
