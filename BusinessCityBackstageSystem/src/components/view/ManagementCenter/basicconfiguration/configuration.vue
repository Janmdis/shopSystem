<template>
    <el-container>
        <el-main id="basicMain" v-loading="isLoading">
            <el-row>
                <el-col :span="5" class="basic-left">
                    <h5>模块</h5>
                    <el-menu default-active="1" class="el-menu-vertical-demo basic-content">
                        <el-menu-item v-for="(info,index) in titleData" :index="info.index" :data-id="index" :key="index" @click="showContent(info.text,index)">
                            <span slot="title">{{info.text}}</span>
                            <i :class="info.icon"></i>
                        </el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="11" class="basic-middle">
                    <component :is="list_item"></component>
                </el-col>
                <el-col :span="7" class="basic-right">
                    <div >
                        <h5>配置内容</h5>
                        <el-button type="primary" class="add-btn" @click="addContent">新增</el-button>
                        <div class="basic-content">
                            <el-table
                                v-loading="loadInfo"
                                :data="tableData"
                                :border="isBorder"
                                height="640"
                                style="width: 90%">
                                <el-table-column
                                    :prop="name"
                                    :label="ruleForm.nameDes"
                                    >
                                </el-table-column>
                                <el-table-column
                                    v-if="levelShows"
                                    prop="gradeLevel"
                                    :label="ruleForm.levelDes"
                                    >
                                </el-table-column>
                                <el-table-column prop="opration" label="操作" width="120">
                                    <template slot-scope="scope">
                                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-col>
                <el-dialog
                    id="chatting-box1"
                    :title="ruleForm.title"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose">
                    <el-form 
                    id="form-box"
                    :model="ruleForm"
                    :rules="rules" ref="ruleForm" 
                    label-width="100px" 
                    class="demo-ruleForm">
                        <el-form-item :label="ruleForm.nameDes" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item v-show="levelShow" :label="ruleForm.levelDes" prop="gradeLevel">
                            <el-input v-model="ruleForm.gradeLevel"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm">保存</el-button>
                        </el-form-item>
                    </el-form>        
                </el-dialog>
            </el-row>
        </el-main>
    </el-container>
