<template>
    <el-table
    :data="datalist"
    @selection-change='showextra'
    @cell-click='showMemberInfo'
    :default-sort = "{prop: 'date', order: 'descending'}"
    v-loading="this.listLoading"
    :stripe='true'
    style="width: 100%">
    <el-table-column
    fixed 
    type="index"
    label="N"
    :index="indexMethod">
    </el-table-column>
        <el-table-column
        fixed
        type="selection"
        width="55" >
        </el-table-column>
        <el-table-column
        prop="createTime"
        width="180"
        label="下单时间">
        </el-table-column>
        <el-table-column 
        class='borderRight' fixed 
        prop="number"
        label="订单号"
        width='200'>
        </el-table-column> 
        <el-table-column
        prop="paidMoney"
        label="支付金额">
        </el-table-column>
         <el-table-column
        prop="refundMoney"
        label="退款金额">
        </el-table-column>
        <el-table-column
        prop="name"
        label="业主姓名">
        </el-table-column>
        <el-table-column
        prop="phone"
        label="手机">
        </el-table-column>
        <el-table-column
      
        label="来源">
            <template slot-scope='scope'>
                {{scope.row.sourceId}}
            </template>
        </el-table-column>
        <el-table-column
        prop="sourceDetail"
        label="明细">
        </el-table-column>
        <el-table-column
        label="订单状态">
            <template slot-scope='scope'>
                {{scope.row.orderState==0?'新增服务订单':scope.row.orderState==1?'新增上门订单':scope.row.orderState==2?'追单':'暂无'}}
            </template>
        </el-table-column>
        <el-table-column
        prop="remark"
        label="备注">
        </el-table-column>
        <el-table-column
        prop="operatorId"
        label="操作人">
        </el-table-column>
    </el-table>
</template>
<script>
/ eslint-disable /
//@row-click="showMemberInfo()"
export default {
    prop:['listLoading'],
    data(){
        return {
            datalist:[],
            showLeft:0,
            pageIndex:1
        }
    },
    created:function(){
        this.$root.$on('pageIndex',(data) => {
            this.pageIndex = data.value
            this.getDate(this.pageIndex)
        })
        this.getDate(1)
        this.$root.$on('getDatezdy',(data)=>{
             this.getDate( data)
        })
        this.$root.$on('dataListBox',(data)=>{
            this.datalist = data
        })
    },
    methods:{
      getDate(pageIndex) {
            this.listLoading =  true;
            let url = '/api/product/order/queryPageList?pageNo='+pageIndex+'&pageSize=10';
            this.$http({
                url: url,
                method: 'POST',
                // 请求体重发送的数据
                headers: { 'Content-Type': 'application/json' },
                data:{},
            })
            .then(response => {
                this.listLoading =  false;
                this.datalist=(response.data.info.list);
                console.log(this.datalist)
                this.$root.$emit('pages',response.data.info.pages)
                this.$root.$emit('total',response.data.info.total)
                this.$root.$emit('output',this.datalist);
          })
          .catch(error=>{
              console.log(error);
              alert('网络错误，不能访问');
          })
        },
        showMemberInfo(row,column,cell,event,index){//  点击显示侧滑
            // console.log(row,column,cell,event)
            //  let classNum = cell.className.split('n_')[1] //  获取单元格的类名
            let labelValue = column.label;
            let that = this;
            if(labelValue == '订单号'){
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
        indexMethod(index) {
            return index + 1
        },
    }

}
</script>
