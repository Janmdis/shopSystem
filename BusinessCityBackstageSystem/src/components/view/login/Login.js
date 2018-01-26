/* eslint-disable */
var { gVerify } = require("../../../assets/javascript/common.js");
import qs from 'qs'
export default {

    data() {
        //  自定义验证信息
        // var validateCode = (rule, value, callback) => {
        //     if (value === '') {
        //         callback(new Error('请输入验证码'));
        //     } else {
        //         if (value !== verifyCode) {
        //             callback(new Error('验证码错误'));
        //         } else {
        //             callback();
        //         }
        //     }
        // };

        return {
            show: true,
            count: '',
            timer: null,
            ruleForm: {
                userName: '',
                password: '',
                verificationCode: '',
                rememberMe: false,
            },
            rules: {
                userName: [{
                    pattern: /^1[3|4|5|7|8][0-9]{9}$/g,
                    required: true,
                    message: '请输入正确的手机号',
                    trigger: 'blur'
                }],
                password: [{
                    pattern: /^(\w){6,20}$/,
                    required: true,
                    message: '只能输入6-20个字母、数字、下划线',
                    trigger: 'blur'
                }],
                verificationCode: [
                    { required: true, message: '请填写验证码', trigger: 'blur' },
                    //{ validator: validateCode, trigger: 'blur' }
                ],
            }
        }
    },
    //页面加载调用获取cookie值
    mounted() {
        this.getCookie()
        this.yzn()
    },
    methods: {
        option(test, status) {
            this.$message({
                message: test,
                type: status ? status : 'warning'
            })
        },
        getCode() {
            const TIME_COUNT = 1;
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        this.show = true;
                        clearInterval(this.timer);
                        this.timer = null;
                        this.$router.push({ path: '/index' })
                    }
                }, 1000)
            }
        },
        forgetPassword() {
            this.$router.push({ path: '/login/forgetPwd' })
        },
        logining(formName) {
            if (!this.isRight) {
                this.option('验证码错误');
                return false
            }
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    //验证成功登陆
                    var name = this.ruleForm.userName; // 保存的账号
                    var pass = this.ruleForm.password; // 保存的密码

                    //判断复选框是否被勾选 勾选则调用配置cookie方法
                    if (this.ruleForm.rememberMe == true) {
                        //传入账号名，密码，和保存天数3个参数
                        this.setCookie(name, pass, 7);
                    }
                    //接口
                    var url = '/api/admin/account/login';
                    //18356987162
                    // this.$http.post(url, this.ruleForm, { emulateJSON: true })
                    this.$http({
                            url: url,
                            method: 'POST',
                            // 请求体重发送的数据
                            data: qs.stringify({
                                username: this.ruleForm.userName,
                                password: this.ruleForm.password,
                                //verificationCode:this.ruleForm.verificationCode,
                                //rememberMe: this.ruleForm.rememberMe,
                            }),
                            // 设置请求头
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        })
                        .then(res => {
                            var msg = res.data.msg
                            console.log()
                            sessionStorage.setItem('userInfo',JSON.stringify(res.data.info))
                            if (msg !== '登录成功') {
                                this.option("用户名不存在或密码错误,请重新输入");
                                this.ruleForm.userName = '';
                                this.ruleForm.password = '';
                                this.ruleForm.verificationCode = '';
                                return
                            } else {
                                this.option('登录成功正在为你跳转请稍后...', 'success');
                                this.getCode();
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        //设置cookie
        setCookie(c_name, c_pwd, exdays) {
            var exdate = new Date(); //获取时间
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
            //字符串拼接cookie
            window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
            window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
        },
        //读取cookie
        getCookie: function() {
            if (document.cookie.length > 0) {
                this.ruleForm.rememberMe = true
                var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下

                for (var i = 0; i < arr.length; i++) {
                    var arr2 = arr[i].split('='); //再次切割
                    //判断查找相对应的值
                    if (arr2[0] == 'userName') {
                        this.ruleForm.userName = arr2[1]; //保存到保存数据的地方
                    } else if (arr2[0] == 'password') {
                        this.ruleForm.password = arr2[1];
                    }
                }
            } else {
                this.ruleForm.rememberMe = false
            }
        },
        //清除cookie
        clearCookie: function() {
            this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
        },
        yzn() {
            let that = this
            var verifyCode = new GVerify("checkCode");
            console.log(verifyCode.options.code)
            var codeInput = document.querySelector("#codeInput");
            codeInput.onblur = function() {
                var res = verifyCode.validate(document.getElementById("codeInput").value);
                console.log(res)
                if (res) {
                    that.isRight = true
                } else {
                    that.isRight = false
                }
            }
        }
    },
}