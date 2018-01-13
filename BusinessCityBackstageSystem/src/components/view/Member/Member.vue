<template>
    <el-main id="member">
        <div class="memberNav">
            
            <el-row class="navChild">
            
                <el-col :span="10" class="navLeft">
                    <span>客户资料</span>
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
                <el-form ref="form" :model="form" label-width="80px">
                <el-row>
                    <el-col :span="4">
                    <el-form-item label="手机号">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="4">
                    <el-form-item label="小区">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="4">
                    <el-form-item label="来源">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    </el-col>
                 </el-row>
                 <el-row>
                    <el-col :span="4">
                    <el-form-item label="订单状态">
                        <el-select v-model="form.region1" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="4">
                    <el-form-item label="客户类型">
                        <el-select v-model="form.region2" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="4">
                    <el-form-item label="回访记录">
                        <el-select v-model="form.region3" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="3" class="mLeft">
                        <el-button type="primary" round>查询</el-button>
                    </el-col>
                    <el-col :span="2">
                        <i  class="el-icon-refresh"></i>
                    </el-col>
                 </el-row>
                </el-form>
            </el-row>
        </div>
        <div class="memberMain">
            <div class='boderBox'>
            <el-table
                stripe
                :data="tableData3"
                style="width: 100%"
                height="528">
                <el-table-column
                fixed
      type="index"
      label="N"
      :index="indexMethod">
    </el-table-column>
                <el-table-column
                fixed
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                class='borderRight'
                fixed
                prop="ids"
                label="ID"
                width='100'>
                </el-table-column>
                <el-table-column
                prop="name"
                label="客户姓名">
                </el-table-column>
                <el-table-column
                prop="iphone"
                width='120'
                label="手机号">
                </el-table-column>
                <el-table-column
                prop="types"
                label="客户类型">
                </el-table-column>
                <el-table-column
                prop="city"
                label="城市">
                </el-table-column>
                <el-table-column
                prop="quarters"
                label="小区">
                </el-table-column>
                <el-table-column
                prop="state"
                label="订单状态">
                </el-table-column>
                <el-table-column
                prop="source"
                label="来源">
                </el-table-column>
                <el-table-column
                prop="Inputtiem"
                width='100'
                label="录入时间">
                </el-table-column>
                <el-table-column
                width='260'
                prop="address"
                label="小区地址">
                </el-table-column>
                
            </el-table>
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