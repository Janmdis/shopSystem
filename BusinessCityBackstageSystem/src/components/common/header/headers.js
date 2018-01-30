export default {
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      ruleForm: {
        region: '',
        newPass: ''
      }, rules: {
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        newPass: [
          { pattern: /^(\w){6,20}$/, required: true,
          message: '只能输入6-20个字母、数字、下划线' },
          { validator: validatePass1, trigger: 'blur' }
        ]
      },
      navInfo: [
        { infoText: '首页', imgClass: 'icon iconfont icon-user' },
        { infoText: '会员在线', imgClass: 'icon iconfont icon-user' },
        { infoText: '产品在线', imgClass: 'icon iconfont  icon-chanpin' },
        { infoText: '运营在线', imgClass: 'icon iconfont icon-weibiaoti-' },
        { infoText: '员工在线', imgClass: 'icon iconfont icon-yunying' },
        { infoText: '管理在线', imgClass: 'icon iconfont icon-302010' },
        { infoText: '品牌管理', imgClass: 'icon iconfont icon-baobiaoguanli' },
        { infoText: '品牌在线', imgClass: 'icon iconfont icon-pinpai' },
        { infoText: '管理中心', imgClass: 'icon iconfont icon-guanlizhongxin' }
      ],
      activeName: 'one'
    }
  },
  created() {
    this.$root.$on('infoText', (infoText) => {
      this.which_to_show = infoText
    })
    let status = window.sessionStorage.getItem('status')
    this.selected(status)
  },
  methods: {
    // refn() {
    //   window.location.reload();
    // },
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
    handleLoginOut() {
      this.$router.push("/login")
    },
    selected: function (navInfo) {
      this.activeName = navInfo
      window.sessionStorage.setItem('status', navInfo)
      if (navInfo == '首页') {
        navInfo = 'one'
       this.$router.push("/index")
      } else if (navInfo == '会员在线') {
        navInfo = 'two'
      } else if (navInfo == '产品在线') {
        navInfo = 'three'
      } else if (navInfo == '运营在线') {
        navInfo = 'four'
      } else if (navInfo == '员工在线') {
        navInfo = 'five'
      } else if (navInfo == '管理在线') {
        navInfo = 'six'
      } else if (navInfo == '品牌管理') {
        navInfo = 'sevent'
      } else if (navInfo == '品牌在线') {
        navInfo = 'eight'
      } else if (navInfo == '管理中心') {
        navInfo = 'night'
      }
      
      this.$root.$emit('infoText', navInfo)
    }

  }

}
