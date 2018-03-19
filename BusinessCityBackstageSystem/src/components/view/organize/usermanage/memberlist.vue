<template>
    <div class="grid-content content" id='users'>
        <el-row class='head-top'>
            <el-col :span='8'>
                <div class="grid-content">
                    <p class='title'>员工列表</p>
                    <el-button type="primary" :class="{'btn-search':true,'el-icon-arrow-down':searchtext=='展开搜索','el-icon-arrow-up':searchtext=='收起搜索'}"  size="mini" @click="switchsearch">{{searchtext}}</el-button>
                </div>
            </el-col>
            <el-col :span='12' :offset='4'>
                <div class="grid-content search">
                    <el-input
                        placeholder="请输入员工姓名"
                        suffix-icon="el-icon-search"
                        v-model="searchvalue"
                        @keyup.enter.native="searchdata">
                    </el-input>
                    <el-button type="primary" @click="adddata">新增</el-button>
                    <!-- <el-button type="primary">导入</el-button>
                    <el-button type="primary">导出</el-button> -->
                    <el-button type="primary" class='refresh' @click='refreshdata'><i class="icon iconfont icon-shuaxin"></i></el-button>
                </div>
                
            </el-col>
        </el-row>
        <el-row>
            <search :type='type'></search>
        </el-row>
        <div class='list table-list'>
            <el-table
            :data="datalist"
            :style="styledata"
            v-loading=loading
            :stripe='true'>
                <!-- <el-table-column
                prop="id"
                label="员工编号"
                align='center'>
                </el-table-column> -->
                <el-table-column
                prop="adminName"
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
                label="性别"
                align='center'>
                <template slot-scope="scope">
                    {{scope.row.adminSex?'女':'男'}}
                </template>
                </el-table-column>
                <el-table-column
                prop="employeeTypeName"
                label="员工种类"
                align='center'>
                </el-table-column>
                 <el-table-column
                prop="departmentName"
                label="部门"
                align='center'>
                </el-table-column>
                 <el-table-column
                prop="groupName"
                label="角色"
                align='center' >
                </el-table-column>
                 <el-table-column
                prop="accStatus"
                label="状态"
                align='center'>
                <template slot-scope="scope">
                    {{scope.row.accStatus==0?'停用':'正常'}}
                    
                </template>
                </el-table-column>
                <el-table-column prop="Opera" label="操作" align='center' width='100'>
                    <template slot-scope="scope">
                        <el-button size="mini" type='text' @click="handleEdit(scope.row)">编辑</el-button>
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
import search from '../../../common/search/search.vue'
export default {
    components:{search},
    data(){
        return {
            searchvalue:'',
            datalist:[],
            depid:'',
            loading:false,
            pagesize:10,
            currentpage:1,
            total:0,
            type:'users',
            searchtext:'展开搜索',
            styledata:{
                width: '100%',
                height:'90%'
            },
            data:{
                adminName:null,
                phone:null,
                accStatus:null,
                employeeTypeId:null,
                serStaTime:null,
                serEndTime:null
            }
        }
    },
    created:function(){
        this.$root.$on('getemploy',(depid)=>{
            this.depid=depid;
            this.getemployeelist(1);
        });
        this.$root.$on('search',(datas)=>{
            this.data.adminName=datas.users.adminName===''?null:datas.users.adminName;
            this.data.phone=datas.users.phone===''?null:datas.users.phone;
            this.data.accStatus=datas.users.accStatus===''?null:datas.users.accStatus;
            this.data.employeeTypeId=datas.users.employeeTypeId===''?null:datas.users.employeeTypeId;
            this.data.serStaTime=datas.users.daterange[0];
            this.data.serEndTime=datas.users.daterange[1];
            this.getemployeelist(1);
            this.switchsearch();
            // console.log(data);
        });
        this.getemployeelist(1);
    },
    methods:{
        switchsearch(){
            // console.log(this.searchtext);
            let organtext=this.searchtext;
            let flag=organtext=='展开搜索';
            this.searchtext=organtext=='展开搜索'?'收起搜索':'展开搜索';
            let dom=document.querySelector('#users');
            if(flag){
                this.styledata={
                    width: '100%',
                    height:'40%'
                }
            }
            else{
                this.styledata={
                    width: '100%',
                    height:'90%'
                }
            }
            this.$root.$emit('switch',flag);
        },
        //获取员工列表
        getemployeelist(pagenum){
            let that=this;
            this.loading=true;
            this.data.pageSize=this.pageSize;
            this.data.departmentId=this.depid;
            this.data.pageNum=pagenum;
            this.$http.post('/api/admin/account/multiConditionalQuery',this.data)
            .then(function (response) {
                let data=response.data;
                if(data.status==200){
                    that.datalist=data.info.list;
                    that.total=data.info.total;
                    that.currentpage=pagenum;
                }
                console.log(response);
                that.loading=false;
            })
            .catch(function (response) {
                console.log(response);
                that.loading=false;
            });
            
        },
        handleEdit(data){
            // console.log(data);
            this.$root.$emit('opendialogemploy',{iscreate:false,data:data});
        },
        handleDelete(data){
             this.$confirm('确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                let that=this;
                this.$http.post('/api/admin/account/delete?ids='+data.id,{})
                .then(function (response) {
                    let data=response.data;
                    if(data.status==200){
                        that.$message({
                            type:'success',
                            message:'删除成功'
                        });
                        that.getemployeelist(1);
                    }
                    console.log(response);
                })
                .catch(function (response) {
                    that.$message({
                        type:'info',
                        message:'删除失败！'
                    });
                });
            }).catch(()=>{
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleCurrentChange(currentPage){
            this.getemployeelist(currentPage);
        },
        adddata(){
            this.$root.$emit('opendialogemploy',{iscreate:true});
        },
        searchdata(){
            this.data.adminName=null;
            this.data.phone=null;
            this.data.accStatus=null;
            this.data.employeeTypeId=null;
            this.data.serStaTime=null;
            this.data.serEndTime=null;
            this.getemployeelist(1);
        },
        refreshdata(){
            this.getemployeelist(1);
        }
    },
    beforeDestroy:function(){
        this.$root.$off('getemploy');
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
.head-top .btn-search{
    position: absolute;
    left: 70px;
    top:30px;
    background-color: #fff;
    color: #27a1f2;
    border:none;
    font-size: 13px;
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
    /* border-radius: 20px; */
    background-color: #27a1f2;
    /* margin-left: 15px; */
}
/* .search .el-button--primary:hover{
    background-color: #27a1f2;
} */
.search .refresh{
    background: none;
    border: none;
    color:#27a1f2;
    font-size: 40px;
    padding: 0;
}
/* .search .refresh:hover{
    background-color: none;
} */
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
    color:#27a1f2;
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
