<template>
    <el-main id="member" style='padding-bottom:100px;'>
        <div class="memberNav" @click.native="closeInfo">
            <el-row class="navChild">
                <el-col :span='15'>
                    <lttip :name='namepage'></lttip>
                </el-col>
            </el-row>
        </div>
        <div class="memberMain">
            <div class='boderBox'>
               <Datatable></Datatable>
            </div>
            
        </div>
    </el-main>
</template>
<script>
     import Members from './Member.js';
     export default Members
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
    @import '../Member.less';
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