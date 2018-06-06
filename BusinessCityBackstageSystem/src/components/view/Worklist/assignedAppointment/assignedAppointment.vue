<template>
    <el-main id="assignedAppointment">
        <div class="memberNav">
            <el-row class="navChild">
                <el-col :span='15'>
                    <lttip :name='namepage'></lttip>
                </el-col>
                <el-col :span='9'>
                   
                </el-col>
            </el-row>
        </div>
        <div class="memberMain">
            <el-col :span='15'>
                <div class="searchBox">
                    <!-- 订单列表搜索的条件 -->
                    <orderListSearch></orderListSearch>
                </div>
                <div class='boderBox'>
                    <Datatable></Datatable>
                </div>
                <el-row style='margin-bottom:80px;'>
                    <el-col :span='10'>
                        <p class='lineHeight'>从1到{{this.pageS}}/共<span>{{this.totalCount}}</span>条数据</p>
                    </el-col>
                    <el-col :span='12' :offset="12">
                        <div class="block">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-size="pageSize" layout=" prev, pager, next, jumper,total" :total="totalCount">
                            </el-pagination>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span='8'>
                <div class="searchBox">
                    <!-- 等待被派单的服务人员 -->
                    <workerListSearch></workerListSearch>
                </div>
                <div class='boderBox'>
                    <workerTable></workerTable>
                </div>
                 <el-row style='margin-bottom:80px;'>
                      <el-col :span='10'>
                        <p class='lineHeight'>从1到{{this.pageS1}}/共<span>{{this.totalCount1}}</span>条数据</p>
                    </el-col>
                    <el-col :span='12' :offset="12">
                        <div class="block">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-size="pageSize" layout=" prev, pager, next, jumper,total" :total="totalCount">
                            </el-pagination>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </div>
    </el-main>
</template>
<script>
    import assignedApp from './assignedApp.js';
    export default assignedApp;
</script>
<style>
    .lineHeight {
        position: relative;
        top: 24px;
        color: #6f6f6f;
    }

    table td:nth-child(3) {
        padding-right: 10px;
    }
    .icon-shuaxin1 {
        position: absolute;
        top: -4px;
    }
    .icon-sousuo {
        position: absolute;
        top: -9px;
        left: 359px;
    }
    .add {
        background: #27a1f2;
        border: 1px solid #27a1f2;
    }
    #file-upload .el-upload{
        width: 100% !important;
        text-align: left;
    }
    .outPut a{
        display:inline-block;
        width: 100% !important;
        text-align: left;
    }
</style>
<style scoped lang="less">
    @import './assignedApp.less';
    .search {
        position: relative;
        height: 72px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }
    .add {
        font-size: 16px;
        height: 37px;
        line-height: 0;
        margin-left: 15px;
    }
    .shengrizhuanqu,
    .msnuiMore,
    .shuaxin {
        background: none;
        border: none;
        color: #27a1f2;
        font-size: 40px;
        padding: 0;
        width: 10%;
        margin-left: 10px;
    }
</style>