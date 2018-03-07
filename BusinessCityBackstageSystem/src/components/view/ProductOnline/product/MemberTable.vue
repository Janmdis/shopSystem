<template>
    <el-table
    :data="datalist"
    @selection-change='showextra'
    :default-sort = "{prop: 'date', order: 'descending'}"
    v-loading="this.listLoading"
    :stripe='true'
    style="width: 100%" height='500'>
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
        <el-table-column class='borderRight' fixed prop="id" label="ID" width='360' height='100'>
        </el-table-column>
        <el-table-column
        prop='productImage'
        label="图片"
        width='120'
        >
        
        </el-table-column>
        <el-table-column
        prop="name"
        width='120'
        label="名称">
        </el-table-column>
        <el-table-column
        width='120'
        prop="specificationValue"
        label="规格" 
        sortable
        >
        </el-table-column>
        <el-table-column
        width='120'
        prop="unitName"
        label="单位"
        >
        </el-table-column>
        <el-table-column
        width='120'
        prop="inventoryQuantity"
        label="库存"
        sortable>
        </el-table-column>
        <el-table-column
        width='120'
        prop="classificationName"
        label="分类">
        </el-table-column>
        <el-table-column
        width='120'
        prop="typeName"
        label="类型">
        </el-table-column>
        <el-table-column
        prop="brand"
        width='100'
        label="品牌">
        </el-table-column>
        <el-table-column
            width='120'
            prop="address"
            label="操作"
            fixed='right'
            >
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row,$event)">编辑</el-button>
                <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row,$event)">删除</el-button>
            </template>
        </el-table-column>
                
            </el-table>
</template>
<script>

export default {
    prop:['listLoading'],
    data(){
        return {
            dialogVisible:false,
            datalist:[],
            showLeft:0,
            pageIndex:1,
            clickType:false
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
    },
    methods:{
        handleDelete(index, row,event) { //  删除某一种产品
            let that = this;
            console.log(row);
            this.$confirm('确定删除 "'+ row.brand +'的'+row.name+'" 吗?', '提示', 
                {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'})
            .then(() => {
                that.$message({
                    type: 'success',
                    message: '删除成功!',
                    duration:800,
                    onClose:that.$http.post('/api/product/info/update',
                        [{id:row.id,isActive:0}]
                    ).then(res => {
                        console.log(res.data.msg);
                        that.getDate();
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
            let getDate = this.getDate();
            this.$root.$emit('showWindow',{type:this.clickType,rowData:row});
        },
        getDate(pageIndex) {
            this.listLoading =  true;
            let url = '/api/product/info/find?page='+pageIndex+'&pageSize=10';
            this.$http({
                url: url,
                method: 'POST',
                // 请求体重发送的数据
                headers: { 'Content-Type': 'application/json' },
                data:{isActive:1},
            })
            .then(response => {
                this.listLoading =  false;
                this.datalist=(response.data.info.list);
                // console.log(this.datalist)
                this.$root.$emit('pages',response.data.info.pages)
                this.$root.$emit('total',response.data.info.total)
          })
          .catch(error=>{
              console.log(error);
              alert('网络错误，不能访问');
          })
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
