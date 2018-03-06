<template>
    <el-dialog :title="ruleForm.textInfo" @click="closeDialog" :visible.sync="dialogVisible" width="30%">
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
                    <el-form-item label="地址" prop='address'>
                        <el-input v-model="ruleForm.address"></el-input>
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
                    textInfo: '新增会员',
                    name: "",
                    mode: '',
                    address: '',
                    thisId:''
                },
                rules: {
                    name: [{
                        required: true,
                        message: '请输入小区名称',
                        trigger: 'blur'
                    }, ],
                    mode: [{
                        required: false,
                        message: '请输入小区别名',
                         trigger: 'blur'
                    }, ],
                    address: [{
                        required: true,
                        message: '请填写详细地址',
                        trigger: 'blur'
                    }],

                },

            };
        },
        methods: {
            closeDialog(){
                this.dialogVisible = false;
                this.$refs['ruleForm'].resetFields();
            },
            submitForm(formName) {
                if(this.ruleForm.textInfo == "新增小区"){
                    // console.log(this.ruleForm.name);
                    // console.log(this.ruleForm.mode);
                    // console.log(this.ruleForm.address);
                    let url = '/api/customer/estate/insertData';
                    this.$http({
                            url: url,
                            method: 'POST',
                            // 请求体重发送的数据
                            // headers: {
                            //     'Content-Type': 'application/json'
                            // },
                            data:[{
                                'name': this.ruleForm.name,
                                'alias': this.ruleForm.mode,
                                'address': this.ruleForm.address,
                            }]
                        })
                        .then(res => {
                            this.dialogVisible = false;
                            console.log(res.data.msg);
                            this.$root.$emit('getDatezdy',1);
                        })
                        .catch(error => {
                            console.log(error);
                            alert('网络错误，不能访问');
                        })
                }
                if(this.ruleForm.textInfo == "编辑小区"){ 
                    let url = '/api/customer/estate/updateData';
                    this.$http({
                            url: url,
                            method: 'POST',
                            // 请求体重发送的数据
                            // headers: {
                            //     'Content-Type': 'application/json'
                            // },
                            data: {
                                'name': this.ruleForm.name,
                                'alias': this.ruleForm.mode,
                                'address': this.ruleForm.address,
                                'id':this.ruleForm.thisId
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
                        this.ruleForm.textInfo = '编辑小区';
                        console.log(data.rowData);
                        this.ruleForm.thisId=  data.rowData.id
                        this.ruleForm.mode= data.rowData.alias
                        this.ruleForm.name= data.rowData.name
                        this.ruleForm.address= data.rowData.address
                    }else{
                        this.dialogVisible = true;
                        this.ruleForm.textInfo = '新增小区';
                        this.ruleForm.mode= ""
                        this.ruleForm.name= ""
                        this.ruleForm.address= ""
                    } 
                })
            });
             
        },
        beforeDestroy(){
            this.$root.$off('showWindowss');
        }
    }
</script>