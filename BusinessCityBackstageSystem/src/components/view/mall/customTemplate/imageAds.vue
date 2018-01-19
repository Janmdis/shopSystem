<template>
  <!-- 轮播开始 -->
        <div class="borderHover" :index='dataid'>
            <div class="block">
                <el-carousel trigger="click" width='614px'>
                    <el-carousel-item v-for="item in 4" :key="item">
                        <h3 class="Imgsize"><a href="javascript:;"><img class="Imgsize" :src="item" /></a></h3>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="hoverClick">
                <span data-toggle="modal" data-target="#delModal" @click='deletedep'>删除</span>
                <a href="#addnewContent"><span >添加新内容</span></a> 
           </div>
        </div>
    <!-- 轮播结束 -->
</template>
<script>
    export default{
        data() {
            return{
                addnewContent:addnewContent,
                 ImgArr:[
                 "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=877572980,414732243&fm=27&gp=0.jpg",
                 "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3912709398,3423769101&fm=27&gp=0.jpg",
                 "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=877572980,414732243&fm=27&gp=0.jpg"
                 ],
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
            
         }
        //  scrollTo(){
        //      var _id = document.getElementById('addnewContent');
        //     //  console.log(_id.offsetTop);
        //     document.body.scrollTop=0;
        //     //  alert(111);
        //  }
        }
    }
</script>
<style>
/* 轮播图组件样式 */
.el-carousel__indicator.is-active button {
    opacity: 1;
    background-color: #109997;
}
.el-carousel__button {
    display: block;
    opacity: 1;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid #109997;
}
</style>

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
    z-index: 2000
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
.Imgsize{
    width: 100%;
    height: 100%;
}
</style>

