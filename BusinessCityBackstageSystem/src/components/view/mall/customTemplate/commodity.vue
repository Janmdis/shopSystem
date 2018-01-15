<template>
   <!-- 商品组件开始 -->
    <div class="borderHover">
        <el-row>
        <el-col :span="24">
          <div class="imgConet">
               <!-- 图片-->
               <img src="./../../../../assets/logo.png" class="img">
             </div>
        </el-col>
        <el-col :span="12">
          <div class="imgConet">
               <!-- 图片-->
               <img src="./../../../../assets/logo.png" class="img">
             </div>
        </el-col>
        <el-col :span="12">
          <div class="imgConet">
               <!-- 图片-->
               <img src="./../../../../assets/logo.png" class="img">
             </div>
        </el-col>
        </el-row>
    </div>
    <!-- 商品组件结束 -->
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
  padding:5px 5px;
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
  margin:5px 30px;
}
.img{
  width: 100%;
  height: 100%;
}
</style>
