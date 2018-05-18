export default {
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      userName: '',
      imgUrl: '',
      dataInfo: [],
      ruleForm: {
        region: '',
        newPass: ''
      },
      rules: {
        region: [{
          required: true,
          message: '请选择活动区域',
          trigger: 'change'
        }],
        newPass: [{
            pattern: /^(\w){6,20}$/,
            required: true,
            message: '只能输入6-20个字母、数字、下划线'
          },
          {
            validator: validatePass1,
            trigger: 'blur'
          }
        ]
      },
      navInfo: [{
          infoText: '首页',
          imgClass: 'icon iconfont icon-shouye'
        },
        {
          infoText: '会员在线',
          imgClass: 'icon iconfont icon-user'
        },
        {
          infoText: '商城在线',
          imgClass: 'icon iconfont  icon-chanpin'
        },
        // { infoText: '运营在线', imgClass: 'icon iconfont icon-weibiaoti-' },
        // { infoText: '员工在线', imgClass: 'icon iconfont icon-yunying' },
        {
          infoText: '组织管理',
          imgClass: 'icon iconfont icon-302010'
        },
        // { infoText: '品牌管理', imgClass: 'icon iconfont icon-baobiaoguanli' },
        // { infoText: '品牌在线', imgClass: 'icon iconfont icon-pinpai' },
        {
          infoText: '基础配置',
          imgClass: 'icon iconfont icon-guanlizhongxin'
        },
        {
          infoText: '工单配置',
          imgClass: 'icon iconfont icon-order'
        }
      ],
      activeName: 'one'
    }
  },
  created() {
    this.getInfo();
    this.$root.$on('infoText', (infoText) => {
      this.which_to_show = infoText
    })
    let status = window.sessionStorage.getItem('status')

    this.userName = (JSON.parse(sessionStorage.getItem('userInfo')).adminName);
    this.imgUrl = JSON.parse(sessionStorage.getItem('userInfo')).adminHeadImg;
    this.$root.$on("userName", data => {
      this.userName = data;
    });
    this.$root.$on('useImgOF', data => {
      this.imgUrl = data;
    });
    this.imgUrl = localStorage.getItem('useImgOF');
  },
  methods: {
    // refn() {
    //   window.location.reload();
    // },
    getInfo() {
      let url = '/api/public/message/record/query';
      this.$http({
        url: url,
        method: 'post',
        data: {}
      }).then((msg) => {
        if (msg.data.info.list) {
          this.dataInfo = msg.data.info.list
        }
      }).catch((err) => {
        console.log(err)
      })
    },
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
      let url = '/api/public/logout';
      this.$http({
          url: url,
          method: 'get',
          // 请求体重发送的数据
          //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          //  data:qs.stringify( {

          //  }),
        })
        .then(response => {
          if (response.data.msg == "ok") {
            sessionStorage.removeItem("status")
            sessionStorage.removeItem("infoText")
            sessionStorage.removeItem("userInfo")
            this.$router.push("/login")
          }

        })
        .catch(error => {
          console.log(error);
          // //         alert('网络错误，不能访问');
        })

    },
    selected: function (navInfo) {
      this.activeName = navInfo
      window.sessionStorage.setItem('status', navInfo)
      if (navInfo == '首页') {
        navInfo = 'one'
        this.$router.push("/index")
      } else if (navInfo == '会员在线') {
        navInfo = 'two'
      } else if (navInfo == '商城在线') {
        navInfo = 'three'
      } else if (navInfo == '运营在线') {
        navInfo = 'four'
      } else if (navInfo == '员工在线') {
        navInfo = 'five'
      } else if (navInfo == '组织管理') {
        navInfo = 'six'
      } else if (navInfo == '品牌管理') {
        navInfo = 'sevent'
      } else if (navInfo == '工单配置') {
        navInfo = 'eight'
      } else if (navInfo == '基础配置') {
        navInfo = 'night'
      }

      this.$root.$emit('infoText', navInfo)
    }

  }

}

