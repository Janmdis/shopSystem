<template>
    <el-container >
      <el-aside style='overflow: hidden;'>
        <el-menu :default-openeds="['1']" router>
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
  
</script>