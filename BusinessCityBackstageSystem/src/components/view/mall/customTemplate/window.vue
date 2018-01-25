<template>
  <!-- 橱窗组件开始 -->
    <div class="borderHover" :index='dataid'>
        <el-row>
        <el-col :span="12">
             <div class="imgConet">
               <!-- 条框div -->
                <div class="boxesDiv">
                  <img src="./../../../../assets/logo.png" class="img">
                </div>
                <!-- 主标题 -->
                <p class="title1">主标题</p>
                <!-- 副标题 -->
                <p class="title2">副标题</p>
                <!-- 线框div -->
                <div class="lineDiv"></div>
             </div>
        </el-col>
        <el-col :span="12">
            <div class="imgConet">
               <!-- 条框div -->
                <div class="boxesDiv">
                  <img src="./../../../../assets/logo.png" class="img">
                </div>
                <!-- 主标题 -->
                <p class="title1">主标题</p>
                <!-- 副标题 -->
                <p class="title2">副标题</p>
               <!-- 线框div -->
               <div class="lineDiv"></div>
             </div>
        </el-col>
        <el-col :span="12">
            <div class="imgConet">
               <!-- 条框div -->
               <div class="boxesDiv">
                  <img src="./../../../../assets/logo.png" class="img">
                </div>
                <!-- 主标题 -->
                <p class="title1">主标题</p>
                <!-- 副标题 -->
                <p class="title2">副标题</p>
               <!-- 线框div -->
               <div class="lineDiv"></div>
             </div>
        </el-col>
        <el-col :span="12">
          <div class="imgConet">
               <!-- 条框div -->
                <div class="boxesDiv">
                  <img src="./../../../../assets/logo.png" class="img">
                </div>
                <!-- 主标题 -->
                <p class="title1">主标题</p>
                <!-- 副标题 -->
                <p class="title2">副标题</p>
               <!-- 线框div -->
               <div class="lineDiv"></div>
             </div>
        </el-col>
        <div style="clear:both;"></div>
        </el-row>
        <div class="hoverClick">
            <span data-toggle="modal" data-target="#delModal" @click='deletedep'>删除</span>
            <span><a href="#addnewContent" style="color:#fff">添加新内容</a></span>
        </div>
    </div>
    <!-- 橱窗组件结束 -->
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
.current-style:hover .hoverClick{
  display: block;
}
//////
 .el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.imgConet{
  position:relative;
  margin:30px 30px;
}
.img{
  width: 100%;
  height: 100%;
}
.boxesDiv{
  border:10px solid #eeeeee;
}
.lineDiv{
    position: absolute;
    width: 80%;
    height: 80%;
    top: 9%;
    left: 9%;
    border: 1px solid #eeeeee;
}
.title1{    position: absolute;
font-size: 13px;
    top: 17%;
    left: 40%;}
.title2{position: absolute;
font-size: 13px;
    top: 72%;
    left: 40%;}
</style>
