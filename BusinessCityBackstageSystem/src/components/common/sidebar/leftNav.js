import ones from './siderchildren/one'
import twos from './siderchildren/two'
import threes from './siderchildren/three'
import fours from './siderchildren/four'
import fives from './siderchildren/five'
import sixs from './siderchildren/six'
import events from './siderchildren/event'
import eights from './siderchildren/eight'
import nights from './siderchildren/night'

let data = {
  cRouter: "",
  index: 0
};
let _this = null;

export default {
  data () {
    return {
      which_to_show: "" 
    }
  },
  created () {
    this.$root.$on('infoText', (infoText) => {
      console.log(infoText)
      this.which_to_show = infoText
    })
    _this = this;
    this.init();
  },
  computed: {
    onRoutes() {
      return this.$route.path;
    }
  },
  methods: {
    /**
    * 页面初始化方法
    */
    init: function () {
      this.cRouter = this.$route.path;
    },
    /**
    * 左侧菜单点击往上传递事件
    */
    handleMenuClick: function (mChild) {
      this.$emit("menuRouter", mChild.router);
    },
    /**
    * 当前激活的路由
    */
    activeRoutes(mChild) {
      this.cRouter = this.$route.path;
      let currentRouter = this.$route.path.substr(
        this.$route.path.lastIndexOf("/") + 1
      );
      let detailRouter = this.$route.path.split("/")[1];
      // 路由分支选中事件
      if (this.cRouter.indexOf(mChild.router) > -1) {
        return true;
      }
      return false;
    }
  },
  components: {
    one: ones,
    two: twos,
    three: threes,
    four: fours,
    five: fives,
    six : sixs,
    sevent: events,
    eight: eights,
    night: nights,
  }
}
