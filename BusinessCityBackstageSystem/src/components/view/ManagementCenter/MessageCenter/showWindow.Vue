<template>
    <div>
        <el-dialog id="addEstate" :title="ruleForm.textInfo" :before-close="closeDialog" :visible.sync="dialogVisible" width="30%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span='24'>
                        <el-form-item label="标题" prop="name">
                            <el-input @change="checkName" v-model.trim="ruleForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label="内容" prop="mode">
                            <el-input v-model="ruleForm.mode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label="接收后台用户" @click.native='getAdmin' prop="receiverAdmin">
                            <el-button type='button'>请点击选择</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label="接收者会员" @click.native='getCustomer' prop="receiverCustomer">
                            <el-button type='button'>请点击选择</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label="阅读状态" v-if='showStyle'>
                            <el-radio-group v-model="ruleForm.reading">
                                <el-radio label="0">未读</el-radio>
                                <el-radio label="1">已阅读</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label="接收者展示" v-if='showStyle'>
                            <el-radio-group v-model="ruleForm.isDisplay">
                                <el-radio label="1">展示</el-radio>
                                <el-radio label="0">不展示</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item class="estate-btn">
                    <el-button type="primary" :disabled="cantSubmit" @click="submitForm('ruleForm')">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog :title='listInfo' :visible.sync="dialogRead" width="30%" :append-to-body="true" id="addEstate">
            <el-checkbox-group v-model="ListAdminId" v-if='listInfo=="接收后台用户"'>
                <el-checkbox v-for='(item,index) in ListAdminData' :key='index' :label="item?tiem.id:''">item?tiem.name:''</el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="ListCustomerId" v-if='listInfo=="接收者会员"'>
                <el-checkbox v-for='(item,index) in ListCustomerData' :key='index' :label="item?tiem.id:''">item?tiem.name:''</el-checkbox>
            </el-checkbox-group>
            <div style="width:100%;text-align:center;margin-top:10px;">
                <el-button @click="checkList">保存</el-button>
            </div>
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
    import qs from 'qs'
    export default {
        data() {
            return {
                showStyle:false,
                ListAdminData: [],
                ListCustomerData: [],
                ListAdminId: [],
                ListCustomerId: [],
                dialogVisible: false,
                listInfo: '',
                dialogRead: false,
                cantSubmit: true,
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
                        trigger: 'blur'
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
            checkList() {
                this.dialogRead = false
            },
            getAdmin() {
                this.listInfo = '接收后台用户'
                this.dialogRead = true
                let url = '/api/customer/account/query';
                this.$http({
                    url: url,
                    method: "post",
                    data: {}
                }).then((msg) => {
                    if (msg.data.info.list) {
                        ListCustomerData = msg.data.info.list
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            getCustomer() {
                this.listInfo = '接收者会员'
                this.dialogRead = true
                let url = '/api/customer/identity/findIdentity';
                this.$http({
                    url: url,
                    method: "post",
                    data: {}
                }).then((msg) => {
                    console.log(msg)
                }).catch((err) => {
                    console.log(err)
                })
            },
            closeDialog(done) {
                this.dialogVisible = false;
                this.$refs['ruleForm'].resetFields();
                this.ruleForm.name = ''
            },
            checkName() {
                if (this.ruleForm.name == '') {
                    this.cantSubmit = true
                    this.$message({
                        message: '小区名不能为空',
                        type: 'warning',
                        duration: 1000
                    })
                } else {
                    this.cantSubmit = false
                }
            },
            submitForm(formName) {
                if (this.ruleForm.textInfo == "新添消息") {
                    let url = '/api/public/message/record/insert';
                    this.$http({
                            url: url,
                            method: 'POST',
                            // 请求体重发送的数据
                            // headers: {
                            //     'Content-Type': 'application/json'
                            // },
                            data: [{
                                "title": this.ruleForm.name,
                                "content": this.ruleForm.mode,
                                "receiverAdminId": this.ListAdminId+''.replace(/\[|]/g,''),
                                "receiverCustomerId": this.ListCustomerId+''.replace(/\[|]/g,''),
                            }]
                        })
                        .then(res => {
                            this.dialogVisible = false;
                            console.log(res.data.msg);
                            this.$root.$emit('getDatezdy', 1);
                        })
                        .catch(error => {
                            console.log(error);
                            // alert('网络错误，不能访问');
                        })
                }
                if (this.ruleForm.textInfo == "编辑消息") {
                    let url = '/api/public/message/record/update';
                    this.$http({
                            url: url,
                            method: 'POST',
                            // 请求体重发送的数据
                            // headers: {
                            //     'Content-Type': 'application/json'
                            // },
                            data: {
                                'id': this.ruleForm.thisId,
                                "title": this.ruleForm.name,
                                "content": this.ruleForm.mode,
                                "receiverAdminId": this.ListAdminId+''.replace(/\[|]/g,''),
                                "receiverCustomerId": this.ListCustomerId+''.replace(/\[|]/g,''),
                                "isRead": true,
                                "isDisplay": false
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
                }
                this.dialogVisible = false;
                this.$refs[formName].resetFields();
            }
        },
        created: function() {
            this.$root.$on('showWindowss', (data) => {
                this.$nextTick(() => {
                    if (data.type != 'no') {
                        this.dialogVisible = true;
                        this.ruleForm.textInfo = '编辑消息';
                        console.log(data);
                        this.showStyle = true;
                        this.ruleForm.thisId = data.rowData.id
                        this.ruleForm.mode = data.rowData.content
                        this.ruleForm.name = data.rowData.title
                        this.ListAdminId= data.rowData.receiverAdminId;
                        this.ListCustomerId=data.rowData.receiverCustomerId;
                    } else {
                        this.showStyle = false;
                        this.dialogVisible = true;
                        this.ruleForm.textInfo = '新添消息';
                        this.ruleForm.name = ''
                        this.ruleForm.mode = ''
                        this.ListAdminId = []
                        this.ListCustomerId = []
                    }
                })
            });
        },
        beforeDestroy() {
            this.$root.$off('showWindowss');
        }
    }
</script>