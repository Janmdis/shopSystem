<template>
    <el-dialog :title="ruleForm.textInfo" :visible.sync="dialogVisible" width="50%" class='memberdialog'>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span='12'>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="手机号" prop="mode">
                        <el-input v-model="ruleForm.mode"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='12'>
                    <el-form-item label="出生日期" prop='date1'>
                        <el-date-picker v-on:blur="changeCount"  type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="年龄" prop='old'>
                        <el-input v-model="ruleForm.old" disabled = disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='12'>
                    <el-form-item label="来源" prop='county'>
                        <el-select placeholder="请选择来源" @click.native='sourceFn' v-model="ruleForm.county">
                            <el-option v-for=' (item,index) in this.ruleForm.sourceFns ' :key="index" :label='item.name' :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="客户类型" prop='ctypes'>
                        <el-select v-model="ruleForm.ctypes" @click.native='showData' placeholder="请选择客户类型">
                            <el-option v-for=' (item,index) in this.ruleForm.curDate ' :key="index" :label='item.name' :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="身份" prop='panper'>
                        <el-select v-model="ruleForm.panper" placeholder="请选择身份">
                            <el-option label="男主人" value="0"></el-option>
                            <el-option label="女主人" value="1"></el-option>
                            <el-option label="父亲" value="2"></el-option>
                            <el-option label="母亲" value="3"></el-option>
                            <el-option label="女儿" value="4"></el-option>
                            <el-option label="女婿" value="5"></el-option>
                            <el-option label="儿子" value="6"></el-option>
                            <el-option label="儿媳" value="7"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="标签">
                        <el-select v-model="ruleForm.tages" placeholder="请选择级别类型" @change='changes'>
                            <el-option v-for=' (item,index) in dynamicTags' :key="index" :label='item.name' :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :offset="1" style='padding-bottom:10px;'>
                    <el-tag :key="tag.name" v-for="(tag,index) in Tagbox" :style="{background: tag.color}" style='color:#fff;margin-right:10px;margin-bottom:10px; ' closable :disable-transitions="false" @close="handleCloses(index)">
                        {{tag.name}}
                    </el-tag>
                    <!--<el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue"  ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">新增标签</el-button>!-->
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button  @click="resetForm('ruleForm')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
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
    .memberdialog .el-dialog{
        height:60%;
    }
