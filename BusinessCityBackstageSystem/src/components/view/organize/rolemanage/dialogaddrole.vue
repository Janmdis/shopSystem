<template>
    <el-dialog  width='60%' top='40px'  title="新增角色" :visible="dialogroleVisible" :modal='true' :before-close="ai_dialog_close"> 
        <el-form @submit.native.prevent :model='dataform' status-icon ref="roleForm" :rules="rules"  label-width="100px" class="demo-ruleForm">
            <el-row :gutter='5' class='topmsg'>
                <el-col :span="7" :offset='1'>
                    <el-form-item label="角色名称：" prop="groupName">
                        <el-input placeholder="请输入角色名称" v-model="dataform.groupName" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
               <el-col :span="7">
                    <el-form-item label="角色编号：" prop="groupNumber">
                        <el-input placeholder="请输入角色编号" v-model="dataform.groupNumber" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="所属部门：" prop="depname">
                        <el-select v-model="dataform.departmentId" @change='changeValue'  placeholder="请选择">
                            <el-option
                            v-for="item in deplist"
                            :key="item.id"
                            :value-key="item.id"
                            :label="item.departmentName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style='padding:0 5%;'>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"  @change="handleCheckAllChange">全选</el-checkbox>
                <el-checkbox-group v-model="checkedPromises" @change="handleCheckedPromiseChange">
                    <el-checkbox v-for="item in promiselist" :key="item.id" :label="item">{{item.permissionsName}}</el-checkbox>
                </el-checkbox-group>
            </el-row>
            <el-form-item class='btns'>
                <el-button type="primary" round   @click="adddata">新增</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data(){
        return {
            dialogroleVisible:false,
            dataform:{
                groupName:'',
                groupNumber:'',
                departmentId:'',
                departmentName:'',
                permissionsId:''
            },
            selectvalue:'',
            isIndeterminate:false,
            checkAll:false,
            checkedPromises:[],
            rules:{
                groupName:[
                    {required:true,message:'请输入角色名称',trigger:'blur'}
                ],
                groupNumber:[
                    {required:true,message:'请输入角色编号',trigger:'blur'}
                ]
            }
        }
    },
    created:function(){
        this.$root.$on('addroledialog',()=>{
            this.dialogroleVisible=true;
        })
    },
    methods:{
        changeValue(value){
            let obj = {};
            obj = this.deplist.find((item)=>{
                return item.id === value;
            });
            this.dataform.departmentName=obj.departmentName;
        },
        ai_dialog_close(){
            this.$refs.roleForm.resetFields();
            this.dialogroleVisible=false;
        },
        handleCheckAllChange(val) {
            this.checkedPromises = val ? this.promiselist : [];
            this.isIndeterminate = false;
        },
        handleCheckedPromiseChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.promiselist.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.promiselist.length;
        },
        adddata(){
            let that=this;
            let checklist=[];
            for(let i=0;i<this.checkedPromises.length;i++){
                checklist.push(this.checkedPromises[i].id);
            }
            this.$refs.roleForm.validate((valid)=>{
                if(valid){
                    if(this.dataform.departmentName==''){
                        this.$alert('请选择部门', '提示', {
                        confirmButtonText: '确定'
                        });
                    }
                    else{
                        this.dataform.permissionsId=checklist.join(',');
                        this.$http.post('/api/admin/manage/group/insert',that.dataform)
                        .then(function (response) {
                            let data=response.data;
                            if(data.msg=='组织添加成功'){
                                that.$message({
                                    type:'success',
                                    message:'角色添加成功'
                                });
                                that.$root.$emit('getrole',depid);
                            }
                        })
                        .catch(function (response) {
                            that.$message({
                                type:'info',
                                message:'角色添加失败'
                            });
                        });
                    }
                }
            })
            this.dialogroleVisible=false;
        },
    },
    computed: {
        ...mapState({
            promiselist: state => state.promiselist.promiselist,
            deplist:state => state.deplist.deplistall
        })
    },
    beforeDestroy:function(){
        this.$root.$off('addroledialog');
    }
}
</script>
<<style scoped>
.labelfor{
    text-align:right;
    line-height:30px;
}

.el-dropdown .el-button--primary{
    height:32px;
    width:auto;
    padding-top:9px;
    border-radius:5px;
    background-color:#fff;
    border-color:#c0c4cc;
    color:#555;
}
.el-checkbox-group label{
    width:20%;
}
.el-checkbox+.el-checkbox{
    margin-left:0 !important;
}
</style>
<style>
.el-dialog .grid-content input{
    width: 95%;
    height: 32px;
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 3px;
    border:1px solid #ccc;
}
.data .grid-content{
    border: 1px solid !important;
    border-radius: 5px;
    padding:10px 20px;
    overflow: hidden;
}
.name{
    display: inline-block;
}
.name,.check{
    float: left;
}
.data .select{
    overflow: hidden;
}
div.check{
    width: 0;
    height: 0;
    position: absolute;
}
.checkfor{
    display:inline-block;
    vertical-align: middle;
    position: absolute;
    left: 3px;
    top: 3px;
    width: 17px;
    height: 17px;
    border: 1px solid #cccccc;
    cursor: pointer;
    border-radius: 5px;
}
.check[typediv='opcan']{
    left: 68%;
}
.check[typediv='seecan']{
    left: 80%;
}
input[type='checkbox']{
    z-index: 1;
    opacity: 0;
}
.el-form-item{
    padding-bottom: 22px !important;
    margin-bottom: 0 !important;
}
</style>
