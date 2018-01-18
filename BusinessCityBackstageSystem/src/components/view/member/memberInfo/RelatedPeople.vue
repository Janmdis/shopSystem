<template>
    <div id="related">
        <ul class="relatedMain">
            <li v-for="info in infos" :key="info.id" >
                <div class="relatedDiv"><span>姓名 : {{info.relatedName}}</span><span>手机号 : {{info.relatedPhone}}</span><span>订单状态 : {{info.orderState}}</span><span>生日 : {{info.birthday}}</span></div>
                <div class="relatedDiv"><span>小区 : {{info.village}}</span><span>客户类型 : {{info.customerType}}</span><span>来源   : {{info.origin}}</span><span>消费积分/等级 : {{info.consumptionIntegral}}</span></div>
                <div class="relatedBtn">
                    <el-button @click="jumpRelatedDetail(info.relatedId)">查看详情</el-button>
                </div>
            </li>
        </ul>
        <public-pagination></public-pagination>
    </div>
</template>
<script>
import publicPagination from '@/components/common/pagination/pagination.vue'
export default{
    data () {
        return {
            infos:[
                {relatedId:0,relatedName:'马云',relatedPhone:'13227162736',orderState:'在线',birthday:'2017-12-12',village:'长阳创谷',customerType:'租住',origin:'租住',consumptionIntegral:'400/5'},
                {relatedId:1,relatedName:'马云',relatedPhone:'13227162736',orderState:'在线',birthday:'2017-12-12',village:'长阳创谷',customerType:'租住',origin:'租住',consumptionIntegral:'400/5'},
                {relatedId:2,relatedName:'马云',relatedPhone:'13227162736',orderState:'在线',birthday:'2017-12-12',village:'长阳创谷',customerType:'租住',origin:'租住',consumptionIntegral:'400/5'},
                {relatedId:3,relatedName:'马云',relatedPhone:'13227162736',orderState:'在线',birthday:'2017-12-12',village:'长阳创谷',customerType:'租住',origin:'租住',consumptionIntegral:'400/5'},
            ],
        }
    },
    methods:{
        jumpRelatedDetail (num) {
            // this.$router.replace('/member/relatedDetail')
        },
        handleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
        }
    },
    components:{
        publicPagination,
    }
}
</script>
<style scoped lang="less">
#related{
    background: #fff;
    padding:0 25px 20px;
    min-width: 750px;
    .relatedMain{
            width: 100%;
        li{
            font-size: 14px;
            color:#666;
            margin:20px 0;
            background:#F2F3F4;
            .relatedDiv{      
                padding: 0 80px 0;
                display:flex;
                span{
                    display:block;
                    width: 25%;
                }
            }
            .relatedDiv:nth-child(1){
                padding-top:20px;
                margin-bottom: 30px;
            }
            .relatedDiv:nth-child(2){
                margin-bottom: 20px;
            }
            .relatedBtn{
                border-top: 1px solid #dbdbdd;
                padding-top:10px;
                position:relative;
                height: 45px;
                .el-button{
                    background:#fff;
                    color:#00c0be;
                    position: absolute;
                    right:30px;
                    border-radius:30px;
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
