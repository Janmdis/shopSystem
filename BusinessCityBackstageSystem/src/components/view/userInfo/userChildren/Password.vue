<template>
    <el-container>
        <el-header>
                修改密码
        </el-header>
        <div class="mTop">
        <el-form 
        :model="ruleForm2" 
        status-icon 
        :rules="rules2" 
        ref="ruleForm2" 
        label-width="100px" 
        class="demo-ruleForm">
        <el-form-item label="旧密码" prop="newPass">
            <el-col :span="8"><el-input type="password" 
            v-model.number="ruleForm2.newPass"
            ></el-input></el-col>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
            <el-col :span="8"><el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input></el-col>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
             <el-col :span="8"><el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input></el-col>
        </el-form-item>
        <el-form-item>
            <el-col :span="10"><el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            </el-col>
        </el-form-item>
        </el-form>
        </div>
    </el-container>
</template>

<script>
import password from './passWord.js'
export default password

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
    background-color: #27a1f2;
    border-color: #27a1f2;
}
.el-button--success{
    background-color: #27a1f2;
    border-color: #27a1f2;
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