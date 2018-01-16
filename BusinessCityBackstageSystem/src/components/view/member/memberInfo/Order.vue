<template>
    <div id="order">
        <div>
            <ul class="orderMain">
                <li v-for="info in infos" :key="info.id" >
                    <div class="orderDiv"><span>订单号 : {{info.orderNumber}}</span><span>服务类型 : {{info.serviceType}}</span><span>支付金额 : {{info.payMoney}}</span></div>
                    <div class="orderDiv"><span>下单时间 : {{info.orderTime}}</span><span>订单状态 : {{info.orderState}}</span><span>服务人员 : {{info.servicePeople}}</span></div>
                    <div class="orderBtn">
                        <div class="btnGroup">
                            <el-button @click="jumpDetail(info.orderNumber)">查看详情</el-button>
                            <el-button>回访</el-button>
                            <el-button>追单</el-button>
                            <el-button>退款</el-button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- <component :is="isOrderDetail"></component> -->
    </div>
</template>
<script>
import orderDetails from './OrderDetail.vue';
export default{
    data () {
        return {
            infos:[
                {orderId:0,orderNumber:123424131331,serviceType:'上门',payMoney:'100.00',orderTime:'2017-12-12',orderState:'已发货',servicePeople:'马云'},
                {orderId:1,orderNumber:123424131331,serviceType:'上门',payMoney:'100.00',orderTime:'2017-12-12',orderState:'已发货',servicePeople:'马云'},
                {orderId:2,orderNumber:123424131331,serviceType:'上门',payMoney:'100.00',orderTime:'2017-12-12',orderState:'已发货',servicePeople:'马云'},
                {orderId:3,orderNumber:123424131331,serviceType:'上门',payMoney:'100.00',orderTime:'2017-12-12',orderState:'已发货',servicePeople:'马云'},
            ],

        }
    },
    methods:{
        jumpDetail (num) {
            // this.$router.replace('/member/orderDetail')
        }       
    },
}
</script>
<style scoped lang="less">
#order{
    background: #fff;
    padding:0 25px 20px;
    .orderMain{
            width: 100%;
        li{
            font-size: 14px;
            color:#666;
            margin:20px 0;
            background:#F2F3F4;
            .orderDiv{      
                padding: 0 45px 0;
                display:flex;
                justify-content: space-between;
                span{
                    display:block;
                }
            }
            .orderDiv:nth-child(1){
                padding-top:20px;
                margin-bottom: 30px;
            }
            .orderDiv:nth-child(2){
                margin-bottom: 20px;
            }
            .orderBtn{
                border-top: 1px solid #dbdbdd;
                padding:10px 0;
                position:relative;
                height: 45px;
                .btnGroup{
                    position: absolute;
                    right: 30px;
                }
                .el-button{
                    background:#fff;
                    color:#00c0be;
                }
                .el-button:hover{
                    background:#00c0be;
                    color:#fff;
                }
            }
        }
    }
}
</style>