<template>
    <el-container >
      <el-aside style='overflow-x: hidden;height:700px;'>
        <el-menu default-active="appointmentTime" router>
          <el-submenu index="1">
            <template slot="title"><i class="icon iconfont icon-shijian1" style='margin-right: 10px;'></i>预约时间</template>
            <el-menu-item-group>
              <el-menu-item index="appointmentTime">预约时间</el-menu-item>
              <el-menu-item index="marktTime">预约面板</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- <el-submenu index="2">
            <template slot="title"><i class="icon iconfont icon-order1" style='margin-right: 10px;'></i>指派工单</template>
            <el-menu-item-group>
              <el-menu-item index="assignedAppointment">指派工单</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
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
        // this.$router.push("/appointmentTime")
    },
  } 
</script>