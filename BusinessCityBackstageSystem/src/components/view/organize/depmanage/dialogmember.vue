<template>
    <el-dialog id='userdialog'  width='60%' top='40px'  title="创建用户" :visible="dialogmemberVisible" :modal='true' :before-close="ai_dialog_close"> 
        <el-form @submit.native.prevent :model='dataform' status-icon ref="ruleForm" :rules="rules"  label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span="10" :offset='2'>
                    <el-form-item label="登录名称：" prop="departmentName">
                        <el-input placeholder="请输入登录名称" v-model="dataform.adminName" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col  :span="10">
                    <el-form-item label="性别：" prop="departmentName">
                        <el-radio v-model="sex" label="1">男</el-radio>
                        <el-radio v-model="sex" label="2">女</el-radio>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :offset='2'>
                    <el-form-item label="用户名称：" prop="departmentName">
                        <el-input placeholder="请输入用户名称：" v-model="dataform.adminName" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col  :span="10">
                    <el-form-item label="年龄：" prop="departmentName">
                        <el-input v-model='age' type='number' min="0" placeholder="请输入年龄" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :offset='2'>
                    <el-form-item label="出生日期：" prop="departmentName">
                        <el-col>
                            <el-date-picker
                            v-model="databorn"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col  :span="10">
                    <el-form-item label="入职日期：" prop="departmentName">
                        <el-col>
                            <el-date-picker
                            v-model="datajoin"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :offset='2'>
                    <el-form-item label="手机号码：" prop="phonenum">
                        <el-input placeholder="请输入手机号码" type='number' min="0" v-model="dataform.phonenum" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col  :span="10">
                    <el-form-item label="电话号码：" prop="departmentName">
                        <el-input v-model='age' type='number' min="0" placeholder="请输入电话号码" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :offset='2'>
                    <el-form-item label="登录密码：" prop="departmentName">
                        <el-input placeholder="请输入登录密码" v-model="dataform.adminName" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col  :span="10">
                    <el-form-item label="用户邮箱：" prop="departmentName">
                        <el-input v-model='age' type='email' placeholder="请输入邮箱" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :offset='2'>
                    <el-form-item label="所属部门：" prop="departmentName">
                        你猜
                    </el-form-item>
                </el-col>
                <el-col  :span="10">
                    <el-form-item label="是否被锁定：" prop="departmentName">
                        <el-radio v-model="islock" label="3">锁定</el-radio>
                        <el-radio v-model="islock" label="4">未锁定</el-radio>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :offset='2'>
                    <el-form-item label="工作状态：" prop="departmentName">
                        <el-radio v-model="status" label="5">试用</el-radio>
                        <el-radio v-model="status" label="6">上岗</el-radio>
                        <el-radio v-model="status" label="7">离职</el-radio>
                    </el-form-item>
                </el-col>
                <el-col  :span="10">
                    <el-form-item label="可查看范围：" prop="departmentName">
                        <el-input v-model='age' @click.native="associashow"  placeholder="请输入关联角色" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col  :span="10" :offset='2'>
                    <el-form-item label="所属角色：" prop="departmentName">
                        你猜
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer" :center='true'>
            <el-button type="primary" round   @click="adddata">新增</el-button>
        </div>
        <Dialogassociated :datalist='list'></Dialogassociated>
    </el-dialog>
</template>
<script>
import Dialogassociated from './dialogassociated'
export default {
    components:{Dialogassociated},
    data(){
        return{
            dialogmemberVisible:false,
            dataform:{
                adminName:'',
                sex: '1',
                nameuser:'',
                age:'',
                databorn:'',
                datajoin:'',
                phonenum:'',
                callnum:'',
                psw:'',
                email:'',
                belongdep:'',
                islock:'3',
                status:'5',
                idrange:'',
                namerange:'',
                belongrole:''
            },
            rules:{
            },
            pickerOptions:{
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            list:[
                {
                    id:'1',
                    name:'test1'
                },
                {
                    id:'2',
                    name:'test2'
                },
                {
                    id:'3',
                    name:'test3'
                },
                {
                    id:'4',
                    name:'test4'
                },
                {
                    id:'1',
                    name:'test1'
                },
                {
                    id:'2',
                    name:'test2'
                },
                {
                    id:'3',
                    name:'test3'
                },
                {
                    id:'4',
                    name:'test4'
                }
            ]
        }
    },
    created:function(){
        this.$root.$on('opendialogmember',(status)=>{
            this.dialogmemberVisible=status;
        });
        this.$root.$on('getrolerange',(data)=>{
            this.idrange=data.idlist;
            this.namerange=data.rolelist.join(',');
        });
    },
    methods:{
        ai_dialog_close(){
            this.dialogmemberVisible=false;
        },
        adddata(){
            this.dialogmemberVisible=false;
        },
        associashow(){
            this.$root.$emit("associashow",true);
        }
    }
}
</script>

<style>
/* 模态框 */

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
.el-dialog__footer{
    border-top:1px solid #f1f1f1;
    width: 80%;
    margin: 0 auto;
}
.el-dialog__footer .el-button{
    width:140px;
    font-size:14px;
    background:#00adab;
    margin:0 auto;
    display: block;
}
.el-dialog .el-col{
    line-height: 35px;
}
.el-dialog .grid-content{
    border:none;
}
.el-dialog .grid-content .f-r{
    text-align:right;
}
/* .el-dialog .grid-content.labelName,
.el-dialog .grid-content.valueName{
    font-size: 14px;
    padding-top: 5px;
    padding-right: 0;
} */
/* .el-dialog .grid-content.valueName{
    padding-left: 15px;
} */
.el-dialog  input{
    width: 95%;
    height: 32px;
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 3px;
    border:1px solid #ccc;
}
.el-dialog .grid-content.input{
    padding-left: 15px;
}
.el-dialog .grid-content .infoText{
    color:#00adab;
    display: block;
    text-align: right;
    padding-right: 12%;
}
.el-radio__input.is-checked .el-radio__inner{
    background:#0b9c9b;
}
.el-radio__label{
    color:black !important;
}
.el-date-editor{
    width:100% !important;
}
.el-date-editor .el-input__inner{
    width:95% !important;
    height: 32px !important;
    /* text-indent:20px !important; */
}
.el-radio+.el-radio{
    margin-left:15px
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
}
</style>