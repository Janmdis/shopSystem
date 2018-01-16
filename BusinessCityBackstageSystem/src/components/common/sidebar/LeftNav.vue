<template>
  <div class="leatNav" >
    <div class="login">
      <img class='imgs' src="static/images/Login/logo.png" />
      <p>禾目SAAS管理系统</p>
    </div>
    <component v-bind:is="which_to_show"></component>
    
  </div>
</template>

<script>
import leatNavs from './leftNav'
export default leatNavs
</script>
<style>
.el-submenu__title{
  background:#102935;
  color:#fff;
}
.el-submenu__title:hover{
  background:#1ec1af;
}
.el-submenu__title:hover i{
      color:#fff;
}
.el-menu-item-group__title{
padding:0;
}
.el-menu-item:focus,.el-menu-item.is-active, .el-menu-item:hover{
  background: #1ec1af;
  color:#fff;
}
.el-menu-item,.el-submenu__title{
  background: #102935;
  color:#fff;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import './leftNav';
</style>
