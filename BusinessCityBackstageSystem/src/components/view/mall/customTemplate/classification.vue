
<template>
  <!-- 分类组件开始 -->
    <div class="borderHover">
        <el-row >
          <el-col class="className">
            <div class="">眼镜</div>
            <img src="./../../../../assets/logo.png" class="img">
          </el-col>
          <el-col class="className">
             <img src="./../../../../assets/logo.png" class="img">
            <div class="">数码</div>
          </el-col>
          <el-col class="className">
            <div class="">家电</div>
             <img src="./../../../../assets/logo.png" class="img">
          </el-col>
          <el-col class="className">
             <img src="./../../../../assets/logo.png" class="img">
            <div class="">食品</div>
          </el-col>
          <el-col class="className">
            <div class="">衣服</div>
             <img src="./../../../../assets/logo.png" class="img">
          </el-col>
        </el-row>
    </div>
    <!-- 分类组件结束 -->
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
    padding:62px 62px;
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
.className{
  width:20%;padding:0 8px 0 8px
}
.img{
 width:100%;
 height:100%;
}
</style>
