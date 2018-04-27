<template>
    <el-main class="refund-xs">
        <div class="memberNav" >
            <el-row class="navChild">
                <el-col :span='15'>
                    <lttip :name='namepage' :searchshow='searchshow'></lttip>
                </el-col>
                <el-col :span='9'>
                    <div class="grid-content search">
                        <!-- <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="valuesearch" @keyup.native.13="search($event)"> -->
                        <!-- </el-input> -->
                        <!-- <el-button type="primary" class="add" @click='showWindowx("no")'><i class='icon iconfont icon-xinzenghuizong'></i>&nbsp;&nbsp;新增</el-button> -->
                        <!-- <el-button type="primary" class='shuaxin' round><i class='icon iconfont icon-shuaxin'></i></el-button> -->
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class='tablelist'>
            <el-table
            :data="datalist"
            :default-sort = "{prop: 'date', order: 'descending'}"
            v-loading="loading"
            :stripe='true'
            style="width: 100%"
            height='500'
            >
                <el-table-column fixed  type="index" label="N"  > </el-table-column>
                <el-table-column fixed  type="selection" width="55" > </el-table-column>
                <el-table-column prop="refundNumber" width="180" label="退款单号"> </el-table-column>
                <el-table-column prop="number" width="180" label="订单编号"> </el-table-column>
                <el-table-column prop="phone" width="180" label="手机号"> </el-table-column>
                <el-table-column prop="refund_time" width="180" label="申请退款时间"> </el-table-column>
                <el-table-column prop="refundMoney" width="180" label="退款金额"> </el-table-column>
                <el-table-column prop="orderState" width="180" label="退款状态">
                    <template slot-scope='scope'>
                        {{scope.row.orderState==4?'未处理':scope.row.orderState==5?'已完成':scope.row.orderState==7?'驳回':''}}
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" width="180" label="支付方式"> </el-table-column>
                <el-table-column
                    width='180'
                    label="操作"
                    fixed='right'>
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row style='margin-bottom:80px;'>
                <el-col :span='12' :offset="12">
                    <div class="block">
                        <el-pagination  @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout=" prev, pager, next, jumper,total" :total="total">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div> 
    </el-main>
</template>
<script>
import Lttip from './lttip.vue'
export default {
    components:{Lttip},
    data(){
        return{
            namepage:'退款订单',
            valuesearch:'',
            loading:false,
            datalist:[],
            pagesize:10,
            total:0,
            pagenum:1,
            searchshow:false
        }
    },
    created(){
        this.getDatalist(1);
    },
    methods:{
        // search(){},
        getDatalist(pagenum){
            let that=this;
            this.loading=true;
            this.$http.post('/api/product/order/mall/find?pageSize='+that.pagesize+'pageNo='+pagenum,
            {
                payState:1,
                orderState:4,
            })
            .then(res=>{
                if(res.data.status==200){
                    that.datalist=res.data.info.list;
                    that.total=res.data.info.total;
                }
                else{
                    that.$message({
                        showClose: true,
                        message:res.data.msg,
                        type: 'warning'
                    });
                }
                that.loading=false;
            })
            .catch(err=>{
                console.log(err);
                that.loading=false;    
                that.$message({
                    showClose: true,
                    message:'数据载入出错',
                    type: 'warning'
                });
                            
            });
        },
        handleCurrentChange(val){
            // console.log(val);
            this.getDatalist(val);
        },
        handleEdit(){}
    }
}
</script>

<style scoped lang="less">
    // @import './Order.less';
    .search {
        position: relative;
        height: 72px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }
    .add {
        font-size: 16px;
        height: 37px;
        line-height: 0;
        margin-left: 15px;
    }
    .shengrizhuanqu,
    .msnuiMore,
    .shuaxin {
        background: none;
        border: none;
        color: #00adab;
        font-size: 40px;
        padding: 0;
        width: 10%;
    }
    .refund-xs{
        background-color: #fff !important;
        .memberNav:after{
            content:'';
            display: block;
            background:#fff;
            margin-right:16px;
            border-top: 6px solid #56d2f4;
        }
    }
</style>