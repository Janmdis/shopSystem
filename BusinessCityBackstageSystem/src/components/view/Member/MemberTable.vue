<template>
    <el-table
    :data="datalist"
    @selection-change='showextra'
    @cell-click='showMemberInfo'
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
        <el-table-column class='borderRight' fixed prop="id" label="ID" width='360'height='100'>
        </el-table-column>
        <el-table-column
        prop="name"
        label="客户姓名"
        >
        </el-table-column>
        <el-table-column
        prop="mobile"
        width='120'
        label="手机号">
        </el-table-column>
        <el-table-column
        prop="types"
        label="客户类型">
        </el-table-column>
        <el-table-column
        prop="city"
        label="城市">
        </el-table-column>
        <el-table-column
        prop="quarters"
        label="小区">
        </el-table-column>
        <el-table-column
        prop="state"
        label="订单状态">
        </el-table-column>
        <el-table-column
        prop="source"
        label="来源">
        </el-table-column>
        <el-table-column
        prop="Inputtiem"
        width='100'
        label="录入时间">
        </el-table-column>
        <el-table-column
        width='260'
        prop="address"
        label="小区地址">
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
            let url = '/api/customer/account/query?page='+pageIndex+'&pageSize=10';
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
    }

}
</script>
