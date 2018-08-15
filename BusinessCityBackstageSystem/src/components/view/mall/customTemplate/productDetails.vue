<template>
      <el-dialog
        title="商品详情"
        :visible.sync="dialogVisible"
        width="60%"
        id="activeDialogZbD"
        >
            <el-row style='padding-bottom:10px;' :gutter='24'>
                <el-col :span="4">
                    <el-select v-model="productType" placeholder="类型" class='typeselect' @change='changeProductType'>
                        <el-option label="商品" value="1"></el-option>
                        <el-option label="套餐" value="2"></el-option>
                    </el-select>
                </el-col>
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
                <el-col :span="6">
                    <div class='typeselect'>
                        <el-input
                            placeholder="输入相关标题"
                            v-model="name"
                            >
                        </el-input>
                    </div>
                </el-col>
                <el-col :span='3'>
                    <el-button size="mini" class='createservice' @click="nameSelect">搜索</el-button>
                </el-col>
            </el-row>
            <el-table 
                :data="listgoods" 
                ref='goodtable' 
                style="width: 100%;overflow-y: scroll;"  
                class='table-product' 
                @select="selectChange"
                v-loading='loading'>
                    <el-table-column
                    fixed
                    type="selection" 
                    width="55">
                    </el-table-column>
                    <el-table-column   label="图片"  >
                        <template slot-scope="scope">
                            <img :src="scope.row.productImage" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column  prop="name" label="标题"  >
                    </el-table-column>
                    <el-table-column
                    prop="displayQuantity"
                    label="库存" 
                    sortable
                    >
                    </el-table-column>
                     <el-table-column
                    prop="totalSales"
                    label="销量"
                    sortable>
                    </el-table-column>
                    <el-table-column
                    prop="originalPrice"
                    label="价格(/元)"
                    sortable>
                    </el-table-column>
                    <el-table-column
                    label="状态">
                        <template slot-scope="scope">
                            <span :class="scope.row.isOnSale==0?'nosale':'onsale'">{{scope.row.isOnSale==0?'下架':scope.row.isOnSale==1?"上架":''}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pages"
                layout="prev, pager, next, jumper"
                :total="total"
                style="text-align: right;
                position: absolute;
                bottom: 2%;
                right: 2%;
                top: 88%;">
                </el-pagination>
                <div class="zbd-selectedTip" v-show="selectedDiv">已选择：<span :style="tipcolor">{{ selectedTitle }}</span></div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" :disabled="disabled" @click="saveUrl">确 定</el-button>
            </span>
        </el-dialog>
</template>
<script>
  export default {
       data() {
        return {
            dialogVisible: false,
            productType:'',
            name:'',
            disabled:false,
            selectedDiv:false,
            tipcolor:{
                color:""
            },
            selectedTitle:'',
            currentPage:1,
            total:1,
            pages:1,
            type:'',
            typeid:'',
            listtype:[],
            listgoods:[],
            loading:true,
            input:'',
            indexs:'',
            dataid:'',
            typess:''
        };
    },
    methods: {
        changeProductType(){
            //console.log(this.productType)
             if(this.productType == 1){
                 this.getType(this.productType)
             }else if(this.productType == 2){
                 this.getType(this.productType)
             }
        },
        getType(productType){
            if(productType == 1){
                //商品分类查询
                let that=this;
                let datas = {
                    type:productType,
                    pageindex:1,
                    namess:this.name
                }
                this.$http.post('/api/product/commodity/category/queryMap',{})
                .then(function (response) {
                    let data=response.data;
                    if(data.msg=='查询成功'){
                        that.listtype=data.info;
                        that.type=that.listtype[0]?that.listtype[0].name:'';
                        that.typeid=that.listtype[0]?that.listtype[0].id:'';
                        that.getDatalist(datas);
                    }
                    else{
                        that.$message(data.msg);
                    }
                //    console.log(response);
                })
                .catch(function(response){
                    that.$message(response);
                })
            }else if(productType == 2){
                //套餐分类查询
                let that=this;
                let datas = {
                    type:productType,
                    pageindex:1,
                    namess:this.name
                }
                this.$http.post('/api/product/commodity/category/queryMap',{})
                .then(function (response) {
                    let data=response.data;
                    if(data.msg=='查询成功'){
                        that.listtype=data.info;
                        that.type=that.listtype[0]?that.listtype[0].name:'';
                        that.typeid=that.listtype[0]?that.listtype[0].id:'';
                        that.getDatalist(datas);
                    }
                    else{
                        that.$message(data.msg);
                    }
                //    console.log(response);
                })
                .catch(function(response){
                    that.$message(response);
                })
            }
        },
       getDatalist(data){
                let that=this;
                let pageindexs = data.pageindex;
                let types = data.type;
                let isPackages;
                if(types == 1){
                    isPackages = false
                }else if(types == 2){
                    isPackages = true
                }
                let names = data.namess
                this.loading=true;
                this.$http.post('/api/product/commodity/info/query?page='+pageindexs+'&pageSize=10',
                                {categoryId:that.typeid,isPackage:isPackages,name:names}
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
                    that.$message(response);
                    that.loading=false;
                });
            },
            changetype(value){
                this.typeid=value;
                let datas = {
                    type:this.productType,
                    pageindex:1,
                    namess:this.name
                }
                this.getDatalist(datas);
            },
            handleCurrentChange(currentPage){
                let datas = {
                    type:this.productType,
                    pageindex:currentPage,
                    namess:this.name
                }
                this.getDatalist(datas);
            },
            selectChange(val){
                console.log(val)
                if(val.length > 1){
                    this.disabled = true;
                    this.selectedDiv = true;
                    this.selectedTitle = '请选择一个商品';
                    this.tipcolor.color = "#ff3b30";
                }else if(val.length == 1){
                    this.disabled = false;
                    this.selectedDiv = true
                    this.selectedTitle = val[0].name
                    this.input = val[0].id
                    this.tipcolor.color = "#50c380";
                }else{
                    this.selectedDiv = false
                }
            },
            nameSelect(){
                let datas = {
                    type:this.productType,
                    pageindex:1,
                    namess:this.name
                }
                this.getDatalist(datas);
            },
            saveUrl(){
                if(this.input == ''){
                    this.$message({
                        type: 'info',
                        message: '请选择一个商品'
                    });
                    return false
                }else{
                    let dataids = this.dataid;
                    let index = this.indexs;
                    let inputs = 'http://daojia.jingrunjia.com.cn/detailTemplate?commodityId='+this.input;
                    let type = this.typess;
                    // alert(dataids)
                    // alert(index)
                    // alert(inputs)
                    // alert(type)
                    this.$store.commit('saveUrlSPXQ',{dataids,index,inputs,type});//对应组件的标识
                    this.$message({
                            type: 'info',
                            message: '添加成功'
                        });
                    this.dialogVisible = false;
                }
          }
    },
    created:function(){
            this.$root.$on('opendialogProduct',(status) =>{
                this.dialogVisible = status
                this.productType = ''
                this.listtype = []
                this.name = ''
                this.type = '';
                this.typeid = '';
                 let datas = {
                        type:'',
                        pageindex:1,
                        namess:''
                    }
                     this.getDatalist(datas);
            });
            this.$root.$on('customizeData',(data) =>{
                this.input = "";
                this.indexs = data.indexs
                this.dataid = data.dataids
                this.typess = data.types
                // console.log(this.dataid)
                // console.log(this.indexs)
                // console.log(this.typess)
               if(this.typess == "imageAds"){
                  // console.log(this.indexs)
                   this.input = this.$store.state.adImageList.comlist[this.dataid].componentsData.ImgArr[this.indexs].url;
               }else if(this.typess == "commodity"){
                   if(this.indexs == 1){
                       this.input = this.$store.state.adImageList.comlist[this.dataid].componentsData.productImgURL1
                    }else if(this.indexs == 2){
                        this.input = this.$store.state.adImageList.comlist[this.dataid].componentsData.productImgURL2
                    }else if(this.indexs == 3){
                        this.input = this.$store.state.adImageList.comlist[this.dataid].componentsData.productImgURL3
                    }
               }
            });
            
      },
        beforeDestroy(){
            this.$root.$off('opendialogProduct');
        }
  }
</script>
<style>

#activeDialogZbD .el-dialog__footer{
    padding-top:50px;
}
</style>
<style scoped lang="less">
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

    .el-dialog__wrapper{
        width:100%;
        height:100%;
    }
    .commoditydialog .el-dialog{
        height:80%;
        padding-bottom:0px;
    }
    .commoditydialog .el-dialog__body{
        height:75%;
        padding-top:10px;
    }
    .commoditydialog .createservice{
        width:100%;
        background-color:#27a1f2;
        /* border:none; */
        /* outline:none; */
        color:#fff;
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
    .zbd-selectedTip{
        position: absolute;
        top: 13%;
        right: 2%;
        width: 285px;
        height: 26px;
        text-align: right;
        overflow: hidden;
    }
</style>
