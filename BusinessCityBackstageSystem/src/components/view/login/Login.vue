<template>
    <div id="login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="loginForm">
                <el-row >
                    <el-col :span='5'>
                        <i  class="icon iconfont icon-icon-user iconSize"></i>
                    </el-col>
                    <el-col :span='19'>
                        <el-form-item  prop="userName">
                            <el-input v-model="ruleForm.userName"> </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                 <el-row >
                    <el-col :span='5'>
                        <i  class="icon iconfont icon-mima iconSize "></i>
                    </el-col>
                    <el-col :span='19'>
                        <el-form-item  prop="password">
                            <el-input type='password' v-model="ruleForm.password"> </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span='5'>
                    <i  class="icon iconfont icon-ecurityCode iconSize smallSize"></i>
                    </el-col>
                    <el-col :span='19'>
                        <el-form-item   prop="verificationCode">
                            <el-input  id="codeInput" v-model="ruleForm.verificationCode" placeholder="请输入验证码" auto-complete="off"
                            @keyup.enter.native='logining'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                <div id="checkCode" style="width: 200px;height: 50px;margin-left:21%;maring-bottom:15px;"></div>
                </el-row>
                <el-row class="forgMiss" >
                <el-col :span='12' >
                <el-checkbox v-model="ruleForm.rememberMe" name="remPassword" @change="clearCookie">记住密码</el-checkbox>
                </el-col>
                 <el-col :span='12'>
                <span @click="forgetPassword" style='color: #c0c4cc;font-size:12px;'>忘记密码?</span>
                </el-col>
                </el-row>
                <el-row class="forgMiss" >
                <el-form-item>
                <el-button type="primary" class="login" @click.native='logining("ruleForm")' >立即登录</el-button>
                </el-form-item>
                </el-row>
        </el-form>
    
        <!--  </div>
    
            </el-col>
    
        </el-row> -->
    
    </div>
</template>
<script>
    /* eslint-disable */
    
    import logins from './Login.js'
    
    export default logins;
</script>
<style scoped lang='less'>
    @import "./Login.less";
</style>
<style lang = 'less'>
#login{
    .el-checkbox__input.is-checked+.el-checkbox__label{
        color: #0fb8a980;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
        background-color: #0fb8a980;
        border-color: #0fb8a980;
    }
.el-input__inner{
    height:40px;
}
    .loginUl li {
    
        list-style: none;
    
    }
    .iconSize{
        font-size:30px;
        color:#fff;
        line-height:40px;
    }
    .smallSize{
        font-size:26px;
        margin-left:4px;
    }
    .forgMiss{
        margin-top:15px;
        margin-bottom:15px;
        text-align:center;
    }

    .login{
        background:#0fb8a980;
        border:1px solid #0fb8a980;
        width:80%;
    }
    .login:hover{
        background:#0fb8a980;
        border:1px solid #0fb8a980;
    }
    
    .el-form-item__label{
        color:#fff;
    }
    
    .loginForm .el-input {
    
        display: inline-block;
    
        width: auto;
    
        background: transparent;
    
    }
    
    
    
    .loginUl .el-input .el-input__inner {
    
        border: none;
    
        vertical-align: 5px;
    
        background: transparent;
    
        padding-left: 15px;
    
    }
    
    
    
    .loginUl .el-input .el-input__suffix {
    
        top: -5px;
    
    }
    
    
    
    .loginUl .el-checkbox__label {
    
        color: #fff;
    
        margin-right: 35px;
    
    }
    
    
    
    .loginUl .el-checkbox__input.is-checked+.el-checkbox__label {
    
        color: #0f0;
    
    }
    }
</style>

