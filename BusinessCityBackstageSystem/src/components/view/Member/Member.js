import memberInfo from './memberInfo/MemberInfo.vue'
export default {
    name:'member',
    data () {
        return {
            currentPage1: 1,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            searchFn:'',
            isActive:false,
            tableData3: [
                {
                    name: '王小虎',
                    ids:'25285',
                    iphone:'1500898888',
                    province: '上海',
                    types:'优质客户',
                    city: '上海市',
                    quarters:"贝尚湾",
                    state:'待完成',
                    source:'老客户介绍',
                    address: '上海市普陀区金沙江路 1518 弄',
                    Inputtiem: '2017-02-08'
                },
                 {
                    name: '王小虎',
                    iphone:'1500898888',
                    province: '上海',
                    types:'优质客户',
                    city: '上海市',
                    quarters:"贝尚湾",
                    state:'待完成',
                    source:'老客户介绍',
                    address: '上海市普陀区金沙江路 1518 弄',
                    Inputtiem: '2017-02-08'
                }
        ]
        }
    },
    methods: {
        indexMethod(index) {
            return index+1 ;
        },
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        }
    },
    components:{
        memberInfo,
    },
}