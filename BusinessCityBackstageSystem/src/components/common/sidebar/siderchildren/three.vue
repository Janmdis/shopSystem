<template>
    <el-container >
      <el-aside style='overflow-x: hidden;height:700px;'>
        <el-menu  default-active="order"  router>
        <el-submenu index="1">
          <template slot="title"><i class="icon iconfont icon-dingdan2" style='margin-right: 10px;'></i>订单管理</template>
            <el-menu-item-group>
              <el-menu-item index="order">订单列表</el-menu-item>
              <el-menu-item index="refund">退款订单</el-menu-item>
              <el-menu-item index="invoice">发票管理</el-menu-item>
              <!-- <el-menu-item index="servicetime">预约时间管理</el-menu-item>               -->
              
              
            </el-menu-item-group>
         </el-submenu>
         <el-submenu index="2">
            <template slot="title"><i class="icon iconfont icon-shangpin-tianchong" style='margin-right: 10px;'></i>商品管理</template>
            <el-menu-item-group>
             <el-menu-item index="commodity">商品列表页</el-menu-item>
             <el-menu-item index="package">套餐列表页</el-menu-item>
             <el-menu-item index="product">产品列表页</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="icon iconfont icon-mobanguanli" style='margin-right: 10px;'></i>模版管理</template>
            <el-menu-item-group>
              <el-menu-item index="templateList">商城模板管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="eventTemplateList">活动模板管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="detailTemplateList">详情模板管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="icon iconfont icon-huodong-copy" style='margin-right: 10px;'></i>活动管理</template>
            <el-menu-item-group>
              <el-menu-item index="eventmanage">活动列表管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="icon iconfont icon-yingxiaogongju_hover" style='margin-right: 10px;'></i>营销工具</template>
            <el-menu-item index="concessionalRate">优惠劵</el-menu-item>
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
        // this.$router.push("/order")
    },
  } 
</script>