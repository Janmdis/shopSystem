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
        <el-table-column class='borderRight' fixed prop="id" label="ID" width='360'height='100'>
        </el-table-column>
        <el-table-column
        prop="name"
        label="图片"
        width='120'
        >
        </el-table-column>
        <el-table-column
        prop="mobile"
        width='120'
        label="名称">
        </el-table-column>
        <el-table-column
        width='120'
        prop="types"
        label="规格" 
        sortable
        >
        </el-table-column>
        <el-table-column
        width='120'
        prop="city"
        label="单位"
        >
        </el-table-column>
        <el-table-column
        width='120'
        prop="quarters"
        label="库存"
        sortable>
        </el-table-column>
        <el-table-column
        width='120'
        prop="state"
        label="分类"
        </el-table-column>
        <el-table-column
        width='120'
        prop="source"
        label="类型">
        </el-table-column>
        <el-table-column
        prop="Inputtiem"
        width='100'
        label="品牌">
        </el-table-column>
        <el-table-column
            width='120'
            prop="address"
            label="操作"
            fixed='right'
            >
            <template scope="scope" >
                <el-button type="text" size="small">编辑</el-button>
                <el-button type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
                
            </el-table>
</template>
<script>
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
