<template>
    <el-dialog title='商品列表'  :visible.sync="dialogVisible"  width="60%"  class='goods'>
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
        style="width: 100%;height:75%;" 
        height='100%' 
        class='table-goods' 
        @selection-change="handleSelectionChange"
        @select ='selectchange'
        v-loading='loading'>
            <el-table-column
            type="index"
            label="N"
            >
            </el-table-column>
            <el-table-column type='selection'>
            </el-table-column>
            <el-table-column   label="图片"  >
                <template slot-scope="scope">
                    <img :src="scope.row.imgurl" alt="">
                </template>
            </el-table-column>
            <el-table-column  prop="name" label="标题"  >
            </el-table-column>
            <el-table-column  prop="originalPrice" label="价格"  >
            </el-table-column>
            <el-table-column  prop="displayQuantity" label="库存"  >
            </el-table-column>
        </el-table>
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pages"
        layout="prev, pager, next, jumper"
        :total="total">
        </el-pagination>
        <div style='text-align:center;position:absolute;bottom:3%;left:0;right:0;'>
            <el-button type="primary" style="height:30px;line-height:7px;" @click="adddata">保存</el-button>
        </div>
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
        bottom:11%;
        right:2%;
    }
    .table-goods img{
        width:70px;
        height:40px;
        /* border: 1px solid; */
    }
    
</style>
<style>
    .typeselect .el-input__inner{
        height: 30px;
    }
  
    .el-dialog__wrapper{
        width:100%;
        height:100%;
    }
    .goods .el-dialog{
        height:80%;
        padding-bottom:0px;
    }
    .goods .el-dialog__body{
        height:80%;
        padding-top:10px;
    }
    .table-goods tr td:nth-child(3){
        padding:0;
        text-align:center;
    }
    .table-goods tr td:nth-child(3) .cell{
        width:70px;
        height:40px;
        margin:0 auto;
        padding:0;
        line-height:10px;
        background-color:#ebeef5;
    }
</style>

