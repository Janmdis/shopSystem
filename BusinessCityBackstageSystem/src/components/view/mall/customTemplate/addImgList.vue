<template>
  <div class="carouselListInfo">
                <div class="bannerEditContent">
                    <div class="chooseImg" style="width:246px;height:141px;">
                        <div class="center">
                            <img class="microImg" src="./../../../../assets/templateImg.jpg">
                        </div>
                    </div>
                    <div class="reLoadingImg">
                        <p @click="opendialog" style="line-height: 855%;text-align: center;">重新上传 建议比例（15:7）</p>
                        <div class="delete-img">&times;</div>
                    </div>
                </div>
                <div class="bannerLinkSrc" >
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
