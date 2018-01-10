<template>
  <div class="header">
    <el-row class="textCenter textW navBox">
      <el-col :span="18">
         <el-row>
          <el-col :span="3">
                <i class="icon iconfont icon-user"></i>
                <p>会员在线</p>
          </el-col>
          <el-col :span="3">
              <i class="icon iconfont icon-chanpin"></i>
              <p>产品在线</p>
          </el-col>
          <el-col :span="3">
               <i class="icon iconfont icon-weibiaoti-"></i>
               <p>供应链在线</p>
          </el-col>
          <el-col :span="3">
              <i class="icon iconfont icon-yunying"></i>
              <p>运营在线</p>
          </el-col>
          <el-col :span="3">
              <i class="icon iconfont icon-302010"></i>
              <p>员工在线</p>
          </el-col>
          <el-col :span="3">
               <i class="icon iconfont icon-baobiaoguanli"></i>
               <p>管理在线</p>
          </el-col>
           <el-col :span="3">
               <i class="icon iconfont icon-pinpai"></i>
               <p>品牌在线</p>
          </el-col>
           <el-col :span="3">
               <i class="icon iconfont icon-guanlizhongxin"></i>
               <p>管理中心</p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import headers from './headers'
export default headers
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@import './header'; 
</style>
