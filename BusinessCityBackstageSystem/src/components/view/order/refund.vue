<template>
    <el-main class="refund-xs">
        <div class="memberNav" >
            <el-row class="navChild">
                <el-col :span='15'>
                    <Lttip :name='namepage' :searchshow='searchshow'></Lttip>
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
        <el-row>
            <search :type='type'></search>
        </el-row>
        <div class='tablelist'>
            <el-table
            :data="datalist"
            @cell-click='showMemberInfo'
            @selection-change='showextra'
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
                <el-table-column prop="refundTime" width="180" label="申请退款时间"> </el-table-column>
                <el-table-column prop="refundMoney" width="100" label="退款金额"> </el-table-column>
                <el-table-column prop="orderState" width="180" label="退款状态">
                    <template slot-scope='scope'>
                        {{scope.row.orderState==4?'未处理':scope.row.orderState==5?'已完成':scope.row.orderState==7?'驳回':''}}
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" width="180" label="支付方式">
                    <template slot-scope='scope'>
                        {{scope.row.payType==1?'支付宝':scope.row.orderState==2?'微信':scope.row.orderState==3?'管家代收':''}}
                    </template>
                </el-table-column>
                <!-- <el-table-column
                    width='180'
                    label="操作"
                    fixed='right'>
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="showMemberInfo(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column> -->
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
        <showWindows></showWindows>
         <Order-refund class='infoCover' ref="memberInfos"></Order-refund>
    </el-main>
</template>
<script>
import Lttip from './lttip.vue'
import showWindows from './showWindow.vue'
import OrderRefund from './refund/OrderInfo.vue'
import search from '../../common/search/search.vue'
export default {

    data(){
        return{
            namepage:'退款订单',
            valuesearch:'',
            loading:false,
            datalist:[],
            pagesize:10,
            total:0,
            pagenum:1,
            searchshow:true,
            showLeft:0,
            type:'refund',
            data:{
                number:null,
                phone:null,
                refundNumber:null,
                orderState:null,
                createTimeMin :null,
                createTimeMax:null,
                payState:1,
                orderStateConditions:[4,5,7]
            }
        }
    },
    created(){
        this.getDatalist(1);
        this.$root.$on('search',datas=>{
            this.data.number=datas.refund.number===''?null:datas.refund.number;
            this.data.phone=datas.refund.phone===''?null:datas.refund.phone;
            this.data.orderState=datas.refund.orderState===''?null:datas.refund.orderState;
            this.data.refundNumber=datas.refund.refundNumber===''?null:datas.refund.refundNumber;
            this.data.createTimeMin =datas.refund.daterange?Date.parse(datas.refund.daterange[0]):null;
            this.data.createTimeMax =datas.refund.daterange?Date.parse(datas.refund.daterange[1]):null;
            this.getDatalist(1);
            // console.log(this.data);
        });
    },
    methods:{
        // search(){},
        getDatalist(pagenum){
            let that=this;
            this.loading=true;
            this.$http.post('/api/product/order/mall/find?pageSize='+that.pagesize+'&pageNo='+pagenum,that.data)
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
        handleEdit(){},
        showMemberInfo(row,column,cell,event,index){//  点击显示侧滑
            //  let classNum = cell.className.split('n_')[1] //  获取单元格的类名
            this.$root.$emit('showshow', "支付信息");
            let labelValue = column.label;
            let that = this;
            if(labelValue == '退款单号'){
                this.showLeft = 16
                this.$http.post(
                    '/api/product/order/queryPageList',
                    {id:row.id}
                ).then(res => {
                    if(res.data.status == 200){
                        that.$root.$emit('orderCoverShow',that.showLeft)
                        that.$root.$emit('searchOrderInfo',[row.id,res.data.info.list[0]]);
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        showextra(val){
            console.log(val)
             let show=false;
             let editcan=true;
             this.multipleSelection = val
            if(this.multipleSelection.length>0){
                show=true;
            }
            if(this.multipleSelection.length>1){
                editcan=false;
            }
             this.$root.$emit('showlttip',{show,editcan,num:this.multipleSelection.length,datas:this.multipleSelection});
        },
    },
     components: {
        OrderRefund,
        showWindows,
        Lttip,
        search
    },
}
</script>

<style scoped lang="less">
    // @import './Order.less';
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