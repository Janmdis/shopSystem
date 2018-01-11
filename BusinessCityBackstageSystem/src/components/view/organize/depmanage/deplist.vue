<template>
    <div class="grid-content">
        <div class="rolHeader">
            部门列表
            <div class="pull-right">
                <span class="addRole" data-toggle="modal" data-target="#productModal" type="button" @click="opendialogDep">添加</span>
                <span class="clearBorder" data-toggle="modal" data-target="#delModal" v-show="deleteshow">删除</span>
            </div>
        </div>
        <div class="tree ">
            <Datalist :list='list'></Datalist>
        </div>
        <el-dialog title="新增产品" :visible="dialogDepVisible" :modal='true' :before-close="ai_dialog_close"> 
            <el-row>
                 <el-col :span="3" :offset='3'>
                     <div class="grid-content labelName">
                         部门名称
                     </div>
                 </el-col>
                 <el-col :span="16">
                     <div class="grid-content input">
                         <input type="text" placeholder="请输入部门名称">
                     </div>
                 </el-col>
            </el-row>
            <el-row>
                 <el-col :span="3" :offset='3'>
                     <div class="grid-content labelName">
                         部门编号
                     </div>
                 </el-col>
                 <el-col :span="16">
                     <div class="grid-content input">
                         <input type="text" placeholder="请输入部门编号">
                     </div>
                 </el-col>
            </el-row>
            <el-row>
                 <el-col :span="3" :offset='3'>
                     <div class="grid-content labelName">
                         部门描述
                     </div>
                 </el-col>
                 <el-col :span="16">
                     <div class="grid-content input">
                         <textarea class="tearteacher" name="" id="" cols="30" rows="10"></textarea>
                         <span class="pull-right infoText">不超过50个字</span>
                     </div>
                 </el-col>
            </el-row>
             <el-row>
                 <el-col :span="3" :offset='3'>
                     <div class="grid-content labelName">
                         所属部门
                     </div>
                 </el-col>
                 <el-col :span="16">
                     <div class="grid-content valueName">
                         你猜
                     </div>
                 </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer" :center='true'>
                <el-button type="primary" round  :loading="addLoading" @click="adddata">新增</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import Datalist from '../depmanage/datalist'
/* eslint-disable */
export default {
    components:{Datalist},
    data(){
        return {
            list:[
                {
                    id:85,
                    name:'烛之萤火',
                    childlist:[
                        {
                            id:105,
                            name:'张俊俊',
                            childlist:[
                                {
                                    id:107,
                                    name:'111',
                                    childlist:[
                                        {
                                            id:108,
                                            name:'11',
                                            childlist:[]
                                        }
                                    ]
                                    
                                }
                            ]
                        },
                        {
                            id:106,
                            name:'测试',
                            childlist:[]
                        }
                    ]
                }
            ],
            deleteshow:true,
            dialogDepVisible:false,     //模态框是否显示
            addLoading: false,
        }
    },
    created:function(){
        this.$root.$on("haschild",(haschild)=>{
            this.deleteshow=haschild;
        });
    },
    methods:{
        opendialogDep(){
            this.dialogDepVisible=true;
            var closei=document.getElementsByClassName('el-dialog')[0].getElementsByClassName('el-dialog__close')[0];
            console.log(closei);
            closei.setAttribute('class','el-dialog__close');
            closei.innerHTML='X';
        },
        adddata(){
            this.dialogDepVisible=false;
        },
        ai_dialog_close(){
            this.dialogDepVisible = false;
        },
    }
    
   
}
</script>
<style scoped>
.grid-content{
    height:80%;
	border:1px solid #00adab;
	border-radius:5px;
    background:#fff;
}
.rolHeader{
	height:90px;
	color:#8b8b8b;
	line-height:90px;
	padding-left:10%;
}
.pull-right span{
	padding:0 10px;
	cursor:pointer;
}
.pull-right span:nth-child(1){
	color:#03aeac;
}
.pull-right span:nth-child(2){
	color:#e56838;
}
.pull-right{
    padding-right:40px;
    float: right;
}
.el-dialog .el-row{
    margin-bottom: 15px;
}
.el-dialog .grid-content{
    border:none;
}
.el-dialog .grid-content.labelName,
.el-dialog .grid-content.valueName{
    font-size: 14px;
    padding-top: 5px;
    padding-right: 0;
}
.el-dialog .grid-content.valueName{
    padding-left: 15px;
}
.el-dialog .grid-content input{
    width: 80%;
    height: 20px;
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 3px;
    border:1px solid #ccc;
}
.el-dialog .grid-content.input{
    padding-left: 15px;
}
.el-dialog .grid-content textarea{
    border:1px solid #c7c7c7;
	width:80%;
	height:100px;
	border-radius:5px;
	resize:none;
	padding:5px 10px;
}
.el-dialog .grid-content .infoText{
    color:#00adab;
}

</style>
<style>
/* 模态框 */
.el-dialog{
    width:40%;
}
.el-dialog__header{
    background:#109997;
    padding:20px 32px;
}
.el-dialog__title,.el-dialog__headerbtn .el-dialog__close{
    color:white;
}
.el-dialog__headerbtn{
    width: 29px;
	height: 29px;
	background: #fff;
	border-radius: 50%;
	line-height: 20px;
	opacity: 1;
	color: #dd460a;
	font-size: 22px;
}
.el-dialog__body{
    padding-bottom:0px;
}
.el-dialog__close{
    font-size:16px;
    color:#dd460a !important;
    font-style:normal;
}
.el-dialog__footer .el-button{
    width:140px;
    font-size:14px;
    background:#00adab;
    margin:0 auto;
    display: block;
}
</style>

