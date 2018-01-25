<template>
    <div class="grid-content content">
        <el-row class='head-top'>
            <el-col :span='8'>
                <div class="grid-content">
                    <p class='title'>角色列表</p>
                </div>
            </el-col>
            <el-col :span='12' :offset='4'>
                <div class="grid-content search">
                    <el-input
                        placeholder="请输入角色名称"
                        suffix-icon="el-icon-search"
                        v-model="searchvalue"
                        @keyup.enter.native="searchdata">
                    </el-input>
                    <el-button type="primary" @click="addrole">新增</el-button>
                    <el-button type="primary" class='research' @click="researchdata"><i class="icon iconfont icon-shuaxin"></i></el-button>
                </div>
                
            </el-col>
        </el-row>
        <div class='list table-list'>
            <el-table
            :data="datalist"
            style="width: 100%;height:90%"
            v-loading=this.loading
            :stripe='true'>
                <el-table-column
                prop="groupNumber"
                label="角色编号"
                align='center'>
                </el-table-column>
                <el-table-column
                prop="groupName"
                label="角色名称"
                align='center'>
                </el-table-column>
                <el-table-column
                prop="departmentName"
                label="所属部门"
                align='center'>
                </el-table-column>
                <!-- <el-table-column
                prop="promise"
                label="权限"
                align='center'>
                </el-table-column> -->
                <el-table-column prop="opera" label="操作" align='center' width='180'>
                    <template slot-scope="scope">
                        <el-button size="mini" type='text' @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type='text' @click="handlePromise(scope.row)">权限管理</el-button>
                        <el-button size="mini" type='text' @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
        </el-table>
        <el-pagination
        layout="prev, pager, next,jumper,total"
        :total=total
        :current-page=currentpage
        :page-size=pagesize
        @current-change="handleCurrentChange">
        </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            searchvalue:'',
            depid:'',
            datalist:[],
            total:0,
            pagesize:10,
            currentpage:1,
            loading:false
        }
    },
    created:function(){
        this.$root.$on('getrole',(depid)=>{
            this.depid=depid;
            this.getrolelist(1,this.pagesize);
        });
        this.getrolelist(1,this.pagesize);
    },
    methods:{
        getrolelist(pageno,pagesize){
            let that=this;
            this.loading=true;
            this.$http.post('/api/admin/manage/group/find?pageNo='+pageno+'&pageSize='+pagesize,{
                departmentId:this.depid,
                isActive:true
            })
            .then(function (response) {
                let data=response.data;
                // console.log(data);
                if(data.msg=='查询成功'){
                    that.datalist=data.info.list;
                    that.total=data.info.total;
                    that.currentpage=pageno;
                }
            })
            .catch(function (response) {
                that.$message({
                    type:'info',
                    message:'部门列表查询失败'
                });
            });
            that.loading=false;
        },
        addrole(){
            this.$root.$emit('addroledialog');
        },
        researchdata(){
            this.getrolelist(1,this.pagesize);
        },
        searchdata(){
            let that=this;
            this.loading=true;
            this.$http.post('/api/admin/manage/group/find?pageSize='+this.pagesize,{
                groupName:this.searchvalue,
                isActive:true
            })
            .then(function (response) {
                let data=response.data;
                // console.log(data);
                if(data.msg=='查询成功'){
                    that.datalist=data.info.list;
                    that.total=data.info.total;
                    that.currentpage=1;
                }
            })
            .catch(function (response) {
                that.$message({
                    type:'info',
                    message:'部门列表查询失败'
                });
            });
            that.loading=false;
        },
        handleEdit(row){
            let data={
                id:row.id,
                depid:row.departmentId,
                departmentName:row.departmentName,
                groupName:row.groupName,
                groupNumber:row.groupNumber
            }
            this.$root.$emit('showeditdialog',data);
        },
        handleDelete(row){
            let that=this;
             this.$confirm('确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                this.$http.post('/api/admin/manage/group/update',[{
                    id:row.id,
                    isActive:false
                }])
                .then(function (response) {
                    let data=response.data;
                    if(data.msg=='更新成功'){
                        that.$message({
                            type:'success',
                            message:'删除成功'
                        });
                        that.getrolelist(1,that.pagesize);
                    }
                    console.log(response);
                })
                .catch(function (response) {
                    that.$message({
                        type:'info',
                        message:'更新失败'
                    });
                    console.log(response);
                });
            }).catch(()=>{
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handlePromise(row){
            // console.log(row);
            this.$root.$emit('showpromise',{id:row.id,depid:this.depid,permissionid:row.permissionsId});
        },
        handleCurrentChange(currentPage){
            this.getrolelist(currentPage,this.pagesize);
        }
    },
    beforeDestroy:function(){
        this.$root.$off('getrole',datalist);
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
    font-size: 16px;
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
    background-color: #00adab;
    /* margin-left: 15px; */
}
/* .search .el-button--primary:hover{
    background-color: #00adab;
} */
.search .research{
    background: none;
    border: none;
    color:#00adab;
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
.list .el-table th,
.list .el-table td{
    font-size:14px;
}
.list table{
    font-size: 12px !important;
}
.list.table-list .el-table__body-wrapper{
    height: 85% !important;
}
table .el-button--text{
    color:#00adab;
    font-size:14px;
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
