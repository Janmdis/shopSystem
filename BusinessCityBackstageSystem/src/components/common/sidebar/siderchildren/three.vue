<template>
    <el-container >
      <el-aside style="overflow-x: hidden;">
        <el-menu :default-openeds="['1']" router>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>活动详情</template>
            <el-menu-item-group>
              <el-menu-item index="mallSet">商城模板</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
    </el-container>
</template>