<template>
    <el-table
    :data="datalist"
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
        type="selection"
        width="55" >
        </el-table-column>
        <!-- <el-table-column class='borderRight' fixed prop="id" label="ID" width='360' height='100'>
        </el-table-column> -->
        <el-table-column
        width='200'
        prop="couponName"
        label="优惠劵名称">
        </el-table-column>
        <el-table-column
        prop="starTime"
        width='200'
        label="使用时间">
        </el-table-column>
         <el-table-column
        prop="endTime"
        width='200'
        label="结束时间">
        </el-table-column>
        <el-table-column
        prop="couponAmount"
        label="数量">
        </el-table-column>
        <el-table-column
        prop="fullAmount"
        label="数额">
        </el-table-column>
        <el-table-column
        prop="explain"
        label="说明">
        </el-table-column>
        <el-table-column
        label="类型">
            <template slot-scope="scope">
                <span >{{scope.row.couponType==0?'满减':scope.row.couponType==1?"专享":'无门槛'}}</span>
            </template>
        </el-table-column>
        <el-table-column
        label="状态">
        <template slot-scope="scope">
                <span >{{scope.row.couponStatus==0?'过期':scope.row.couponStatus==1?"可使用":''}}</span>
            </template>
        </el-table-column>
        <el-table-column 
        fixed="right"
        width='120'
        label="操作">
            <template slot-scope="scope" >
                <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
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
            pageIndex:1,
            data:{
                couponName:null,
                couponType:null,
                couponStatus:null,
                starTime:null,
                endTime:null
            }
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
        this.$root.$on('search',(datas)=>{
            // console.log(datas);
            this.data.couponName=datas.coupon.couponName===''?null:datas.coupon.couponName;
            this.data.couponType=datas.coupon.couponType===''?null:datas.coupon.couponType;
            this.data.couponStatus=datas.coupon.couponStatus===''?null:datas.coupon.couponStatus;
            this.data.starTime=datas.coupon.daterange?Date.parse(datas.coupon.daterange[0]):null;
            this.data.endTime=datas.coupon.daterange?Date.parse(datas.coupon.daterange[1]):null;
            // console.log(this.data);
            this.getDate(1);
        })
    },
    methods:{
        getDate(pageIndex) {
            this.listLoading =  true;
            let url = '/api/product/coupon/info/find?pageNo='+pageIndex+'&pageSize=10';
            this.$http({
                url: url,
                method: 'POST',
                // 请求体重发送的数据
                headers: { 'Content-Type': 'application/json' },
                data:this.data,
            })
            .then(response => {
                this.listLoading =  false;
                this.datalist=(response.data.info.list);
                console.log(this.datalist)
                this.$root.$emit('pages',response.data.info.pages)
                this.$root.$emit('total',response.data.info.total)
          })
          .catch(error=>{
              console.log(error);
              alert('网络错误，不能访问');
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
        handleEdit(row){
            // console.log(row);
            this.$root.$emit("showWindow",[row])
        },
        handleDelete(row){
            this.$root.$emit("delBox",[row])
        }
    },
    beforeDestroy(){
        this.$root.$off('pageIndex');
        this.$root.$off('getDatezdy');
        this.$root.$off('dataListBox');
        this.$root.$off('search');
    }

}
</script>
