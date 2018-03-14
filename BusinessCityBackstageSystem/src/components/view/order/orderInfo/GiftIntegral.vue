<template>
    <div id="integral">
        <el-col :span="24">
            <el-table
                :data="dataInfo"
                height="550"
                border
                style="width: 100%">
                <el-table-column
                prop="commodityInfo.name"
                width="150"
                label="商品名称">
                </el-table-column>
                <el-table-column
                v-if="isShow"
                prop="commodityInfo"
                label="商品编号">
                </el-table-column>
                <el-table-column
                prop='commodityInfo.currentPricePoints'
                label="赠送积分">
                </el-table-column>
            </el-table>
        </el-col>
    </div>
</template>
<script>
export default{
    props:['orderId'],
    data () {
        return {
            isShow:false,
            dataInfo:[]
        }
    },
    created(){
        this.searchInfo();
    },
    methods:{
        searchInfo(id) { //  通过接口获取订单商品详情
            let that = this;
            this.$http({
                url: '/api/product/order/queryOrderDetails?orderId=' + this.orderId,
                method: 'POST',
                // 请求发送的数据
                // 设置请求头
                headers: { 'Content-Type': 'application/json' }
            }).then(res => {
                if (res.data.status == 200) {
                    console.log(res.data.msg)
                    that.dataInfo = res.data.info;
                    console.log(res.data.info[0])
                    that.$root.$emit('load',false);
                }
                that.which_to_show = 'oneShopInfo';
            }).catch(err => { console.log(err) })
        },
    }
}
</script>
<style lang="less" >
#integral{
    .el-table{
        table td:nth-child(3) .cell{
            border:none;
        }
    }
}
</style>
<style lang="less" scoped>
#integral{
    padding:50px 20px 50px;
}
</style>

