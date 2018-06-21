<template>
    <el-table
    :data="datalist"
    :border="isBorder"
    @selection-change='showextra'
    @cell-click='showMemberInfo'
    :default-sort = "{prop: 'date', order: 'descending'}"
    v-loading="this.listLoading"
    :stripe='true'
    style="width: 100%"
    height='500'>
    <el-table-column
    fixed
    type="index"
    label="N"
    :index="indexMethod">
    </el-table-column>
        <el-table-column
        fixed
        type="selection" >
        </el-table-column>
        <!-- <el-table-column class='borderRight' fixed prop="id" label="ID" width='360' height='100'>
        </el-table-column> -->
        <el-table-column
        prop="orderDetail.orderId"
        width='200'
        label="订单号"
        >
        </el-table-column>
        <el-table-column
        label="状态">
            <template slot-scope="scope">
            {{getInfo(scope.row.orderDetail)}}
            </template>
        </el-table-column>
        <el-table-column
        width='200'
        label="服务时间">
        <template slot-scope="scope">
            {{rGetData(scope.row.appointTime) + (scope.row.appointSlot==1?"上午":scope.row.appointSlot==2?"下午":scope.row.appointSlot==3?"全天":"")}}
        </template>
        </el-table-column>
        <el-table-column
        width='200'
        prop="updateAppointTime"
        label="申请修改时间">
        <template slot-scope="scope">
            {{rGetData(scope.row.updateAppointTime) + (scope.row.updateAppointSlot==1?"上午":scope.row.updateAppointSlot==2?"下午":scope.row.updateAppointSlot==3?"全天":'')}}
        </template>
        </el-table-column>
        <el-table-column
        prop="orderDetail.orderInfo.name"
        label="姓名">
        </el-table-column>
        <el-table-column
        prop="orderDetail.orderInfo.phone"
        label="电话">
        </el-table-column>
        <el-table-column
        prop="orderDetail.orderInfo.serviceStateName"
        label="服务类型">
        </el-table-column>
        <el-table-column
        prop="orderDetail.orderInfo.productModel"
        label="产品类型">
        </el-table-column>
        <el-table-column
        prop="orderDetail.orderInfo.communityName"
        label="小区">
        </el-table-column>
        <el-table-column
        width='200'
        prop="orderDetail.orderInfo.detailAddress"
        label="地址">
        </el-table-column>
        <el-table-column
        prop="types"
        label="操作">
         <template slot-scope="scope">
            <el-button type="text"  size="small" @click="handleEdit(scope.$index, scope.row,$event)">编辑</el-button>
            <!--<el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row,$event)">删除</el-button>!-->
        </template>
        </el-table-column> 
    </el-table>
</template>
<script>
/* eslint-disable */
//@row-click="showMemberInfo()"
export default {
    prop:['listLoading'],
    data(){
        return {
            isBorder:false,
            datalist:[],
            showLeft:0,
            pageIndex:1
        }
    },
    created:function(){
        this.$root.$on('pageIndex',(data) => {
            this.pageIndex = data.value
            this.getDate(this.pageIndex,{})
        })
        this.getDate(1,{})
        this.$root.$on('getDatezdy',(data)=>{
             this.getDate(data,{});
        })
        this.$root.$on('dataListBox',(data)=>{
            this.datalist = data
        })
        this.$root.$on('search',(datas)=>{
            let data={
                name:datas.name,
                alias:datas.alias
            };
            // console.log(data);
            this.getDate(1,data);
        })
    },
    methods:{
        getInfo(val){
            let statu='';
            if(val){
                return statu = val.serviceState==1?"未服务":"服务完成"
            }
        },
        handleDelete(index, row,event) { //  删除某一种产品
            let that = this;
            console.log(row);
            this.$confirm('确定删除 "'+row.name+'"吗?', '提示', 
                {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'})
            .then(() => {
                that.$message({
                    type: 'success',
                    message: '删除成功!',
                    duration:800,
                    onClose:that.$http.post('/api/product/appointment/remove',
                        [row.id]
                    ).then(res => {
                        console.log(res.data.msg);
                        that.getDate(1,{});
                    }).catch(err => {console.log(err)})
                });
            }).catch(() => {
                that.$message({
                    type: 'info',
                    message: '已取消删除',
                    duration:800
                });          
            });   
        },
        handleEdit(index, row,event) {
            this.$root.$emit('showWindowss',{type:'yes',rowData:row});
        },
        rGetData(data){
            let newTime = '';
            if(data){
                newTime = data.split(" ")[0]
            }
            return newTime
        },
        getDate(pageIndex,data) {
            this.listLoading =  true;
            let url = '/api/product/appointment/query?page='+(pageIndex?pageIndex:1)+'&pageSize=10'
            this.$http({
                url: url,
                method: 'post',
                // 请求体重发送的数据
                // headers: { 'Content-Type': 'application/json' },
                data:{},
            })
            .then(response => {
                this.listLoading =  false;
                this.datalist=(response.data.info.list);
                console.log(response.data)
                this.$root.$emit('output',this.datalist);
                this.$root.$emit('pages',response.data.info.pages)
                this.$root.$emit('total',response.data.info.total)
          })
          .catch(error=>{
              console.log(error);
              //         alert('网络错误，不能访问');
          })
        },
        showMemberInfo(row,column,cell,event){//  点击显示侧滑
            //console.log(row,column,cell,event)
            //  let classNum = cell.className.split('n_')[1] //  获取单元格的类名
            let labelValue = column.label
            if(labelValue == 'ID'){
                this.showLeft = 16
                this.$root.$emit('infoCoverShow',this.showLeft)
                this.$root.$emit('searchPersonnelInfo',row.id)
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
    },
    beforeDestroy(){
        this.$root.$off('pageIndex');
        this.$root.$off('getDatezdy');
        this.$root.$off('dataListBox');
        this.$root.$off('search');
    }
}
</script>
