<template>
  <!-- 轮播开始 -->
        <div class="borderHover" :index='dataid'>
            <div class="block">
                <el-carousel trigger="click" width='614px'>
                    <el-carousel-item v-for='(item,index) in ImgArr' :key='index'>
                        <h3 class="Imgsize"><a href="javascript:;"><img class="Imgsize" :src="item.img" /></a></h3>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="hoverClick">
                <span data-toggle="modal" data-target="#delModal" @click='deletedep'>删除</span>
                <a href="#addnewContent" onclick="return false;"><span >添加新内容</span></a> 
           </div>
        </div>
    <!-- 轮播结束 -->
</template>
<script>
    export default{
        data() {
            return{
                ImgArr:[
                        {
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225304769&di=9dc8aef46668f5f48a87293a77a41282&imgtype=0&src=http%3A%2F%2Fpic110.nipic.com%2Ffile%2F20160927%2F20860925_093853370000_2.jpg",
                            url:''
                        },{
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225306681&di=b0cba1dd817a12c4793f9470e0862c52&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F140514%2F318754-1405140A44778.jpg",
                            url:''
                        },{
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517226158648&di=17f12755288182fb3d22662116b917aa&imgtype=0&src=http%3A%2F%2Fimg.sc115.com%2Fuploads1%2Fsc%2Fjpgs%2F1512%2Fapic16838_sc115.com.jpg",
                            url:''
                        },{
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225304770&di=fd7f38f44865d3dd961d24dea0e265f7&imgtype=0&src=http%3A%2F%2Fpic22.nipic.com%2F20120718%2F5135035_193813111000_2.jpg",
                            url:''
                        },{
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225304769&di=23cccc5f58a5cab6420036e616b83a5f&imgtype=0&src=http%3A%2F%2Fpic107.nipic.com%2Ffile%2F20160816%2F20860925_080643495000_2.jpg",
                            url:''
                        }
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
.el-carousel__arrow,el-carousel__arrow--left{
   filter:alpha(opacity=0);
   -moz-opacity:0;
    -khtml-opacity: 0;
    opacity: 0; 
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

