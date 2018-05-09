<template>
    <el-dialog :title="ruleForm.textInfo" @click="closeDialog" :visible.sync="dialogVisible" width="30%" class='eventtempdialog'>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span='22'>
                    <el-form-item label="模板类型" prop="type">
                        <el-select v-model="ruleForm.type" placeholder="请选择类型">
                            <el-option label="商城模板" value="1"></el-option>
                            <el-option label="活动模板" value="2"></el-option>
                            <el-option label="详情模板" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span='22'>
                    <el-form-item label="模板名称" prop="templateName">
                        <el-input v-model="ruleForm.templateName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='22'>
                    <el-form-item label="模板描述" prop="mode">
                        <el-input v-model="ruleForm.mode"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">创建新模板</el-button>
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
    @media screen and (min-width:1200px){
    .eventtempdialog .el-dialog{
        height:45%;
    }
    }
    @media screen and (min-width:1700px){
     .eventtempdialog .el-dialog{
        height:45%;
    }
    }
    @media screen and (min-width:1800px){
     .eventtempdialog .el-dialog{
        height:45%;
    }
    }
    @media screen and (min-width:1900px){
    .eventtempdialog .el-dialog{
        height:37%;
    }
    }
</style>
<script>
import qs from 'qs'
    export default {
        data() {
            return {
                dialogVisible: false,
                ruleForm: {
                    textInfo: '新增模板',
                    type:'',
                    mode: '',
                    templateName:''
                },
                rules: {
                    type: [{
                        required: true,
                        message: '请选择模板类型',
                        trigger: 'change'
                    }, ],
                    mode: [{
                        required: false,
                        message: '请输入模板描述',
                         trigger: 'blur'
                    }, ],
                    templateName: [{
                        required: true,
                        message: '请输入模板名称',
                         trigger: 'blur'
                    }, ],
                },

            };
        },
        methods: {
            closeDialog(){
                this.dialogVisible = false;
                this.$refs['ruleForm'].resetFields();
            },
            submitForm(formName) {
                if(this.ruleForm.textInfo == "新增模板"){
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            //console.log(this.ruleForm.type)
                            //console.log(this.ruleForm.templateName)
                            //console.log(this.ruleForm.mode)
                            this.dialogVisible = false;
                            window.sessionStorage.setItem ("Template_Type",this.ruleForm.type);//新建模板分类
                            window.sessionStorage.setItem ("Template_Names",this.ruleForm.templateName);//新建模板名称
                            window.sessionStorage.setItem ("Template_Des",this.ruleForm.mode);//新建模板描述
                            let row ={isNewAdd:'1',type:'2'}
                            let rows = JSON.stringify(row)
                            window.sessionStorage.setItem ("Template_AllData",rows);
                            this.$refs[formName].resetFields();
                            this.$router.push({ path: '/mallSet' })
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                }
                // if(this.ruleForm.textInfo == "编辑小区"){ 
                //     let url = '/api/customer/estate/updateData';
                //     this.$http({
                //             url: url,
                //             method: 'POST',
                //             // 请求体重发送的数据
                //             // headers: {
                //             //     'Content-Type': 'application/json'
                //             // },
                //             data: {
                //                 'alias': this.ruleForm.mode
                //             }
                //         })
                //         .then(response => {
                //             this.dialogVisible = false;
                //             this.$root.$emit('getDatezdy',1)
                //         })
                //         .catch(error => {
                //             console.log(error);
                //             //         alert('网络错误，不能访问');
                //         })
                // }
                
            }
        },
        created: function() {
            this.$root.$on('showWindowss', (data) => {
                this.$nextTick(() => {
                    if (data.type != 'no') {
                        this.dialogVisible = true;
                        this.ruleForm.textInfo = '编辑';
                        console.log(data.rowData);
                      //  this.ruleForm.mode= data.rowData.alias
                    }else{
                        this.dialogVisible = true;
                        this.ruleForm.textInfo = '新增模板';
                        this.ruleForm.mode= "";
                        this.ruleForm.type="";
                        this.ruleForm.templateName="";
                    } 
                })
            });
             
        },
        beforeDestroy(){
            this.$root.$off('showWindowss');
        }
    }
</script>