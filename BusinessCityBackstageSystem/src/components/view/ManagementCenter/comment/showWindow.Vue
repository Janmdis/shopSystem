<template>
    <el-dialog id="addEstate" :title="ruleForm.textInfo" :before-close="closeDialog" :visible.sync="dialogVisible" width="30%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span='24'>
                    <el-form-item label="评论内容" prop="name">
                        {{ruleForm.name}}
                    </el-form-item>
                </el-col>
                <el-col :span='24' v-if='ruleForm.reply'>
                    <el-form-item label="回复内容" >
                        {{ruleForm.reply }}
                    </el-form-item>
                </el-col>
                <el-col :span='24'>
                    <el-form-item label="回复" prop="mode">
                        <el-input type="textarea"  v-model="ruleForm.mode"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item class="estate-btn">
                <el-button type="primary"  @click="submitForm('ruleForm')">保存</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
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
        .citys {
            float: left;
        }
    }
</style>
<script>
    import qs from 'qs'
    export default {
        data() {
            return {
                dialogVisible: false,
                cantSubmit: true,
                ruleForm: {
                    textInfo: '新增会员',
                    name: "",
                    mode: '',
                    thisId: '',
                    reply:''
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
                    }, ]
                },
            };
        },

        methods: {
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
                // if (this.ruleForm.textInfo == "新增小区") {
                //     let url = '/api/customer/estate/insertData';
                //     this.$http({
                //             url: url,
                //             method: 'POST',
                //             // 请求体重发送的数据
                //             // headers: {
                //             //     'Content-Type': 'application/json'
                //             // },
                //             data: [{
                //                 'alias': this.ruleForm.mode,
                //             }]
                //         })
                //         .then(res => {
                //             this.dialogVisible = false;
                //             console.log(res.data.msg);
                //             this.$root.$emit('getDatezdy', 1);
                //         })
                //         .catch(error => {
                //             console.log(error);
                //             //         alert('网络错误，不能访问');
                //         })
                // }
                if (this.ruleForm.textInfo == "回复评论") {
                    let url = '/api/product/commodity/evaluation/reply?evaluationId='+this.ruleForm.thisId+'&text='+this.ruleForm.mode;
                    this.$http({
                            url: url,
                            method: 'POST',
                            // 请求体重发送的数据
                            // headers: {
                            //     'Content-Type': 'application/json'
                            // },
                            data: {
                                // 'text': this.ruleForm.mode,
                                // 'evaluationId': this.ruleForm.thisId
                            }
                        })
                        .then(response => {
                            if(response.data.status==200){
                                this.dialogVisible = false;
                            this.$root.$emit('getDatezdy', 1)
                            }
                            
                        })
                        .catch(error => {
                            console.log(error);
                            //         alert('网络错误，不能访问');
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
                        this.ruleForm.textInfo = '回复评论';
                        this.ruleForm.name = data.rowData.comment
                        this.ruleForm.thisId = data.rowData.id
                        this.ruleForm.reply = data.rowData.reply
                    } else {
                        this.dialogVisible = true;
                        this.ruleForm.textInfo = '新增小区';
                        this.ruleForm.name = ""
                    }
                })
            });
        },
        beforeDestroy() {
            this.$root.$off('showWindowss');
        }
    }
</script>