<template>
    <el-main id="member">
        <div class="memberNav">
            <el-row class="navChild">
                <el-col :span="10" >
                    <lttip :name='namepage'></lttip>
                </el-col>
                <el-col :span="14" class="navRight">
                  <el-col :span="13"><el-input class='radiusRand' placeholder="请输入内容" v-model="searchFn"></el-input><i class="el-icon-search"></i> </el-col>  
                    <el-col :span="5"> <span class='radiusRand'><i class='icon iconfont icon-xinzenghuizong'></i>&nbsp;&nbsp;新增</span></el-col>
                     <el-col :span="4"> 
                     <el-col :span="8"><i class='icon iconfont icon-shuaxin'></i> </el-col>
                     <el-col :span="8"> <i class='icon iconfont icon-msnui-more'></i> </el-col>
                     <el-col :span="8"> <i class='icon iconfont icon-shengrizhuanqu'></i> </el-col>
                     </el-col>
                </el-col>
            </el-row>
            <el-row>
                <search></search>
            </el-row>
        </div>
        <div class="memberMain">
            <div class='boderBox'>
            <Datatable :data='tableData3'></Datatable>
            </div>
            <member-info class="infoCover"></member-info>
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
    </el-main>
</template>
<script>

import Members from './Member.js';
export default Members
</script>
<style>
.lineHeight{
   position:relative;
   top:24px;
   color:#6f6f6f;
}
table td:nth-child(3) .cell{
    border: 1px solid #ddd;
}
table td:nth-child(3) {
    padding-right:10px;
}
</style>
<style scoped lang="less">
@import './Member.less';

</style>