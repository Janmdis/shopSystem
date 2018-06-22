<template>
    <el-table :data="datalist" @selection-change='showextra' v-loading="this.listLoading" :stripe='true' style="width: 100%;" height='500'>
        <el-table-column fixed type="index" label="N" :index="indexMethod">
        </el-table-column>
        <el-table-column fixed type="selection" width="55">
        </el-table-column>
        <!-- <el-table-column class='borderRight' fixed prop="id" label="ID" width='360' height='100'>
                                </el-table-column> -->
        <el-table-column prop="name" fixed width='100' label="姓名">
        </el-table-column>
        <el-table-column prop="mobile" width='120' label="电话">
        </el-table-column>
        <el-table-column prop="mobile" width='120' label="商品名称">
        </el-table-column>
        <el-table-column prop="mobile" width='120' label="规格">
        </el-table-column>
        <el-table-column prop="mobile" width='120' label="数量">
        </el-table-column>
        <el-table-column prop='cityName' width='120' label="区域">
        </el-table-column>
        <el-table-column
            width='200'
            label="街道">
            <template slot-scope='scope'>
                {{scope.row.quarters}}
            </template>
        </el-table-column>
        <el-table-column
            width='200'
            label="小区">
            <template slot-scope='scope'>
                {{scope.row.quarters}}
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
    / eslint-disable /
    export default {
        prop: ['listLoading'],
        data() {
            return {
                datalist: [],
                showLeft: 0,
                pageIndex: 1,
            }
        },
        created: function() {
            this.$root.$on('pageIndex', (data) => {
                this.pageIndex = data.value
            })
            this.$root.$on('dataListBox', (data) => {
                this.datalist = data
            })
        },
        methods: {
            showextra(val) {
                let show = false;
                let editcan = true;
                this.multipleSelection = val
                if (this.multipleSelection.length > 0) {
                    show = true;
                }
                if (this.multipleSelection.length > 1) {
                    editcan = false;
                }
                this.$root.$emit('showlttip', {
                    show,
                    editcan,
                    num: this.multipleSelection.length,
                    datas: this.multipleSelection
                });
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
