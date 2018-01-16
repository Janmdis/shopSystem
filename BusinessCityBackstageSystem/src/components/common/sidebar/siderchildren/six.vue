<template>
    <el-container >
      <el-aside style="overflow-x: hidden;">
        <el-menu :default-openeds="['1']" router>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>组织架构</template>
            <el-menu-item-group>
              <el-menu-item index="depmanage">部门管理</el-menu-item>
              <el-menu-item index="roleManage">角色管理</el-menu-item>
              <el-menu-item index="usermanage">用户管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
    </el-container>
</template>