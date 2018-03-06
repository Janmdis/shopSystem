<template>
    <el-dialog title='员工列表'  :visible.sync="dialogVisible"  width="60%" class='dialogemploy'>
        <el-row style='padding-bottom:10px;'>
            <el-col :span="4">
                <el-select v-model="type" placeholder="分类" class='typeselect' @change='changetype'>
                    <el-option
                    v-for="item in listtype"
                    :key="item.id"
                    :label="item.employeeTypeName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-table 
        :data="listemployee" 
        ref='employeetable' 
        style="width: 100%;height:75%;" 
        height='100%' 
        class='employeetable'
        @selection-change="handleSelectionChange"
        @select ='selectchange'
        v-loading='loading'>
            <el-table-column
            type="index"
            label="N"
            >
            </el-table-column>
            <el-table-column type='selection'>
            </el-table-column>
            <el-table-column  prop='adminName' label="姓名"  >
            </el-table-column>
            <el-table-column  prop="employeeTypeName" label="类型"  >
            </el-table-column>
            <el-table-column  prop="phone" label="手机号码"  >
            </el-table-column>
            <el-table-column  prop="departmentName" label="所属部门"  >
            </el-table-column>
            
        </el-table>
        <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="total">
        </el-pagination>
        <div style='text-align:center;position:absolute;bottom:3%;left:0;right:0;'>
            <el-button type="primary" style="height：30px;line-height:7px;" @click="adddata">保存</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    data(){
        return{
            dialogVisible:false,
            listtype:[],
            listemployee:[],
            hasselected:[],
            type:'',
            loading:false,
            currentPage:1,
            total:0,
        }
    },
    created:function(){
        this.$root.$on('dialogemployee',(data)=>{
            // this.hasselected=data;
            data.forEach(item=>{
                this.hasselected.push(JSON.stringify(item));
            });
            this.dialogVisible=true;
            console.log(this.hasselected);
            this.getEmploytype();
        });
    },
    updated() {
        // console.log(this.hasselected,this.listemployee);
        this.hasselected.forEach(row=>{
            this.listemployee.forEach(employee=>{
                if(JSON.stringify(employee)==row){
                    this.$refs.employeetable.toggleRowSelection(employee,true);
                }
            });
        });  
    },
    beforeDestroy(){
        this.$root.$off('dialogemployee');
    },
    methods:{
        // 获得员工类型
        getEmploytype(){
            let that=this;
            this.$http.get('/api/admin/employeetype/queryList')
            .then(function(response){
                if(response.data.msg=='查询成功'){
                    that.listtype=response.data.info;
                    that.type=that.listtype[0].id;
                    that.getEmployeelist(1,that.type);
                }
            })
            .catch(function(response){
                console.log(response);
            })
        },
        // 分页查询员工列表
        getEmployeelist(pageindex,typeid){
            console.log(pageindex);
            this.loading=true;
            let that=this;
            this.$http.post('/api/admin/account/multiConditionalQuery',{
                pageSize:10,
                pageNum:pageindex,
                // employeeTypeId:typeid
            })
            .then(function(response){
                if(response.data.status==200){
                    that.listemployee=[];
                    response.data.info.list.forEach(item=>{
                        that.listemployee.push({
                            id:item.id,
                            adminName:item.adminName,
                            phone:item.phone,
                            departmentName:item.manageGroupAdminList[0].departmentName,
                            employeeTypeName:item.employeeTypeName
                        });
                    });
                    // that.listemployee=response.data.info.list;
                    that.total=response.data.info.total;
                }
                console.log(response);
                that.loading=false;
            })
            .catch(function(response){
                that.loading=false;
                console.log(response);
            })
        },
        changetype(value){
            this.type=value;
            this.getEmployeelist(1,value);
            console.log(value);
        },
        handleCurrentChange(currentpage){
            this.getEmployeelist(currentpage,this.type);
        },
        handleSelectionChange(val){
            console.log(val);
            for(let i=0;i<val.length;i++){
                let currentstr=JSON.stringify(val[i]);
                let hasit=this.hasselected.includes(currentstr);
                if(!hasit){
                    this.hasselected.push(currentstr);
                }
            }
        },
        selectchange(selection,row){
            let str=JSON.stringify(row);
            let selected=selection.includes(row);
            if(!selected){
                let index=this.hasselected.indexOf(str);
                this.hasselected.splice(index,1);
            }
        },
        adddata(){
            if(this.hasselected.length==0){
                this.$message('请选择员工');
            }
            else{
                let list=[];
                this.hasselected.forEach(item=>{
                    // console.log(item);
                    let items=JSON.parse(item);
                    let json={
                        id:items.id,
                        adminName:items.adminName,
                        phone:items.phone,
                        departmentName:items.departmentName,
                        employeeTypeName:items.employeeTypeName 
                    }
                    list.push(json);
                });
                this.$root.$emit('addemployee',list);
                this.dialogVisible=false;
            }
        }
    }
}
</script>
<style scoped>
.typeselect{
    height:30px !important;
}
</style>
<style>
.typeselect .el-input__inner{
    height:30px !important;
}
.employeetable table td:nth-child(3) .cell{
    border:none;
}
.dialogemploy .el-dialog{
    height:80%;
}
.dialogemploy .el-dialog__body{
    height:80%;
}
.dialogemploy .el-pagination{
    padding-top:10px;
    text-align:right;
}
</style>
