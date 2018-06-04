<template>
    <div id="shopInfo">
        <el-col :span="24">
            <el-table :data="dataInfo" height="550" border style="width: 100%">
                <el-table-column prop="commodityInfo.name" label="商品名称">
                </el-table-column>
                <el-table-column prop="commodityInfo.specificationValue" label="规格">
                </el-table-column>
                <el-table-column prop="saleNumber" label="数量">
                </el-table-column>
                <el-table-column prop="commodityInfo.displayQuantity" label="商品库存">
                </el-table-column>
                <el-table-column prop="commodityInfo.originalPrice" label="单价">
                </el-table-column>
                <el-table-column prop="priceEnd" label="实际单价">
                </el-table-column>
                <el-table-column prop="commodityInfo.currentPrice" label="状态">
                    <template slot-scope='scope'>
                                        <span>{{scope.row.isService?(scope.row.serviceState==1?"未服务":scope.row.serviceState==2?"服务中":'已完成'):(scope.row.orderState==1?"未完成":scope.row.orderState==2?"已完成":scope.row.orderState==3?"异常订单":scope.row.orderState==4?"退款中":scope.row.orderState==5?"退款完成":"")}}</span>
</template>
                </el-table-column>
                <el-table-column
                label="操作">
<template slot-scope='scope'>
    <span @click='showBoxInfo(scope.row.isService,scope.row.serviceState,scope.row.orderState,scope.row.id)'>编辑</span>
</template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-dialog class='headerBottom' :title="textInfo" :append-to-body="true" :before-close="handleClose" :visible.sync="dialogVisible" width="50%" >
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="服务状态" v-if='isServices'>
                <el-radio-group v-model="form.server">
                <el-radio label="1">未服务</el-radio>
                <el-radio label="2">服务中</el-radio>
                <el-radio label="3">已完成</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="订单状态" v-if='isOrder'>
                <el-radio-group v-model="form.order">
                <el-radio label="1">未完成</el-radio>
                <el-radio label="2">已完成</el-radio>
                <el-radio label="3">异常订单</el-radio>
                <el-radio label="4">退款中</el-radio>
                <el-radio label="5">退款完成</el-radio>
                <el-radio label="6">取消订单</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item class='boxsss'>
                <el-button class='mTop' type="primary" style='margin-left:0;' @click="submitForm('form')">保存</el-button>
            </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        props: ['orderId'],
        data() {
            return {
                dataInfo: [],
                textInfo: '编辑订单状态',
                dialogVisible: false,
                isServices:'',
                isOrder:'',
                oderId:'',
                form: {
                    server:'',
                    order:""
                }
            }
        },
        created() {
            this.searchInfo1();
            this.$root.$on('loadFn', data => {
                this.searchInfo1();
            });
        },
        methods: {
            handleClose() {　　
                this.$refs['form'].resetFields();
                this.dialogVisible = false;
            },
            submitForm(form){
                let newObj = {};
                console.log(this.form.order)
                if(this.form.server!='undefined'){
                    newObj = {
                        id:this.oderId,
                        serviceState:this.form.server
                    }
                }
                if(this.form.order!='undefined'){
                    newObj = {
                        id:this.oderId,
                        orderState:this.form.order
                    }
                }
                let that = this;
                this.$http({
                    url: '/api/product/order/mall/update/orderDetail',
                    method: 'POST',
                    // 请求发送的数据
                    // 设置请求头
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data:[newObj],
                }).then(res => {
                    console.log(res.data)
                    this.searchInfo1();
                }).catch(err => {
                    console.log(err)
                })
                this.$refs[form].resetFields();
                this.dialogVisible = false;
            },
            showBoxInfo(isService, serviceState, orderState,id) {
                console.log(isService)
                console.log(serviceState)
                console.log(orderState)
                console.log(id)
                this.dialogVisible = true;
                this.isServices = serviceState
                this.isOrder = orderState
                this.form.order = orderState+'',
                this.form.server = serviceState+"",
                this.oderId = id
              
            },
            searchInfo1(id) { //  通过接口获取订单商品详情
                let that = this;
                this.$http({
                    url: '/api/product/order/queryOrderDetails?orderId=' + this.orderId,
                    method: 'POST',
                    // 请求发送的数据
                    // 设置请求头
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    if (res.data.status == 200) {
                        that.dataInfo = res.data.info;
                        console.log(that.dataInfo)
                        that.$root.$emit('load', false);
                    }
                    that.which_to_show = 'oneShopInfo';
                }).catch(err => {
                    console.log(err)
                })
            },
        }
    }
</script>
<style lang="less">
    #shopInfo {
        .el-table {
            table td:nth-child(3) .cell {
                border: none;
            }
        }
    }
</style>
<style lang="less" scoped>
    #shopInfo {
        padding: 50px 20px 50px;
    }
</style>

