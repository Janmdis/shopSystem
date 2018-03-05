<template>
    <div class='createchannel'>
        <div class="memberNav" >
            <el-row class="navChild">
                <el-col :span='24' class="grid-content">
                    <div class="productDesignation">
                        <h3 class="listName pull-left">新增渠道</h3>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-form ref="channelform" class='channelform' :model='formchannel' label-width="80px" :rules="rules">
            <el-row :gutter='0'>
                <el-col :span='6'>
                    <el-form-item label="名称"  size='small' prop='name'>
                        <el-input placeholder="名称" v-model='formchannel.name'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='5'>
                    <el-form-item label="类型" size='small' prop='typeId'>
                        <el-select  placeholder="请选择" v-model='formchannel.typeId'>
                            <el-option
                            v-for="item in typelist"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>  
                <el-col :span='5'>
                    <el-form-item label="等级" size='small' prop='levelId'>
                        <el-select  placeholder="请选择" v-model='formchannel.levelId'>
                            <el-option
                            v-for="item in levellist"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col> 
                <el-col :span='7'>
                    <el-form-item label="备注" size='small' prop='remark'>
                        <el-input placeholder="备注" v-model='formchannel.remark'></el-input>
                    </el-form-item>
                </el-col>   
            </el-row>
        </el-form>
        <div class='memberinfo'>
            <header style='padding:10px;background-color: #edf9ff;'>员工信息</header>
            <div class='operation' style='padding:10px;margin-left:10px;'>
                <el-button size="mini" style='color:#409EFF;border:1px solid #409EFF;' @click='resetForm'>清空</el-button>
                <el-button size="mini"  type="primary" @click="selectMember">选择</el-button>
            </div>
            <el-table
            :data="datalist"
            v-loading="listLoading"
            :stripe='true'
            class='membertable'
            style="width: 100%;height:80%;"
            height='80%'>
                <el-table-column
                fixed
                type="index"
                label="N">
                </el-table-column>
                <el-table-column
                prop="id"
                label="员工编号"
                fixed
                width='260'>
                </el-table-column>
                <el-table-column
                label="姓名"
                width='120'>   
                    <template slot-scope="scope">
                        <i :class='{"el-icon-check":scope.row.isLeader}' style='color:#409EFF;position:absolute;left:10px;top:18px;font-size:20px;'></i>
                        <span style='position:absolute;left:50px;top:18px;'>{{scope.row.adminName}}</span>
                        
                    </template>
                </el-table-column>
                <el-table-column
                prop="phone"
                label="手机"
                >
                </el-table-column>
                
                <el-table-column
                prop="departmentName"
                label="所属部门"
                >
                </el-table-column>
                <el-table-column
                prop="employeeTypeName"
                label="类型"
                >
                </el-table-column>
                <el-table-column 
                width='180'
                label="操作">
                <template slot-scope="scope" >
                    <el-button type="text" size="small" @click="chengeLeader(scope.$index,scope.row)">指定为队长</el-button>
                    <el-button type="text" size="small" :disabled='scope.row.isLeader' @click='deleteEmploy(scope.$index,scope.row)'>删除</el-button>
                </template>
            </el-table-column>
             </el-table>
            <div style='text-align:center;position:absolute;bottom:3%;left:0;right:0;'>
                <el-button type="primary" style="height：30px;line-height:7px;" @click="adddata">保存</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            idchannel:'',
            namepage:'新增渠道',
            listLoading:false,
            datalist:[],
            beforeemployeelist:[],
            formchannel:{
                name:'',
                typeId:'',
                levelId:'',
                remark:''
            },
            typelist:[],
            levellist:[],
            typeopera:'create',
            rules:{
                name:[
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                typeId:[
                    { required: true, message: '请选择分类', trigger: 'change' }
                ],
                levelId:[
                    { required: true, message: '请选择等级', trigger: 'change' }
                ]
            }
        }
    },
    created:function(){
        this.$root.$on("createchannel",()=>{
            this.typeopera='create';
            document.querySelector('.createchannel').setAttribute('class','createchannel on');
            this.getChanneltype();
            this.getLevelList();
            // console.log(this.datalist);
        });
        this.$root.$on("editchannel",(datas)=>{
            console.log(datas);
            this.typeopera='edit';
            this.idchannel=datas.id;
            this.getChanneltype();
            this.getLevelList();
            this.getData();
            // this.getTeamer();
            document.querySelector('.createchannel').setAttribute('class','createchannel on');
        })
        this.$root.$on('addemployee',(list)=>{
            let isnull=this.datalist.length==0;
            let datalist=this.datalist;
            let datalist2=[];
            datalist.forEach(item=>{
                delete item.isLeader;
                datalist2.push(JSON.stringify(item));
            });
            list.forEach((item,index)=>{
                let str=JSON.stringify(item);
                let hasitem=datalist2.includes(str);
                if(!hasitem){
                    item.isLeader=(isnull&&index==0)?true:false;
                    this.datalist.push(item);
                }
            });
            console.log(isnull,list,this.datalist);
        });
    },
    methods:{
        // 获取团队信息
        getData(){
            let that=this;
            this.$http.post('/api/admin/teamManagement/queryTeamManagement',{id:that.idchannel})
            .then(function(response){
                if(response.data.msg=='查询成功'){
                    that.beforeemployeelist=[];
                    that.datalist=[];
                    let data=response.data.info.list[0];
                    that.formchannel.name=data.name;
                    that.formchannel.typeId=data.typeId;
                    that.formchannel.levelId=data.levelId;
                    that.formchannel.remark=data.remark;
                    that.beforeemployeelist.push({
                        id:data.leaderAdmin.id,
                        adminName:data.leaderAdmin.adminName,
                        phone:data.leaderAdmin.phone,
                        departmentName:data.leaderAdmin.departmentName,
                        employeeTypeName:data.leaderAdmin.employeeTypeName,
                        isLeader:true
                    });
                    that.datalist.push({
                        id:data.leaderAdmin.id,
                        adminName:data.leaderAdmin.adminName,
                        phone:data.leaderAdmin.phone,
                        departmentName:data.leaderAdmin.departmentName,
                        employeeTypeName:data.leaderAdmin.employeeTypeName,
                        isLeader:true
                    });
                    that.getTeamer();
                }
                else{
                    that.$message(response.data.msg);
                }
                console.log(response);
            })
            .catch(function(response){
                console.log(response);
            })
        },
        // 查询团队内成员信息
        getTeamer(){
            this.listLoading=true;
            let that=this;
            this.$http.post('/api/admin/teamAdmin/queryTeamAdmin',{teamId:that.idchannel})
            .then(function(response){
                if(response.data.msg=='查询成功'){
                    response.data.info.list.forEach(item=>{
                        that.beforeemployeelist.push({
                            id:item.adminAccount.id,
                            adminName:item.adminAccount.adminName,
                            phone:item.adminAccount.phone,
                            departmentName:item.adminAccount.departmentName,
                            employeeTypeName:item.adminAccount.employeeTypeName,
                            isLeader:item.isLeader
                        });
                        that.datalist.push({
                            id:item.adminAccount.id,
                            adminName:item.adminAccount.adminName,
                            phone:item.adminAccount.phone,
                            departmentName:item.adminAccount.departmentName,
                            employeeTypeName:item.adminAccount.employeeTypeName,
                            isLeader:item.isLeader
                        });
                    });
                }
                that.listLoading=false;
                console.log(response);
            })
            .catch(function(response){
                that.listLoading=false;
                console.log(response);
            })
        },
        //选择员工作为团员
        selectMember(){
            console.log(this.datalist);
            let list=[];
            this.datalist.forEach(item=>{
                delete item.isLeader;
            });
            this.$root.$emit('dialogemployee',(this.datalist));
        },
        // 获取团队类型
        getChanneltype(){
            let that=this;
            this.$http.post('/api/admin/teamType/queryTeamType')
            .then(function(response){
                if(response.data.msg=='查询成功'){
                    that.typelist=response.data.info;
                }
                console.log(response);
            })
            .catch(function(response){
                console.log(response);
            })
        },
        // 获取团队等级
        getLevelList(){
            let that=this;
            this.$http.post('/api/admin/teamLevel/queryTeamLevel')
            .then(function(response){
                if(response.data.msg=='查询成功'){
                    that.levellist=response.data.info;
                }
                console.log(response);
            })
            .catch(function(response){
                console.log(response);
            })
        },
        selectType(value){
            this.formchannel.type=value;
        },
        selevtLevel(value){
            this.formchannel.levelId=value;
        },
        resetForm(){
            this.$refs.channelform.resetFields();
        },
        adddata(){
            this.$refs.channelform.validate((valid) => {
                if(valid){
                    let that=this;
                    // 创建新团队
                    if(this.typeopera=='create'){
                        let adminList=[];
                        this.datalist.forEach(item=>{
                            adminList.push({
                                adminId:item.id,
                                isLeader:item.isLeader
                            });
                        });
                        if(adminList.length==0){
                            that.$message('至少选择一个成员！');
                        }
                        else{
                            this.$http.post('/api/admin/teamManagement/insertTeamManagement',{
                                adminList:adminList,
                                teamManagement:that.formchannel
                            })
                            .then(function(response){
                                if(response.data.status==200){
                                    that.$message.success('添加团队信息成功！');
                                    document.querySelector('.createchannel').setAttribute('class','createchannel');
                                    that.$root.$emit('reloadchannel');
                                }
                                else{
                                    that.$message(response.data.msg);
                                }
                                console.log(response);
                            })
                            .catch(function(response){
                                console.log('团队添加失败！');
                            })
                        }
                        
                    }
                    // 修改渠道
                    else if(this.typeopera='edit'){
                        // 要删除的成员列表
                        let deletelist=[];
                        // 要添加的成员列表
                        let addlist=[];
                        let datalist2=[];
                        let beforeemployeelist2=[];
                        this.datalist.forEach(item=>{
                            datalist2.push(JSON.stringify(item));
                        });
                        this.beforeemployeelist.forEach(item=>{
                            beforeemployeelist2.push(JSON.stringify(item));
                        });
                        datalist2.forEach(item=>{
                            if(!beforeemployeelist2.includes(item)){
                                addlist.push(item);
                            }
                        });
                        beforeemployeelist2.forEach(item=>{
                            if(!datalist2.includes(item)){
                                deletelist.push(item);
                            }
                        });
                        this.$http.post('/api/admin/teamManagement/updateTeamManagement',{
                            id:that.idchannel,
                            name:that.formchannel.name,
                            typeId:that.formchannel.typeId,
                            levelId:that.formchannel.levelId,
                            remark:that.formchannel.remark
                        })
                        .then(function(response){
                            if(response.data.status==200){
                                let lengthadd=addlist.length;
                                let lengthdele=deletelist.length;
                                if(lengthadd==0&&lengthdele==0){
                                    that.$root.$emit('reloadchannel');
                                    that.$message.success('修改成功');
                                    document.querySelector('.createchannel').setAttribute('class','createchannel');
                                }
                                // 添加新队员
                                if(lengthadd>0){
                                    let data=[];
                                    addlist.forEach(item=>{
                                        let admin=JSON.parse(item);
                                        data.push({
                                            teamId:that.idchannel,
                                            adminId:admin.id,
                                            isLeader:admin.isLeader
                                        });
                                    });
                                    this.$http.post('/api/admin/teamAdmin/insertTeamAdmin',data)
                                    .then(function(response){
                                        if(response.data.status==200){
                                            if(lengthdele==0){
                                                that.$root.$emit('reloadchannel');
                                                that.$message.success('修改成功');
                                                document.querySelector('.createchannel').setAttribute('class','createchannel');
                                            }
                                            // 删除队员
                                            else{
                                                let data1=[];
                                                deletelist.forEach(item=>{
                                                    let admin=JSON.parse(item);
                                                    data1.push({
                                                        teamId:that.idchannel,
                                                        adminId:admin.id
                                                    });
                                                });
                                                this.$http.post('/api/admin/teamAdmin/removeTeamAdmin',data1)
                                                .then(function(response){
                                                    if(response.data.status==200){
                                                        that.$root.$emit('reloadchannel');
                                                        that.$message.success('修改成功');
                                                        document.querySelector('.createchannel').setAttribute('class','createchannel');
                                                    }
                                                    else{
                                                        that.$message(response.data.msg);
                                                    }
                                                })
                                                .catch(function(response){
                                                    that.$message('修改失败');
                                                })
                                            }
                                            
                                        }
                                        else{
                                            that.$message(response.data.msg);
                                        }
                                    })
                                    .catch(function(response){
                                        that.$message('修改失败');
                                    })
                                }
                            }
                            else{
                                that.$message(response.data.msg);
                            }
                        })
                        .catch(function(response){
                            that.$message('修改失败');
                            console.log(response);
                        });
                        console.log(deletelist,addlist);
                    }
                    console.log(this.formchannel);
                }
            })
        },
        // 改变队长
        chengeLeader(indexcurr,row){
            this.datalist.forEach((item,index)=>{
                if(indexcurr==index){
                    item.isLeader=true;
                }
                else{
                    item.isLeader=false;
                }
            });
        },
        // 删除队员
        deleteEmploy(indexcurr,row){
            this.$confirm('是否删除数据？','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            })
            .then(()=>{
                this.datalist.splice(indexcurr,1);
            })
            .catch(()=>{
                this.$message({
                    type:'info',
                    message:'已取消删除'
                });
            });
        }
    },
    beforeDestroy(){
        this.$root.$off("createchannel");
        this.$root.$off("addemployee");
    }
}
</script>
<style scoped>
.createchannel{
    width:100%;
    height:100%;
    position: absolute;
    top: 20px;
    right:-2000px;
    z-index: 99;
    background-color: #fff;
}
.createchannel.on{
    left:0;
}
.productDesignation{
    height: 72px;
    position: relative;
    margin-left: 33px;
}
.productDesignation>i {
	color: #3da4c3;
}
.productDesignation h3 {
	padding-top: 25px;
	font-size: 20px;
	color: #0D4156;
	padding-left: 20px;
}
.productDesignation h3:before {
	content: "";
	width: 4px;
	height: 22px;
	display: block;
	position: absolute;
	background: #253a4d;
	left: 0px;
	top:26px;
}
.memberNav{
    background-color: #fff;
}
.memberNav::after{
    content: '';
    display:block;
    margin-right: 16px;
    border-top:6px solid #56d2f4;
}
.channelform{
    padding-top: 25px;
}
.membertable{
    /* height: 80%; */
    border-top:6px solid rgb(237, 249, 255);
}
.memberinfo{
    height: 70%;
    padding: 10px;
}

</style>
<style>
.membertable table td:nth-child(3) .cell{
    border:none;
}
</style>
