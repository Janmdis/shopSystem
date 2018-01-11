<template>
    <el-container >
      <el-aside style="overflow-x: hidden;">
        <el-menu :default-openeds="['1']" router>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>会员管理</template>
            <el-menu-item-group>
              <el-menu-item index="member">
                <route-link to="member">会员档案</route-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
    </el-container>
</template>
<script>
  
</script>