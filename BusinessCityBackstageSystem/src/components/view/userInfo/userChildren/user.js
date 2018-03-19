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
          if (value < 6) {
            callback(new Error('必须年满6岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    return {
      ruleForm1: {
        iPhone: '',
        userName: '',
        age: '',
        date1: '',
        role: '',
        jon: '',
        resource: 1
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
          { validator: checkAge, trigger: 'blur', required: true }
        ],
        date1: [
          { required: true, message: '请选择出生日期', trigger: 'change'  }
        ],
      }
    }
  },
  methods: {
    option(test, status) {
      this.$message({
          message: test,
          type: status ? status : 'warning'
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.showData()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    getdataInfo() {
      let url = '/api/admin/account/queryadminaccount'
      this.$http({
        url: url,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {}
      })
        .then(respone => {
          let data = respone.data.info
          this.ruleForm1.iPhone = data.phone
          this.ruleForm1.userName = data.adminName
          this.ruleForm1.resource = data.adminSex + ''
          this.ruleForm1.date1 = data.adminBirthday
          this.ruleForm1.age = this.jsGetAge(data.adminBirthday+"")
          this.ruleForm1.role = data.departmentName
          this.ruleForm1.jon = data.groupName
          this.changeCount('2000-01-12')
        })
        .catch(error => {
          console.log(error)
          alert('网络错误，不能访问')
        })
    },
    showData() {
      let url = '/apiadmin/account/updateadminaccount'
      this.$http({
        url: url,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
          phone: this.ruleForm1.iPhone,
          adminName: this.ruleForm1.userName,
          adminSex: this.ruleForm1.resource,
          adminBirthday: this.ruleForm1.date1,
          departmentName: this.ruleForm1.role,
          groupName: this.ruleForm1.jon
        }
      })
        .then(respone => {
          if (respone.data.msg == '修改成功') {
            this.option(respone.data.msg,'success')
         }
        })
        .catch(error => {
          console.log(error)
          this.option('网络错误，不能访问')
        })
    },
    changeCount() {
     
      if (this.ruleForm1.date1 == "") {
          return false;
      }
      var d = new Date(this.getDate(this.ruleForm1.date1)+'');
      this.ruleForm1.age = (this.jsGetAge(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()));
      
    },
     getDate(str){
      if(str == null){
      return
      }else{
      var oDate = new Date(str),  
      oYear = oDate.getFullYear(),  
      oMonth = oDate.getMonth()+1,  
      oDay = oDate.getDate(),    
      oTime = oYear +'-'+ this.getzf(oMonth) +'-'+ this.getzf(oDay);//最后拼接时间  
      return oTime;
      }  
    },
    //补0操作  
     getzf(num){  
      if(parseInt(num) < 10){  
        num = '0'+num;  
      }  
      return num;  
    },
    jsGetAge(strBirthday) {
      var returnAge
      var strBirthdayArr = strBirthday.split('-')
      var birthYear = strBirthdayArr[0]
      var birthMonth = strBirthdayArr[1]
      var birthDay = strBirthdayArr[2]

      var d = new Date()
      var nowYear = d.getFullYear()
      var nowMonth = d.getMonth() + 1
      var nowDay = d.getDate()

      if (nowYear == birthYear) {
        returnAge = 0; // 同年 则为0岁    
      }else {
        var ageDiff = nowYear - birthYear; // 年之差    
        if (ageDiff > 0) {
          if (nowMonth == birthMonth) {
            var dayDiff = nowDay - birthDay; // 日之差    
            if (dayDiff < 0) {
              returnAge = ageDiff - 1
            }else {
              returnAge = ageDiff 
            }
          }else {
            var monthDiff = nowMonth - birthMonth; // 月之差    
            if (monthDiff < 0) {
              returnAge = ageDiff - 1
            }else {
              returnAge = ageDiff 
            }
          }
        }else {
          returnAge = -1; // 返回-1 表示出生日期输入错误 晚于今天    
        }
      }
      return returnAge; // 返回周岁年龄       
    }
  },
  created() {
    this.getdataInfo();
    
  }
}
