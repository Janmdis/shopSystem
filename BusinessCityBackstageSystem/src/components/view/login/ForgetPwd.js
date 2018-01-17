/* eslint-disable */
export default {
    name: 'forgetPwd',
    data() {
        return {
            ruleForm: {
                userPhone: '18356987162',
                userCompany: '',
                userCode: '',
                userPwd: '',
                userPwd1: '',
                checked: ''
            },
            options: [{ value: '选项1', label: '弘之云' }, { value: '选项2', label: '禾目子公司' }],
            value: '',
            company: false,
            companys: true,
        }
    },
    methods: {
        getver() {
            alert("...")
            let url = '/api/admin/account/sendphonecode';
            // this.$http.post(url, { 
            //     phone: this.ruleForm.userPhone,
            // })
            this.$http({
                    url: url,
                    method: 'POST',
                    // 请求体重发送的数据
                    data: {
                        phone: 18356987162,
                    },
                    // 设置请求头
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        overTime(o) {
            var wait=60;
            function time(o) {
            if (wait == 0) {
            o.removeAttribute("disabled");   
            o.value="获取验证码";
            $(o).css({"background":"#17c69b"})
            wait = 60;
            } else { 
            o.setAttribute("disabled", true);
            o.value="重新发送(" + wait + ")";
            $(o).css({"background":"#ccc"})
            wait--;
            setTimeout(function() {
                time(o)
            },
            1000)
            }
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
        checkPhone: function() {
            console.log(111)
        },
        checkCompany: function() {
            console.log(222)
        },
        checkCode: function() {
            console.log(222)
        },
        checkPwd: function() {
            console.log(222)
        },
        checkPwd1: function() {
            console.log(222)
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