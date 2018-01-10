<template>
  <div class="leatNav" >
    <div class="login">
      <img class='imgs' src="/static/images/Login/logo.png" />
      <p>禾目SAAS管理系统</p>
    </div>
    <el-container >
      <el-aside style="overflow-x: hidden;">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            
          </el-submenu>
        </el-menu>
      </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import leatNavs from './leftNav'
export default leatNavs
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import './leftNav';
</style>