<script>
import { mapState } from 'vuex'
    export default {
        data() {
            return {
                id:'',
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
                flag:'create'
            };
        },
        updated() {
            // console.log(this.selectedgoods,this.listgoods)
            this.selectedgoods.forEach(row=>{
                this.listgoods.forEach(good=>{
                    if(JSON.stringify(good)==row){
                        this.$refs.goodtable.toggleRowSelection(good,true);
                    }
                });
            });  
        },
        methods: {
            getDatalist(pageindex){
                let that=this;
                this.loading=true;
                this.$http.post('/api/product/commodity/info/query?page='+pageindex+'&pageSize=10',
                                {categoryId:that.typeid,isPackage:0}
                )
                .then(function (response) {
                    if(response.data.msg=='查询成功'){
                        let data=response.data.info;
                        that.listgoods=data.list;
                        that.pages=data.pageSize;
                        that.total=data.total;
                        that.currentPage=data.pageNum;
                        that.listgoods.forEach(item=>{
                            let imgurl='';
                            that.imglist.forEach(img=>{
                                if(img.commodityId==item.id&&imgurl==''){
                                    imgurl='http://'+window.location.host+'/api'+img.url;;
                                }
                            })
                            that.$set(item,'imgurl',imgurl);
                        });
                    }
                    else{
                        that.$message(response.data.msg);
                    }
                    console.log(response);
                    that.loading=false;
                    
                })
                .catch(function(response){
                    that.$message('请求出错！');
                    that.loading=false;
                });
            },
            getType(){
                let that=this;
                this.$http.post('/api/product/commodity/category/queryMap',{})
                .then(function (response) {
                    let data=response.data;
                    if(data.msg=='查询成功'){
                        that.listtype=data.info;
                        that.type=that.listtype[0]?that.listtype[0].name:'';
                        that.typeid=that.listtype[0]?that.listtype[0].id:'';
                        that.getDatalist(1);
                    }
                    else{
                        that.$message(data.msg);
                    }
                //    console.log(response);
                })
                .catch(function(response){
                    that.$message('请求出错！');
                })
            },
            // 获取套餐内商品
            getgoodsinpackage(){
                let that=this;
                // console.log(this.flag=='addrecommend');
                if(this.flag=='addrecommend'){
                    this.$http.post('/api/product/commodity/relationship/queryLinkedCommodityListByCommodityId?pageSize=50&commodityId='+this.id)
                    .then(function(response){
                        if(response.data.msg=='查询成功'){
                            let list=response.data.info;
                            list.forEach(item=>{
                                let imgurl='';
                                that.imglist.forEach(img=>{
                                    if(img.commodityId==item.id&&imgurl==''){
                                        imgurl='http://'+window.location.host+'/api'+img.url;;
                                    }
                                })
                                that.$set(item,'imgurl',imgurl);
                                let str=JSON.stringify(item);
                                that.selectedgoods.push(str);
                            });
                        }
                    })
                    .catch(function(response){
                        console.log('套餐商品查询失败');
                    })
                }
                else{
                    this.$http.post('/api/product/commodity/package/queryCommodityInfoByPackageId?pageSize=50&packageId='+this.id)
                    .then(function(response){
                        if(response.data.msg=='查询成功'){
                            let list=response.data.info;
                            console.log(list);
                            list.forEach(item=>{
                                let imgurl='';
                                that.imglist.forEach(img=>{
                                    if(img.commodityId==item.id&&imgurl==''){
                                        imgurl='http://'+window.location.host+'/api'+img.url;;
                                    }
                                })
                                that.$set(item,'imgurl',imgurl);
                                let str=JSON.stringify(item);
                                // that.selectedgoods.push(str);
                            });
                            // console.log(that.selectedgoods);
                        }
                    })
                    .catch(function(response){
                        console.log('套餐商品查询失败');
                    })
                }
                
            },
            changetype(value){
                this.typeid=value;
                this.getDatalist(1);
            },
            adddata(){
                let length=this.selectedgoods.length;
                console.log(this.selectedgoods);
                if(!length){
                    this.$message('请先选择商品！');
                }
                else{
                    let list=[];
                    let recommendlist=[];
                    
                    this.selectedgoods.forEach(item=>{
                        let json={
                            commodityId:JSON.parse(item).id,
                            packageCommodityId:this.id
                        }
                        list.push(json);
                        recommendlist.push({
                            commodityId:this.id,
                            linkedCommodityId:JSON.parse(item).id
                        });
                    });
                    let that=this;
                    // 添加商品间关联
                    if(this.flag=='addrecommend'){
                        this.addgoods(recommendlist);
                        // console.log(list);
                    }
                    // 生成套餐
                    else if(this.flag=='create'){
                        this.$http.post('/api/product/commodity/info/insertOne',{
                            name:'',
                            categoryId:'1',
                            originalPrice:0,
                            discountPrice:0,
                            currentPrice:0,
                            priceRule:1,
                            isPackage:1,
                            detailTemplateId:0 
                        })
                        .then(function(response){
                            if(response.data.msg=='新增成功'){
                                that.id=response.data.info.id;
                                console.log(that.id);
                                list.forEach(item=>{
                                    item.packageCommodityId=that.id;
                                });
                                that.addgoods(list);
                            }
                            else{
                                that.$message(response.data.msg);
                            }
                            // console.log(response);
                        })
                        .catch(function(response){
                            that.$message('套餐生成失败！');
                        });  
                    }
                    // 在套餐内添加商品
                    else if(this.flag=='edit'){
                        this.addgoods(list);
                    }
                }
            },
            // 在套餐内添加商品
            addgoods(list){
                let that=this;
                console.log(list);
                if(this.flag=='create'){
                    this.$http.post('/api/product/commodity/package/insert',list)
                    .then(function(response){
                        console.log(response);
                        if(response.data.msg=='新增成功'){
                            that.$message.success('商品添加成功！');
                            // that.$root.$emit('reloadlist');
                            that.dialogVisible=false;
                            that.$root.$emit('editpackage',{list,id:response.data.info[0].packageCommodityId});
                            // that.dialogVisible=false;
                        }
                        else{
                            that.$message(response.data.msg);
                        }
                    })
                    .catch(function(response){
                        that.$message('商品添加失败！');
                    }); 
                }
                else if(this.flag=='addrecommend'){
                    this.$http.post('/api/product/commodity/relationship/insert',list)
                    .then(function(response){
                        if(response.data.msg=='新增成功'){
                            that.$message.success('推荐商品修改成功！');
                            that.$root.$emit('reloadlist');
                            that.dialogVisible=false;
                            // that.$root.$emit('editpackage',{list,id:response.data.info.id});
                            // that.dialogVisible=false;
                        }
                        else{
                            that.$message(response.data.msg);
                        }
                        // console.log(response);
                    })
                    .catch(function(response){
                        that.$message('推荐商品修改失败！');
                    }); 
                }
                else{
                    this.$http.post('/api/product/commodity/package/insert',list)
                    .then(function(response){
                        if(response.data.msg=='新增成功'){
                            that.$message.success('商品添加成功！');
                            that.$root.$emit('reloadcommidity');
                            that.dialogVisible=false;
                            // that.$root.$emit('editpackage',{list,id:response.data.info.id});
                            // that.dialogVisible=false;
                        }
                        else{
                            that.$message(response.data.msg);
                        }
                        // console.log(response);
                    })
                    .catch(function(response){
                        that.$message('商品添加失败！');
                    }); 
                }
                
            },
            handleSizeChange(){},
            handleCurrentChange(currentPage){
                this.getDatalist(currentPage);
                // console.log(currentPage);
            },
            handleSelectionChange(val){
                for(let i=0;i<val.length;i++){
                    let currentstr=JSON.stringify(val[i]);
                    let hasit=this.selectedgoods.includes(currentstr);
                    if(!hasit){
                        this.selectedgoods.push(currentstr);
                    }
                }
                // console.log(this.selectedgoods);
            },
            selectchange(selection,row){
                let str=JSON.stringify(row);
                let selected=selection.includes(row);
                if(!selected){
                    let index=this.selectedgoods.indexOf(str);
                    this.selectedgoods.splice(index,1);
                }
            }
        },
        created: function() {
            this.$root.$on('showWindow', (datas) => {
                
                this.flag=datas.flag;
                console.log(this.flag);
                this.id=datas.id;
                this.getType();
                if(datas.flag=='edit'){
                    this.getgoodsinpackage();
                }
                this.dialogVisible=true;
            });
            this.$root.$on('editrecommend',(data)=>{
                this.id=data.id;
                this.flag='addrecommend';
                this.getType();
                this.getgoodsinpackage();
                this.dialogVisible=true;
            });  
        },
        computed: {
            ...mapState({
                imglist: state => state.imglistcommodity.imglistcommodity
            })
        },
        beforeDestroy(){
            this.$root.$off('showWindow');
            this.$root.$off('editrecommend');
            
        }
    }
</script>