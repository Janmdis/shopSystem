<template>
    <el-table
    class='packagetable'
    :data="datalist"
    @selection-change='showextra'
    @cell-click='showMemberInfo'
    :default-sort = "{prop: 'date', order: 'descending'}"
    v-loading="this.listLoading"
    :stripe='true'
    height='100%'
    style="width: 100%;height:100%">
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
        label="图片"
        width='120'
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
        prop="productId"
        width='120'
        label="商品组">
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
        label="参加活动">
            <template slot-scope="scope">
                <span>{{scope.row.priceRule==1?'无':scope.row.priceRule==2?"优惠价":"现价"}}</span>
            </template>
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
        prop="createTime"
        label="发布时间"
        sortable>
    </el-table-column>
    <el-table-column 
        fixed="right"
        width='180'
        prop="address"
        label="操作">
        <template slot-scope="scope" >
            <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button type="text" size="small" @click="handleSale(scope.$index, scope.row)">{{scope.row.isOnSale==0?'上架':scope.row.isOnSale==1?"下架":''}}</el-button>
        </template>
    </el-table-column>
                
            </el-table>
</template>
<script>
/ eslint-disable /
//@row-click="showMemberInfo()"
import { mapState } from 'vuex'
export default {
    prop:['listLoading'],
    data(){
        return {
            datalist:[],
            // imglist:[],
            showLeft:0,
            pageIndex:1
        }
    },
    created:function(){
        // this.getimg();
        this.$root.$on('pageIndex',(data) => {
            this.pageIndex = data.value
            this.getDate(this.pageIndex)
        })
        this.getDate(1);
        this.$root.$on('getDatezdy',(data)=>{
             this.getDate(data)
        })
        this.$root.$on('dataListBox',(data)=>{
            this.datalist = data
        })
        this.$root.$on("search",(data)=>{
            this.getDate(1,data);
        });
        this.$root.$on("operate",(datas)=>{
            let data=datas.data;
            let type=datas.type;
            let ids=[];
            data.forEach(item=>{
                ids.push(item.id)
            });
            if(type=='delete'){
                this.deletepackage(ids);
            }
            else{
                this.changestate(ids,type=='onsale'?1:0);
            }
        });
        this.$root.$emit('reloadpackagelist',()=>{
            this.getDate(1);
        });
        
    },
    methods:{
        getDate(pageIndex,name) {
            console.log(111,this.imglist);
            this.listLoading =  true;
            let url = '/api/product/commodity/info/query?page='+pageIndex+'&pageSize=10';
            this.$http({
                url: url,
                method: 'POST',
                // 请求体重发送的数据
                headers: { 'Content-Type': 'application/json' },
                data:{isPackage:1,name:name}
            })
            .then(response => {
                // console.log(this.imglist);
                this.listLoading =  false;
                this.datalist=response.data.info.list;
                this.datalist.forEach(item=>{
                    let imgurl='';
                    console.log(item.createTime);
                    item.createTime=item.createTime.substring(0,10);
                    this.imglist.forEach(img=>{
                        if(img.commodityId==item.id&&imgurl==''){
                            imgurl='http://'+window.location.host+'/api/sms'+img.url;;
                        }
                    })
                    this.$set(item,'imgurl',imgurl);
                });
                // console.log(this.datalist)
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
        // 改变套餐状态
        changestate(ids,state){
            let that=this;
            let url1='';
            ids.forEach(item=>{
                url1=url1+'&id[]='+item;
            });
            this.$http.post('/api/product/commodity/info/bulkSetSaleStatus?saleStatus='+state+url1)
            .then(function(response){
                if(response.data.msg=='修改成功'){
                    that.$message.success(state==0?'下架成功！':'上架成功！');
                    that.getDate(1);
                }
                else{
                    that.$message(response.data.msg);
                }
                console.log(response);
            })
            .catch(function(response){
                console.log(response);
            });
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
        handleEdit(index,row){
            this.$root.$emit('editpackage',{id:row.id});
        },
        handleDelete(index,row){
            this.deletepackage([row.id]);
        },
        handleSale(index,row){
            let state=row.isOnSale==0?1:0;
            this.changestate([row.id],state);
            // this.$root.$emit('showWindow',{flag:'edit',id:row.id});  
        },
        deletepackage(ids){
            let that=this;
            this.$confirm('是否删除图片？','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            })
            .then(()=>{
                this.$http.post('/api/product/commodity/info/remove',ids)
                .then(function(response){
                    if(response.data.msg=="删除成功"){
                        that.$message.success('删除成功');
                        that.getDate(1);
                    }
                    else{
                        that.$message(response.data.msg);
                    }
                })
                .catch(function(response){
                    that.$message('删除失败！');
                });
            })
            .catch(()=>{
                this.$message({
                    type:'info',
                    message:'已取消删除'
                });
            });
        }
    },
    computed: {
        ...mapState({
            imglist: state => state.imglistcommodity.imglistcommodity
        })
    },
    beforeDestroy(){
        this.$root.$off('pageIndex');
        this.$root.$off('getDatezdy');
        this.$root.$off('dataListBox');
        this.$root.$off('search');
        this.$root.$off('operate');
        this.$root.$off('reloadpackagelist');
    }

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
.packagetable tr td:nth-child(4){
    padding:0;
}
.packagetable tr td:nth-child(4) .cell{
    width:80%;
    height:55px;
    margin:0 auto;
    /* padding:0; */
    background-color:#ebeef5;
}
.packagetable tr td:nth-child(4) .cell img{
    width:100%;
    height:55px;
}
</style>
