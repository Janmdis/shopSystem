export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    var brithday = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('日期不能为空'))
      } else {
      }
    }
    return {
      radio: '1',
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },  
      ruleForm1: {
        iPhone: '',
        userName: '',
        age: '',
        brithday: ''
      },
      rules1: {
        iPhone: [
          {
            pattern: /^1[3|4|5|7|8][0-9]{9}$/g,
            required: true,
            message: '请输入正确的手机号'
          }
        ],
        userName: [
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z]+$/,
            required: true,
            message: '中文或英文名字'
          }
        ],
        age: [
          { validator: checkAge, trigger: 'blur', required: true, }
        ],
        brithday: [
          {
            validator:brithday,
            required: true,
            message: '请输入日期'
          }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  created() {
    let url = '';
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
    .then(response=>{
        console.log(response);
        this.oftenGoods=response.data;
    })
    .catch(error=>{
        console.log(error);
        alert('网络错误，不能访问');
    })
  }
}
