<template>
    <el-dialog   width='60%' top='40px'  :title="iscreate?'添加员工':'编辑员工'" :visible="dialogmemberVisible" :modal='true' :before-close="ai_dialog_close"> 
        <el-form @submit.native.prevent :model='dataform' status-icon ref="memberForm" :rules="rules"  label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span="10" :offset='2'>
                    <el-form-item label="用户名称：" prop="adminName">
                        <el-input placeholder="请输入登录名称" v-model="dataform.adminName" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col  :span="10">
                    <el-form-item label="性别：" prop="adminSex">
                        <el-radio v-model="dataform.adminSex" :label="0">男</el-radio>
                        <el-radio v-model="dataform.adminSex" :label="1">女</el-radio>
                    </el-form-item>
                    
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :offset='2'>
                    <el-form-item label="登录密码：" prop="adminPassword">
                        <el-input placeholder="请输入登录密码" v-model="dataform.adminPassword" auto-complete="off"></el-input>
                    </el-form-item>
                 </el-col>
                <el-col  :span="10">
                     <el-form-item label="确认密码：" prop="confirmPassword">
                        <el-input placeholder="请再次输入登录密码" v-model="dataform.confirmPassword"  auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :offset='2'>
                    <el-form-item label="年龄：" prop="adminAge">
                        <el-input v-model='age' :disabled="true" type='number' min="0" placeholder="请输入年龄" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="员工类型：">
                        <el-select v-model="dataform.employeeTypeId"  placeholder="请选择" @change='selectemploytype'>
                            <el-option
                            v-for="item in employeetypelist"
                            :key="item.id"
                            :value-key="item.id"
                            :label="item.employeeTypeName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :offset='2'>
                    <el-form-item label="出生日期：" prop="adminBirthday">
                        <el-col>
                            <el-date-picker
                            v-model="dataform.adminBirthday"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col  :span="10">
                    <el-form-item label="入职日期：" prop="entryDate">
                        <el-col>
                            <el-date-picker
                            v-model="dataform.entryDate"
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
                    <el-form-item label="手机号码：" prop="phone">
                        <el-input placeholder="请输入手机号码" type='number' min="0" v-model="dataform.phone" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col  :span="10">
                    <el-form-item label="是否被锁定：" prop="accStatus">
                        <el-radio v-model="dataform.accStatus" label="0">锁定</el-radio>
                        <el-radio v-model="dataform.accStatus" label="1">未锁定</el-radio>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :offset='2'>
                    <el-form-item label="所属部门："  prop='departmentId'>
                        <el-select v-model="dataform.departmentId"  placeholder="请选择" @change='selectdep'>
                            <el-option
                            v-for="item in deplist"
                            :key="item.id"
                            :value-key="item.id"
                            :label="item.departmentName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col  :span="10">
                    <el-form-item label="所属角色：" prop='groupId'>
                        <el-select v-model="dataform.groupId"  placeholder="请选择" @change='selectrole'>
                            <el-option
                            v-for="item in rolelist"
                            :key="item.id"
                            :value-key="item.id"
                            :label="item.groupName"
                            :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer" :center='true'>
            <el-button type="primary" round   @click="datahandle" v-if="iscreate">新增</el-button>
            <el-button type="primary" round   @click="datahandle" v-if="!iscreate">确认</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data(){
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            }
                else if (value !== this.dataform.adminPassword) {
                callback(new Error('两次输入密码不一致!'));
            }
                else {
                callback();
            }
        };
        return{
            dialogmemberVisible:false,
            id:'',
            iscreate:true,
            dataform:{
                adminName:'',
                adminPassword:'',
                confirmPassword:'',
                adminSex: 0,
                adminAge:'',
                adminBirthday:'',
                entryDate:'',
                phone:'',
                accStatus:'1',
                departmentId:'',
                departmentName:'',
                groupId:'',
                groupName:'',
                employeeTypeId:'',
                employeeTypeName:''
            },
            // deplist:[],
            rolelist:[],
            employeetypelist:[],
            rules:{
                adminName:[
                    {required:true,message:'请输入用户名',trigger:'blur'}
                ],
                adminPassword:[
                    {required:true,message:'请输入密码',trigger:'blur'}
                ],
                confirmPassword:[
                    {required:true,message:'请再次输入密码',trigger:'blur'},
                    {validator:validatePass,trigger:'blur'}
                ],
                adminBirthday:[
                    {required:true,message:'请选择日期',trigger:'blur'}
                ],
                entryDate:[
                    {required:true,message:'请选择日期',trigger:'blur'}
                ],
                phone:[
                    {pattern: /^1[3|4|5|7|8][0-9]{9}$/g,required:true,message:'请输入正确的手机号码',trigger:'blur'}
                ],
                departmentId:[
                    {required:true,message:'请选择部门',trigger:'change'}
                ],
                groupId:[
                    {required:true,message:'请选择角色',trigger:'change'},
                ]
            },
            pickerOptions:{
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            }
        }
    },
    created:function(){
        this.$root.$on('opendialogemploy',(data)=>{
            this.getemployeetype();
            this.iscreate=data.iscreate;
            if(!data.iscreate){
                let data_current=data.data;
                this.id=data_current.id;
                let datas=data.data;
                let data_join=new Date(datas.entryDate);
                let data_born=new Date(datas.adminBirthday);
                datas.entryDate=data_join;
                datas.adminBirthday=data_born;
                datas.adminSex=datas.adminSex?1:0;
                this.getrolelist(datas.departmentId);
                console.log(datas);
                this.dataform=data.data;
            }
            
            this.dialogmemberVisible=true;
        });
    },
    methods:{
        selectdep(value){
            let obj = {};
            obj = this.deplist.find((item)=>{
                return item.id === value;
            });
            this.dataform.departmentName=obj.departmentName;
            this.getrolelist(obj.id);
        },
        selectrole(value){
            let obj = {};
            obj = this.rolelist.find((item)=>{
                return item.id === value;
            });
            this.dataform.groupName=obj.groupName;
        },
        selectemploytype(value){
            let obj = {};
            obj = this.employeetypelist.find((item)=>{
                return item.id === value;
            });
            this.dataform.employeeTypeName=obj.employeeTypeName;
        },
        // 获取角色列表
        getrolelist(depid){
            let that=this;
            this.$http.post('/api/admin/manage/group/find?pageSize=0',{
                departmentId :depid,
                isActive:true
            })
            .then(function (response) {
                let data=response.data;
                if(data.msg=="查询成功"){
                    that.rolelist=data.info.list;
                }
                // console.log(response);
            })
            .catch(function (response) {
                console.log(response);
            });
        },
        // 获取员工类型列表
        getemployeetype(){
            let that=this;
            this.$http.get('/api/admin/employeetype/queryList',{})
            .then(function (response) {
                let data=response.data;
                if(response.status==200){
                    that.employeetypelist=data.info;
                }
                // console.log(response);
            })
            .catch(function (response) {
                console.log(response);
            });
        },
        ai_dialog_close(){
            this.dialogmemberVisible=false;
            this.$refs['memberForm'].resetFields();
            // this.dataform={
            //     adminName:'',
            //     adminPassword:'',
            //     confirmPassword:'',
            //     adminSex: 0,
            //     adminAge:'',
            //     adminBirthday:'',
            //     entryDate:'',
            //     phone:'',
            //     accStatus:'1',
            //     departmentId:'',
            //     departmentName:'',
            //     groupId:'',
            //     groupName:'',
            //     employeeTypeId:'',
            //     employeeTypeName:''
            // }
        },
        datahandle(){
            let that=this;
            this.dataform.adminAge=this.age;
            this.dataform.adminSex=this.dataform.adminSex=='0'?false:true;
            console.log(this.dataform);
             this.$refs.memberForm.validate((valid)=>{
                 if(valid){
                     if(this.iscreate){
                        this.$http.post('/api/admin/account/insert',this.dataform)
                        .then(function(response){
                            if(response.status==200){
                                that.$message({
                                    type:'success',
                                    message:'添加成功!'
                                });
                                that.$root.$emit('getemploy');
                                that.dialogmemberVisible=false;
                            }
                            console.log(response);
                        })
                        .catch(function(response){
                            that.$message({
                                type:'info',
                                message:'添加失败!'
                            });
                            console.log(response);
                        });
                    }
                    else{
                        let data=this.dataform;
                        data.id=this.id;
                        console.log(data);
                        this.$http.post('/api/admin/account/update',this.dataform)
                        .then(function(response){
                            if(response.status==200){
                                that.$message({
                                    type:'success',
                                    message:'编辑成功!'
                                });
                                that.$root.$emit('getemploy');
                                that.dialogmemberVisible=false;
                            }
                            console.log(response);
                        })
                        .catch(function(response){
                            that.$message({
                                type:'info',
                                message:'编辑失败!'
                            });
                            console.log(response);
                        });
                    }
                 }
             })
            
        }
    },
     computed: {
        ...mapState({
            deplist: state => state.deplist.deplistall
        }),
        age:function(){
            let datecurrent=new Date();
            let dateborn=this.dataform.adminBirthday;
            if(dateborn==''){
                return 0;
            }
            else{
                let yearc=datecurrent.getFullYear();
                let yearb=dateborn.getFullYear();
                let monthc=datecurrent.getMonth();
                let monthb=dateborn.getMonth();
                let dayc=datecurrent.getDate();
                let dayb=dateborn.getDate();
                let age=yearc-yearb;
                if(   monthc<monthb||(monthc==monthb&&dayc<dayb)   ){
                    age--;
                }
                return age;
            }
        }
    },
    beforeDestroy(){
        this.$root.$off('opendialogemploy');
    }
}
</script>

<style>
/* 模态框 */

.el-dialog__header{
        border-bottom: 4px solid #409eff;
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
    background:#27a1f2;
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
.el-input__suffix{
    right: 15px;
}
.el-dialog .grid-content.input{
    padding-left: 15px;
}
.el-dialog .grid-content .infoText{
    color:#27a1f2;
    display: block;
    text-align: right;
    padding-right: 12%;
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