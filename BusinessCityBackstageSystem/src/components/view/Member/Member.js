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
            tableData3: []
        }
    },
    created() {
        this.getDate()
    },
    methods: {
        getDate() {
            let url = '/api/customer/account/query';
            this.$http({
                url: url,
                method: 'POST',
                // 请求体重发送的数据
                data: {
                },
            })
                .then(response => {
                    this.tableData3.push(response.data.info.list);
              console.log(this.tableData3)      
          })
          .catch(error=>{
              console.log(error);
              alert('网络错误，不能访问');
          })
        },
        showWindow() {
            this.$root.$emit("showWindow")
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
            console.log(`每页 ${val} 条`)
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
        }

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