/* eslint-disable */
import memberInfo from './memberInfo/MemberInfo.vue'
import Datatable from './MemberTable.vue'
import Lttip from '@/components/common/tipspage/lttip.vue'
import searchBox from '@/components/common/search/searchBox.vue'
import search from './search.vue'
import showWindows from './showWindow.vue'
export default {
    name: 'member',
    data() {
        return {
            valuesearch:'',
            namepage: '客户资料',
            currentPage1: 1,
            searchFn: '',
            isActive: false,
            tableData3: [{
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
                }
            ]
        }
    },
    mounted() {

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