import memberInfo from './memberInfo/MemberInfo.vue'
import Datatable from './MemberTable.vue'
import Lttip from '@/components/common/tipspage/lttip.vue'
import search from './search.vue'
export default {
  name: 'member',
  data() {
    return {
      namepage: '客户资料',
      currentPage1: 1,

      searchFn: '',
      isActive: false,
      tableData3: [
        {
          name: '王小虎',
          ids: '25285',
          iphone: '1500898888',
          province: '上海',
          types: '优质客户',
          city: '上海市',
          quarters: '贝尚湾',
          state: '待完成',
          source: '老客户介绍',
          address: '上海市普陀区金沙江路 1518 弄',
          Inputtiem: '2017-02-08'
        },
        {
          name: '王小虎',
          iphone: '1500898888',
          province: '上海',
          types: '优质客户',
          city: '上海市',
          quarters: '贝尚湾',
          state: '待完成',
          source: '老客户介绍',
          address: '上海市普陀区金沙江路 1518 弄',
          Inputtiem: '2017-02-08'
        }
      ]
    }
  },
  methods: {

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    showextra(isall) {
      let inputdom = document.getElementsByClassName('el-table__body-wrapper')[0].getElementsByTagName('input')
      let num = 0
      let allnum = inputdom.length
      for (let i = 0;i < inputdom.length;i++) {
        if (inputdom[i].checked) {
          num++
        }
      }
      let show = false
      let editcan = true
      if (isall) {
        if (num == 0 || num != allnum) {
          show = true
          editcan = false
          num = allnum
        }else {
          show = false
          num = 0
        }
      }else {
        if (num != 0) {
          show = true
          editcan = num > 1 ? false : true
        }else {
          show = false
        }
      }
      this.$root.$emit('showlttip', {show,editcan,num})

    // console.log(num)
    // if((!isall&&num==allnum)||(isall&&num==0)){
    //     console.log('全选')
    // }
    }

  },
  components: {
    memberInfo,
      Lttip,
      search,
      Datatable
  }
}
