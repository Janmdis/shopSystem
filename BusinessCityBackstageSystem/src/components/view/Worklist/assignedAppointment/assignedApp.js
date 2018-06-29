/* eslint-disable */
import Lttip from './lttip.vue'
import Datatable from './assignedAppTable.vue'
import workerTable from './workerTable.vue'
import orderListSearch from './orderListSearch.vue'
import workerListSearch from './workerListSearch.vue'
import qs from 'qs'
import moment from "moment"


export default {

    name: 'member',
    data() {

        return {
            loadOk: true,
            namepage: '指派工单',
            currentPage1: 1,
            isActive: false,
            pageIndex: 1,
            pageSize: 10,
            workerPageIndex:1,
            workerPageSize:10,
            totalCount: 0,
            pageS: 0,
            totalCount1: 0,
            pageS1: 0,
            listLoading: false,
            workerDatas:[],
            orderListDataz:[]
        }

    },
    created() {
        this.$root.$on('loading', data => {
            this.loadOk = data;
        })
        this.$root.$on('workerDatas', data => {
            this.workerDatas = data;
        })
        this.$root.$on('orderListDataz', data => {
            this.orderListDataz = data;
        })
    },
    mounted() {
        this.$root.$on('total', (data) => {
            this.totalCount = data
        })
        this.$root.$on('pages', (data) => {
            this.pageS = data
        })
        this.$root.$on('total1', (data) => {
            this.totalCount1 = data
        })
        this.$root.$on('pages1', (data) => {
            this.pageS1 = data
        })
    },
    methods: {
        orderListSizeChange(val) {
            this.pageSize = val;
            this.$root.$emit('pageSize', {
                value: this.pageSize
            })
        },
        orderListCurrentChange(val) {
            this.pageIndex = val;
            this.$root.$emit('pageIndex', {
                value: this.pageIndex
            })

        },
        workerListSizeChange(val) {
            this.workerPageSize = val;
            this.$root.$emit('workerPageSize', {
                value: this.workerPageSize
            })
        },
        workerListCurrentChange(val) {
            this.workerPageIndex = val;
            this.$root.$emit('workerPageIndex', {
                value: this.workerPageIndex
            })

        },
        assignedAppointment(){
            console.log(this.workerDatas)
            console.log(this.orderListDataz)
            if(this.orderListDataz == 0){
                alert('请选择订单')
                return
            };
            if(this.workerDatas.length == 0 ){
                alert('请选择人员')
                return
            };
            let orderArr = this.orderListDataz;
            let workerArr = this.workerDatas;
            let orderNewArr = [];
            let workerNewId = [];
            let workerNewPhone = [];
            orderArr.forEach((e, i) => {
                orderNewArr.push(e.orderDetail.orderId);
            });
            workerArr.forEach((e, i) => {
                workerNewId.push(e.id);
                workerNewPhone.push(e.phone);
            });
            let datas = {
                "orderInfoId":orderNewArr,
                "housekeeperId":workerNewId,
                "phone":workerNewPhone
            }
            console.log(datas)
            let that = this;
            var url = '/api/product/ProjectEstablish/updateByOrderInfoId'
            this.$http({
                url: url,
                method: 'post',
                data: datas,
            }).then(respone => {
                console.log(respone)
            }).catch(error =>{
                console.log(error)
            })
        }
    },
    components: {
        Lttip,
        Datatable,
        workerTable,
        orderListSearch,
        workerListSearch
    },
    beforeDestroy() {
        this.$root.$off('loading');
        this.$root.$off('total');
        this.$root.$off('pages');
        this.$root.$off('total1');
        this.$root.$off('pages1');
    }
}