<template>
    <el-table :data="datalist" @selection-change='showextra' v-loading="this.listLoading" :stripe='true' style="width: 100%;" height='557'>
        <el-table-column fixed type="index" label="N" :index="indexMethod">
        </el-table-column>
        <el-table-column fixed type="selection" width="55">
        </el-table-column>
        <!-- <el-table-column class='borderRight' fixed prop="id" label="ID" width='360' height='100'>
                                </el-table-column> -->
        <el-table-column prop="adminName" fixed width='100' label="姓名">
        </el-table-column>
        <el-table-column prop="name" width='100' label="订单数">
        </el-table-column>
        <el-table-column prop="phone" width='120' label="手机号">
        </el-table-column>
        <el-table-column label="类型">
            <template slot-scope='scope'>
                <span>
                {{scope.row.employeeTypeName}}
                </span>
            </template>
        </el-table-column>
        <el-table-column
        prop='cityName'
        label="城市">
        
        </el-table-column>
        <el-table-column
            width='200'
            label="区域">
            <template slot-scope='scope'>
                {{scope.row.disName}}
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
    / eslint-disable /
    // import {
    //     mapState
    // } from 'Vuex'
    export default {
        data() {
            return {
                datalist: [],
                showLeft: 0,
                listLoading:false
            }
        },
        created: function() {
            this.$root.$on('workerloading',(data) => {
               this.listLoading =  true;
            })
            this.$root.$on('dataListWorker', (data) => {
                this.datalist = data
                this.listLoading =  false;
            })
        },
        methods: {
            showextra(val) {
                let show = false;
                let editcan = true;
                this.multipleSelection = val
               // console.log(this.multipleSelection)
                this.$root.$emit('workerDatas',this.multipleSelection)
            },
            indexMethod(index) {
                return index + 1
            },
        },
        beforeDestroy() {
            this.$root.$off('pageIndex')
            this.$root.$off('getDatezdy')
        }
    }
</script>
