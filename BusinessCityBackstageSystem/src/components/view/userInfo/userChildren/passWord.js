export default {
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }else if (value == this.ruleForm2.newPass) {
        callback(new Error('新密码和密码不能一致!'))
       this.$refs.ruleForm2.validateField('newPass')  
       } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      radio: '1',
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      value1: '',
      ruleForm2: {
        pass: '',
        checkPass: '',
        newPass: ''
      },
      rules2: {
        newPass: [
          { pattern: /^(\w){6,20}$/, required: true,
          message: '只能输入6-20个字母、数字、下划线' },
          { validator: validatePass1, trigger: 'blur' }
        ],
        pass: [
          { pattern: /^(\w){6,20}$/, required: true,
          message: '只能输入6-20个字母、数字、下划线' },
          { validator: validatePass, trigger: 'blur' }

        ],
        checkPass: [
          { pattern: /^(\w){6,20}$/, required: true,
          message: '只能输入6-20个字母、数字、下划线' },
          { validator: validatePass2, trigger: 'blur' }

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
    },
    gemessage() {
      let url = '/api/admin/account/updateadminaccount'
      this.$http({
        url: url,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {}
      })
        .then(respone => {
          let data = respone.data.info
          console.log(data.adminSex)
        })
        .catch(error => {
          console.log(error)
          alert('网络错误，不能访问')
        })
    }
  }
}
