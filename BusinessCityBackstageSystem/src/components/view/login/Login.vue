<template>
  <div id="login">
    <!-- <el-row>
        <el-col :sm="4" :md="6" :lg="8" :offset="16">
            <div class="contentRight">
                <h3>欢迎进入禾目云视觉健康管理系统</h3>
                <h5> Background management system </h5> -->
                <el-form :model="ruleForm" action="" class="loginForm">
                    <ul class="loginUl">
                        <li> <label><img src="/static/images/Login/userman.png" alt=""><el-input type="text" @change="checkName" value="" v-model="ruleForm.userName" placeholder="请输入登录账号" clearable></el-input></label></li>
                        <li><label><img src="/static/images/Login/regpass.png" alt=""><el-input type="password" @change="checkPwd" value="" v-model="ruleForm.userPwd" placeholder="请输入登录密码" clearable></el-input></label></li>
                        <li class="liFr"><div id="checkCode" style="width: 200px;height: 50px;"></div><span>验证码:</span><input type="text" id="codeInput" placeholder="请输入验证码" ></li>
                        <li class="liTh"><label><el-checkbox v-model="ruleForm.checked" name="remPassword" @click="clearCookie" >记住密码</el-checkbox></label><span @click="forgetPassword">忘记密码?</span></li>
                        <li class="liFo"><span id="myButton" @click="logining(ruleForm)" >立即登录</span></li>
                    </ul>
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
// var verifyCode = new GVerify("checkCode");
// document.getElementById("myButton").onclick = function() {
//     var res = verifyCode.validate(document.getElementById("codeInput").value);
//     if (res) {
//         alert("验证正确");
//     } else {
//         alert("验证码错误");
//     }
// }
</script>
<style scoped lang='less'>
@import "./Login.less";
</style>
<style>
.loginUl li{
    list-style: none;
}
.loginUl .el-input{
    display:inline-block;
    width:82%;
    background:transparent;
}
.loginUl .el-input .el-input__inner{
    border:none;
    vertical-align: 5px;
    background:transparent;
    padding-left:15px;
}
.loginUl .el-input .el-input__suffix{
    top:-5px;
}
.loginUl .el-checkbox__label{
    color:#fff;
    margin-right: 35px;
}
.loginUl .el-checkbox__input.is-checked+.el-checkbox__label{
    color:#0f0;
}   
</style>

