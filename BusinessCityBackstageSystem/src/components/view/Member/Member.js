/* eslint-disable */
import memberInfo from './memberInfo/MemberInfo.vue'
import Datatable from './MemberTable.vue'
import Lttip from '@/components/common/tipspage/lttip.vue'
import searchBox from '@/components/common/search/searchBox.vue'
import search from './search.vue'
import showWindows from './showWindow.vue'
import qs from 'qs'

export default {
  
  name: 'member',
  data() {
    return {
      valuesearch: '',
      namepage: '客户资料',
      currentPage1: 1,
      searchFn: '',
      isActive: false,
      totalCount: 0,
      pageIndex: 1,
      pageSize: 10,
      pageS: 0,
      listLoading: false,
      delArr:[],

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
        this.delArr.push(values.id)
      }
      this.clearBox()
    })
  },
  methods: {
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
      this.searchUsers()
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
           alert('网络错误，不能访问');
       })
    //   post('/api/manager/v1/user/accountQuery', para).then((response) => {
    //     this.getAllusers = response.data.data;
    //     this.totalCount = response.data.totalCount;
    //     console.log(response.data.totalCount);
    //     this.listLoading = false;
    //   }).catch(function (err) {
    //     console.log(err)
    //   });
    },
    showWindow() {
      this.$root.$emit("showWindow",'no')
    },
    closeInfo() {
      // let infos = document.getElementsByClassName("infoCover")[0]
      // console.log(infos.style.left)
      // if (!(infos.style.left == '' || infos.style.left == null || infos.style.left == undefined)) {
      //     var left1 = 16;
      //     let timer2 = setInterval(function() {
      //         left1++
      //         infos.style.left = left1 + '%';
      //         if (left1 == 100) {
      //             left1 = 100
      //             clearInterval(timer2)
      //         }
      //     }, 5);
      // }
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
    memberInfo,
    Lttip,
    search,
    Datatable,
    showWindows,
    searchBox
  },
}

