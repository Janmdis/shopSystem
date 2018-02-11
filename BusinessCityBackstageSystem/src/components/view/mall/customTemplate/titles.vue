
<template>
  <!-- 标题组件开始 -->
    <div class="borderHover" @click="sendTitleinfo" :index='dataid'>
      <div>
        <!-- 标题开始 -->
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
        <!-- 标题结束 -->
        <div class="template-editContent-div" >
            <div class="arrow"></div>
            <div>
                <div class="imgLists">
                  <div class="carouselListInfo">
                      <div class="editSelectDiv">
                            <div class="mainTitleDiv">
                                <span class="mainTitle">主标题：</span>
                                <el-input @input.native="inputchange($event)" v-model="mainTitleInput" class="mainTitleInput"></el-input>
                                <colorPicker v-model="color1" v-on:change="headleChangeColor1"></colorPicker>
                                <div style="clear:both;"></div>
                            </div>
                            <div class="subtitleDiv">
                                <span class="subtitle">副标题：</span>
                                <el-input @input.native="subinputchange($event)" v-model="subtitleInput" class="subtitleInput"></el-input>
                                <colorPicker v-model="color2" v-on:change="headleChangeColor2"></colorPicker>
                                <div style="clear:both;"></div>
                            </div>
                        </div>
                      
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </div>
    <!-- 标题组件结束 -->
</template>
<script>
//导入插件
  import colorPicker from './../../../../assets/plugin/vue-color-picker/colorPicker'

    export default{
       props:['type'],
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
                },
                subtitle:'',
                mainTitle:'',
                color1: '#000',
                color2: '#000',
                mainTitleInput:'',
                subtitleInput:''
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

           this.$root.$on('titleContent',(data) => {
             console.log(data)
             let mainContent = data.btitle;
             let subContent = data.mtitle;
             let mainColor = data.color1;
             let subColor = data.color2;
             console.log(mainColor)
             console.log(subColor)
              this.mainTitleInput = mainContent
              this.color1 = mainColor;
              this.subtitleInput = subContent
              this.color2 = subColor;
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
         inputchange($event){
             this.mainTitle = $event.target.value
             //console.log(this.mainTitle)
             this.$root.$emit('mainTitle',{value:this.mainTitle,type:this.type});
             
         },
         subinputchange($event){
             this.subtitle = $event.target.value
             this.$root.$emit('subtitle',{value:this.subtitle,type:this.type});
             
         },
         headleChangeColor1 (color1) {
            console.log(`颜色值改变事件：`+ this.color1 )
            this.$root.$emit('mainTitleColor',{color:this.color1,type:this.type});
            },
            headleChangeColor2 (color2) {
             console.log(`颜色值改变事件：`+ this.color2 )
             this.$root.$emit('subTitleColor',{color:this.color2,type:this.type});
            }
        },
       components:{
           colorPicker
       }
    }
</script>
<style>
.carouselListInfo .el-input__inner{
    height: 30px;
}
/* 引入标题编辑时 框变小 */
.carouselListInfo .template-edit-div{
    min-width: 457px !important;
}
</style>
<style scoped lang="less">
@import "../../../../assets/less/color";
.template-editContent-div{
    margin-top:40px;
    position: relative;
    position:absolute;
    top: 5%;
    left: 102%;
    min-width:608px;
    margin-left:10px;
    margin-right:280px;
    border: 1px solid #aaaaaa;
    border-bottom:none;
}
// 三角样式
.arrow{
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 8px 10px 8px 0;
    border-color: transparent #aaaaaa transparent transparent;
    position: absolute;
    left: -10px;
    top: 19px;
}
.arrow:after{
     content: "";
    border-right-color: #F4F6FC;
    left: 1px;
    top: -8px;
}
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

.add-new-Btn{ line-height: 34px; border-radius: 5px; color: #fff; display:inline-block; padding: 0 15px 0 15px; margin-left: 12px; background: #00adab; position: relative; }
 .carouselListInfo{ padding:30px 30px 30px; border-bottom:1px solid #d2d2d2}
 .editSelectDiv{ width:100%; background:#fff; margin-left:10px; margin-top:5px;}
 .mainTitleDiv{ margin-top:20px; margin-bottom:20px;}
 .mainTitle{ display:inline-block; float:left; padding-top:6px}
 .mainTitleInput{ display:inline-block; float:left; width:285px;}
 .subtitleDiv{ margin-top:20px; margin-bottom:20px;}
 .subtitle{ display:inline-block; float:left; padding-top:6px}
 .subtitleInput{ display:inline-block; float:left; width:285px;}
</style>
