<template>
    <el-container >
      <el-aside style='overflow-x: hidden;height:700px;'>
        <el-menu default-active="depmanage"  router>
          <el-submenu index="1">
            <template slot="title"><i class="icon iconfont icon-zuzhiguanli" style='margin-right: 10px;'></i>组织架构</template>
            <el-menu-item-group>
              <el-menu-item index="depmanage">部门管理</el-menu-item>
              <el-menu-item index="roleManage" >角色管理</el-menu-item>
              <el-menu-item index="comment" >评论列表</el-menu-item>
              <el-menu-item index="usermanage">用户管理</el-menu-item>
              <el-menu-item index="channelmanagement">渠道管理</el-menu-item>
              <el-menu-item index="Supplier">供应商列表页</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
    </el-container>
</template>
<script>
 export default {
    data() {
      return {
       
      };
    },
    beforeMount(){
        this.$router.push("/depmanage")
    },
  } 
</script>