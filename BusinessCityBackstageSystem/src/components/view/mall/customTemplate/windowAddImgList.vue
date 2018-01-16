<template>
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
</template>
<script>

    export default{
     data() {
         return{
             
         }
         
     },
     methods:{
         opendialog(){
             this.$root.$emit('opendialogmember',true)
         },
         opendialogPro(){
             this.$root.$emit('opendialogProduct',true)
         },
         opendialogSelf(){
             this.$root.$emit('opendialogSelf',true)
         }
     },
     components:{
         
     }
 }
</script>
<style>
.el-input__inner{
    height: 30px;
}
</style>

<style scoped lang="less">
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
  left:89%;
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
