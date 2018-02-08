<template>
  <!-- 橱窗组件开始 -->
    <div class="borderHover" :index='dataid'>
      <!-- 橱窗1开始 -->
      <div>
        <el-row>
        <el-col :span="12">
             <div class="imgConet">
               <!-- 条框div -->
                <div class="boxesDiv">
                  <img src="./../../../../assets/logo.png" class="img">
                </div>
                <!-- 主标题 -->
                <p class="title1">主标题</p>
                <!-- 副标题 -->
                <p class="title2">副标题</p>
                <!-- 线框div -->
                <div class="lineDiv"></div>
             </div>
        </el-col>
        <el-col :span="12">
            <div class="imgConet">
               <!-- 条框div -->
                <div class="boxesDiv">
                  <img src="./../../../../assets/logo.png" class="img">
                </div>
                <!-- 主标题 -->
                <p class="title1">主标题</p>
                <!-- 副标题 -->
                <p class="title2">副标题</p>
               <!-- 线框div -->
               <div class="lineDiv"></div>
             </div>
        </el-col>
        <el-col :span="12">
            <div class="imgConet">
               <!-- 条框div -->
               <div class="boxesDiv">
                  <img src="./../../../../assets/logo.png" class="img">
                </div>
                <!-- 主标题 -->
                <p class="title1">主标题</p>
                <!-- 副标题 -->
                <p class="title2">副标题</p>
               <!-- 线框div -->
               <div class="lineDiv"></div>
             </div>
        </el-col>
        <el-col :span="12">
          <div class="imgConet">
               <!-- 条框div -->
                <div class="boxesDiv">
                  <img src="./../../../../assets/logo.png" class="img">
                </div>
                <!-- 主标题 -->
                <p class="title1">主标题</p>
                <!-- 副标题 -->
                <p class="title2">副标题</p>
               <!-- 线框div -->
               <div class="lineDiv"></div>
             </div>
        </el-col>
        <div style="clear:both;"></div>
        </el-row>
        <div class="hoverClick">
            <span data-toggle="modal" data-target="#delModal" @click='deletedep'>删除</span>
            <span><a href="#addnewContent" onclick="return false;" style="color:#fff">添加新内容</a></span>
        </div>
      </div>
      <!-- 橱窗1结束 -->
       <div class="template-editContent-div" >
            <div class="arrow"></div>
            <div>
                      <div style="margin:25px 0px 15px 24px;color:black;text-align:left;">选择图片：
                          <span class="add-new-Btn" @click="addNewImg">添加图片</span>
                      </div>
                      <div class="imgLists">
                  <!-- <windowAddImgList></windowAddImgList> -->
                  <ul>
                      <li>
                          <div class="carouselListInfo">
                              <div class="imgShowDiv">
                                  <div class="chooseImg">
                                      <div class="center">
                                          <img class="microImg" src="./../../../../assets/templateImg.jpg">
                                      </div>
                                  </div>
                                  <div class="reLoadingImg">
                                      <p @click="opendialog" style="line-height: 1178%;text-align: center;">重新上传 建议比例（1:1）</p>
                                      <div class="delete-img">&times;</div>
                                  </div>
                              </div>
                              <div class="editStyleDiv">
                                  <div class="styleBtn">
                                      <ul>
                                          <li class="styleTitle">样式：</li>
                                          <li class="styleBorderBtn">无框</li>
                                          <li class="styleBorderBtn">线框</li>
                                          <li class="styleBorderBtn">条框</li>
                                      </ul>
                                      <div style="clear:both;"></div>
                                  </div>
                                  <div class="mainTitleDiv">
                                      <span class="mainTitle">主标题：</span>
                                      <el-input v-model="input" class="mainTitleInput"></el-input>
                                      <div style="clear:both;"></div>
                                  </div>
                                  <div class="subtitleDiv">
                                      <span class="subtitle">副标题：</span>
                                      <el-input v-model="input" class="subtitleInput"></el-input>
                                      <div style="clear:both;"></div>
                                  </div>
                                  <div class="dropdown">
                                      <el-dropdown trigger="click">
                                          <span class="el-dropdown-link" style="">
                                          链接到页面地址<i class="el-icon-arrow-down el-icon--right" style="display: inline;"></i>
                                      </span>
                                      <el-dropdown-menu slot="dropdown">
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
    <!-- 橱窗组件结束 -->
</template>
<script>
    export default{
        data() {
            return{
                dataid:''
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
          opendialog(){
             this.$root.$emit('opendialogmember',true)
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
  border:10px solid #eeeeee;
}
.lineDiv{
    position: absolute;
    width: 80%;
    height: 80%;
    top: 9%;
    left: 9%;
    border: 1px solid #eeeeee;
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
 .editStyleDiv{width:50%;background:#fff;margin-left:10px;margin-top:5px;float:left;}
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
