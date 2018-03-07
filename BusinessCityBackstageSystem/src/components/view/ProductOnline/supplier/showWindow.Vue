<template id='windowBox'>
    <el-dialog :title="ruleForm.textInfo" :visible.sync="dialogVisible" width="50%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span='12'>
                    <el-form-item label="公司名称" prop="Cname">
                        <el-input v-model="ruleForm.Cname"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="银行名称" prop="backname">
                        <el-input v-model="ruleForm.backname"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="银行账户" prop="backaccount">
                        <el-input v-model="ruleForm.backaccount"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="联系人" prop="name">
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
                    <el-form-item label="供应商类型">
                        <el-select placeholder="请选供应商类型" v-model="ruleForm.county">
                            <el-option v-for=' (item,index) in ruleForm.sourceFns' :key="index" :label='item.createName' :value="item.companyId"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="级别类型">
                        <el-select v-model="ruleForm.ctypes" placeholder="请选择级别类型">
                            <el-option v-for=' (item,index) in ruleForm.curDate' :key="index" :label='item.categoryName' :value="item.companyId"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="账户状态">
                        <el-select v-model="ruleForm.panper" placeholder="请选择身份">
                            <el-option label="使用中" value="0"></el-option>
                            <el-option label="注销" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row >
            <el-col :offset="1" style='padding-bottom:10px;'>
                <el-tag :key="tag.name"  v-for="tag in dynamicTags"  :style="{background: tag.color }"  style='color:#fff;margin-right:10px;margin-bottom:10px;' closable :disable-transitions="false" @close="handleClose(tag)" >
                   {{tag.name}}
                </el-tag>
                <!--<el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue"  ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">新增标签</el-button>!-->
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
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
    #windowBox .el-col-12 {
        height: 60px;
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
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                color:["#3f86fd","#32a1ff","#28c0f8","#0ecad1","#0dd980"],
                ruleForm: {
                    Cname: '',
                    backname: '',
                    backaccount: '',
                    mode: '',
                    name: "",
                    ids: '',
                    old: '',
                    county: '',
                    ctypes: '',
                    panper: '',
                    curDate: [],
                    Label: '',
                    sourceFns: [],
                    textInfo: '新增会员',
                    thisId: ''
                },
                rules: {
                    backaccount: [{
                        required: true,
                        message: '请输入银行账户',
                        trigger: 'blur'
                    }, ],
                    backname: [{
                        required: true,
                        message: '请输入银行名称',
                        trigger: 'blur'
                    }, ],
                    Cname: [{
                        required: true,
                        message: '请输入公司',
                        trigger: 'blur'
                    }, ],
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
                    }, ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                let that = this;
                if (this.ruleForm.textInfo == "新增会员") {
                    that.$refs[formName].validate((valid) => {
                        if (valid) {
                            let url = '/api/product/supplierInfo/insert';
                            this.$http({
                                    url: url,
                                    method: 'POST',
                                    // 请求体重发送的数据
                                    // headers: {
                                    //     'Content-Type': 'application/json'
                                    // },
                                    data: {
                                        "name": this.ruleForm.Cname,
                                        "contact": this.ruleForm.name,
                                        "contactMobile": this.ruleForm.mode,
                                        "bankName": this.ruleForm.backname,
                                        "bankNumber": this.ruleForm.backaccount,
                                        //'createTime':this.ruleForm.date1,
                                        'accountState':this.ruleForm.panper,
                                        "categoryId": this.ruleForm.county-0,
                                        "levelId": this.ruleForm.ctypes-0,
                                        "supplierLabel": this.dynamicTags
                                    }
                                })
                                .then(response => {
                                    console.log(response)
                                    this.dialogVisible = false;
                                    this.$root.$emit('getDatezdy', 1)
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
                if (this.ruleForm.textInfo == "编辑会员") {
                    that.$refs[formName].validate((valid) => {
                        if (valid) {
                            let url = '/api/product/supplierInfo/update';
                            this.$http({
                                    url: url,
                                    method: 'POST',
                                    // 请求体重发送的数据
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    data: {
                                        'id': this.ruleForm.ids,
                                        "name": this.ruleForm.Cname,
                                        "contact": this.ruleForm.name,
                                        "contactMobile": this.ruleForm.mode,
                                        "bankName": this.ruleForm.backname,
                                        "bankNumber": this.ruleForm.backaccount,
                                        //'createTime':this.ruleForm.date1,
                                        //'accountState':this.ruleForm.panper,
                                        "categoryId": 1,
                                        "levelId": 1,
                                        "supplierLabel": [{
                                                "id": "d264a608-07e1-11e8-a896-6c4b901e385d"
                                            },
                                            {
                                                "id": "ff775481-07e2-11e8-a896-6c4b901e385d"
                                            }
                                        ]
                                    }
                                })
                                .then(response => {
                                    this.dialogVisible = false;
                                    this.$root.$emit('getDatezdy', 1)
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
            // handleClose(done) {
            // this.dialogVisible = false;
            // this.$refs['ruleForm'].resetFields();
            // },
            resetForm() {
                this.$refs['ruleForm'].resetFields();
            },
            searchLabel() {
                let url = '/api/product/label/query';
                this.$http({
                        url: url,
                        method: 'post',
                        data: {}
                    })
                    .then(respone => {
                        for(let i = 0 ;i<respone.data.info.length;i++){
                                this.dynamicTags.push({
                                    name: respone.data.info[i].name,
                                    color:respone.data.info[i].color,
                                    id:respone.data.info[i].id
                                })
                        }
                        
                        console.log(respone.data.info)
                    })
                    .catch(error => {
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
            showData() {
                let url = '/api/product/category/query';
                this.$http({
                        url: url,
                        method: 'post',
                        data: {}
                    })
                    .then(respone => {
                        console.log(respone.data.info)
                        this.ruleForm.curDate = respone.data.info;
                    })
                    .catch(error => {
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
            sourceFn() {
                let url = '/api/product/level/query';
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
                        
                    })
                    .catch(error => {
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
            handleClose(tag) {
                // if (this.ruleForm.textInfo == "新增会员") {
                //     alert('新增无法删除');
                //     return false;
                // }
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                let i = this.dynamicTags.length % 5
                if (inputValue) {
                    this.dynamicTags.push({
                        name: inputValue,
                        color:this.color[i]
                    })
                }
                this.inputVisible = false;
                this.inputValue = '';
            }
        },
        created: function() {
            this.$root.$on('showWindow', (data) => {
                console.log(data)
                if (data != 'no') {
                    this.ruleForm.textInfo = '编辑会员';
                    console.log(data[0].panper)
                    this.ruleForm.mode = data[0].contactMobile,
                        this.ruleForm.name = data[0].contact,
                        this.ruleForm.backname = data[0].bankName,
                        this.ruleForm.backaccount = data[0].bankNumber,
                        this.ruleForm.Cname = data[0].name,
                        this.ruleForm.ids = data[0].id,
                        this.ruleForm.panper = data[0].panper,
                        this.ruleForm.sourceFns = data[0].ctypes,
                        this.ruleForm.curDate = data[0].county,
                        this.dialogVisible = true;
                } else {
                    this.ruleForm.textInfo = '新增会员';
                    this.dialogVisible = true;
                }
            });
            this.sourceFn();
            this.showData();
            this.searchLabel();
        }
    }
</script>