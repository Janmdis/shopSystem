<template>
    <el-container>
        <el-header>
                基本信息
        </el-header>
        <el-main>
        <el-form :model='ruleForm1' 
        status-icon :rules='rules1' 
        ref='ruleForm1'
        label-width="100px" 
        class="demo-ruleForm">
            <el-form-item label='登录手机号' prop="iPhone">
            <el-col :span="8">
            <el-input type="text" 
            placeholder="请输入内容"
            v-model.number="ruleForm1.iPhone"
            ></el-input>
            </el-col>
            </el-form-item>

             <el-form-item label='用户名称' prop='userName'>
             <el-col :span="8"> 
             <el-input  
             placeholder="请输入内容"
             v-model='ruleForm1.userName'
             ></el-input></el-col>
            </el-form-item>
            <el-form-item label='请选择性别'>
            <el-radio v-model="radio" label="1">男</el-radio>
                <el-radio v-model="radio" label="2">女</el-radio>
            </el-form-item>
            <el-form-item label='用户年龄' prop='age'>
             <el-col :span="8"> <el-input v-model.number="ruleForm1.age" placeholder="请输入内容"></el-input></el-col>
            </el-form-item>
            <el-form-item label='出生日期' prop='brithday'>
            <el-col :span="8"> 
            <div class="block" >
                <span class="demonstration"></span>
                <el-date-picker
                v-model="ruleForm1.brithday"
                type="date"
                placeholder="选择日期" style='width:100%;'>
                </el-date-picker>
            </div>
            </el-col>
            </el-form-item>
            <el-form-item label='部门'>
                <el-col :span="8"> 
                <el-input v-model="input" placeholder="请输入内容" readonly></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label='职位'>
            <el-col :span="8"> 
            <el-input v-model="input" placeholder="请输入内容" readonly></el-input>
            </el-col>
            </el-form-item>
        <el-form-item>
            <el-col :span="8">
            <el-button type="primary" @click="submitForm('ruleForm1')">提交</el-button>
            </el-col>
        </el-form-item>
        </el-form>
       
        </el-main>
    </el-container>
</template>

<script>
import user from './user.js'
export default user

</script>
<style>
.el-radio__input.is-checked+.el-radio__label{
  color:#0b9c9b;
}
.el-radio__input.is-checked .el-radio__inner{
    border-color: #0b9c9b;
    background: #0b9c9b;
}
.el-button--success:focus, .el-button--success:hover{
    background-color: #00adab;
    border-color: #00adab;
}
.el-button--success{
    background-color: #00adab;
    border-color: #00adab;
}
</style>

<style scoped lang='less'>
.el-button{
    margin-left:12.8%;
}
    .el-header{
        border-bottom:1px solid #ddd;
        line-height:60px;
    }
    .el-row{
        line-height:40px;
        margin-bottom: 10px;
    }
</style>