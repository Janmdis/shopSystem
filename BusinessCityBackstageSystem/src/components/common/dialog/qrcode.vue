<template>
    <el-dialog title='二维码'  :visible.sync="dialogVisible"  width="40%" class='dialoqrcode' :modal='true' :before-close="ai_dialog_close">
        <div>
            <img :src="url" alt="" style='margin:0 auto;display:block;'>
        </div>
        <div slot="footer" class="dialog-footer" :center='true'>
            <a :href="url" download='filename' target="_blank">
                <el-button type="primary" round>保存图片</el-button>
            </a>
            
        </div>
    </el-dialog>
</template>
<script>
export default {
    data(){
        return {
            dialogVisible:false,
            url:''
        }
    },
    created(){
        this.$root.$on('qrcode',data=>{
            this.dialogVisible=true;
            this.url=data;
            console.log(data);
        });
    },
    methods:{
        ai_dialog_close(){
            this.dialogVisible=false;
        },
        adddata(){
            this.DownLoadReportIMG(this.url);
        }
    }
}
</script>
