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
            totalCount: 40,
            pageIndex: 1,
            pageSize: 10,
        }
    },
    methods: {

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
            this.pageSize = val;
            this.$root.$emit('pageSize',{value:this.pageSize})
        },
        handleCurrentChange(val) {
            this.pageIndex = val;
            this.$root.$emit('pageIndex', { value: this.pageIndex })
            
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