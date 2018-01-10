<template>
    <el-main >
        <el-row :gutter="20">
            <el-col :span="6">
                <Statis :typedata="1"></Statis>
            </el-col>
            <el-col :span="6">
                <Statis :typedata="2"></Statis>
            </el-col>
            <el-col :span="6">
                <Statis :typedata="3"></Statis>
            </el-col>
            <el-col :span="6">
                <StatisPayment></StatisPayment>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="16">
                <Graph></Graph>
            </el-col>
            <el-col :span="8">
                <Pie :objdata='objclient' ></Pie>
                <Pie :objdata='objorder'></Pie>
            </el-col>
        </el-row>
    </el-main>
</template>
<script>
import Statis from '../index/Statis.vue'
import StatisPayment from '../index/StatisPayment.vue'
import Graph from '../index/Graph.vue'
import Pie from '../index/Pie.vue'
import '../../../assets/javascript/index'

/* eslint-disable */
export default {
  components:{Statis,StatisPayment,Graph,Pie},
  data(){
      return{
            objclient:{
                title:'客户来源',
                url:'../../../../static/images/index/main6.png',
                listdatetype:['客户转介绍','社交软件','网上看到'],
                totaltip:'客户总数',
                idname:'charts1'
            },
            objorder:{
                title:'订单类型',
                url:'../../../../static/images/index/main7.png',
                listdatetype:['批发订单','商城订单','订单采购'],
                totaltip:'订单总数',
                idname:'charts2'
            }
      }
  }
}
</script>
<style scoped>
    .el-main{
        width: 83.33333%;
        left: 16.66667%;
        height: 100%;
        margin-bottom: -70px;
        background-color: #f0f3f6;
        position: absolute;
        top: 70px;
        
    }
    @media only screen and (min-width: 992px) {
        .el-main{
            width: 83.33333%;
            left: 16.66667%;
        }
            
    }
    @media only screen and (min-width: 1200px) {
        .el-main{
            width: 87.5%;
            left: 12.5%;
        }   
    }
    .el-row:nth-child(1){
        margin-bottom: 20px;
    }
</style>


