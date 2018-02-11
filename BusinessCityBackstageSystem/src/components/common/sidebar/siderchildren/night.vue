<template>
    <el-container >
      <el-aside style="overflow-x: hidden;" >
        <el-menu :default-openeds="['1']" router>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>管理中心</template>
            <el-menu-item-group>
              <el-menu-item index="operationlog">操作日志</el-menu-item>
              <el-menu-item index="channelmanagement">渠道管理</el-menu-item>
              <el-menu-item index="residentialquarters">小区</el-menu-item>
              <el-menu-item index="knowledgeBase">知识库</el-menu-item>
              <el-menu-item index="concessionalRate">优惠劵</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
    </el-container>
</template>