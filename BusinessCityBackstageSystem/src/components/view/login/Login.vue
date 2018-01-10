<template>
  <div id="login">
    <el-row>
        <el-col :sm="4" :md="6" :lg="8" :offset="16">
            <div class="contentRight">
                <h3>欢迎进入禾目云视觉健康管理系统</h3>
                <h5> Background management system </h5>
                <form action="" class="loginForm">
                    <ul class="loginUl">
                        <li><label><img src="/static/images/Login/userman.png" alt=""><input type="text" value="" placeholder="请输入登录账号或手机号" ></label></li>
                        <li><label><img src="/static/images/Login/regpass.png" alt=""><input type="password" value="" placeholder="请输入登录密码" ></label></li>
                        <li class="liFr">
                            <div id="checkCode"></div>
                            <span>验证码:</span><input type="text" id="codeInput" placeholder="请输入验证码" >
                        </li>
                        <li class="liTh"><label><input type="checkbox" name="remPassword" id="" value=""><span class="liThSpan">记住密码</span></label><span>忘记密码</span></li>
                        <li class="liFo"><span id="myButton">立即登录</span></li>
                    </ul>
                </form>
            </div>
        </el-col>
    </el-row>
  </div>
</template>
<script>
import logins from './Login';
export default logins
// var verifyCode = new GVerify("checkCode");
// document.getElementById("myButton").onclick = function(){
// 	var res = verifyCode.validate(document.getElementById("codeInput").value);
// 	if(res){
// 		alert("验证正确");
// 	}else{
// 		alert("验证码错误");
// 	}
// }
</script>
<style scoped lang='less'>
@import "./Login.less";
</style>

