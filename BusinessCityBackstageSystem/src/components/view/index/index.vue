<template>
    <el-main >
        <p style='padding-bottom:10px;font-size:12px;color:#606266'>数据刷新：{{data}}<a href='' style='padding-left:10px;color:#27a1f2;'>刷新</a></p>
        <el-row :gutter="20" style='margin-bottom:5px;'>
            <el-col :span='16'  >
                 <el-row :gutter="20">
                    <el-col :span='8' >
                        <Statis :data="list[0]"></Statis>
                    </el-col>
                    <el-col :span='8'>
                        <Statis :data="list[1]"></Statis>
                    </el-col>
                    <el-col :span='8'>
                        <Statis :data="list[2]"></Statis>
                    </el-col>
                 </el-row>
                
            </el-col>
            <el-col :span='8'>
                <Readydo></Readydo>
            </el-col>
        </el-row>
        <el-row :gutter="20" style='padding-bottom:80px;'>
            <el-col :span='16'>
                <el-row :gutter="20">
                        <el-col :span='8'>
                            <Statis :data="list[3]"></Statis>
                        </el-col>
                        <el-col :span='8'>
                            <Statis :data="list[4]"></Statis>
                        </el-col>
                        <el-col :span='8'>
                            <Statis :data="list[5]"></Statis>
                        </el-col>
                </el-row>
                <el-row>
                    <Graph></Graph>
                </el-row>                
            </el-col>
            <el-col :span='8'>
                <el-row>
                    <Pie :objdata='objclient' ></Pie>
                </el-row>
                <el-row>
                    <Pie :objdata='objorder'></Pie>
                </el-row>
            </el-col>
        </el-row>
    </el-main>
</template>
<script>
import Statis from '../index/Statis.vue'
import Readydo from '../index/readydo.vue'
import Graph from '../index/Graph.vue'
import Pie from '../index/Pie.vue'
import '../../../assets/javascript/index'

/* eslint-disable */
export default {
  components:{Statis,Graph,Pie,Readydo},
  data(){
      return{
            list:[
                {
                    type:1,
                    describe1:'订单数',
                    describe2:'订单数',
                    value1:'100',
                    value2:'200',
                    special:false

                },
                {
                    type:2,
                    describe1:'总成交额',
                    describe2:'总成交额',
                    value1:'100',
                    value2:'200',
                    special:false
                },
                {
                    type:3,
                    describe1:'总访客',
                    describe2:'总访客',
                    value1:'100',
                    value2:'200',
                    special:false
                },
                {
                    type:4,
                    describe1:'总流量',
                    describe2:'总流量',
                    value1:'100M',
                    value2:'200M',
                    special:false
                },
                {
                    type:5,
                    describe1:'客单价',
                    describe2:'客单价',
                    value1:'100',
                    value2:'200',
                    special:false
                },
                {
                    type:6,
                    describe1:'移动访客',
                    describe2:'移动流量',
                    value1:'100',
                    value2:'200M',
                    special:true
                }
            ],
            objclient:{
                title:'客户来源',
                url:'../../../../static/images/index/main7.png',
                listdatetype:['自助下单','幸福绿城app','电话来访','线下推广','会员推荐','回头客','淘宝','管家推荐','其他'],
                listdata:[100,200,300,400,500,600,700,800,900],
                totaltip:'客户总数',
                idname:'charts1'
            },
            objorder:{
                title:'订单类型',
                url:'../../../../static/images/index/main9.png',
                listdatetype:['批发订单','商城订单','订单采购'],
                listdata:[100,200,300],
                totaltip:'订单总数',
                idname:'charts2'
            },
            data:'2018-2-17 0:00:00'
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
    .grid-content{
        margin-bottom: 0 !important;
    }
</style>

