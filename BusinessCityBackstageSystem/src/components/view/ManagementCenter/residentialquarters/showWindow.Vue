<template>
    <el-dialog :title="ruleForm.textInfo" :visible.sync="dialogVisible" width="30%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span='24'>
                    <el-form-item label="小区名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='24'>
                    <el-form-item label="别名" prop="mode">
                        <el-input v-model="ruleForm.mode"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='24'>
                    <el-form-item label="地址" prop='date1'>
                        <el-input v-model="ruleForm.mode"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<style>
    .imgBox {
        width: 100px;
        height: 100px;
        border: 1px solid #ddd;
    }
    .lineBline {
        border-bottom: 1px solid #ddd;
    }
</style>
<script>
import qs from 'qs'
    export default {
        data() {
            return {
                dialogVisible: false,
                ruleForm: {
                    mode: '',
                    name: "",
                    date1: '',
                    textInfo: '新增会员',
                    thisId:''
                },
                rules: {
                    name: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }, ],
                    mode: [{
                        pattern: /^1[3|4|5|7|8][0-9]{9}$/g,
                        required: true,
                        message: '请输入正确的手机号',
                         trigger: 'blur'
                    }, ],
                    date1: [{
                        required: true,
                        message: '请选择日期',
                        trigger: 'change'
                    }],

                }
            };
        },
        methods: {
            submitForm(formName) {
                let that = this;
                if(this.ruleForm.textInfo == "新增会员"){
                that.$refs[formName].validate((valid) => {
                   var d = new Date(this.ruleForm.date1);  
                    var youWant=d.getFullYear() + '-' + this. getzf((d.getMonth() + 1)) + '-' + this. getzf(d.getDate()); 
                    if (valid) {
                        let url = '/api/customer/account/insert';
                        this.$http({
                                url: url,
                                method: 'POST',
                                // 请求体重发送的数据
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data:[{
                                    name: this.ruleForm.name,
                                    mobile: this.ruleForm.mode,
                                    birthDate: date1,
                                }]
                            })
                            .then(response => {
                                this.dialogVisible = false;
                                this.$root.$emit('getDatezdy',1)
                            })
                            .catch(error => {
                                console.log(error);
                                alert('网络错误，不能访问');
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                }
                if(this.ruleForm.textInfo == "编辑会员"){
                that.$refs[formName].validate((valid) => {
                   var d = new Date(this.ruleForm.date1);  
                    var youWant=d.getFullYear() + '-' + this. getzf((d.getMonth() + 1)) + '-' + this. getzf(d.getDate()); 
                    if (valid) {
                        let url = '/api/customer/account/update';
                        this.$http({
                                url: url,
                                method: 'POST',
                                // 请求体重发送的数据
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data: {
                                    id:this.ruleForm.thisId,
                                    name: this.ruleForm.name,
                                    mobile: this.ruleForm.mode,
                                    birthDate: date1
                                }
                            })
                            .then(response => {
                                this.dialogVisible = false;
                                this.$root.$emit('getDatezdy',1)
                            })
                            .catch(error => {
                                console.log(error);
                                alert('网络错误，不能访问');
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }


        },
        created: function() {
            this.$root.$on('showWindowss', (data) => {
                console.log(data)
                if (data != 'no') {
                    console.log(data[0].id)
                    this.ruleForm.textInfo = '编辑会员';
                    let url = '/api/customer/account/queryMapByIds'/*'+[data[0].id]*/;
                    this.$http({
                            url: url,
                            method: 'post',
                            //headers: { 'Content-Type': ' application/x-www-form-urlencoded' },
                            data:[data[0].id]
                        })
                        .then(respone => {
                            
                            let infos = respone.data.info[0]
                            this.ruleForm.thisId=  infos.id
                            this.ruleForm.mode= infos.mobile,
                            this.ruleForm.name= infos.name,
                            this.ruleForm.date1= infos.birthDate,
                            this.ruleForm.old= infos.age,
                            this.ruleForm.county= 1,
                            this.ruleForm.ctypes= 2,
                            this.ruleForm.panper= 1
                            // this.ruleForm.sourceFns = respone.data.info;
                            // console.log(this.ruleForm.sourceFns)
                        })
                        .catch(error => {
                            console.log(error);
                            alert('网络错误，不能访问');
                        })
                        this.dialogVisible = true;
                }else{
                    this.ruleForm.textInfo = '新增会员';
                    this.dialogVisible = true;
                     this.ruleForm.mode= "",
                    this.ruleForm.name= "",
                    this.ruleForm.date1= "",
                    this.ruleForm.old= "",
                    this.ruleForm.county= "",
                    this.ruleForm.ctypes= "",
                    this.ruleForm.panper= ''
                }
                
            });
             
        }
    }
</script>