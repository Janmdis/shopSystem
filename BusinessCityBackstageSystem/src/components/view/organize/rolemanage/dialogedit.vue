<template>
    <el-dialog  width='30%' top='40px'  title="编辑信息" :visible="visiableedit" :modal='true' :before-close="ai_dialog_close"> 
        <el-form @submit.native.prevent :model='dataform' status-icon ref="roleForm2" :rules="rules"  label-width="100px" class="demo-ruleForm">
            <el-form-item label="角色名称：" prop="groupName">
                <el-input placeholder="请输入角色名称" v-model="dataform.groupName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色编号：" prop="groupNumber">
                <el-input placeholder="请输入角色编号" v-model="dataform.groupNumber" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="所属部门：">
                <div class="grid-content valueName">
                        {{dataform.departmentName}}
                    </div>
            </el-form-item>
            <el-form-item class='btns'>
                <el-button type="primary" round   @click="editdata">确定</el-button>
            </el-form-item>
        </el-form>
        <!-- <div slot="footer" class="dialog-footer" :center='true'>
            <el-button type="primary" round   @click="adddata">新增</el-button>
        </div> -->
    </el-dialog>
</template>
<script>
export default {
    data(){
        return{
            visiableedit:false,
            dataform:{
                groupName:'',
                id:'',
                groupNumber:'',
                departmentName:'',
            },
            depid:'',
            rules:{
                groupName:[
                    {required:true,message:'请输入角色名称',trigger:'blur'}
                ],
                groupNumber:[
                   {required:true,message:'请输入角色编号',trigger:'blur'}
                ]
            },
            // data:[]
        }
    },
    created:function(){
        this.$root.$on('showeditdialog',(data)=>{
            this.depid=data.depid;
            this.dataform.id=data.id;
            this.dataform.groupName=data.groupName;
            this.dataform.groupNumber=data.groupNumber;
            this.dataform.departmentName=data.departmentName;
            this.visiableedit=true;
        });
    },
    methods:{
        ai_dialog_close(){
            this.$refs.roleForm2.resetFields();
            this.visiableedit=false;
        },
        editdata(){
            this.$refs.roleForm2.validate((valid)=>{
                let that=this;
                if(valid){
                    this.$http.post('/api/admin/manage/group/update',[that.dataform])
                    .then(function (response) {
                        let data=response.data;
                        if(data.msg=='更新成功'){
                            that.$message({
                                type:'success',
                                message:'更新成功'
                            });
                            that.$root.$emit('getrole',that.depid);
                        }
                    })
                    .catch(function (response) {
                        that.$message({
                            type:'info',
                            message:'更新失败'
                        });
                        console.log(response);
                    });
                }
            })
            this.visiableedit=false;
        }
    },
    beforeDestroy:function(){
        this.$root.$off('showeditdialog');
    }
}
</script>
<style>
.el-row{
    vertical-align: middle;
}
.grid-content.label{
    text-align: right;
    padding-top: 8px;
}
.grid-content.value-text{
    padding-top: 8px;
}
.el-dialog__footer{
    border-top:1px solid #f1f1f1;
    width: 80%;
    margin: 0 auto;
}
.el-form-item .el-button{
    width:140px;
    font-size:14px;
    background:27a1f2;
    margin:0 auto;
    display: block;
}
.btns .el-form-item__content{
    margin-left: 0 !important;
}
.el-dialog__body{
    padding-bottom: 5px;
}
</style>
<style scoped>
.el-dialog .el-row{
    margin-bottom:15px;
}

</style>
