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
            listLoading: false
        }

    },
    created() {
        this.$root.$on('loading', data => {
            this.loadOk = data;
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