<template>
    <div id="payInfo">
        <el-col :span="24">
            <div class="payHeader">
                <ul class="header-des">
                    <li>应付金额 : <span>{{thisData.actualMoney}}</span><span>商品/活动金额 :{{thisData.actualMoney}}-优惠:{{letinvoice}}</span></li>
                    <li>已付金额 : <span>{{thisData.paidMoney}}</span></li>
                </ul>
            </div>
            <div>
                <el-row class='tukOrderBox'>
                    <h2>退款信息：</h2>
                    <el-row>
                        <el-col :span='12'>
                            <ul>
                                <li>退款金额：{{thisData.refundMoney}}</li>
                                <li>退款原因：{{thisData.refundExplanation}}</li>
                            </ul>
                        </el-col>
                        <el-col :span='12'>
                            <ul>
                                <li>申请时间：{{thisData.refundTime}}</li>
                                <li>退款单号：{{thisData.refundNumber}}</li>
                            </ul>
                        </el-col>
                    </el-row>
                    <el-col :span='20' :offset='4' style='margin-top:20px;'>
                        <el-col :span='12'>
                            <el-button @click='play'>同意退款</el-button>
                        </el-col>
                        <el-col :span='12'>
                            <el-button @click='Bhuixi'>驳&nbsp;&nbsp;&nbsp;&nbsp;回</el-button>
                        </el-col>
                    </el-col>
                </el-row>
            </div>
            <div class="payMain">
                <ul class="main-des">
                    <li v-for="(info,index) in dataList" :key="index">
                        <p class="pay-round"></p>
                        <p>{{info.payTime}}</p>
                        <p>付款方式 : {{info.payWay}}</p>
                        <p>付款金额 : {{info.payMoney}}</p>
                    </li>
                </ul>
            </div>
        </el-col>
        <el-dialog :title="titles" :visible.sync="invosiceBox" :append-to-body="true">
            <el-row v-if='titles=="确认退款"'>
                <el-col style='text-align: center;font-size:26px;'>
                    退款金额：{{thisData.refundMoney}}
                </el-col>
            </el-row>
            <el-row v-if='titles=="驳回"' style='text-align: center;'>
                 <span>驳回理由：</span>   <textarea v-model="Reject" style='width:80%;min-height:80px;padding:10px;resize:none;border-radius:5px;' auto-complete="off"></textarea>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="invosiceBox = false">取 消</el-button>
                <el-button type="primary" @click="isOkInfo">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        props: ['memberId','orders'],
        data() {
            return {
                memberIde: '',
                thisData:'',
                letinvoice:0,
                rejects:false,
                invosiceBox:false,
                titles:'',
                Reject:'',
                dataList: [
                ],
                formLabelWidth: '120px'
            }
        },
        created() {
            
            this.memberIde = this.memberId;
            this.$root.$on('loadFn', data => {
                this.searchInfo();
            });
            this.getDataInfo()
        },
        methods: {
            getDataInfo(){
               let orderId = sessionStorage.getItem("orderId");
               console.log(orderId)
               let url = '/api/product/order/mall/find';
               this.$http({
                   url:url,
                   method:'post',
                   data:{
                       number:orderId
                   }
               }).then((msg)=>{
                   let data = msg.data.info.list[0];
                   if(msg.data.info.list[0].orderDetails){
                       msg.data.info.list[0].orderDetails.forEach((item,index)=>{
                           this.letinvoice+=item.conversionAmount
                       })
                   }
                   
                   this.thisData = data;
                   let retype = ''
                   if(data.payType==1){
                       retype = '支付宝'
                   }else if(data.payType==2){
                       retype = '微信'
                   }else{
                        retype = '管家代收'
                   }
                   
                   this.dataList.push({'payTime':data.createTime,'payMoney':data.paidMoney,'payWay':retype})
               }).catch((err)=>{
                   console.log(err)
               })
            },
            searchInfo() {
                let that = this;
                this.$http({
                    url: '/api/customer/visits/findData',
                    method: 'POST'
                }).then((res) => {
                    // that.dataList = res.data.info.list;
                    that.$root.$emit('load', false);
                }).catch((err) => {
                    console.log(err);
                });
            },
            play() {
                this.invosiceBox = true;
                this.titles = "确认退款"
            },
            Bhuixi(){
                this.invosiceBox = true;
                this.titles = "驳回"
            },
            isOkInfo(){
                if(titles=='确认退款'){
                    let orderId = sessionStorage.getItem("orderId");
                    let url = '/api/product/order/mall/refund';
                    this.$http({
                        url:url,
                        method:'post',
                        data:{
                            orderNumber:orderId
                        }
                    }).then((msg)=>{
                        console.log(msg)
                    }).catch((err)=>{
                        console.log(err)
                    })
                }else{
                    
                }
            }
        }
    
    }
</script>
<style lang="less">
    #payInfo {}
</style>
<style scoped lang="less">
    .tukOrderBox {
        width: 600px;
        padding: 20px;
        background: #ddd;
        li {
            line-height: 30px;
        }
        h2{
            font-size:26px;
            line-height:60px;
        }
    }
    #payInfo {
        padding: 40px 20px 30px 50px;
        height: 500px;
        overflow-y: scroll;
        min-width: 675px;
        .payHeader {
            .header-des {
                padding-bottom: 30px;
                margin-left: 30px;
                li {
                    font-size: 18px;
                    color: #414141;
                    letter-spacing: 1px;
                    margin-bottom: 15px;
                    span:nth-child(1) {
                        color: #333333;
                        font-weight: bold;
                    }
                    span:nth-child(2) {
                        margin-left: 30px;
                        font-size: 16px;
                    }
                }
            }
        }
        .payMain::before {
            content: '';
            display: block;
            width: 3px;
            height: 40px;
            border-left: 3px solid #409EFF;
        }
        .payMain {
            .main-des {
                li {
                    padding-bottom: 70px;
                    border-left: 3px solid #409EFF;
                    display: flex;
                    position: relative;
                    padding-left: 30px;
                    .pay-round {
                        content: '';
                        width: 26px;
                        height: 26px;
                        border-radius: 50%;
                        background: #ECEFFE;
                        position: absolute;
                        left: -15px;
                        top: -5px;
                    }
                    .pay-round::before {
                        display: block;
                        content: '';
                        width: 13px;
                        height: 13px;
                        border-radius: 50%;
                        position: absolute;
                        background: #BFD0F7;
                        top: 0;
                        bottom: 0;
                        right: 0;
                        left: 0;
                        margin: auto;
                    }
                    p {
                        font-size: 16px;
                        color: #555;
                    }
                    p:nth-child(n+3) {
                        margin-left: 50px;
                    }
                }
            }
        }
    }
</style>

