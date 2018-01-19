
<template>
  <!-- 标题组件开始 -->
    <div class="borderHover" :index='dataid'>
        <el-row>
          <el-col :span="24">
            <div class="line">
              <div class="line-s"></div>
            </div>
          </el-col>
          <el-col :span="20" :offset="2">
            <div class="" style="margin-bottom:25px;text-align: center;">BACK TO SCHOOL SEASONAL DISCOUNT</div>
          </el-col>
          <el-col :span="20" :offset="2">
            <div class="" style="text-align: center;">开学季优惠</div>
          </el-col>
        </el-row>
         <div class="hoverClick">
            <span data-toggle="modal" data-target="#delModal" @click='deletedep'>删除</span>
            <span><a href="#addnewContent" style="color:#fff">添加新内容</a></span>
        </div>
    </div>
    <!-- 标题组件结束 -->
</template>
<script>
    export default{
        data() {
            return{
                dataid:''
            }
        },
        props:['templatedata'],
        created:function(){
          this.dataid=this.templatedata;
        },
        methods:{
          delete(){
            this.$root.$emit('test',this.dataid);
                return{
                    type:'success',
                    message:'删除成功!'
                };
          },
          deletedep(){
            this.$confirm('确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                let msg=this.delete();
                this.$message(msg);
            }).catch(()=>{
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
            
         },
        }
    }
</script>
<style scoped lang="less">
@import "../../../../assets/less/color";
//选中的模块/鼠标停留的时候 边框样式
.current-style {
    border: 1px dashed red!important;
}
.borderHover{
  padding:5px 5px;
  margin-bottom: 3px;
  position: relative;
}
.borderHover:hover{
    border: 1px dashed red!important;
}
 .hoverClick{
    position: absolute;
    bottom: 2px;
    right: 0;
    font-size: 12px;
    display: none;
}
.hoverClick span {
  color:#fff;
  background: rgb(250, 133, 133);
  display: inline-block;
  padding: 4px 10px;
  cursor: pointer;
}
.hoverClick span:hover {
  background: red;
}
.borderHover:hover .hoverClick{
  display: block;
}
//////

 .el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.line{
  background-color:#cdcdcd;
  height:1px;
  margin-bottom:30px;
}
.line-s{
  background:#1e2d38;
  width:40px;
  height:3px;
  margin:0 auto;
  }

</style>
