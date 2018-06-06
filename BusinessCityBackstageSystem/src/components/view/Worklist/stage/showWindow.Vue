<template>
    <div>
        <el-dialog id="addEstate" :title="ruleForm.textInfo" :before-close="closeDialog" :visible.sync="dialogVisible" width="30%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span='24'>
                        <el-form-item label="阶段名称" prop="name">
                            <el-input v-model.trim="ruleForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label="描述">
                            <el-input v-model="ruleForm.mode"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="estate-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                </el-form-item>
            </el-form>
            <back-end-user></back-end-user>
        </el-dialog>
    </div>
</template>
<style lang="less">
    #addEstate {
        .imgBox {
            width: 100px;
            height: 100px;
            border: 1px solid #ddd;
        }
        .lineBline {
            border-bottom: 1px solid #ddd;
        }
        .estate-btn {
            .el-form-item__content {
                text-align: center;
                margin-left: 0 !important;
            }
        }
        .el-dialog {
            padding-bottom: 5px;
        }
    }
</style>
<script>
    import backEndUser from './backEndUser.vue'
    import {
        mapState
    } from 'vuex';
    import qs from 'qs'
    export default {
        data() {
            return {
                selectAll: false,
                showStyle: false,
                ListCustomerData: [],
                addObjArr: [],
                // ListAdminId: [],
                // ListCustomerId: [],
                dialogVisible: false,
                dialogRead: false,
                cantSubmit: true,
                ruleForm: {
                    textInfo: '新增阶段',
                    name: "",
                    mode: '',
                    reading: "0",
                    thisId: '',
                    isDisplay: '0'
                },
                rules: {
                    name: [{
                        required: true,
                        message: '请填写阶段名称',
                        trigger: 'blur'
                    }, ],
                    mode: [{
                        required: false,
                        message: '描述',
                        trigger: 'blur'
                    }, ],
                },
            };
        },
        methods: {
            getAdmin() {
                let obj = {
                    listInfo: '接收会员',
                    dialogRead: true
                }
                this.$root.$emit('showInfo', obj);
            },
            getCustomer() {
                let obj = {
                    listInfo: '接收后台用户',
                    dialogRead: true
                }
                this.$root.$emit('showInfo', obj);
            },
            closeDialog(done) {
                this.dialogVisible = false;
                this.$refs['ruleForm'].resetFields();
                this.ruleForm.name = ''
            },
            // checkName() {
            //     // if (this.ruleForm.name == '') {
            //     //     this.cantSubmit = true
            //     //     this.$message({
            //     //         message: '小区名不能为空',
            //     //         type: 'warning',
            //     //         duration: 1000
            //     //     })
            //     // } else {
            //     //     this.cantSubmit = false
            //     // }
            // },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.ruleForm.textInfo == "新添阶段") {
                            let url = '/api/public/articles/insertOne';
                            this.$http({
                                    url: url,
                                    method: 'POST',
                                    // 请求体重发送的数据
                                    // headers: {
                                    //     'Content-Type': 'application/json'
                                    // },
                                    data: {
                                        "stagename": this.ruleForm.name,
                                        "remark": this.ruleForm.mode,
                                    }
                                })
                                .then(res => {
                                    if(res.data.status==300){
                                        this.$message('阶段名重复');
                                    }
                                    this.dialogVisible = false;
                                    this.$root.$emit('getDatezdy', 1);
                                    this.addObjArr = []
                                    this.dialogVisible = false;
                                    this.$refs[formName].resetFields();
                                })
                                .catch(error => {
                                    console.log(error);
                                    // //         alert('网络错误，不能访问');
                                })
                        }
                        if (this.ruleForm.textInfo == "编辑阶段") {
                            let url = '/api/public/articles/update';
                            this.$http({
                                    url: url,
                                    method: 'POST',
                                    // 请求体重发送的数据
                                    // headers: {
                                    //     'Content-Type': 'application/json'
                                    // },
                                    data: {
                                        'id': this.ruleForm.thisId,
                                         "stagename": this.ruleForm.name,
                                        "remark": this.ruleForm.mode,
                                    }
                                })
                                .then(response => {
                                    this.dialogVisible = false;
                                    this.$root.$emit('getDatezdy', 1)
                                })
                                .catch(error => {
                                    console.log(error);
                                    //         alert('网络错误，不能访问');
                                })
                        }
                    }
                })
            },
            // getmultipleSelection() {
            //     this.$root.$on('multipleSelection', data => {
            //         let addObj;
            //         if (data) {
            //             data.forEach(item => {
            //                 addObj = {
            //                     "name": this.ruleForm.name,
            //                     "remark": this.ruleForm.mode,
            //                 }
            //               this.addObjArr.push(addObj)  
            //             })
            //         }
            //     })
            //     this.$root.$on('multipleSelections', data => {
            //         let addObj;
            //         if (data) {
            //             data.forEach(item => {
            //                 addObj = {
            //                      "name": this.ruleForm.name,
            //                     "remark": this.ruleForm.mode,
            //                 }
            //                  this.addObjArr.push(addObj)
            //             })
            //         }
            //     })
            // }
        },
        created: function() {
            // this.getmultipleSelection();
            this.$root.$on('showWindowss', (data) => {
                this.$nextTick(() => {
                    if (data.type != 'no') {
                        this.dialogVisible = true;
                        this.ruleForm.textInfo = '编辑阶段';
                        this.showStyle = true;
                        this.ruleForm.thisId = data.rowData.id
                        this.ruleForm.mode = data.rowData.remark
                        this.ruleForm.name = data.rowData.stagename
                    } else {
                        this.showStyle = false;
                        this.dialogVisible = true;
                        this.ruleForm.textInfo = '新添阶段';
                        this.ruleForm.name = ''
                        this.ruleForm.mode = ''
                        this.ListAdminId = []
                        this.ListCustomerId = []
                    }
                })
            });
        },
        components: {
            backEndUser
        },
        beforeDestroy() {
            this.$root.$off('showWindowss');
            this.$root.$off('multipleSelection');
            this.$root.$off('multipleSelections');
        }
    }
</script>