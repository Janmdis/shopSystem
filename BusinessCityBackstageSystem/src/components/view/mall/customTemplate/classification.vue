
<template>
  <!-- 分类组件开始 -->
    <div class="borderHover" :index='dataid'>
      <!-- 分类开始 -->
      <div>
          <el-row >
            <el-col class="className">
              <div class="classNameTitle">眼镜</div>
              <img src="./../../../../assets/templateImg.jpg" class="img">
            </el-col>
            <el-col class="className">
              <div class="classNameTitle">数码</div>
              <img src="./../../../../assets/templateImg.jpg" class="img">
              
            </el-col>
            <el-col class="className">
              <div class="classNameTitle">家电</div>
              <img src="./../../../../assets/templateImg.jpg" class="img">
            </el-col>
            <el-col class="className">
              <div class="classNameTitle">食品</div>
              <img src="./../../../../assets/templateImg.jpg" class="img">
              
            </el-col>
            <el-col class="className">
              <div class="classNameTitle">衣服</div>
              <img src="./../../../../assets/templateImg.jpg" class="img">
            </el-col>
          </el-row>
          <div class="hoverClick">
              <span data-toggle="modal" data-target="#delModal" @click='deletedep'>删除</span>
              <span><a href="#addnewContent" onclick="return false;" style="color:#fff">添加新内容</a></span>
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
                                      <p @click="opendialog" style="line-height: 1485%;font-size:14px;text-align: center;">重新上传 建议比例（4:4）</p>
                                      <div class="delete-img">&times;</div>
                                  </div>
                              </div>
                              <div class="editStyleDiv">
                                  <div class="classTitleDiv">
                                      <span class="classTitle">分类名称：</span>
                                      <el-input v-model="input" class="classTitleInput"></el-input>
                                      <div style="clear:both;"></div>
                                  </div>
                                  <div class="linkTips" style="">设置分类链接到页面地址</div>
                                  <div class="dropdown">
                                      <el-dropdown trigger="click"  style="float:left;margin-top:10px;">
                                          <span class="el-dropdown-link">
                                          链接到页面地址<i class="el-icon-arrow-down el-icon--right" style="display: inline;"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                          <el-dropdown-item @click.native="opendialogPro" style="margin-top:10px;">商品详情</el-dropdown-item>
                                          <el-dropdown-item @click.native="opendialogSelf" style="margin-top:10px;">自定义</el-dropdown-item>
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
  width:20%;padding:0 8px 0 8px
}
.img{
 width:100%;
 height:100%;
}
.classNameTitle{
  text-align: center;
}
//add new

.add-newClass-Btn{
    line-height: 34px;
   border-radius: 5px;
  color: #fff;
  display:inline-block;
  padding: 0 15px 0 15px;
  margin-left: 12px;
  background: #00adab;
  position: relative;
  cursor: pointer;
}
.add-newClass-Btn:hover{
  background: #049e9d;
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
 .imgShowDiv{width:30%;background:#fff;margin-left:10px;margin-right:65px;margin-top:5px;float:left;position: relative;}
 .chooseImg{width: 165px;height:224px;}
 .editStyleDiv{width:50%;background:#fff;margin-left:10px;margin-top:40px;float:left;}
 .calssTitleDiv{margin-top:20px;margin-bottom:20px;}
 .el-dropdown{border: 1px solid #aaaaaa;padding: 7px;}
 .el-dropdown:hover{background-color: #f5f3f3;}
 .el-dropdown-link{border-radius: 3px;cursor: pointer;}
 .classTitle{float: left;line-height: 27px;display: inline-block;}
 .classTitleInput{float: left;width: 50%;}
</style>
