/* eslint-disable */
export default {
    data() {
        return {
            ruleForm: {
                userPhone: '',
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
            //判断复选框是否被勾选 勾选则调用配置cookie方法
            if (this.checked = true) {
                //传入账号名，密码，和保存天数3个参数
                this.setCookie(name, pass, 7);
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
        //设置cookie
        setCookie(c_name, c_pwd, exdays) {
            var exdate = new Date(); //获取时间
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
            //字符串拼接cookie
            window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
            window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
        },
        //读取cookie
        getCookie: function() {
            if (document.cookie.length > 0) {
                var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                for (var i = 0; i < arr.length; i++) {
                    var arr2 = arr[i].split('='); //再次切割
                    //判断查找相对应的值
                    if (arr2[0] == 'userName') {
                        this.ruleForm.userName = arr2[1]; //保存到保存数据的地方
                    } else if (arr2[0] == 'userPwd') {
                        this.ruleForm.password = arr2[1];
                    }
                }
            }
        },
        //清除cookie
        clearCookie: function() {
            this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
        }
    },
    created() {

    },
    //页面加载调用获取cookie值
    mounted() {
        this.getCookie()
    }
}