<template>
    <div class="grid-content content">
        <el-row class='head-top'>
            <el-col :span='8'>
                <div class="grid-content">
                    <p class='title'>员工列表</p>
                </div>
            </el-col>
            <el-col :span='16'>
                <div class="grid-content search">
                    <el-input
                        placeholder="请输入内容"
                        suffix-icon="el-icon-search"
                        v-model="searchvalue">
                    </el-input>
                    <el-button type="primary">新增</el-button>
                    <el-button type="primary">导入</el-button>
                    <el-button type="primary">导出</el-button>
                    <el-button type="primary" class='shuaxin' @click='Refresh' round><i class='icon iconfont icon-shuaxin'></i></el-button>
                </div>
                
            </el-col>
        </el-row>
        <div class='list table-list'>
            <el-table
            :data="datalist"
            style="width: 100%;height:85%"
            :stripe='true'>
                <el-table-column
                prop="num"
                label="员工编号"
                align='center'>
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                align='center'>
                </el-table-column>
                <el-table-column
                prop="phone"
                label="手机号"
                align='center'
                width='150'>
                </el-table-column>
                <el-table-column
                prop="sex"
                label="性别"
                align='center'>
                </el-table-column>
                <el-table-column
                prop="type"
                label="员工种类"
                align='center'>
                </el-table-column>
                 <el-table-column
                prop="department"
                label="部门"
                align='center'>
                </el-table-column>
                 <el-table-column
                prop="role"
                label="角色"
                align='center'>
                </el-table-column>
                 <el-table-column
                prop="status"
                label="状态"
                align='center'>
                </el-table-column>
                <el-table-column prop="Opera" label="操作" align='center' width='100'>
                    <template slot-scope="scope">
                        <el-button size="mini" type='text' @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type='text' @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
        </el-table>
        <el-pagination
        layout="prev, pager, next"
        :total="500">
        </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            searchvalue:'',
            datalist:[
                {
                    num:'1',
                    name:'test1',
                    phone:'15058160069',
                    sex:'男',
                    type:'员工',
                    department:'开发部',
                    role:'管理员',
                    status:'在线',
                    opera:''
                },
                {
                    num:'1',
                    name:'test1',
                    phone:'15058160069',
                    sex:'男',
                    type:'员工',
                    department:'开发部',
                    role:'管理员',
                    status:'在线',
                    opera:''
                },
                {
                    num:'1',
                    name:'test1',
                    phone:'15058160069',
                    sex:'男',
                    type:'员工',
                    department:'开发部',
                    role:'管理员',
                    status:'在线',
                    opera:''
                },
                {
                    num:'1',
                    name:'test1',
                    phone:'15058160069',
                    sex:'男',
                    type:'员工',
                    department:'开发部',
                    role:'管理员',
                    status:'在线',
                    opera:''
                },
                {
                    num:'1',
                    name:'test1',
                    phone:'15058160069',
                    sex:'男',
                    type:'员工',
                    department:'开发部',
                    role:'管理员',
                    status:'在线',
                    opera:''
                },
                {
                    num:'1',
                    name:'test1',
                    phone:'15058160069',
                    sex:'男',
                    type:'员工',
                    department:'开发部',
                    role:'管理员',
                    status:'在线',
                    opera:''
                },
                {
                    num:'1',
                    name:'test1',
                    phone:'15058160069',
                    sex:'男',
                    type:'员工',
                    department:'开发部',
                    role:'管理员',
                    status:'在线',
                    opera:''
                },
                {
                    num:'2',
                    name:'test1',
                    phone:'15058160069',
                    sex:'男',
                    type:'员工',
                    department:'开发部',
                    role:'管理员',
                    status:'在线',
                    opera:''
                }
            ]
        }
    }
}
</script>
<style scoped>
.content{
    /* min-height: 88%; */
    height:88%;
    background-color:#fff;
    padding: 0 20px;
}
.head-top{
    height:90px;
	color:#8b8b8b;
	line-height:90px;
    font-size: 14px;
}

.search{
    display: flex;
    justify-content: center;
    align-items: center;
}
.search .el-input{
    margin-right: 20px;
}

.search .el-button--primary{
    font-size: 14px;
    /* width: 90px; */
    height:37px;
    line-height: 0;
    border-radius: 20px;
    background-color: #27a1f2;
    /* margin-left: 15px; */
}
.search .el-button--primary:hover{
    background-color: #27a1f2;
}
.search .research{
    background: none;
    border: none;
    color:#27a1f2;
    font-size: 40px;
    padding: 0;
}
.el-pagination{
    text-align: right;
    margin-top: -90px;
}
.table-list{
    padding-bottom: 5px;
    margin-left:0;
}

</style>
<style>
.search .el-input .el-input__inner{
    border-radius: 20px;
    margin-top:4px;
}
.list{
    /* height: 100%; */
}
.list .el-table{
    margin-bottom:100px;
}
.list table{
    font-size: 12px !important;
}
.list.table-list .el-table__body-wrapper{
    height: 85% !important;
}
table .el-button--text{
    color:#27a1f2;
}
.el-button--text{
    border-radius:0;
     height: 20px;
    line-height:0px;   
}
.el-button--text+.el-button--text{
    margin-left:0;
    padding-left:5px;
    border-left:1px solid;
}
</style>
