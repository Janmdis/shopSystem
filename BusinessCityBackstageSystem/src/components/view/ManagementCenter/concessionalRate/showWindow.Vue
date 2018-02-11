<template>
    <el-dialog class='headerBottom' :title="ruleForm.textInfo" :visible.sync="dialogVisible" width="80%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span='6'>
                   <el-form-item label="开始时间">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='6'>
                    <el-form-item label="结束时间">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='6'>
                     <el-form-item label="金额">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='6'>
                    <el-form-item label="状态">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="账户最多领">
                        <el-input v-model="ruleForm.name" style='width: 80%;'></el-input>
                        个
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
            <el-col :span='6'>
                 <el-form-item label="活动区域">
                    <el-select v-model="ruleForm.name"  placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
             </el-col>
             <el-col :span='6' class='smallBox'>
                    <el-form-item label="满">
                        <el-input v-model="ruleForm.name" style='width: 70%;' ></el-input> 使用
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class='minheight' v-show='false'>
            <el-col :span='6'>
                 <el-form-item label="活动区域">
                    <el-select v-model="ruleForm.name"  placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-col :span='20' style='margin-left:40px;'>
                <ul class='ulDel' style='border-radius: 5px;'>
                    <li>分类 <span>删除</span></li>
                    <li>分类 <span>删除</span></li>
                    <li>分类 <span>删除</span></li>  
                    <li>分类 <span>删除</span></li>  
                </ul>
               </el-col> 
             </el-col>
              <el-col :span='1' class='hiehlIn'><lable>多选</lable></el-col>
               <el-col :span='6'>
                 <el-form-item label="活动区域">
                    <el-select v-model="ruleForm.name"  placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-col :span='20' style='margin-left:40px;'>
                <ul class='ulDel' style='border-radius: 5px;'>
                    <li>分类 <span>删除</span></li>
                    <li>分类 <span>删除</span></li>
                    <li>分类 <span>删除</span></li>  
                    <li>分类 <span>删除</span></li>  
                </ul>
               </el-col> 
             </el-col>
               <el-col :span='1' class='hiehlIn'><lable>多选</lable></el-col>
               <el-col :span='6'>
                 <el-form-item label="活动区域">
                    <el-select v-model="ruleForm.name"   placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-col :span='20' style='margin-left:40px;'>
                <ul class='ulDel' style='border-radius: 5px;'>
                    <li>分类 <span>删除</span></li>
                    <li>分类 <span>删除</span></li>
                    <li>分类 <span>删除</span></li>  
                    <li>分类 <span>删除</span></li>  
                </ul>
               </el-col> 
             </el-col>
              <el-col :span='1' class='hiehlIn'><lable >多选</lable></el-col>
            </el-row>
           <el-row class='clearM'>
             <el-form-item >
             <el-col :span='5'>
                <el-checkbox-group v-model="ruleForm.types">
                <el-checkbox label="美食/餐厅线上活动" name="types"></el-checkbox>
                <el-checkbox label="地推活动" name="types"></el-checkbox>
                <el-checkbox label="线下主题活动" name="types"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="types"></el-checkbox>
                </el-checkbox-group>
                </el-col>
            </el-form-item>
           </el-row>
            <el-form-item>
                <el-button class='mTop' type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<style>
.clearM .el-checkbox+.el-checkbox{
    margin-left: 0px;
}
.ulDel{
    padding:10px 20px;
    border:1px solid #ddd;
}
.ulDel span{
    float:right;
}
.minheight .hiehlIn{
    line-height:40px;
    text-align: center;
}
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
    .smallBox .el-form-item__content{
        margin-left: 50px !important ;
    }
    .smallBox .el-form-item__label{
        width:50px !important ;
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
                    textInfo: '新增优惠劵',
                    thisId:'',
                    types:[]
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