<template>
    <div id="forgetPwd">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="forgetForm">
            <el-row>
                <el-col :span='5'>
                    <i class="icon iconfont icon-icon-user icon-shouji"></i>
                </el-col>
                <el-col :span='19'>
                    <el-form-item prop="userPhone">
                        <el-input type="text" v-model="ruleForm.userPhone" placeholder="请输入手机号" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='5'>
                    <i class="icon iconfont icon-icon-user icon-ecurityCode"></i>
                </el-col>
                <el-col :span='19'>
                    <el-form-item prop="userCode">
                        <el-col :span='12'>
                            <el-input type="text" v-model="ruleForm.userCode" placeholder="请输入验证码" clearable></el-input>
                        </el-col>
                        <el-col :span='10' :offset='1'>
                            <overtimer   @click.native="getver"  :disabled="disabled"  ref="c1"  :second="60"></overtimer>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='5'>
                    <i class="icon iconfont icon-icon-user icon-mima1"></i>
                </el-col>
                <el-col :span='19'>
                    <el-form-item prop="userPwd">
                        <el-input type="password" v-model="ruleForm.userPwd" placeholder="请输入密码" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='5'>
                    <i class="icon iconfont icon-icon-user icon-querenmima"></i>
                </el-col>
                <el-col :span='19'>
                    <el-form-item prop="userPwd1">
                        <el-input type="password" v-model="ruleForm.userPwd1" placeholder="请确认密码" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='24'>
                    <el-form-item class='textAlign'>
                        <el-button type="primary" class='btngb' @click="submitForm('ruleForm')">确认</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='24'>
                    <el-form-item class='textAlign'>
                        <span type="primary" @click="jumpLogin">已有账号,立即登录</span>
                    </el-form-item>
                </el-col>
            </el-row>
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
<style scoped lang='less'>
    @import "./ForgetPwd.less";
</style>
<style lang='less'>
#forgetPwd{


.el-input__inner{
    height:40px;
}
    .textAlign {
        text-align: center;
        color: #fff;
    }
    .iconfont {
        font-size: 26px;
        color: #fff;
        margin-top: 8px;
        display: inline-block;
    }
    .forgetUl {
        padding-left: 0;
    }
    .forgetUl li {
        list-style: none;
    }
    .forgetUl .el-input {
        width: 85%;
    }
    .forgetUl .el-input .el-input__inner {
        border: none;
        vertical-align: 5px;
        background: transparent;
        padding-left: 25px;
        color: #fff;
        margin-top: -6px;
    }
    .forgetUl .el-input .el-input__inner::-webkit-input-placeholder {
        color: #fff;
    }
    .forgetUl .el-input .el-input__suffix {
        top: -5px;
    }
    .forgetUl .el-checkbox__label {
        color: #fff;
        margin-right: 35px;
    }
    .btngb {
        width: 100%;
        margin-top: 40px;
        background: #0fb8a980;
    border: 1px solid #0fb8a980;
        display: inline-block;
    }
    .el-button--primary:focus,
    .el-button--primary:hover {
        background: #0fb8a980;
    border: 1px solid #0fb8a980;
    }
    }
</style>

