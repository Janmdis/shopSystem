import vHead from "../header/Headers.vue";
import vSidebar from "../sidebar/LeftNav.vue";
var { common, cacheClass } = require("../../../assets/javascript/common.js");
/**
* model
*/
let data = {
  currentRouter: "", // 当前路由
  permissionTree: [], // 权限树
  contentProps: {}, // 主体框架需要用到的props值[menuKey: 当前菜单key, initAjaxUrl: 初始化api路径]
  menuRouter: "", // 左菜单点击事件触发的标记
};
let _this = null;
export default {
  data() {
    return data;
    dialogVisible: false
  },
  created() {
    _this = this;
    this.init();
  },
  /*watch: {
    $route(to, from) {
      this.listenRouterChange();
    }
  },*/
  components: {
    vHead, vSidebar
  },
  methods: {
    /**
    * 页面初始化方法
    */
    init: function () {
      // 判断缓存信息是否存在，不存在则直接跳转登录页，否则取里面的数据
    // var judgeLoginOut = cacheClass.judgeLoginOut(function() {
    //     _this.$router.push("/login");
    // });
      var judgeLoginOut = '';  
      var loginInfo = judgeLoginOut.loginInfo || {};
      this.permissionTree = loginInfo.permissionTree || [];
      // console.log(this.permissionTree)
      //初始化props对象
      this.listenRouterChange();
    },
    /**
    * 左侧菜单栏响应事件
    * 处理相同路由vue无响应
    */
    listenToMenuClick: function(value) {
      if(value == this.currentRouter){
        this.$router.push({
          path: value,
          query: {
            id: Math.random()
          }
        }) 
        this.$refs.routerView.init();
      }
    },
    /**
    * 监听路由变化，得到相应子组件的contentProps参数值
    */
    listenRouterChange() {
      window.vueRouter = this.$router;
      // 当前路由
      this.currentRouter = this.$router.currentRoute.path;
      var obj = null,
        isExitFor = false; //是否退出循环
      for (let i = 0; i < this.permissionTree.length; i++) {
        obj = this.permissionTree[i].childrens;
        if (obj) {
          for (let j = 0; j < obj.length; j++) {
            if (obj[j].router == this.currentRouter) {
              isExitFor = true;
              this.contentProps = {
                menuKey: obj[j].resKey,
                initAjaxUrl: obj[j].resUrl
              };
              break;
            }
          }
          if (isExitFor) break;
        }
      }
    }
  }
};