</style>
<script>
import qs from 'qs'
    export default {
        data() {
            var checkAge = (rule, value, callback) => {
                if (value==='') {
                    return callback(new Error('年龄不能为空'))
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'))
                    } else {
                        if (value < 6) {
                            callback(new Error('必须年满6岁'))
                        } else {
                            callback()
                        }
                    }
                }, 1000)
            }
            return {
                dialogVisible: false,
                dynamicTags: [],
                Tagbox:[],
                TagboxId:[],
                ruleForm: {
                    mode: '',
                     tages: '',
                    name: "",
                    date1: '',
                    old: '',
                    county: '',
                    ctypes: '',
                    panper: '',
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
                    old: [{
                        validator: checkAge,
                        trigger: 'blur',
                        required: true
                    }],
                    ctypes: [{
                        required: true,
                        message: '选择客户类型',
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
                                    level: this.ruleForm.ctypes,
                                    identity: this.ruleForm.panper,
                                    customerAccountLabels:this.TagboxId
                                }]
                            })
                            .then(response => {
                                if(response.data.status == 300){
                                    this.$message(response.data.msg);
                                    // alert(response.data.msg)
                                    return false
                                }
                                this.Tagbox = [];
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
                        let panperSF = ''
                        if( this.ruleForm.panper == '男主人'){
                                panperSF = 0
                            }else  if( this.ruleForm.panper == "女主人"){
                                 panperSF = 1
                            }else  if( this.ruleForm.panper == "父亲"){
                                 panperSF = 2
                            }else  if( this.ruleForm.panper == "母亲"){
                                 panperSF = 3
                            }else  if( this.ruleForm.panper == "女儿"){
                                 panperSF = 4
                            }else  if( this.ruleForm.panper == "女婿"){
                                 panperSF = 5
                            }else  if( this.ruleForm.panper == "儿子"){
                                 panperSF = 6
                            }else  if( this.ruleForm.panper == "儿媳"){
                                 panperSF = 7
                            }
                            let newId =[]
                        for (let i = 0; i < this.Tagbox.length; i++) {
                            newId.push({
                                accountId: this.ruleForm.thisId,
                                labelId: this.Tagbox[i].id
                            })
                        }
                                
                          
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
                                    level: this.ruleForm.ctypes,
                                    identity: panperSF,
                                    customerAccountLabels:newId
                                }
                            })
                            .then(response => {
                                this.dialogVisible = false;
                                this.$root.$emit('getDatezdy',1);
                                this.Tagbox = [];
                                
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
            handleCloses(index) {
                 let list = [];
                for (let i = 0; i < this.Tagbox.length; i++) {
                    if (index != i) {
                        list.push(this.Tagbox[i]);
                        this.$message({
                            type: 'success',
                            message: '删除成功！'
                        });
                    }
                }
                this.Tagbox = list;
            },
            searchLabel() {
                let url = '/api/customer/label/query/label';
                this.$http({
                        url: url,
                        method: 'post',
                        data: {}
                    })
                    .then(respone => {
                        console.log(respone)
                        for (let i = 0; i < respone.data.info.length; i++) {
                            this.dynamicTags.push({
                                name: respone.data.info[i].name,
                                color: respone.data.info[i].color,
                                id: respone.data.info[i].id
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
            changes(value) {
                let obj = {};
                let newObj = {};
                obj = this.dynamicTags.find((item) => {
                    if (item.id === value) {
                        if (value !== "" || value !== null) {
                            newObj = {
                                labelId: item.id,
                                accountId: this.ruleForm.thisId
                            }
                            this.TagboxId.push(newObj)
                        }
                    }
                    return item.id === value;
                });
                this.Tagbox.push(obj);
                //过滤重复项
                var hash = {};
                this.Tagbox = this.Tagbox.reduce(function(item, next) {
                    hash[next.name] ? '' : hash[next.name] = true && item.push(next);
                    return item
                }, [])
                //过滤id
                var hashId = {};
                this.TagboxId = this.TagboxId.reduce(function(item, next) {
                    hashId[next.labelId] ? '' : hashId[next.labelId] = true && item.push(next);
                    return item
                }, []);
            },
            resetForm() {
                this.$refs['ruleForm'].resetFields();
                this.Tagbox = [];
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
                        //console.log(this.ruleForm.sourceFns)

                        
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
                            let infos = respone.data.info[0];
                             let panperSF = '';
                            if(infos.identity!=null){
                                 if(infos.identity == 0){
                                panperSF = "男主人"
                            }else  if(infos.identity == 1){
                                 panperSF = "女主人"
                            }else  if(infos.identity == 2){
                                 panperSF = "父亲"
                            }else  if(infos.identity == 3){
                                 panperSF = "母亲"
                            }else  if(infos.identity == 4){
                                 panperSF = "女儿"
                            }else  if(infos.identity == 5){
                                 panperSF = "女婿"
                            }else  if(infos.identity == 6){
                                 panperSF = "儿子"
                            }else  if(infos.identity == 7){
                                 panperSF = "儿媳"
                            }
                            }
                           
                           
                                
                            this.ruleForm.thisId=  infos.id
                            this.ruleForm.mode= infos.mobile,
                            this.ruleForm.name= infos.name,
                            this.ruleForm.date1= infos.birthDate,
                            this.ruleForm.old= infos.age,
                            this.ruleForm.county= infos.recommendedSourceId,
                            this.ruleForm.ctypes= infos.level,
                            this.ruleForm.panper= panperSF
                            // this.ruleForm.sourceFns = respone.data.info;
                            // console.log(this.ruleForm.sourceFns)
                        })
                        .catch(error => {
                            console.log(error);
                            alert('网络错误，不能访问');
                        })
                        let urls = '/api/customer/customerAndLabel/findLabel?id='+[data[0].id];
                        this.$http({
                            url: urls,
                            method: 'get',
                            //headers: { 'Content-Type': ' application/x-www-form-urlencoded' },
                            //data:[data[0].id]
                        })
                        .then(respone => {
                            this.Tagbox=[];
                            for (let i = 0; i < respone.data.info.length; i++) {
                                this.Tagbox.push(respone.data.info[i]);
                            this.dynamicTags.push({
                                name: respone.data.info[i].name,
                                color: respone.data.info[i].color,
                                id: respone.data.info[i].id
                            })
                        }
                        
                        
                        
                        console.log(this.Tagbox)
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
            this.searchLabel();
        },
         beforeDestroy(){
            this.$root.$off('showWindow');
        }
    }
</script>