<template>
    <el-main id="member" >
        <div class="memberNav" @click.native="closeInfo">
            <el-row class="navChild">
            <el-col :span='15'>
                <lttip :name='namepage'></lttip>
            </el-col>
            <el-col :span='9' >
                <div class="grid-content search">
                    <el-input
                        placeholder="请输入内容"
                        suffix-icon="el-icon-search"
                        v-model="valuesearch">
                    </el-input>
                    <el-button type="primary" class="add" @click='showWindow' round><i class='icon iconfont icon-xinzenghuizong'></i>&nbsp;&nbsp;新增</el-button>
                    
                    <el-button type="primary" class='shuaxin' round><i class='icon iconfont icon-shuaxin'></i></el-button>
                    
                </div>
            </el-col>
   
            </el-row>
            
        </div>
        <div class="memberMain">
            <div class='boderBox'>
            <Datatable :data='tableData3'></Datatable>
            </div>
            <el-row>
                <el-col :span='10'>
                    <p class='lineHeight'>从1到20/共<span>21</span>条数据</p>
                </el-col>
                <el-col :span='12' :offset="12">
                <div class="block" >
               
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage1"
                layout=" prev, pager, next, jumper,total"
                :total="400">
                </el-pagination>
               
            </div></el-col>
            </el-row>
            
        </div>
        <showWindows></showWindows>
    </el-main>
</template>
<script>

import User from './User.js';
export default User
</script>
<style>
el-input__icon el-icon-search{
    line-height: 32px;
}
.lineHeight{
   position:relative;
   top:24px;
   color:#6f6f6f;
}

table td:nth-child(3) {
    padding-right:10px;
}
.icon-shuaxin1{
    position: absolute;
    top: -4px;
}
.icon-sousuo{
    position: absolute;
    top: -9px;
    left: 359px;
}
</style>
<style scoped lang="less">
@import './User.less';
.add {
    background:#00aeaa;
}
.search {
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
.add{
    font-size: 16px;
    height: 37px;
    line-height: 0;
    margin-left: 15px;
}
              
.shengrizhuanqu,.msnuiMore,.shuaxin{
    background: none;
    border: none;
    color: #00adab;
    font-size: 40px;
    padding: 0;
    width:10%;
}

</style>