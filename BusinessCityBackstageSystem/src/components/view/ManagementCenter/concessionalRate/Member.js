/* eslint-disable */
import Datatable from './MemberTable.vue'
import Lttip from './lttip.vue'
import searchBox from '@/components/common/search/searchBox.vue'
import search from '../../../common/search/search.vue'
import showWindows from './showWindow.vue'
import qs from 'qs'

export default {
  
  name: 'member',
  data() {
    return {
      valuesearch: '',
      namepage: '优惠劵',
      currentPage1: 1,
      searchFn: '',
      isActive: false,
      totalCount: 0,
      pageIndex: 1,
      pageSize: 10,
      pageS: 0,
      listLoading: false,
      delArr:[],
      type:'coupon'
    }

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
        this.delArr.push({id:values.id, isActive:false})
      }
      this.clearBox()
    })
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
        this.$http.post('/api/product/coupon/info/update',this.delArr)
        .then(function (response) {
            console.log(response);
            if(response.data.status=='200'){
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
      let data={
        coupon:{
          couponName:this.valuesearch,
          couponType:null,
          couponStatus:null,
          daterange:''
        }
          
      };
      this.$root.$emit('search',data);
      // this.searchUsers()
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
            //  data:qs.stringify( {
               
            //  }),
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
          //  //         alert('网络错误，不能访问');
       })

    },
    showWindowx() {
      this.$root.$emit("showWindow",'no')
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
  components: {
    Lttip,
    search,
    Datatable,
    showWindows,
    searchBox
  },
}

