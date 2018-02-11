<template>
    <el-dialog class='headerBottom' :title="ruleForm.textInfo" :visible.sync="dialogVisible" width="40%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span='24'>
                    <el-form-item label="问题:" prop="name">
                        <el-input v-model="ruleForm.name" class='wNight'></el-input>
                    </el-form-item>
                    <el-form-item label="描述:">
                        <el-input type="textarea" v-model="ruleForm.desc" class='wNight'></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class='showBox'>
                
                <el-col :span='24'>
                <i class='icon iconfont icon-tianjia'></i>
                    <el-form-item label="答1:" >
                        <el-input type="textarea" v-model="ruleForm.desc" class='wNight'></el-input>
                    </el-form-item>
                    <el-form-item label="场景:">
                        <el-input v-model="ruleForm.name" class='wNight'></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button class='mTop' type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
    .wNight{
        width:90%;
    }
    .headerBottom .el-dialog__header{
        background:#fff;
        border-bottom:4px solid #409eff;
    }
    .headerBottom .el-dialog__title{
        color:#716f6f;
    }
    .headerBottom .showBox{
        padding-top:10px;
        background:#f5f3f394;
    }
    .headerBottom .mTop{
     margin-top:10px;
    }
    .icon-tianjia{
        position:absolute;
        right:1%;
        top:8%;
        font-size:32px;
        color:#3a8ee6;
        z-index:5;
        cursor: pointer;
    }
</style>
<script>
import qs from 'qs'
    export default {
        data() {
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'))
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'))
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'))
                        } else {
                            callback()
                        }
                    }
                }, 1000)
            }
            return {
                dialogVisible: false,
                ruleForm: {
                    mode: '',
                    name: "",
                    date1: '',
                    desc:'',
                    curDate: [],
                    sourceFns: [],
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
                                    birthDate: youWant,
                                    categoryId: this.ruleForm.ctypes,
                                    recommendedSourceId: this.ruleForm.county,
                                    consumptionPoints: 0,
                                    level: 0,
                                    identity: this.ruleForm.panper
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
                                    birthDate: youWant,
                                    categoryId: this.ruleForm.ctypes,
                                    recommendedSourceId: this.ruleForm.county,
                                    consumptionPoints: 0,
                                    level: 0,
                                    identity: this.ruleForm.panper
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
            },
            changeCount() {
                if (this.ruleForm.date1 == "") {
                    return false;
                }
                var d = new Date(this.getDate(this.ruleForm.date1) + '');
                this.ruleForm.old = (this.jsGetAge(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()));
            },
            getDate(str) {
                if (str == null) {
                    return
                } else {
                    var oDate = new Date(str),
                        oYear = oDate.getFullYear(),
                        oMonth = oDate.getMonth() + 1,
                        oDay = oDate.getDate(),
                        oTime = oYear + '-' + this.getzf(oMonth) + '-' + this.getzf(oDay); //最后拼接时间  
                    return oTime;
                }
            },
            //补0操作  
            getzf(num) {
                if (parseInt(num) < 10) {
                    num = '0' + num;
                }
                return num;
            },
            jsGetAge(strBirthday) {
                var returnAge
                var strBirthdayArr = strBirthday.split('-')
                var birthYear = strBirthdayArr[0]
                var birthMonth = strBirthdayArr[1]
                var birthDay = strBirthdayArr[2]
                var d = new Date()
                var nowYear = d.getFullYear()
                var nowMonth = d.getMonth() + 1
                var nowDay = d.getDate()
                if (nowYear == birthYear) {
                    returnAge = 0; // 同年 则为0岁    
                } else {
                    var ageDiff = nowYear - birthYear; // 年之差    
                    if (ageDiff > 0) {
                        if (nowMonth == birthMonth) {
                            var dayDiff = nowDay - birthDay; // 日之差    
                            if (dayDiff < 0) {
                                returnAge = ageDiff - 1
                            } else {
                                returnAge = ageDiff
                            }
                        } else {
                            var monthDiff = nowMonth - birthMonth; // 月之差    
                            if (monthDiff < 0) {
                                returnAge = ageDiff - 1
                            } else {
                                returnAge = ageDiff
                            }
                        }
                    } else {
                        returnAge = -1; // 返回-1 表示出生日期输入错误 晚于今天    
                    }
                }
                return returnAge; // 返回周岁年龄       
            },
            showData() {
                let url = '/api/customer/customerCategory/findCategory';
                this.$http({
                        url: url,
                        method: 'post',
                        data: {}
                    })
                    .then(respone => {
                        this.ruleForm.curDate = respone.data.info;
                    })
                    .catch(error => {
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
            sourceFn() {
                let url = '/api/customer/recommendedSource/findSource';
                this.$http({
                        url: url,
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: {}
                    })
                    .then(respone => {
                        this.ruleForm.sourceFns = respone.data.info;
                        console.log(this.ruleForm.sourceFns)
                        
                    })
                    .catch(error => {
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
            // getData() {
            // }
        },
        created: function() {
            this.$root.$on('showWindow', (data) => {
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
            this.sourceFn();
            this.showData();
             
        }
    }
</script>