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
            <template slot-scope="scope">
                <img :src="scope.row.imgurl" alt="">
            </template>
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
        width='200'
        prop="address"
        label="推荐商品"
        >
            <template slot-scope="scope">
                <div class='recommendlist'>
                    <p v-for="(item,index) in scope.row.recommendcom" :key='index'>{{item}}</p>
                </div>
                
                <el-button type="text" size="small" @click="Editcommond(scope.row)">修改</el-button>
            </template>
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
            pageIndex:1,
            data:{
                categoryId:null,
                isOnSale:null,
                maxPrice:null,
                minPrice:null,
                name:null,
                isPackage:0
            }
        }
    },
    created:function(){
        this.getDate(1,{isPackage:0});
        this.$root.$on('pageIndex',(data) => {
            this.pageIndex = data.value
            this.getDate(this.pageIndex,{isPackage:0})
        })
        this.$root.$on('getDatezdy',(data)=>{
             this.getDate( data)
        })
        this.$root.$on('dataListBox',(data)=>{
            this.datalist = data
        })
        this.$root.$on('search',(datas)=>{
            // let data={
            //     categoryId:datas.commodity.categoryId===''?null:datas.commodity.categoryId,
            //     isOnSale:datas.commodity.isOnSale===''?null:datas.commodity.isOnSale,
            //     maxPrice:datas.commodity.maxPrice===''?null:datas.commodity.maxPrice,
            //     minPrice:datas.commodity.minPrice===''?null:datas.commodity.minPrice,
            //     name:datas.commodity.name===''?null:datas.commodity.name
            // } ;
            this.data.categoryId=datas.commodity.categoryId===''?null:datas.commodity.categoryId;
            this.data.isOnSale=datas.commodity.isOnSale===''?null:datas.commodity.isOnSale;
            this.data.maxPrice=datas.commodity.maxPrice===''?null:datas.commodity.maxPrice;
            this.data.minPrice=datas.commodity.minPrice===''?null:datas.commodity.minPrice;
            this.data.name=datas.commodity.name===''?null:datas.commodity.name;
            this.getDate(1);
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
        this.$root.$on('reloadlist',()=>{
            this.getDate(1,{isPackage:0});
        });
    },
    computed: {
        ...mapState({
            imglist: state => state.imglistcommodity.imglistcommodity
        })
    },
    methods:{
        getDate(pageIndex) {
            this.listLoading =  true;
            let url = '/api/product/commodity/info/fluzzQuery?page='+pageIndex+'&pageSize=10';
            this.$http({
                url: url,
                method: 'POST',
                // 请求体重发送的数据
                headers: { 'Content-Type': 'application/json' },
                data:this.data,
            })
            .then(response => {
                if(response.data.msg=='查询成功'){
                    this.datalist=(response.data.info.list);
                    let result=Promise.resolve();
                    let fun=this.getRecommendcommodity;
                    this.datalist.forEach(item=>{
                        let imgurl='';
                        this.imglist.forEach(img=>{
                            if(img.commodityId==item.id&&imgurl==''){
                                imgurl='http://'+window.location.host+'/api/sms'+img.url;;
                            }
                        })
                        this.$set(item,'imgurl',imgurl);
                        result=result.then(()=>{
                            fun(item.id).then((data)=>{
                                this.$set(item,'recommendcom',data);
                            })
                        })
                    });
                    console.log(this.datalist);
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
        // 获取推荐商品
        getRecommendcommodity(commodityid){
            return new Promise((resolve, reject)=>{
                let that=this;
                this.$http.post('/api/product/commodity/relationship/queryLinkedCommodityListByCommodityId?commodityId='+commodityid)
                .then(function(response){
                    if(response.data.msg=='查询成功'){
                        let list=[];
                        response.data.info.forEach(item=>{
                            list.push(item.name);
                        });
                        resolve(list);                    
                    }
                    else{
                        resolve([]);
                    }
                })
                .catch(function(response){
                    console.log(response);
                    resolve([]);
                })
            })
        },
        // 修改推荐商品
        Editcommond(row){
            this.$root.$emit('editrecommend',row);
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
            this.$confirm('是否删除数据？','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                let that=this;
                this.$http.post('/api/product/commodity/info/remove',ids)
                .then(function(response){
                    if(response.data.msg=='删除成功'){
                        that.$message.success('删除成功！');
                        that.getDate(1,{isPackage:0});
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
                    that.getDate(1,{isPackage:0});
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
        this.$root.$off('search');
        this.$root.$off('dataListBox');
        this.$root.$off('operate');
        this.$root.$off('reloadlist');
    },

}
</script>
<style scoped>
.nosale{
    color:#ff3b30;
}
.onsale{
    color:#50c380;
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
    padding:0;
    background-color:#ebeef5;
}
.commodity tr td:nth-child(3) .cell img{
    width:100%;
    height:50px;
}
.commodity .recommendlist{
    /* height:50px; */
    overflow-x:auto;
    position: relative;
    top:10px;
}
.commodity .recommendlist+button{
    position: relative;
    top:10px;
}
.commodity .recommendlist p{
    /* width:max-content; */
}
</style>