<template>
    <el-container >
      <el-aside style='overflow: hidden;' >
        <el-menu default-active="MessageCenter" router>
          <el-submenu index="1">
            <template slot="title"><i class="icon iconfont icon-jichupeizhi" style='margin-right: 10px;'></i>基础配置</template>
            <el-menu-item-group>
              <el-menu-item index="MessageCenter">消息中心</el-menu-item>
              <el-menu-item index="residentialquarters">小区库</el-menu-item>
              <el-menu-item index="comment" >评论列表</el-menu-item>
              <el-menu-item index="knowledgeBase">知识库</el-menu-item>
              <el-menu-item index="operationlog">操作日志</el-menu-item>
              <el-menu-item index="basicConfiguration">后台数据配置</el-menu-item>
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
        this.$router.push("/MessageCenter")
    },
  } 
</script>