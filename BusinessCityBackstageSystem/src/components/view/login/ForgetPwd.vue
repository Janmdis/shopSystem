<template>
    <div id="forgetPwd">
        <!-- <el-row>
        <el-col :sm="4" :md="6" :lg="8" :offset="16">
            <div class="contentRight">
                <h3>欢迎进入禾目云视觉健康管理系统</h3>
                <h5> Background management system </h5> -->
                <el-form :model="ruleForm" action="" class="forgetForm">
                    <ul class="loginUl">
                        <li>
                            <label><img src="/static/images/Login/reiphones.png" alt=""><el-input type="text" @change="checkPhone" value="" v-model="ruleForm.userPhone" placeholder="请输入手机号" clearable></el-input></label>
                        </li>
                        <li>
                            <label><img src="/static/images/Login/rescou.png" alt=""><el-input type="password" v-show="companys" @change="checkCompany" @focus="isCompany" value="" v-model="ruleForm.userCompany" placeholder="请选择企业" clearable></el-input></label>
                            <el-select v-model="value" v-show="company" placeholder="请选择企业"><el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option></el-select>
                        </li>
                        <li>
                            <label><img src="/static/images/Login/reslock.png" alt=""><el-input type="text" @change="checkCode" value="" v-model="ruleForm.userCode" placeholder="请输入验证码" clearable></el-input></label>
                            <el-button type="primary" plain>获取验证码</el-button>
                        </li>
                        <li>
                            <label><img src="/static/images/Login/regpass.png" alt=""><el-input type="password" @change="checkPwd" value="" v-model="ruleForm.userPwd" placeholder="请输入密码" clearable></el-input></label>
                        </li>
                        <li>
                             <label><img src="/static/images/Login/regpass1.png" alt=""><el-input type="text" @change="checkPwd1" value="" v-model="ruleForm.userPwd1" placeholder="请确认密码" clearable></el-input></label>
                        </li>     
                        <li class="liBtn"><span id="myButton" @click="logining(ruleForm)" >确认</span></li>
                        <li class="hasAccount"><span @click="jumpLogin">已有账号,立即登录</span></li>
                    </ul>
                </el-form>
           <!--  </div>
        </el-col>
    </el-row> -->
    </div>
</template>
<script>
import forgets from './ForgetPwd.js';
export default forgets;
</script>
<style>
.el-input .el-input__inner{
    border:none;
    vertical-align: 5px;
    background:transparent;
    padding-left:25px;
    color:#fff;
    font-size:17px;
    margin-top:-6px;
}
.el-input .el-input__inner::-webkit-input-placeholder{
    color:#fff;
}
.el-input .el-input__suffix{
    top:-5px;
}
.el-checkbox__label{
    color:#fff;
    margin-right: 35px;
}
</style>
<style scoped lang='less'>
@import "./ForgetPwd.less";
</style>

