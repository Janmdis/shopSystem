<template>
      <el-dialog
        title="自定义"
        :visible.sync="dialogVisible"
        width="30%"
        >
            <!-- 内容 -->
            <div class="customize">
                <p style="float:left;width:22%;line-height:300%">自定义链接：</p>
                <el-input v-model="input" style="float:left;width:73%;" placeholder="请输入自定义链接地址"></el-input>
            </div>
            <!-- 内容 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveUrl">确 定</el-button>
            </span>
        </el-dialog>
</template>
<script>
import { mapState,mapMutations,mapGetters } from 'vuex'
  export default {
       data() {
      return {
          dialogVisible: false,
          input:'',
          indexs:'',
          dataid:''
      };
    },
    methods: {
        saveUrl(){
            let dataids = this.dataid;
            let index = this.indexs;
            let inputs = this.input;
            this.$store.commit('saveUrlZDY',{dataids,index,inputs});//对应组件的标识
             this.$message({
                    type: 'info',
                    message: '添加成功'
                });
            this.dialogVisible = false;
        }
    },
    created:function(){
            this.$root.$on('opendialogSelf',(status) =>{
                this.dialogVisible = status
            });
            this.$root.$on('customizeData',(data) =>{
                this.indexs = data.indexs
                this.dataid = data.dataids
               // console.log(this.dataid)
               // console.log(this.indexs)
                this.input = this.$store.state.adImageList.comlist[this.dataid].componentsData.ImgArr[this.indexs].url;
            });
            
      }
  }
</script>
<style scoped lang="less">
@import "../../../../assets/less/color";
.customize{
    padding: 20px 60px;
    overflow: hidden;
}
</style>
