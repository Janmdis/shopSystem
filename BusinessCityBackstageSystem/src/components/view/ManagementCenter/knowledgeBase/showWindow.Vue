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
            <el-row class='showBox' style="margin-bottom:20px;" v-for='(item,index) in ruleForm.knowArr' :key="index">
                <el-col :span='24'>
                    <i v-if='index === ruleForm.knowArr.length-1' class='icon iconfont icon-tianjia' @click="addInfo"></i>
                    <i v-else class='icon iconfont icon-icon--' @click="delInof(index,item.id)"></i>
                    <div class='know'>
                        <el-form-item :label="'答'+(index+1)">
                            <el-input type="textarea" v-model="item.answer" class='wNight'></el-input>
                        </el-form-item>
                        <el-form-item label="场景:">
                            <el-input v-model="item.scenes" class='wNight'></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button class='mTop' type="primary" @click="submitForm('ruleForm')">保存</el-button>
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
    .wNight {
        width: 90%;
    }
    .headerBottom .el-dialog__header {
        background: #fff;
        border-bottom: 4px solid #409eff;
    }
    .headerBottom .el-dialog__title {
        color: #716f6f;
    }
    .headerBottom .showBox {
        padding-top: 10px;
        background: #f5f3f394;
    }
    .headerBottom .mTop {
        text-align: center;
    }
    .icon-tianjia {
        position: absolute;
        right: 1%;
        top: 8%;
        font-size: 32px;
        color: #3a8ee6;
        z-index: 5;
        cursor: pointer;
    }
    .icon-icon-- {
        position: absolute;
        right: 1%;
        top: 8%;
        font-size: 32px;
        color: #3a8ee6;
        z-index: 5;
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
                    name: "",
                    desc: '',
                    textInfo: '新增知识库',
                    thisId: '',
                    knowArr: [{
                        "answer": '',
                        "scenes": "",
                        "isActive": true
                    }],
                    knowText: '',
                    delKnowArr: []
                },
                rules: {
                    name: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }, ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                let that = this;
                if (this.ruleForm.textInfo == "新增知识库") {
                    that.$refs[formName].validate((valid) => {
                        if (valid) {
                            let url = '/api/public/knowledge/library/insert';
                            this.$http({
                                    url: url,
                                    method: 'POST',
                                    // 请求体重发送的数据
                                    // headers: {
                                    //     'Content-Type': 'application/json'
                                    // },
                                    data: {
                                        "problemTitle": this.ruleForm.name,
                                        "problemDescription": this.ruleForm.desc,
                                        "knowledgeSortId": "1",
                                        "knowledgePointId": "1",
                                        "knowledgeAnswerList": this.ruleForm.knowArr
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
                if (this.ruleForm.textInfo == "编辑知识库") {
                    let url = '/api/public/knowledge/answer/update' /*'+[data[0].id]*/ ;
                    this.$http({
                            url: url,
                            method: 'post',
                            //headers: { 'Content-Type': ' application/x-www-form-urlencoded' },
                            data: this.ruleForm.delKnowArr
                        })
                        .then(respone => {
                            
                        })
                        .catch(error => {
                            console.log(error);
                            alert('网络错误，不能访问');
                        })
                    that.$refs[formName].validate((valid) => {
                        if (valid) {
                            let url = '/api/public/knowledge/library/insert';
                            this.$http({
                                    url: url,
                                    method: 'POST',
                                    // 请求体重发送的数据
                                    // headers: {
                                    //     'Content-Type': 'application/json'
                                    // },
                                    data: {
                                        id: this.ruleForm.thisId,
                                        "problemTitle": this.ruleForm.name,
                                        "problemDescription": this.ruleForm.desc,
                                        "knowledgeAnswerList": this.ruleForm.knowArr
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
            addInfo() {
                this.ruleForm.knowText = {};
                this.ruleForm.knowArr.push(this.ruleForm.knowText);
            },
            delInof(index, id) {
                console.log(id);
                let list = [];
                for (let i = 0; i < this.ruleForm.knowArr.length; i++) {
                    if (this.ruleForm.knowArr.length <= 1) {
                        this.$message({
                            type: 'warning',
                            message: '至少有一个分类！'
                        });
                        return false
                    }
                    if (index != i) {
                        list.push(this.ruleForm.knowArr[i]);
                        this.$message({
                            type: 'success',
                            message: '删除成功！'
                        });
                    }
                }
                this.ruleForm.delKnowArr.push({
                    "id": id,
                    "isActive": false
                })
                this.ruleForm.knowArr = list;
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        },
        created: function() {
            this.$root.$on('showWindow', (data) => {
                console.log(data)
                if (data != 'no') {
                    this.ruleForm.thisId = data[0].id
                    this.ruleForm.textInfo = '编辑知识库';
                    let url = '/api/public/knowledge/library/find' /*'+[data[0].id]*/ ;
                    this.$http({
                            url: url,
                            method: 'post',
                            //headers: { 'Content-Type': ' application/x-www-form-urlencoded' },
                            data: {
                                "id": data[0].id
                            }
                        })
                        .then(respone => {
                            let datas = respone.data.info.list[0];
                            console.log(datas)
                            datas.knowledgeAnswerList.push({
                                "answer": '',
                                "scenes": "",
                            })
                            this.ruleForm.name = datas.problemTitle;
                            this.ruleForm.desc = datas.problemDescription;
                            this.ruleForm.knowArr = datas.knowledgeAnswerList;
                            console.log(this.ruleForm.knowArr)
                        })
                        .catch(error => {
                            console.log(error);
                            alert('网络错误，不能访问');
                        })
                    this.dialogVisible = true;
                } else {
                    this.ruleForm.textInfo = '新增知识库',
                        this.ruleForm.name = '';
                    this.ruleForm.desc = '';
                    this.ruleForm.knowArr = [{
                        "answer": '',
                        "scenes": "",
                    }];
                    this.dialogVisible = true;
                }
            });
        }
    }
</script>