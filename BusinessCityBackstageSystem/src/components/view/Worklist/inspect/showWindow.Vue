<template>
    <div>
        <el-dialog id="addEstate" :title="ruleForm.textInfo" :before-close="closeDialog" :visible.sync="dialogVisible" width="30%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span='24'>
                        <el-form-item label="阶段" prop="name">
                           <el-select v-model="ruleForm.name" placeholder="请选择活动区域">
                                <el-option v-for='item in getarticlesList' :key="item.id" :label="item.stagename" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label="检查项" prop="mode">
                            <el-input v-model="ruleForm.mode"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="estate-btn">
                    <el-button type="primary"  @click="submitForm('ruleForm')">保存</el-button>
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
                addObjArr:[],
                // ListAdminId: [],
                // ListCustomerId: [],
                dialogVisible: false,
                dialogRead: false,
                cantSubmit: true,
                getarticlesList:[],
                ruleForm: {
                    textInfo: '新增会员',
                    name: "",
                    mode: '',
                    reading: "0",
                    thisId: '',
                    isDisplay: '0'
                },
                rules: {
                    name: [{
                        required: true,
                        message: '标题',
                        trigger: 'change'
                    }, ],
                    mode: [{
                        required: false,
                        message: '内容',
                        trigger: 'blur'
                    }, ],
                },
            };
        },
        methods: {
            getarticles(){
                let url = '/api/public/articles/query';
                this.$http({
                    url: url,
                    method: 'POST',
                    // 请求体重发送的数据
                    // headers: {
                    //     'Content-Type': 'application/json'
                    // },
                    data:{}
                })
                .then(res => {
                    this.getarticlesList = res.data.info.list;
                })
                .catch(error => {
                    console.log(error);
                })
            },
            closeDialog(done) {
                this.dialogVisible = false;
                this.$refs['ruleForm'].resetFields();
                this.ruleForm.name = ''
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                if (this.ruleForm.textInfo == "新添检查项") {
                    let url = '/api/public/entryitem/insertOne';
                    this.$http({
                            url: url,
                            method: 'POST',
                            // 请求体重发送的数据
                            // headers: {
                            //     'Content-Type': 'application/json'
                            // },
                            data:{
                                "parentId": this.ruleForm.name,
                                "itemname": this.ruleForm.mode,
                            }
                        })
                        .then(res => {
                            this.dialogVisible = false;
                            this.$root.$emit('getDatezdy', 1);
                            this.addObjArr =[]
                        })
                        .catch(error => {
                            console.log(error);
                            // //         alert('网络错误，不能访问');
                        })
                }
                if (this.ruleForm.textInfo == "编辑检查项") {
                    let url = '/api/public/entryitem/update';
                    this.$http({
                            url: url,
                            method: 'POST',
                            // 请求体重发送的数据
                            // headers: {
                            //     'Content-Type': 'application/json'
                            // },
                            data: {
                                'id': this.ruleForm.thisId,
                                "parentId": this.ruleForm.name,
                                "itemname": this.ruleForm.mode,
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
                this.dialogVisible = false;
                this.$refs[formName].resetFields();
                 }
                })
            },
            // getmultipleSelection() {
                
            //     this.$root.$on('multipleSelection', data => {
            //         let addObj;
            //         if (data) {
            //             data.forEach(item => {
            //                 addObj = {
            //                     "title": this.ruleForm.name,
            //                     "content": this.ruleForm.mode,
            //                     "receiverAdminId": item.id,
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
            //                     "title": this.ruleForm.name,
            //                     "content": this.ruleForm.mode,
            //                     "receiverCustomerId": item.id,
            //                 }
            //                  this.addObjArr.push(addObj)
            //             })
            //         }
            //     })
                
            // }
        },
        created: function() {
            // this.getmultipleSelection();
            this.getarticles();
            this.$root.$on('showWindowss', (data) => {
                this.$nextTick(() => {
                    if (data.type != 'no') {
                        this.dialogVisible = true;
                        this.ruleForm.textInfo = '编辑检查项';
                        this.showStyle = true;
                        this.ruleForm.thisId = data.rowData.id
                        this.ruleForm.name = data.rowData.entryStages[0].id
                        this.ruleForm.mode = data.rowData.itemname
                    } else {
                        this.showStyle = false;
                        this.dialogVisible = true;
                        this.ruleForm.textInfo = '新添检查项';
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