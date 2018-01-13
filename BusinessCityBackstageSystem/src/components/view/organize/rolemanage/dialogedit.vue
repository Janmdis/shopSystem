<template>
    <el-dialog  width='30%' top='40px'  title="编辑信息" :visible="visiableedit" :modal='true' :before-close="ai_dialog_close"> 
        <el-row></el-row>
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
            visiableedit:false
        }
    },
    created:function(){
        this.$root.$on('showeditdialog',()=>{
            this.visiableedit=true;
        });
    }
}
</script>
