/* eslint-disable */
import qs from 'qs'
import overtimer from './overtime.vue'
export default {
  name: 'forgetPwd',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.userPwd1 !== '') {
          this.$refs.ruleForm.validateField('userPwd1')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.userPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      disabled: false,
      ruleForm: {
        userPhone: '',
        // userCompany: '',
        userCode: '',
        userPwd: '',
        userPwd1: '',
        region: ''
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
          {
            pattern: /^(\w){6,20}$/, required: true,
            message: '只能输入6-20个字母、数字、下划线'
          },
          { validator: validatePass, trigger: 'blur' }

        ],
        userPwd1: [
          {
            pattern: /^(\w){6,20}$/, required: true,
            message: '只能输入6-20个字母、数字、下划线'
          },
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
      companys: true
    }
  },
  methods: {
    option(test,status) {
        this.$message({
            message: test,
            type:status?status:'warning'
      })
    },
      send: function () {
      this.disabled = true
      setTimeout(this.sended, 2000)
    },
    sended() {
      this.$refs.c1.run()
      this.disabled = false
    },
    getver() {
      if (this.ruleForm.userPhone != '') {
        this.send()
        let url = '/api/admin/account/sendphonecode'
        this.$http({
          url: url,
          method: 'POST',
          // 请求体重发送的数据
          data: qs.stringify({
            phone: this.ruleForm.userPhone
          }),
          // 设置请求头
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(res => {
              console.log()
              this.option(res.data.msg)  
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.option('请填写手机号')
      }
    },
    jumpLogin() {
      this.$router.push('/login')
    },
    isCompany() {
      if ( (this.options == null || this.options == '' || this.options == undefined)) {
        console.log(this.options)
        this.companys = true
        return this.company = false
      } else {
        this.companys = false
        return this.company = true
      }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url = '/api/admin/account/setpassword'
            this.$http({
                url: url,
                method: 'POST',
                // 请求体重发送的数据
                data: qs.stringify({
                    phone: this.ruleForm.userPhone,
                    newPassword: this.ruleForm.userPwd,
                    confirmPassword:this.ruleForm.userPwd1,
                    proof:this.ruleForm.userCode,
                    //verificationCode:this.ruleForm.verificationCode,
                    //rememberMe: this.ruleForm.rememberMe,
                }),
                // 设置请求头
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(res => {
                if (res.body == 'fail') {
                    alert('用户名或密码错误,请重新输入')
                    this.ruleForm.userName = ''
                    this.ruleForm.password = ''
                    return
                } else {
                    this.$alert('3秒后自动跳转到...', '登陆成功', {
                    confirmButtonText: '确定'
                    })
                // this.$router.push("/index")
                }
                })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

    },
    components: {
        overtimer
  },

  // 页面加载调用获取cookie值
  mounted() {
    // this.getCookie()
  }
}
