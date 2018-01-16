
<template>
  <!-- 标题组件开始 -->
    <div class="borderHover">
        <el-row>
          <el-col :span="24">
            <div class="line">
              <div class="line-s"></div>
            </div>
          </el-col>
          <el-col :span="20" :offset="2">
            <div class="" style="margin-bottom:25px;text-align: center;">BACK TO SCHOOL SEASONAL DISCOUNT</div>
          </el-col>
          <el-col :span="20" :offset="2">
            <div class="" style="text-align: center;">开学季优惠</div>
          </el-col>
        </el-row>
    </div>
    <!-- 标题组件结束 -->
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
    padding:38px 0;
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
.line{
  background-color:#cdcdcd;
  height:1px;
  margin-bottom:30px;
}
.line-s{
  background:#1e2d38;
  width:40px;
  height:3px;
  margin:0 auto;
  }

</style>
