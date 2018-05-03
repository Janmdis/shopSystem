<template>
    <div id="shopInfo">
        <el-col :span="24">
            <el-table
                :data="dataInfo"
                height="550"
                border
                style="width: 100%">
                <el-table-column
                prop="commodityInfo.name"
                label="商品名称">
                </el-table-column>
                <el-table-column
                prop="commodityInfo.specificationValue"
                label="规格">
                </el-table-column>
                <el-table-column
                prop="commodityInfo.inventoryQuantity"
                label="数量">
                </el-table-column>
                <el-table-column
                prop="commodityInfo.displayQuantity "
                label="商品库存">
                </el-table-column>
                <el-table-column
                prop="commodityInfo.originalPrice"
                label="单价">
                </el-table-column>
                <el-table-column
                prop="commodityInfo.currentPrice"
                label="实际单价">
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
            dataInfo:[]
        }
    },
    created(){
        this.searchInfo1();
        this.$root.$on('loadFn',data =>{
            this.searchInfo1();
        });
    },
    methods:{
        searchInfo1(id) { //  通过接口获取订单商品详情
            let that = this;
            this.$http({
                url: '/api/product/order/queryOrderDetails?orderId=' + this.orderId,
                method: 'POST',
                // 请求发送的数据
                // 设置请求头
                headers: { 'Content-Type': 'application/json' }
            }).then(res => {
                if (res.data.status == 200) {
                    // console.log(res.data.msg)
                    that.dataInfo = res.data.info;
                    that.$root.$emit('load',false);
                }
                that.which_to_show = 'oneShopInfo';
            }).catch(err => { console.log(err) })
        },
    }
}
</script>
<style lang="less" >
#shopInfo{
    .el-table{
        table td:nth-child(3) .cell{
            border:none;
        }
    }
}
</style>
<style lang="less" scoped>
#shopInfo{
    padding:50px 20px 50px;
}
</style>

