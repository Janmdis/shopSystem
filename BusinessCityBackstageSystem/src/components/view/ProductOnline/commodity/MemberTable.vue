<template>
    <el-table
    :data="datalist"
    @selection-change='showextra'
    :default-sort = "{prop: 'date', order: 'descending'}"
    v-loading="this.listLoading"
    :stripe='true'
    class='commodity'
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
        <el-table-column
        prop="imgurl"
        label="图片"
        width='120'
        fixed
        >
        </el-table-column>
        <el-table-column
        prop="name"
        width='120'
        label="标题">
        </el-table-column>
        <el-table-column
        width='120'
        prop="displayQuantity"
        label="库存" 
        sortable
        >
        </el-table-column>
        <el-table-column
        width='120'
        prop="brand"
        label="分类(品牌)"
        >
        </el-table-column>
        <el-table-column
        width='120'
        prop="totalSales"
        label="销量"
        sortable>
        </el-table-column>
        <el-table-column
        width='120'
        prop="originalPrice"
        label="价格(/元)"
        sortable>
        </el-table-column>
        <el-table-column
        width='120'
        prop="source"
        label="参加活动">
        </el-table-column>
        <el-table-column
        width='100'
        label="状态">
            <template slot-scope="scope">
                <span :class="scope.row.isOnSale==0?'nosale':'onsale'">{{scope.row.isOnSale==0?'下架':scope.row.isOnSale==1?"上架":''}}</span>
            </template>
        </el-table-column>
        <el-table-column
        width='120'
        prop="address"
        label="推荐商品"
        >
    </el-table-column>
    <el-table-column
        width='180'
        prop="address"
        label="操作"
        fixed='right'>
        <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button type="text" size="small" @click="handleChangesale(scope.$index, scope.row)">{{scope.row.isOnSale==0?'上架':scope.row.isOnSale==1?"下架":''}}</el-button>
        </template>
        
    </el-table-column>
                
            </el-table>
</template>
<script>
/ eslint-disable /
import { mapState } from 'vuex'
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
        this.getDate(1);
        this.$root.$on('pageIndex',(data) => {
            this.pageIndex = data.value
            this.getDate(this.pageIndex)
        })
        this.$root.$on('getDatezdy',(data)=>{
             this.getDate( data)
        })
        this.$root.$on('dataListBox',(data)=>{
            this.datalist = data
        })
        this.$root.$on('searchcommodity',(name)=>{
            this.getDate(1,name);
        });
        this.$root.$on('operate',(datas)=>{
            let list=datas.data;
            let type=datas.type;
            let ids=[];
            list.forEach(item=>{
                ids.push(item.id);
            });
            // 批量删除
            if(type=='delete'){
                this.deletecommodity(ids);
            }
            // 批量改变商品状态
            else{
                this.changesale(ids,type=='onsale'?1:0);
            }
        });
    },
    computed: {
        ...mapState({
            imglist: state => state.imglistcommodity.imglistcommodity
        })
    },
    methods:{
        getDate(pageIndex,name) {
            this.listLoading =  true;
            let url = '/api/product/commodity/info/query?page='+pageIndex+'&pageSize=10';
            this.$http({
                url: url,
                method: 'POST',
                // 请求体重发送的数据
                headers: { 'Content-Type': 'application/json' },
                data:{isPackage:0,name:name},
            })
            .then(response => {
                if(response.data.msg=='查询成功'){
                    this.datalist=(response.data.info.list);
                    this.datalist.forEach(item=>{
                        let imgurl='';
                        this.imglist.forEach(img=>{
                            if(img.commodityId==item.id&&imgurl==''){
                                imgurl='http://'+window.location.host+'/api/sms'+img.url;;
                            }
                        })
                        this.$set(item,'imgurl',imgurl);
                    });
                    this.$root.$emit('pages',response.data.info.pages)
                    this.$root.$emit('total',response.data.info.total)
                    this.listLoading =  false;
                }
                else{
                    this.$message(response.data.msg);
                    this.listLoading =  false;
                }
                
          })
          .catch(error=>{
              console.log(error);
              alert('网络错误，不能访问');
          })
        },
        // 编辑商品
        handleEdit(index,row){
            this.$root.$emit('editcommodity',{id:row.id});
        }, 
        // 删除商品   
        handleDelete(index,row){
            this.deletecommodity([row.id]);
        },
        // 上架、下架
        handleChangesale(index,row){
            let status=row.isOnSale?0:1;
            this.changesale([row.id],status);
        },
        deletecommodity(ids){
            this.$confirm('是否删除图片？','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                let that=this;
                this.$http.post('/api/product/commodity/info/remove',ids)
                .then(function(response){
                    if(response.data.msg=='删除成功'){
                        that.$message.success('删除成功！');
                        that.getDate(1);
                    }
                    else{
                        that.$message(response.data.msg);
                    }
                })
                .catch(function(response){
                    that.$message('操作失败！');
                })
            })
            .catch(()=>{
                this.$message({
                    type:'info',
                    message:'已取消删除'
                });
            });
        },
        changesale(ids,status){
            let that=this;
            let url1='';
            ids.forEach(item=>{
                url1=url1+'&id[]='+item
            });
            console.log(ids);
            this.$http.post('/api/product/commodity/info/bulkSetSaleStatus?saleStatus='+status+url1)
            .then(function(response){
                if(response.data.msg=='修改成功'){
                    that.$message.success(status?'上架成功！':'下架成功！');
                    that.getDate(1);
                }
                else{
                    that.$message('操作失败！');
                }
                console.log(response);
            })
            .catch(function(response){
                console.log(response);
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
        this.$root.$off('pageIndex');
        this.$root.$off('getDatezdy');
        this.$root.$off('dataListBox');
        this.$root.$off('operate');
    },

}
</script>
<style scoped>
.nosale{
    color:red;
}
.onsale{
    color:#00aeaa;
}
</style>
<style>
.commodity tr td:nth-child(3){
    padding:0;
}
.commodity tr td:nth-child(3) .cell{
    width:80%;
    height:50px;
    margin:0 auto;
    /* padding:0; */
    background-color:#ebeef5;
}
.commodity tr td:nth-child(3) .cell img{
    width:100%;
    height:50px;
}
</style>