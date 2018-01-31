
<template>
  <!-- 标题组件开始 -->
    <div class="borderHover" @click="sendTitleinfo" :index='dataid'>
        <el-row>
          <el-col :span="24">
            <div class="line">
              <div class="line-s"></div>
            </div>
          </el-col>
          <el-col :span="20" :offset="2">
            <div class="mainTitles" v-bind:style="mainTitleStyle">{{ main }}</div>
          </el-col>
          <el-col :span="20" :offset="2">
            <div class="subTitles" v-bind:style="subTitleStyle">{{ sub }}</div>
          </el-col>
        </el-row>
         <div class="hoverClick">
            <span data-toggle="modal" data-target="#delModal" @click='deletedep'>删除</span>
            <span><a href="#addnewContent" onclick="return false;" style="color:#fff">添加新内容</a></span>
        </div>
    </div>
    <!-- 标题组件结束 -->
</template>
<script>
    export default{
        data() {
            return{
                dataid:'',
                main:'BACK TO SCHOOL SEASONAL DISCOUNT',
                sub:'开学季优惠',
                color1: '#000',
                color2: '#000',
                mainTitleStyle:{
                  color:''
                },
                subTitleStyle:{
                  color:''
                }
             }
        },
        props:['templatedata'],
        created:function(){
          this.dataid=this.templatedata;
          this.$root.$on('mainTitle',(data) => {
            let type = data.type;
            if(this.dataid==type){
              this.main = data.value
            }
          })
          this.$root.$on('subtitle',(data) => {
            let type = data.type;
            if(this.dataid==type){
             this.sub = data.value
            }
          })
          this.$root.$on('mainTitleColor',(data) => {
            let type = data.type;
            console.log(type)
            console.log(this.dataid)
            if(this.dataid == type){
               this.color1 = data.color
              this.mainTitleStyle.color = this.color1;
              //console.log(this.mainTitleStyle.color+'绑定的主标题颜色')
            }
          })
          this.$root.$on('subTitleColor',(data) => {
            let type = data.type;
            if(this.dataid==type){
              this.color2 = data.color
              this.subTitleStyle.color = this.color2;
             // console.log(this.subTitleStyle.color+'绑定的副标题颜色')
            }
          })
        },
        methods:{
          delete(){
            this.$root.$emit('test',this.dataid);
                return{
                    type:'success',
                    message:'删除成功!'
                };
          },
          sendTitleinfo(){
            // alert(this.main)
            // alert(this.sub)
            // alert(this.color1)
            // alert(this.color2)
             this.$root.$emit('titleContent',{btitle:this.main,mtitle:this.sub,color1:this.color1,color2:this.color2});
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
.mainTitles{margin-bottom:25px;text-align: center;font-size: 18px;overflow: hidden;}
.subTitles{text-align: center;overflow: hidden;}
</style>