</template>
<script>
import productModel from './productmodel'
import shopModel from './shopmodel'
import memberModel from './membermodel'
import publicModel from './publicmodel'
import supplierModel from './suppliermodel'
import userModel from './usermodel'
import houseModel from './housemodel'
import channelModel from './channelmodel'
export default {
    data () {
        return{
            isLoading:true,
            isBorder:true,
            loadInfo:true,
            levelShow:false,
            levelShows:false,
            isData:[],
            dialogVisible: false,
            flag:true,
            defaultTitle:'产品模块',
            list_item:'',
            titleData:[
                {index:'1',icon:'el-icon-menu',text:'产品模块',url:'/api/product/brand/find?pageSize=0'},
                {index:'2',icon:'el-icon-document',text:'商品模块',url:'/api/product/commodity/category/queryMap'},
                {index:'3',icon:'el-icon-setting',text:'会员模块',url:'/api/product/commodity/category/queryMap'},
                {index:'4',icon:'el-icon-menu',text:'模板模块',url:'/api/product/commodity/category/queryMap'},
                {index:'5',icon:'el-icon-document',text:'供应商模块',url:'/api/product/commodity/category/queryMap'},
                {index:'6',icon:'el-icon-setting',text:'用户模块',url:'/api/product/commodity/category/queryMap'},
                {index:'7',icon:'el-icon-document',text:'房屋模块',url:'/api/product/commodity/category/queryMap'},
                {index:'8',icon:'el-icon-setting',text:'渠道模块',url:'/api/product/commodity/category/queryMap'}
            ],
            name:'brandName',
            id:'brandId',
            // gradeLevel:'十级',
            parentId:0,
            number:0,
            tableData:[],
            ruleForm:{
                id:'',title:'新增品牌',
                nameDes:'品牌名称',name:'',
                color:'',gradeLevel:'',levelDes:'账户等级',
            },
            color:["#3f86fd","#32a1ff","#28c0f8","#0ecad1","#0dd980"],
            num:0,
            rules:{
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                gradeLevel: [
                    { required: true, message: '请输入等级', trigger: 'blur' },
                ],
            },
            productData:[
                {id:'brandId',delUrl:'/api/product/brand/update',des:'品牌名称',name:'brandName',addUrl:'/api/product/brand/insert'},
                {id:'id',delUrl:'/api/product/sort/update',des:'产品分类',name:'name',addUrl:'/api/product/sort/insert'},
                {id:'unitId',delUrl:'/api/product/unit/update',des:'产品来源',name:'unitName',addUrl:'/api/product/unit/insert'},
                {id:'unitId',delUrl:'/api/product/unit/update',des:'单位名称',name:'unitName',addUrl:'/api/product/unit/insert'},
                {id:'id',delUrl:'/api/product/type/update',des:'产品类型',name:'productName',addUrl:'/api/product/type/insert'},
                {id:'specificationId',delUrl:'/api/product/specification/update',des:'规格',name:'specificationName',addUrl:'/api/product/specification/insert'},
            ],
            shopData:[
                {id:'id',delUrl:'/api/product/commodity/category/remove',des:'商品类型',name:'name',
                addUrl:'/api/product/commodity/category/insert',parentId:0}    
            ],
            memberData:[
                {id:'id',delUrl:'/api/customer/recommendedSource/remove',des:'推荐来源',name:'name',addUrl:'/api/customer/recommendedSource/insert'},
                {id:'id',delUrl:'/api/customer/customerCategory/remove',des:'客户类型',name:'name',addUrl:'/api/customer/customerCategory/insert'},
                {id:'id',delUrl:'/api/customer/identity/remove',des:'客户身份',name:'name',addUrl:'/api/customer/identity/addIdentity'},
                {id:'id',delUrl:'/api/customer/relationshipGroupCategory/remove',des:'关系组类型',name:'name',addUrl:'/api/customer/relationshipGroupCategory/insert'},
                {id:'id',delUrl:'/api/customer/label/remove',des:'会员标签',name:'name',addUrl:'/api/customer/label/insert'}       
            ],
            publicData:[
                {id:'id',delUrl:'/api/product/mall/templateCategory/remove',des:'模板分类',name:'name',addUrl:'/api/product/mall/templateCategory/insert'},
                {id:'id',delUrl:'/api/product/commodity/periodTemplate/remove',des:'服务时间',name:'name',addUrl:'/api/product/commodity/periodTemplate/insert'}     
            ],
            supplierData:[
                {id:'id',delUrl:'/api/product/label/delete',des:'供应商标签',name:'name',addUrl:'/api/product/label/insert'}, 
                {id:'id',delUrl:'/api/product/level/delete',des:'供应商等级',name:'levelName',addUrl:'/api/product/level/insert'},
                {id:'id',delUrl:'/api/product/category/delete',des:'供应商类型',name:'categoryName',addUrl:'/api/product/category/insert'}
            ],
            userData:[
                {id:'id',delUrl:'/api/product/serviceType/update',des:'服务类型',name:'serName',addUrl:'/api/product/serviceType/insert'}, 
                {id:'id',delUrl:'/api/product/type/update',des:'产品类型',name:'productName',addUrl:'/api/product/type/insert'},
                {id:'id',delUrl:'/api/admin/grade/update',des:'账户名称',name:'gradeName',addUrl:'/api/admin/grade/insert'}, 
                {id:'id',delUrl:'/api/admin/employeetype/delete',des:'员工类型',name:'employeeTypeName',addUrl:'/api/admin/employeetype/insert'}
            ],
            houseData:[
                {id:'id',delUrl:'/api/customer/housingCategory/removeGategory',des:'房屋类型',name:'name',addUrl:'/api/customer/housingCategory/insertGategory'}, 
                {id:'id',delUrl:'/api/customer/housingRentalStatus/removeStatus',des:'租住状态',name:'name',addUrl:'/api/customer/housingRentalStatus/insertStatus'}
            ],
            channelData:[
                {id:'id',delUrl:'/api/admin/teamLevel/removeTeamLevel',des:'团队级别',name:'name',addUrl:'/api/admin/teamLevel/insertTeamLevel'}, 
                {id:'id',delUrl:'/api/admin/teamType/removeTeamType',des:'团队类型',name:'name',addUrl:'/api/admin/teamType/insertTeamType'}
            ],
            desData:[],
            modelIndex:0
        }
    },
    created(){
        this.showContent('产品模块',0);
        this.$root.$on('searchInfo',(data) => {
            this.name = data[0];
            this.tableData = data[1];
            this.number = data[2];
            this.id = data[3];
            this.ruleForm.title = '新增'+data[4];
            this.ruleForm.nameDes = this.desData[this.number].des;
        });
        this.$root.$on('loadInfo',data => {
            this.loadInfo = data;
        });
    },
    methods:{
        showContent(text,index){
            this.loadInfo=true;
            this.defaultTitle = text;
            this.desData = [];
            if(text == '产品模块'){
                text = productModel;
                this.desData = this.productData;
                this.modelIndex = 0;
            }else if(text == '商品模块'){
                text = shopModel;
                this.desData = this.shopData;
                this.modelIndex = 1;
            }else if(text == '会员模块'){
                text = memberModel;
                this.desData = this.memberData;
                this.modelIndex = 2;
            }else if(text == '模板模块'){
                text = publicModel;
                this.desData = this.publicData;
                this.modelIndex = 3;   
            }else if(text == '供应商模块'){
                text = supplierModel;
                this.desData = this.supplierData;
                this.modelIndex = 4;
            }else if(text == '用户模块'){
                text = userModel;
                this.desData = this.userData;
                this.modelIndex = 5;
                this.$root.$on('showLevel',data => {
                    if(this.modelIndex == 5 && data == 2){
                        this.levelShows = true;
                    }else{
                        this.levelShows = false;
                    }
                });
            }else if(text == '房屋模块'){
                text = houseModel;
                this.desData = this.houseData;
                this.modelIndex = 6;
            }else if(text == '渠道模块'){
                text = channelModel;
                this.desData = this.channelData;
                this.modelIndex = 7;   
            }
            this.levelShows = false;
            this.list_item = text;
            setTimeout(() =>{
                this.isLoading = false;
            },500);
        },
        handleClose(done){
            this.dialogVisible = false;
            this.$refs.ruleForm.resetFields();
        },
        handleDelete(index,row) {
            let that = this;
            let modelId = this.id;
            console.log(row);
            if(this.modelIndex == 0){
                if(this.number == 0){
                    this.id = 'brandId'
                }else if(this.number == 1){
                    this.id = 'id'
                }else if(this.number == 2){
                    this.id = 'unitId'
                }else if(this.number == 3){
                    this.id = 'unitId'
                }else if(this.number == 4){
                    this.id = 'id'
                }
                var data = {isActive:0};
                data[modelId] = row[this.id];
            }else if(this.modelIndex == 1){
                var data = row.id;
            }else if(this.modelIndex == 2){
                var data = row.id;
            }else if(this.modelIndex == 3){
                var data = row.id;
            }else if(this.modelIndex == 4){
                var data = row.id;
            }else if(this.modelIndex == 5){
                if(this.number == 3){
                    var data = row.id;
                }else{
                    var data = {'id':row.id,'isActive':0};
                }
            }else if(this.modelIndex == 6){
                var data = row.id;
            }else if(this.modelIndex == 7){
                var data = row.id;
            }
            this.$confirm('确定删除 "'+ row[this.name] +'" 吗?', '提示', 
                {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'})
            .then(() => {
                this.$http.post(this.desData[this.number].delUrl,
                    [data]
                ).then(res => {
                    console.log(res.data.msg);
                    that.loadInfo = true;
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                        duration:800,
                        onClose: function(){     
                            that.$root.$emit('transFn',that.number);
                            that.$root.$emit('transFn1',that.number);
                            that.$root.$emit('transFn2',that.number);
                            that.$root.$emit('transFn3',that.number);
                            that.$root.$emit('transFn4',that.number);
                            that.$root.$emit('transFn5',that.number);
                            that.$root.$emit('transFn6',that.number);
                            that.$root.$emit('transFn7',that.number);
                        }
                    });
                }).catch(err => {console.log(err)})   
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                    duration:800
                });          
            });          
        },
        addContent(){
            this.dialogVisible = true;
            if(this.modelIndex == 2 && this.number == 4){ 
                this.ruleForm.color = this.color[this.num];
                this.num++;
                if(this.num > this.color.length - 1){
                    this.num = 0;
                }
            }
            if(this.modelIndex == 4 && this.number == 0){ 
                this.ruleForm.color = this.color[this.num];
                this.num++;
                if(this.num > this.color.length - 1){
                    this.num = 0;
                }
            }
            if(this.modelIndex == 5 && this.number == 2){
                this.levelShow = true;
            }else{
                this.levelShow = false;
            }
        },
        submitForm(){
            let that = this;
            let modelName = this.name;
            if(this.modelIndex == 0){
                var data = {};
                data[modelName] = this.ruleForm.name;
            }else if(this.modelIndex == 1){
                var data = [{parentId:0}];
                data[0][modelName] = this.ruleForm.name;   
            }else if(this.modelIndex == 2){
                if(this.number == 4){
                    var data =[{"name":this.ruleForm.name,"color":this.ruleForm.color}];
                    console.log(data);
                }else{
                    var data ={};
                    data[modelName] = this.ruleForm.name;
                }  
            }else if(this.modelIndex == 3){
                var data =[{"name":this.ruleForm.name}];
            }else if(this.modelIndex == 4){
                if(this.number == 0){
                    var data ={"name":this.ruleForm.name,"color":this.ruleForm.color};
                }else{
                    var data ={};
                    data[modelName] = this.ruleForm.name;
                }     
            }else if(this.modelIndex == 5){
                if(this.number == 2){
                    var data = {'gradeLevel':this.ruleForm.gradeLevel};
                    // console.log(data);
                    data[modelName] = this.ruleForm.name;
                }else{
                    var data = {};
                    data[modelName] = this.ruleForm.name;   
                }
            }else if(this.modelIndex == 6){
                var data =[{"name":this.ruleForm.name}];
            }else if(this.modelIndex == 7){
                var data =[{"name":this.ruleForm.name}];
            };
            if(that.ruleForm.name == ''){
                alert("内容不能为空!");
                return false;
            }
            that.tableData.forEach(function(e,i){
                that.isData.push(e[modelName]);
            });
            if(that.isData.indexOf(that.ruleForm.name) != -1){
                alert("该内容已存在,请重新输入!");
            }else{
                that.$http({
                    url:that.desData[that.number].addUrl,
                    method:'POST',
                    data:data,
                    headers:{'content-type':'application/json'}
                }).then(res => {
                    console.log(res.data.msg);
                    that.loadInfo = true;
                    that.$root.$emit('transFn',that.number);
                    that.$root.$emit('transFn1',that.number);
                    that.$root.$emit('transFn2',that.number);
                    that.$root.$emit('transFn3',that.number);
                    that.$root.$emit('transFn4',that.number);
                    that.$root.$emit('transFn5',that.number);
                    that.$root.$emit('transFn6',that.number);
                    that.$root.$emit('transFn7',that.number);
                    that.dialogVisible = false;
                    that.$refs.ruleForm.resetFields();
                }).catch(err => {console.log(err);});
            }    
        }
    },
    components:{
        productModel,
        shopModel,
        memberModel,
        publicModel,
        supplierModel,
        userModel,
        houseModel,
        channelModel
    },
    beforeDestroy(){
        this.$root.$off('searchInfo');
        this.$root.$off('loadInfo');
        this.$root.$off('showLevel');
    }
}
</script>
<style lang="less">
#basicMain{
    min-width: 1040px;
    .el-row{
        height:100%;
        .el-col.basic-left{
            min-width: 120px;
            .el-menu{
                .el-menu-item{
                    width: 99%;
                    padding-right:1%;
                    background:#fff;
                    i{
                        color:#848484;
                    }
                    span{
                        color:#848484;
                    }
                }
                .el-menu-item:hover{
                    background: #F3FBFE;
                    border-right:1px solid #409EFF;
                    i,span{
                        color:#409EFF;
                    }
                }
                .el-menu-item.is-active{
                    background: #F3FBFE;
                    border-right:1px solid #409EFF;
                    i,span{
                        color:#409EFF;
                    }
                }
            }
        }
        .el-col.basic-right{
            .el-table__body-wrapper{
                // overflow: hidden;
            }
        }
    }
    #chatting-box1{
        .el-dialog{
            padding-bottom:5px;
            width:40% !important;
            .el-dialog__header{
                    border-bottom: 4px solid #409eff;
            }
            .el-form{
                .el-form-item{
                    margin:40px 0 !important;
                    .el-form-item__label{
                        text-align: left;
                        margin-left:20% !important;
                    }
                    .el-form-item__content{
                        .el-input{
                            width:50% !important;
                        }
                        .el-form-item__error{
                            left:25% !important;
                        }
                    }
                }
                .el-form-item:last-child{
                    margin-left:20% !important;
                }
            }
            
        }
    }
}
</style>
<style scoped lang="less">
#basicMain{
    background:#F4F4F4;
    .el-col{
        background:#fff;
        border-radius:10px;
        height:90%;
        h5{
            color:#8E8E8E;
            font-size:16px;
            padding:15px 0;
            margin-left:30px;
        }
        .add-btn{
            padding:5px 15px;
            float: right;
            margin-right:20px;
            margin-top:-30px;
            border-radius:5px;
        }
        .basic-content{
            padding-top:30px;
            border-top:1px solid #f4f4f4;
        }
    }
    .el-col.basic-middle{
        min-width: 375px;
        margin: 0 1.5%;
    }
    .el-col.basic-right{
        .el-table{
            margin:auto;
            .el-button.el-button--danger{
                background:#409EFF;
                border:1px solid #409EFF;
            }
        } 
    }
}
</style>

