export default {
  data () {
    return {
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
      activeName: '首页'
    }
  },
  methods: {
    selected: function (navInfo) {
      this.activeName = navInfo
      if (navInfo == '首页') {
        this.$router.push({path: '/index', replace: true})
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

