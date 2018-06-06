<template>
    <el-table :data="datalist" @selection-change='showextra' v-loading="this.listLoading" :stripe='true' style="width: 100%;" height='500'>
        <el-table-column fixed type="index" label="N" :index="indexMethod">
        </el-table-column>
        <el-table-column fixed type="selection" width="55">
        </el-table-column>
        <!-- <el-table-column class='borderRight' fixed prop="id" label="ID" width='360' height='100'>
                                </el-table-column> -->
        <el-table-column prop="name" fixed width='200' label="姓名">
        </el-table-column>
        <el-table-column prop="mobile" width='120' label="手机号">
        </el-table-column>
        <el-table-column label="类型">
            <template slot-scope='scope'>
                <span >
                {{scope.row.customerCategory}}
                </span>
            </template>
        </el-table-column>
        <el-table-column
        prop='cityName'
        label="城市">
        
        </el-table-column>
        <el-table-column
            width='300'
            label="小区">
            <template slot-scope='scope'>
                {{scope.row.quarters}}
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
                this.getDate(this.pageIndex)
            })
            this.getDate(1)
            this.$root.$on('getDatezdy', (data) => {
                this.getDate(data)
            })
            this.$root.$on('dataListBox', (data) => {
                this.datalist = data
            })
        },
        methods: {
            getDate(pageIndex) {
                this.listLoading =  true;
                let url = '/api/product/mall/template/query?page='+pageIndex+'&pageSize=10';
                this.$http({
                    url: url,
                    method: 'POST',
                    // 请求体重发送的数据
                    // headers: { 'Content-Type': 'application/json' },
                    data:{
                        'templateType':1
                    },
                })
                .then(response => {
                    this.listLoading =  false;
                    this.datalist=(response.data.info.list);
                    console.log(response.data.msg)
                    this.$root.$emit('pages1',response.data.info.pages)
                    this.$root.$emit('total1',response.data.info.total)
                })
                .catch(error=>{
                    console.log(error);
                    // //         alert('网络错误，不能访问');
                })
            },
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
            this.$root.$off('getDatezdy')
        }
    }
</script>
