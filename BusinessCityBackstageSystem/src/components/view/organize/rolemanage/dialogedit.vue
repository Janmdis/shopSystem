<template>
    <el-dialog  width='30%' top='40px'  title="编辑信息" :visible="visiableedit" :modal='true' :before-close="ai_dialog_close"> 
        <el-row>
            <el-col :span='8'>
                <div class="grid-content label">角色名称：</div>
            </el-col>
            <el-col :span='12'>
                <div class="grid-content">
                    <el-input placeholder="请输入角色名称" v-model="rolename"></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='8'>
                <div class="grid-content label">角色编号：</div>
            </el-col>
            <el-col :span='12'>
                <div class="grid-content">
                    <el-input placeholder="请输入角色编号" v-model="roleid"></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='8'>
                <div class="grid-content label">部门id：</div>
            </el-col>
            <el-col :span='12'>
                <div class="grid-content value-text">
                    你猜吧
                </div>
            </el-col>
        </el-row>
        <el-row></el-row>
        <el-row></el-row>
        <div slot="footer" class="dialog-footer" :center='true'>
            <el-button type="primary" round   @click="adddata">新增</el-button>
        </div>
    </el-dialog>
</template>
<<script>
export default {
    data(){
        return{
            visiableedit:false,
            rolename:'',
            roleid:''
        }
    },
    created:function(){
        this.$root.$on('showeditdialog',()=>{
            this.visiableedit=true;
        });
    },
    methods:{
        ai_dialog_close(){
            this.visiableedit=false;
        },
        adddata(){
            this.visiableedit=false;
        }
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
.el-dialog__footer .el-button{
    width:140px;
    font-size:14px;
    background:#00adab;
    margin:0 auto;
    display: block;
}
</style>
<style scoped>
.el-dialog .el-row{
    margin-bottom:15px;
}

</style>
