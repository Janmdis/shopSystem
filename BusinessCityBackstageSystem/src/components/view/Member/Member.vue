<template>
    <el-main id="member">
        <div class="memberNav" @click.native="closeInfo">
            <el-row class="navChild">
                <el-col :span='15'>
                    <lttip :name='namepage'></lttip>
                </el-col>
                <el-col :span='9'>
                    <div class="grid-content search">
                        <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="valuesearch" @keyup.native.13="show($event)">
                        </el-input>
                        <el-button type="primary" class="add" @click='showWindow("no")'><i class='icon iconfont icon-xinzenghuizong'></i>&nbsp;&nbsp;新增</el-button>
                        <el-button type="primary" class='shuaxin' round><i class='icon iconfont icon-shuaxin'></i></el-button>
                        <el-dropdown trigger="click" class='msnuiMore'>
                            <span class="el-dropdown-link">
                                <i class='icon iconfont icon-msnui-more'></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <el-upload class="upload-demo"
                                        id="file-upload"
                                        style="width:100%;text-align:left;"
                                        :action="importUrl"
                                        name ="multipartFile"
                                        :show-file-list="isShowList"
                                        :headers="importHeaders"
                                        :on-preview="handlePreview"
                                        file.response 
                                        :before-upload="beforeUpload"
                                        :on-success="uploadSuccess"
                                        >
                                        导入
                                    </el-upload>
                                </el-dropdown-item>
                                <el-dropdown-item class="outPut">
                                    <a class="btn-download" :href="dataHref">导出</a>
                                </el-dropdown-item>
                                <el-dropdown-item class="outPut">
                                    <a class="btn-download" href="/api/customer/customer/excelModel/out">导出导入模板</a>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <!--<el-button type="primary" class='shengrizhuanqu' round><i class='icon iconfont icon-shengrizhuanqu'></i></el-button>!-->
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="memberMain">
            <el-row>
                <search :type='type'></search>
            </el-row>
            <div class='boderBox'>
                <Datatable></Datatable>
            </div>
            <member-info class="infoCover" ref="memberInfos" v-loading="loadOk"></member-info>
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
        </div>
        <showWindows></showWindows>
        
    </el-main>
</template>
<script>
    import Members from './Member.js';
    export default Members;
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
    @import './Member.less';
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