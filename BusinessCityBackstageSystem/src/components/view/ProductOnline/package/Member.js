/* eslint-disable */
import Datatable from './MemberTable.vue'
import Lttip from './lttip.vue'
import searchBox from '@/components/common/search/searchBox.vue'
import search from '../../../common/search/search.vue'
import showWindows from './showWindow.vue'
import detailpackage from './detailpackage.vue'
import  detailcommodity from '@/components/view/ProductOnline/commodity/detailcommodity.vue'
import detailTempalteList from './../commodity/detailTempalteList.vue'
import qs from 'qs'

export default {
  
  name: 'member',
  data() {
    return {
      valuesearch: '',
      namepage: '套餐',
      currentPage1: 1,
      searchFn: '',
      isActive: false,
      totalCount: 0,
      pageIndex: 1,
      pageSize: 10,
      pageS: 0,
      listLoading: false,
      delArr:[],
      type:'commodity',
      show:true
    }

  },
  created:function(){
    // 获取商品图片
    this.$store.dispatch('getImglistcommodity');
    this.$root.$on('editpackage',()=>{
      this.show=false;
    });
    this.$root.$on('reloadpackagelist',()=>{
      this.show=true;
    });
  },
  mounted() {
    this.$root.$on('total', (data) => {
      this.totalCount = data
    })
    this.$root.$on('pages', (data) => {
      this.pageS = data
    })
    this.$root.$on("delBox", (data) => {
      for (var values  of data) {
        this.delArr.push(values.id)
      }
      this.clearBox()
    })
    this.$root.$on('adddata',()=>{
      
    });
  },
  methods: {
    Refresh() {
      // this.$root.$emit('getDatezdy', 1);
      this.handleCurrentChange(1)
      // this.handleSizeChange(1)
  },
    clearBox() {
      let that = this;
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(()=>{
        this.$http.post('/api/customer/account/remove',this.delArr)
        .then(function (response) {
            console.log(response);
            if(response.data.msg=='删除成功'){
                that.$message({
                    type:'success',
                    message:'删除成功!'
                });
                that.$root.$emit('getDatezdy',1)
            }
            else{
                that.$message({
                    type:'info',
                    message:response.data.msg
                });
            }
        })
        .catch(function (response) {
            that.$message({
                type:'info',
                message:'删除失败!'
            });
        });
    }).catch(()=>{
        this.$message({
            type: 'info',
            message: '已取消删除'
        });
    })
    },
    show: function (val) {
      // this.searchUsers()
      let data={
        commodity:{
          'categoryId':null,
          'isOnSale':null,
          'maxPrice':null,
          'minPrice':null,
          'name':this.valuesearch
        }
      }
      this.$root.$emit("search",data);
    },
    searchUsers() {
      let para = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      };
      if (!this.valuesearch.replace(/\s/g, "") == '') {
        para.username = this.valuesearch.replace(/\s/g, "")
      }
      this.listLoading = true;
      let _this = this;
        let url = '/api/customer/account/search?page='+ this.pageIndex+'&pageSize=10&keyword='+para.username;
         this.$http({
             url: url,
             method: 'POST',
            // 请求体重发送的数据
             headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
         })
           .then(response => {
           console.log(response)
            //  this.listLoading =  false;
             this.datalist = (response.data.info.list);
             this.$root.$emit('dataListBox',this.datalist)
             this.$root.$emit('pages',response.data.info.pages)
             this.$root.$emit('total', response.data.info.total)
             
       })
       .catch(error=>{
           console.log(error);
           //         alert('网络错误，不能访问');
       })

    },
    showWindow() {
      this.$root.$emit("showWindow",{flag:'create'});
    },
    closeInfo() {

    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.$root.$emit('pageSize', {
        value: this.pageSize
      })
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.$root.$emit('pageIndex', {
        value: this.pageIndex
      })

    },

  },
  beforeDestroy:function(){
    this.$root.$off('total');
    this.$root.$off('pages');
    this.$root.$off('delBox');
    this.$root.$off('adddata');
    this.$root.$off('editpackage');
    this.$root.$off('reloadpackagelist');
    
  },
  components: {
    Lttip,
    search,
    Datatable,
    showWindows,
    searchBox,
    detailpackage,
    detailcommodity,
    detailTempalteList
  },
}

