<template>
  <!-- 橱窗组件开始 -->
    <div class="borderHover">
        <el-row>
        <el-col :span="12">
             <div class="imgConet">
               <!-- 条框div -->
                <div class="boxesDiv"></div>
               <!-- 线框div -->
               <div class="lineDiv"></div>
               <!-- 图片-->
               <img src="./../../../../assets/logo.png" class="img">
             </div>
        </el-col>
        <el-col :span="12">
            <div class="imgConet">
               <!-- 条框div -->
                <div class="boxesDiv"></div>
               <!-- 线框div -->
               <div class="lineDiv"></div>
               <!-- 图片-->
               <img src="./../../../../assets/logo.png" class="img">
             </div>
        </el-col>
        <el-col :span="12">
            <div class="imgConet">
               <!-- 条框div -->
                <div class="boxesDiv"></div>
               <!-- 线框div -->
               <div class="lineDiv"></div>
               <!-- 图片-->
               <img src="./../../../../assets/logo.png" class="img">
             </div>
        </el-col>
        <el-col :span="12">
          <div class="imgConet">
               <!-- 条框div -->
                <div class="boxesDiv"></div>
               <!-- 线框div -->
               <div class="lineDiv"></div>
               <!-- 图片-->
               <img src="./../../../../assets/logo.png" class="img">
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
  position:absolute;
  width:90%;
  height:89%;
  border:10px solid #eeeeee;
}
.lineDiv{
  position:absolute;
  width:88%;
  height:88%;
  margin:5% 5%;
  border:1px solid #eeeeee;
}
</style>
