<template>
    <div id="orderDetail">
        <div class="detailHeader">
            <i class="el-icon-back"></i>
        </div>
        <div class="detailMain">
            <div class="detailLines" :key="detailInfo.id" v-for="detailInfo in details">
                <div class="detailLine detailLine1"><span>订单号 : {{detailInfo.orderNumber}}</span><span>订单类型 : {{detailInfo.orderType}}</span><span>小区名 : {{detailInfo.communityName}}</span></div>
                <div class="detailLine detailLine2"><span>下单时间 : {{detailInfo.orderTime}}</span><span>服务区域 : {{detailInfo.serviceArea}}</span><span>客服备注 : {{detailInfo.servicePeople}}</span></div>
                <div class="detailLine detailLine3"><span>服务类型 : {{detailInfo.serviceType}}</span><span>服务时间 : {{detailInfo.serviceTime}}</span><span>订单来源 : {{detailInfo.orderOrigin}}</span></div>
                <div class="detailLine detailLine4"><span>支付状态 : {{detailInfo.payState}}</span><span>空调品牌 : {{detailInfo.airConditionBrand}}</span><span>支付金额 : {{detailInfo.payMoney}}</span></div>
                <div class="detailLine detailLine4"><span>合同编号 : {{detailInfo.contractNumber}}</span><span>来源账户 : {{detailInfo.originAccount}}</span><span>待付金额 : {{detailInfo.waitPayMoney}}</span></div>
                <div class="detailLine detailLine4"><span>订单状态 : {{detailInfo.orderState}}</span><span>产品类型 : {{detailInfo.productType}}</span><span></span></div>
                <div class="lineAddress">详细地址 : {{detailInfo.detailedAddress}}</div>
                <div class="lineOriginDetail"><span>来源详细 : </span><el-input type="textarea" :rows="2" placeholder="请输入内容" ></el-input></div>
                <div class="lineRepairRecord"><span>维修故障记录 : </span><el-input type="textarea" :rows="2" placeholder="请输入内容"></el-input></div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data () {
        return {
            details:[
                {orderNumber:'21387891723',orderType:'上门型',communityName:'龙盛华庭',
                orderTime:'2017-12-12',serviceArea:'上海市',servicePeople:'马云',
                serviceType:'上门',serviceTime:'2017-12-12',orderOrigin:'淘宝',
                payState:'在线支付',airConditionBrand:'阿迪达斯',payMoney:'201.00',
                contractNumber:'21387891723',originAccount:'1234123123',waitPayMoney:'201.00',
                orderState:'未完成',productType:'眼镜',detailedAddress:'上海市杨浦区长阳路1687号一号楼一号电梯312室',

                }
            ],
        }
    }
}
</script>
<style scoped lang="less">
#orderDetail{
    padding:20px 20px;
    background: #fff;
    .detailHeader{
        width: 28px;
        height: 28px;
        line-height: 30px;
        text-align: center;
        border-radius:50%;
        border:2px solid #00c0be;
        cursor: pointer;
        i{
            color:#00c0be;
            font-size:20px;
            font-weight:900;
        }
    }
    .detailMain{
        background:#f8f8f8;
        margin-top:30px;
        padding:30px 60px 30px 80px;
        .detailLines{
            .detailLine{
                display:flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom:50px;
                font-size: 14px;
                color:#102935;
                span{
                    display: block;
                    width: 200px;
                    text-align: left;
                }
            }
            .lineAddress{
                font-size: 14px;
                color:#102935;
                margin-bottom:50px;
            }
            .lineOriginDetail,.lineRepairRecord{
                margin-bottom:50px;
                font-size: 14px;
                color:#102935;
                display:flex;
                span{
                    display: block;
                    width: 80px;
                    line-height: 25px;  
                }     
            }
            .lineRepairRecord{
                margin-left:-30px;
                span{
                    width: 120px;   
                }
            }
        }
    }
}
</style>
<style>
.detailLines .el-textarea__inner{
    resize: none !important;
}
</style>
