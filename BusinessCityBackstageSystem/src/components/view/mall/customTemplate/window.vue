<template>
  <!-- 橱窗组件开始 -->
    <div class="borderHover">
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
    </div>
    <!-- 橱窗组件结束 -->
</template>
<script>
    export default{
        data() {
            return{
                
            }
        }
    }
</script>
<style scoped lang="less">
@import "../../../../assets/less/color";
.borderHover{
    margin-bottom: 3px;
}
.borderHover:hover{
    border: 1px dashed red!important;
}

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
</style>
