<template>
    <div id="orderDetail" v-show="isSwitchOrder">
        <div class="detailHeader" @click="returnBackOrder">
            <i class="el-icon-back" ></i>
        </div>
        <div class="detailMain">
            <div class="detailLines"  >
                <div class="detailLine detailLine1"><span>订单号 : {{details.number}}</span><span>订单类型 : {{details.orderType}}</span><span>小区名 : {{details.number}}</span></div>
                <div class="detailLine detailLine2"><span>下单时间 : {{details.number}}</span><span>服务区域 : {{details.number}}</span><span>客服备注 : {{details.number}}</span></div>
                <div class="detailLine detailLine3"><span>服务类型 : {{details.number}}</span><span>服务时间 : {{details.number}}</span><span>订单来源 : {{details.number}}</span></div>
                <div class="detailLine detailLine4"><span>支付状态 : {{details.number}}</span><span>空调品牌 : {{details.number}}</span><span>支付金额 : {{details.number}}</span></div>
                <div class="detailLine detailLine4"><span>合同编号 : {{details.number}}</span><span>来源账户 : {{details.number}}</span><span>待付金额 : {{details.number}}</span></div>
                <div class="detailLine detailLine4"><span>订单状态 : {{details.number}}</span><span>产品类型 : {{details.number}}</span><span></span></div>
                <div class="lineAddress">详细地址 : {{details.number}}</div>
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
            details:{},
            isSwitchOrder:false,
        }
    },
    created:function(){
        this.$root.$on('orderShow',(data) => {
            this.isSwitchOrder=true;
            this.details = data
        })
    },
    methods: {
        returnBackOrder(){
            this.isSwitchOrder = false
            this.$root.$emit('detailShow')
        },
    },
    beforeDestroy(){
        this.$root.$off('orderShow')
    }
}
</script>
<style scoped lang="less">
#orderDetail{
    min-width: 750px;
    padding:20px 20px;
    background: #fff;
    .detailHeader{
        width: 28px;
        height: 28px;
        line-height: 30px;
        text-align: center;
        border-radius:50%;
        border:2px solid #409EFF;
        cursor: pointer;
        i{
            color:#409EFF;
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
                color:#102a42;
                span{
                    display: block;
                    width: 200px;
                    text-align: left;
                }
            }
            .lineAddress{
                font-size: 14px;
                color:#102a42;
                margin-bottom:50px;
            }
            .lineOriginDetail,.lineRepairRecord{
                margin-bottom:50px;
                font-size: 14px;
                color:#102a42;
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
