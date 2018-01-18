/* eslint-disable */
import qs from 'qs'
export default {
    name: 'forgetPwd',
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              if (this.ruleForm.userPwd1 !== '') {
                this.$refs.ruleForm.validateField('userPwd1');
              }
              callback();
            }
          };
          var validatePass2 = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.userPwd) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          };
        return {
            time: 60, // 发送验证码倒计时
            sendMsgDisabled: false,
            ruleForm: {
                userPhone: '',
                //userCompany: '',
                userCode: '',
                userPwd: '',
                userPwd1: '',
                region: '',
            },
            rules: {
                userPhone: [
                    {
                        pattern: /^1[3|4|5|7|8][0-9]{9}$/g,
                        required: true,
                        message: '请输入正确的手机号',
                        trigger: 'blur'
                    }
                ],
                userPwd: [
                    { pattern: /^(\w){6,20}$/, required: true,
                    message: '只能输入6-20个字母、数字、下划线' },
                    { validator: validatePass, trigger: 'blur' }
          
                  ],
                  userPwd1: [
                    { pattern: /^(\w){6,20}$/, required: true,
                    message: '只能输入6-20个字母、数字、下划线' },
                    { validator: validatePass2, trigger: 'blur' }
          
                ],
                userCompany: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                userCode: [
                    { required: true, message: '请填写验证码', trigger: 'blur' }
                ]
            },
            value: '',
            company: false,
            companys: true,
        }
    },
    methods: {
        option() {
            this.$message('请填写手机号');
        },
        send() {
            let me = this;
            me.sendMsgDisabled = true;
            let interval = window.setInterval(function() {
             if ((me.time--) <= 0) {
              me.time = 60;
              me.sendMsgDisabled = false;
              window.clearInterval(interval);
             }
            }, 1000);
           },
        getver(a) {
            
            if (this.ruleForm.userPhone != '') {
                this.send()
            alert("..18356987162")
            let url = '/api/admin/account/sendphonecode';
            this.$http({
                    url: url,
                    method: 'POST',
                    // 请求体重发送的数据
                    data: {
                        phone:this.ruleForm.userPhone
                    },
                    // 设置请求头
                    // headers: {
                    //     'Content-Type': 'application/x-www-form-urlencoded'
                    // }
                })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                }) 
        } else {
            this.option();
            }
        },
        jumpLogin() {
            this.$router.push('/login')
        },
        isCompany() {
            if ((this.options == null || this.options == '' || this.options == undefined)) {
                console.log(this.options)
                this.companys = true;
                return this.company = false;
            } else {
                this.companys = false;
                return this.company = true;
            }
        },
        logining(ruleForm) {
            var name = this.ruleForm.userName; // 保存的账号
            var pass = this.ruleForm.userPwd; // 保存的密码
            if (name == '' || name == null) {
                alert("请输入正确的用户名");
                return
            } else if (pass == '' || pass == null) {
                alert("请输入正确的密码");
                return
            }
            if (name.match(/^[a-zA-Z]\w{5,17}$/)) {
                alert(name)
            } else {
                alert("用户账号或密码不正确")
            }
            if (pass.match(/^[a-zA-Z]\w{5,17}$/)) {
                alert(pass)
            } else {
                alert("用户账号或密码不正确")
            }
            //接口
            var url = 'myserver/user/login';
            this.$http.post(url, this.ruleForm, { emulateJSON: true })
                .then(res => {
                    if (res.body == "fail") {
                        alert("用户名或密码错误,请重新输入");
                        this.ruleForm.userName = '';
                        this.ruleForm.password = '';
                        return
                    } else {
                        this.$alert('3秒后自动跳转到...', '登陆成功', {
                            confirmButtonText: '确定',
                        });
                        //this.$router.push("/index")
                    }
                });
        },
    },
    created() {

    },
    //页面加载调用获取cookie值
    mounted() {
        // this.getCookie()
    }
}