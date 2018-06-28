<template>
    <el-container >
      <el-aside style='overflow-x: hidden;height:700px;'>
        <el-menu default-active="member"  router>
          <el-submenu index="1">
            <template slot="title"><i class="icon iconfont icon-huiyuan" style='margin-right: 10px;'></i>会员资料</template>
            <el-menu-item-group>
              <el-menu-item index="member">
                会员资料
              </el-menu-item>
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
        // this.$router.push("/member")
    },
  } 
</script>