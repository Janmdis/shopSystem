<template>
    <div id="payInfo">
        <el-col :span="24">
            <div class="payHeader">
                <ul class="header-des">
                    <li>应付金额 : <span>4,000</span><span>商品/活动金额 : ¥100+运费 : ¥0.00-优惠¥0.00</span></li>
                    <li>已付金额 : <span>2,000</span></li>
                </ul>
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
    </div>
</template>
<script>
export default{
    props:['memberId'],
    data () {
        return {
            memberIde:'',
            dataList:[
                {payTime:'2017.03.03 11:20:30',payWay:'支付宝',payMoney:'1,000'},
                {payTime:'2017.03.03 11:20:30',payWay:'支付宝',payMoney:'1,000'},
                {payTime:'2017.03.03 11:20:30',payWay:'支付宝',payMoney:'1,000'},
                {payTime:'2017.03.03 11:20:30',payWay:'支付宝',payMoney:'1,000'},
                {payTime:'2017.03.03 11:20:30',payWay:'支付宝',payMoney:'1,000'},
                {payTime:'2017.03.03 11:20:30',payWay:'支付宝',payMoney:'1,000'},
                {payTime:'2017.03.03 11:20:30',payWay:'支付宝',payMoney:'1,000'}
            ]
        }
    },
    created(){
        // this.searchInfo();
        this.memberIde = this.memberId;
        this.$root.$on('loadFn',data =>{
            this.searchInfo();
        });
    },
    methods:{
        searchInfo(){
            let that = this;
            this.$http({
                url:'/api/customer/visits/findData',
                method:'POST'
            }).then((res) => {
                // that.dataList = res.data.info.list;
                that.$root.$emit('load',false);
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}
</script>
<style lang="less">
#payInfo{

}
</style>
<style scoped lang="less">
#payInfo{
    padding:40px 20px 30px 50px;
    height:500px;
    overflow-y:scroll;
    min-width: 675px;
    .payHeader{
        .header-des{
            padding-bottom:30px;
            margin-left: 30px;
            li{
                font-size:18px;
                color:#414141;
                letter-spacing:1px;
                margin-bottom: 15px;
                span:nth-child(1){
                    color:#333333;
                    font-weight:bold;
                }
                span:nth-child(2){
                    margin-left:30px;
                    font-size:16px;
                }
            }
        }
    }
    .payMain::before{
        content:'';
        display:block;
        width: 3px;
        height: 40px;
        border-left:3px solid #409EFF;
    }
    .payMain{
        .main-des{
            li{
                padding-bottom:70px;
                border-left:3px solid #409EFF;
                display:flex;
                position:relative;
                padding-left:30px;
                .pay-round{
                    content:'';
                    width: 26px;
                    height: 26px;
                    border-radius:50%;
                    background: #ECEFFE;
                    position:absolute;
                    left: -15px;
                    top:-5px;
                }
                .pay-round::before{
                    display:block;
                    content:'';
                    width: 13px;
                    height: 13px;
                    border-radius:50%;
                    position:absolute;
                    background: #BFD0F7;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    left: 0;
                    margin:auto;
                }
                p{
                    font-size: 16px;
                    color:#555;
                }
                p:nth-child(n+3){
                    margin-left: 50px;
                }
            }

        }
    }
   
}
</style>

