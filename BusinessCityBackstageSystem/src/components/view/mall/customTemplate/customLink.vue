<template>
      <el-dialog
        title="自定义"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
            <!-- 内容 -->
            自定义
            <!-- 内容 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
</template>
<script>
  export default {
       data() {
      return {
          dialogVisible: false
      };
    },
    methods: {
    },
    created:function(){
            this.$root.$on('opendialogSelf',(status) =>{
                this.dialogVisible = status
            });
      },
  }
</script>
<style scoped lang="less">
@import "../../../../assets/less/color";

</style>
