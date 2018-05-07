<template>
    <el-main class="invoice-xs">
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
            @cell-click='showMemberInfo'
            :stripe='true'
            style="width: 100%"
            height='500'
            >
                <el-table-column fixed  type="index" label="N"  > </el-table-column>
                <el-table-column fixed  type="selection" width="55" > </el-table-column>
                <el-table-column prop="orderInfo.number" width="180" label="订单号"> </el-table-column>
                <el-table-column prop="orderInfo.orderMoney" width="180" label="订单金额"> </el-table-column>
                <el-table-column prop="orderInfo.paidMoney" width="180" label="已付金额"> </el-table-column>
                <el-table-column prop="orderInfo.phone" width="180" label="手机号"> </el-table-column>
                <el-table-column width="180" label="订单状态">
                    <template slot-scope='scope'>
                        {{scope.row.orderInfo.orderState==1?'未完成':scope.row.orderInfo.orderState==2?'已完成':scope.row.orderInfo.orderState==3?'异常订单':scope.row.orderInfo.orderState==4?'退款中':scope.row.orderInfo.orderState==5?'退款完成':scope.row.orderInfo.orderState==6?'订单取消':scope.row.orderInfo.orderState==7?'退款驳回':''}}
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" width="180" label="申请时间"> </el-table-column>
                <el-table-column width="180" label="发票类型">
                    <template slot-scope='scope'>
                        {{scope.row.category==11?'个人普通发票':scope.row.category==21?'单位普通发票':scope.row.category==22?'单位专用发票':''}}
                    </template>
                </el-table-column>
                <el-table-column width="180" label="发票状态">
                    <template slot-scope='scope'>
                        {{scope.row.isFinished?(scope.row.isDisallowance?'发放完成':'驳回'):'未处理'}}
                    </template>
                </el-table-column>
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
        <orderinvoice class='infoCover' ref="memberInfos"></orderinvoice>
    </el-main>
</template>
<script>
import Lttip from './lttip.vue'
import orderinvoice from './invoice/OrderInfo.vue'
export default {
    components:{Lttip,orderinvoice},
    data(){
        return{
            namepage:'发票管理',
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
            this.$http.post('/api/product/order/invoice/query?pageSize='+that.pagesize+'&page='+pagenum,{})
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
        showMemberInfo(row,column,cell,event,index){//  点击显示侧滑
            // console.log(row,column,cell,event)
            //  let classNum = cell.className.split('n_')[1] //  获取单元格的类名
            let labelValue = column.label;
            console.log(labelValue)
            let that = this;
            if(labelValue == '订单号'){
                this.showLeft = 16
                this.$http.post(
                    '/api/product/order/queryPageList',
                    {id:row.id}
                ).then(res => {
                    if(res.data.status == 200){
                        console.log(res.data.info)
                        that.$root.$emit('orderCoverShow',that.showLeft)
                        that.$root.$emit('searchOrderInfo',[row.id,res.data.info.list[0]]);
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        }, 
        handleEdit(){
        },
        
    }
}
</script>

<style scoped lang="less">
.infoCover{
            width:85%;
            padding: 0;
            background-color: #F2F3F4;
            position: absolute;
            left:105%;
            // left:15%;
            top:0;
            z-index: 999;
            box-shadow: rgb(198, 198, 198) 0px 0px 10px 0px;
            #infoContainer{
                background-color: #F2F3F4;
            }
        }
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
    .invoice-xs{
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