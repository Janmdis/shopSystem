<template>
    <el-dialog title='产品列表'  :visible.sync="dialogVisible"  width="60%">
        <el-row style='padding-bottom:10px;'>
            <el-col :span="4">
                <el-select v-model="type" placeholder="分类" class='typeselect' @change='changetype'>
                    <el-option
                    v-for="item in listtype"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-table 
        :data="listgoods" 
        ref='goodtable' 
        style="width: 100%;height:90%;" 
        height='100%' 
        class='table-product' 
        @selection-change="handleSelectionChange"
        v-loading='loading'>
            <el-table-column
            type="index"
            label="N"
            >
            </el-table-column>
            <el-table-column   label="图片"  >
                <template slot-scope="scope">
                    <img :src="scope.row.productImage" alt="">
                </template>
            </el-table-column>
            <el-table-column  prop="name" label="名称"  >
            </el-table-column>
            <el-table-column  prop="specificationName" label="规格"  >
            </el-table-column>
            <el-table-column  prop="unitName" label="单位"  >
            </el-table-column>
            <el-table-column  prop="brand" label="品牌"  >
            </el-table-column>
            <el-table-column
                width='180'
                prop="address"
                label="操作"
                fixed='right'>
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click='selectproduct(scope.row)'>选择</el-button>
                </template>
                
            </el-table-column>
        </el-table>
        <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pages"
        layout="prev, pager, next, jumper"
        :total="total">
        </el-pagination>
    </el-dialog>
</template>
<style scoped>
    .imgBox {
        width: 100px;
        height: 100px;
        border: 1px solid #ddd;
    }
    .lineBline {
        border-bottom: 1px solid #ddd;
    }
    .el-table{
        border-top: 6px solid #56d2f4;
    }
    .el-pagination{
        /* margin-top: 0px; */
        text-align: right;
        position:absolute;
        bottom:2%;
        right:2%;
    }
    .table-product img{
        width:70px;
        height:40px;
        /* border: 1px solid; */
    }
    
</style>
<style>
    .typeselect .el-input__inner{
        height: 30px;
    }
     table td:nth-child(3) .cell{
        border:none !important;
    }
    .el-dialog__wrapper{
        width:100%;
        height:100%;
    }
    .el-dialog{
        height:80%;
        padding-bottom:0px;
    }
    .el-dialog__body{
        height:80%;
        padding-top:10px;
    }
    .table-product tr td:nth-child(2){
        padding:0;
        text-align:center;
    }
    .table-product tr td:nth-child(2) .cell{
        width:70px;
        height:40px;
        margin:0 auto;
        padding:0;
        line-height:10px;
        background-color:#ebeef5;
    }
</style>

<script>
    export default {
        data() {
            return {
                // id:'',
                dialogVisible: false,
                currentPage:1,
                total:1,
                pages:1,
                type:'',
                typeid:'',
                listtype:[],
                listgoods:[],
                selectedgoods:[],
                loading:true,
            };
        },
        methods: {
            getDatalist(pageindex){
                let that=this;
                this.loading=true;
                this.$http.post('/api/product/info/find?pageNo='+pageindex+'&pageSize=10',
                                {classificationId:that.typeid,isActive:1}
                )
                .then(function (response) {
                    if(response.data.msg=='查询成功'){
                        let data=response.data.info;
                        that.listgoods=data.list; 
                        that.listgoods.forEach(item=>{
                            item.productImage='http://'+window.location.host+'/api/sms'+item.productImage;
                        });
                        console.log(data);
                    }
                    else{
                        that.$message(response.data.msg);
                    }
                    that.loading=false;
                })
                .catch(function(response){
                    that.$message('请求出错！');
                    that.loading=false;
                });
            },
            getType(){
                let that=this;
                this.$http.post('/api/product/sort/find?pageNo=1&pageSize=0',)
                .then(function (response) {
                    let data=response.data;
                    if(data.msg=='查询成功'){
                        that.listtype=data.info.list;
                        that.type=that.listtype[0]?that.listtype[0].name:'';
                        that.typeid=that.listtype[0]?that.listtype[0].id:'';
                        that.getDatalist(1);
                    }
                    else{
                        that.$message(data.msg);
                    }
                   console.log(response);
                })
                .catch(function(response){
                    that.$message('请求出错！');
                })
            },
            changetype(value){
                this.typeid=value;
                this.getDatalist(1);
            },
            // 添加商品
            selectproduct(row){
                let that=this;
                this.$http.post('/api/product/commodity/info/insertOne',{
                    name:row.name,
                    categoryId:1,
                    originalPrice:0,
                    discountPrice:0,
                    currentPrice:0,
                    priceRule:1,
                    detailTemplateId:1,
                    brand:row.brand
                })
                .then(function(response){
                    if(response.data.msg=='新增成功'){
                        that.$root.$emit('editcommodity',{id:response.data.info.id});
                        that.dialogVisible=false;
                    }
                    else{
                        that.$message('操作失败');
                    }
                })
                .catch(function(response){
                    console.log(response);
                })
                console.log(row);
            },
            handleCurrentChange(currentPage){
                this.getDatalist(currentPage);
            },
            handleSelectionChange(val){
                for(let i=0;i<val.length;i++){
                    let currentstr=JSON.stringify(val[i]);
                    let hasit=this.selectedgoods.includes(currentstr);
                    if(!hasit){
                        this.selectedgoods.push(currentstr);
                    }
                }
            },
        },
        created: function() {
            this.$root.$on('showWindowcommodity', (datas) => {
                this.getType();
                this.dialogVisible=true;
            });  
        },
        beforeDestroy(){
            this.$root.$off('showWindowcommodity');
        }
    }
</script>