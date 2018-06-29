<template>
    <el-table :data="datalist" @selection-change='showextra' v-loading="listLoading" :stripe='true' style="width: 100%;" height='500'>
        <el-table-column fixed type="index" label="N" :index="indexMethod">
        </el-table-column>
        <el-table-column fixed type="selection" width="55">
        </el-table-column>
        <!-- <el-table-column class='borderRight' fixed prop="id" label="ID" width='360' height='100'>
                                </el-table-column> -->
        <el-table-column fixed width='100' label="姓名">
            <template slot-scope='scope'>
                {{scope.row.orderDetail.name}}
            </template>
        </el-table-column>
        <el-table-column width='120' label="电话">
            <template slot-scope='scope'>
                {{scope.row.orderDetail.phone}}
            </template>
        </el-table-column>
        <el-table-column width='120' label="商品名称">
            <template slot-scope='scope'>
                {{scope.row.orderDetail.commodityName}}
            </template>
        </el-table-column>
        <el-table-column width='120' label="规格">
            <template slot-scope='scope'>
                {{scope.row.orderDetail.condition1Name==null?'':scope.row.orderDetail.condition1Name+'/'
                +scope.row.orderDetail.condition2Name==null?'':scope.row.orderDetail.condition2Name}}
            </template>
        </el-table-column>
        <el-table-column prop="number" width='120' label="数量">
        </el-table-column>
        <el-table-column prop='area' width='120' label="区域">
        </el-table-column>
        <el-table-column
            width='200'
            label="街道">
            <template slot-scope='scope'>
                {{scope.row.street}}
            </template>
        </el-table-column>
        <el-table-column
            width='200'
            label="小区">
            <template slot-scope='scope'>
                {{scope.row.orderDetail.communityName}}
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
    / eslint-disable /
    export default {
        data() {
            return {
                datalist: [],
                showLeft: 0,
                pageIndex: 1,
                listLoading:false
            }
        },
        created: function() {
            this.$root.$on('orderListloading',(data) => {
               this.listLoading =  true;
            })
             this.$root.$on('dataListOrderList', (data) => {
                this.datalist = data
                this.listLoading =  false;
            })
        },
        methods: {
            showextra(val) {
                let show = false;
                let editcan = true;
                this.multipleSelection = val
                this.$root.$emit('orderListDataz',this.multipleSelection)
            },
            indexMethod(index) {
                return index + 1
            },
        },
        beforeDestroy() {
            this.$root.$off('pageIndex')
        }
    }
</script>
