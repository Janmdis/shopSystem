<template>
      <el-dialog
        title="商品详情"
        :visible.sync="dialogVisible"
        width="30%"
        >
            <!-- 内容 -->
            商品详情
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
            this.$root.$on('opendialogProduct',(status) =>{
                this.dialogVisible = status
            });
      },
  }
</script>
<style scoped lang="less">
@import "../../../../assets/less/color";

</style>
