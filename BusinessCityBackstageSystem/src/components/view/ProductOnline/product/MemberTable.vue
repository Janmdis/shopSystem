
<template>
    <el-table
    id="product-table0"
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
        <!-- <el-table-column class='borderRight' fixed prop="id" label="ID" width='360' height='100'>
        </el-table-column> -->
        <el-table-column
        class="img-row"
        prop='productImage'
        label="图片"
        fixed
        width='120'
        >
        <template slot-scope="scope">
                <img :src="scope.row.imgurl" alt="">
            </template>
        </el-table-column>
        <el-table-column
        prop="name"
        width='150'
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
        prop="classificationName"
        label="分类">
        </el-table-column>
        <el-table-column
        prop="typeName"
        label="类型">
        </el-table-column>
        <el-table-column
        prop="brand"
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
<style lang="less">
#product-table0{
    .el-table__row{
        td:nth-child(3){
            border:none !important;
            img{
                width: 100%;
                height: 55px;
            }
        }
    }
}
</style>
<script>

export default {
    prop:['listLoading'],
    data(){
        return {
            dialogVisible:false,
            datalist:[],
            showLeft:0,
            pageIndex:1,
            clickType:false,
            data:{
                name:null,
                classificationId:null,
                typeId:null,
                brandId:null,
                inventoryQuantity:null,
                isActive:1
            }
        }
    },
    created:function(){
        this.$root.$on('pageIndex',(data) => {
            this.pageIndex = data.value
            this.getDate(this.pageIndex,{isActive:1})
        })
        this.getDate(1,{isActive:1})
        this.$root.$on('getDatezdy',(data)=>{
             this.getDate( data)
        })
        this.$root.$on('search',(datas)=>{
            let data={
                name:datas.product.name===''?null:datas.product.name,
                classificationId:datas.product.classificationId===''?null:datas.product.classificationId,
                typeId:datas.product.typeId===''?null:datas.product.typeId,
                brandId:datas.product.brandId===''?null:datas.product.brandId,
                inventoryQuantity:datas.product.inventoryQuantity===''?null:datas.product.inventoryQuantity,
                isActive:1
            };
            
            this.getDate(1,data);
            // console.log(datas);
        });
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
                        that.getDate(1,{isActive:1});
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
            let getDate = this.getDate(1,{isActive:1});
            this.$root.$emit('showWindow',{type:this.clickType,rowData:row});
        },
        getDate(pageIndex,data) {
            this.listLoading =  true;
            let url = '/api/product/info/find?page='+pageIndex+'&pageSize=10';
            this.$http({
                url: url,
                method: 'POST',
                // 请求体重发送的数据
                headers: { 'Content-Type': 'application/json' },
                data:data,
            })
            .then(response => {
                this.listLoading =  false;
                this.datalist = response.data.info.list
                console.log(this.datalist)
                this.datalist.forEach(item=>{
                    let imgurl = item.productImage   
                    if(imgurl == '' || imgurl == null){
                        imgurl == ''
                    }else{
                        imgurl='http://'+window.location.host+'/api'+imgurl.split(";")[0]
                    }
                    this.$set(item,'imgurl',imgurl)
                })
                this.$root.$emit('pages',response.data.info.pages)
                this.$root.$emit('total',response.data.info.total)
          })
          .catch(error=>{
              console.log(error);
              //         alert('网络错误，不能访问');
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
    },
    beforeDestroy(){
        this.$root.$off('search');
    }

}
</script>
