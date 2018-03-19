<template>
    <el-container>
        <el-header>
            基本信息
        </el-header>
        <div class="mTop">
            <el-form :model='ruleForm1' status-icon :rules='rules1' ref='ruleForm1' label-width="100px" class="demo-ruleForm">
                <el-form-item label='登录手机号' prop="iPhone">
                    <el-col :span="8">
                        <el-input type="text" placeholder="请输入内容" v-model.number="ruleForm1.iPhone"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label='用户名称' prop='userName'>
                    <el-col :span="8">
                        <el-input placeholder="请输入内容" v-model='ruleForm1.userName'></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label='请选择性别' >
                    <el-radio-group v-model="ruleForm1.resource">
                        <el-radio label='true'>男</el-radio>
                        <el-radio label='false'>女</el-radio>
                    </el-radio-group>
                </el-form-item>

                  <el-form-item label='出生日期' prop='date1' >
                    <el-col :span="8">
                         <el-date-picker   v-on:blur="changeCount"    type="date" placeholder="选择日期" v-model="ruleForm1.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label='用户年龄' prop='age'>
                    <el-col :span="8">
                        <el-input v-model.number="ruleForm1.age" disabled=true placeholder="请输入内容"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label='部门'>
                    <el-col :span="8">
                        <el-input v-model='ruleForm1.role' placeholder="请输入内容" readonly></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label='职位'>
                    <el-col :span="8">
                        <el-input v-model='ruleForm1.job' placeholder="请输入内容" readonly></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-col :span="8">
                        <el-button type="primary" @click="submitForm('ruleForm1')">提交</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </div>
    </el-container>
</template>

<script>
    import user from './user.js'
    export default user
</script>
<style>

    
    .el-button--success:focus,
    .el-button--success:hover {
        background-color: #27a1f2;
        border-color: #27a1f2;
    }
    .el-button--success {
        background-color: #27a1f2;
        border-color: #27a1f2;
    }
</style>

<style scoped lang='less'>
    .el-button {
        margin-left: 12.8%;
    }
    .el-header {
        border-bottom: 1px solid #ddd;
        line-height: 60px;
    }
    .el-row {
        line-height: 40px;
        margin-bottom: 10px;
    }
</style>