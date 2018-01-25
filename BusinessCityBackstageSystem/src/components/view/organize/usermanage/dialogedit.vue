<template>
  <el-dialog title="编辑" :visible="dialogVisible" width='35%' :modal='true' :before-close="ai_dialog_close"> 
            <el-form @submit.native.prevent :model='dataform' status-icon ref="ruleForm" :rules="rules"  label-width="100px" class="demo-ruleForm">
                <el-form-item label="角色名称：" prop="rolename">
                    <el-input placeholder="请输入角色名称" v-model="dataform.rolename" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色编号：" prop="rolenum">
                    <el-input placeholder="请输入角色编号" v-model="dataform.rolenum" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属部门：">
                    <div class="grid-content valueName">
                         {{depname}}
                     </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" :center='true'>
                <el-button type="primary" round   @click="adddata">确定</el-button>
            </div>
        </el-dialog>
</template>
<script>
export default {
    data(){
        return {
            depname:'',
            dataform:{
                rolename:'',
                rolenum:''
            },
            rules:{
                rolename:[
                    {required:true,message:'请输入角色名称',trigger:'blur'}
                ],
                rolenum:[
                   {required:true,message:'请输入角色编号',trigger:'blur'}
                ]
            },
            dialogVisible:false,
        }
    },
    created:function(){
        this.$root.$on('opendialogedit',()=>{
            this.dialogVisible=true;
        });
    },
    methods:{
        ai_dialog_close(){
            this.dialogVisible=false;
        },
        adddata(){
            this.dialogVisible=false;
        }
    },
    beforeDestroy:function(){
        this.$root.$off('opendialogedit');
    }
}
</script>
<style scoped>
.el-button{
    background-color: #00aeaa !important;
    border-color: #00aeaa !important;
}
</style>
