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
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-message"></i>产品在线</template>
            <el-menu-item-group>
             <el-menu-item index="Supplier">供应商列表页</el-menu-item>
             <el-menu-item index="commodity">商品列表页</el-menu-item>
             <el-menu-item index="package">套餐列表页</el-menu-item>
             <el-menu-item index="product">产品列表页</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
    </el-container>
</template>