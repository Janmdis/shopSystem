<template>
    <el-main id="member" >
        <div class="memberNav" @click.native="closeInfo">
            <el-row class="navChild">
                <el-col :span='15'>
                    <lttip :name='namepage'></lttip>
                </el-col>
                <el-col :span='9'>
                    <div class="grid-content search">
                        <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="valuesearch" @keyup.native.13="show($event)">
                        </el-input>
                        <el-button type="primary" class="add" @click='showWindow($event)'><i class='icon iconfont icon-xinzenghuizong'></i>&nbsp;&nbsp;新增</el-button>
                        <el-button type="primary" class='shuaxin' round><i class='icon iconfont icon-shuaxin'></i></el-button>
                        <!-- <el-button type="primary" class='msnuiMore' round><i class='icon iconfont icon-msnui-more'></i></el-button> -->
                        <!-- <el-button type="primary" class='shengrizhuanqu' round><i class='icon iconfont icon-shengrizhuanqu'></i></el-button> -->
                    </div>
                </el-col>
            </el-row>
            <el-row>
              
            </el-row>
        </div>
        <div class="memberMain productMain1">
            <el-row>
                <search :type='type'></search>
            </el-row>
            <div class='boderBox'>
               <Datatable></Datatable>
            </div>
            <el-row>
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
        <showWindows v-show="show_add"></showWindows>
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
</style>
<style scoped lang="less">
     @import '../Member.less';
     #member .productMain1{
         height:auto;
     }
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
    }
</style>