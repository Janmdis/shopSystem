<template>
   <!-- 商品组件开始 -->
    <div class="borderHover" :index='dataid'>
      <!-- 商品开始 -->
      <div>
        <el-row>
        <el-col :span="bigImg">
          <div class="imgConet">
               <!-- 图片-->
               <img src="./../../../../assets/templateImg.jpg" class="img">
             </div>
        </el-col>
        <el-col :span="smallImg">
          <div class="imgConet">
               <!-- 图片-->
               <img src="./../../../../assets/templateImg.jpg" class="img">
             </div>
        </el-col>
        <el-col :span="bigsImg">
          <div class="imgConet">
               <!-- 图片-->
               <img src="./../../../../assets/templateImg.jpg" class="img">
             </div>
        </el-col>
        </el-row>
        <div class="hoverClick">
            <span data-toggle="modal" data-target="#delModal" @click='deletedep'>删除</span>
            <span><a href="#addnewContent"  onclick="return false;" style="color:#fff">添加新内容</a></span>
        </div>
      </div>
      <!-- 商品结束 -->
      <div class="template-editContent-div" >
            <div class="arrow"></div>
            <div>
                <div class="imgLists">
                  <div class="carouselListInfo">
                      <div class="editSelectDiv">
                            <div class="styleBtn">
                                <ul>
                                    <li class="styleTitle">选择商品：</li>
                                    <li class="styleBorderBtn styleBorderBtns" @click="opendialogPro" style="border-radius: 5px;">选择</li>
                                </ul>
                                <div style="clear:both;"></div>
                            </div>
                        </div>
                        <div class="editStyleDiv">
                            <p class="styleTitle">列表样式：</p>
                            <div class="styleBtn">
                                <ul class="styleUl">
                                    <li @click='switchbtn($event,1)' class="styleBorderBtn on">大图</li>
                                    <li @click='switchbtn($event,2)' class="styleBorderBtn">小图</li>
                                    <li @click='switchbtn($event,3)' class="styleBorderBtn">一大两小</li>
                                </ul>
                                <div style="clear:both;"></div>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
        </div>
    </div>
    <!-- 商品组件结束 -->
</template>
<script>
    export default{
      props:['templatedata'],
        data() {
            return{
                dataid:'',
                bigImg:24,
                smallImg:24,
                bigsImg:24
            }
        },
        created:function(){
          console.log(this.dataid)
          this.dataid=this.templatedata;
          this.$root.$on('probtnid',(data)=>{
            let type=data.type;
            //alert(id)
            if(this.dataid==type){
              if(data.id == 1){
                this.bigImg = 24;
                this.smallImg = 24;
                this.bigsImg = 24;
              }
              else if(data.id == 2){
                this.bigImg = 12;
                this.smallImg = 12;
                this.bigsImg = 12;
              }
              else if(data.id == 3){
                this.bigImg = 24;
                this.smallImg = 12;
                this.bigsImg = 12;
              }
            }
            
         });
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
          opendialogPro(){
              //  alert(this.datatype);
              this.$root.$emit('opendialogProduct',true)
          },
          switchbtn(e,index){
              //alert(index)
              this.$root.$emit('probtnid',{id:index,type:this.type});             
              let target=e.target.tagName=='li'?e.target.parentNode:e.target;
              let lis=target.parentNode.getElementsByTagName('li');
              for(let i=0;i<lis.length;i++){
                  lis[i].setAttribute('class','styleBorderBtn');
              }
              target.setAttribute('class','styleBorderBtn on');
          }
        }
    }
</script>
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
.add-new-Btn{
    line-height: 34px;
   border-radius: 5px;
  color: #fff;
  display:inline-block;
  padding: 0 15px 0 15px;
  margin-left: 12px;
  background: #00adab;
  position: relative;
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
.test:hover .hoverClick{
  display: block;
}

///////////////
 .el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.imgConet{
  margin:5px 30px;
}
.img{
  width: 100%;
  height: 100%;
}

// new add
.carouselListInfo{padding:30px 30px 30px;border-bottom:1px solid #d2d2d2}
 .editSelectDiv{width:100%;background:#fff;margin-left:10px;margin-top:5px;}
 .editStyleDiv{width:100%;background:#fff;margin-left:10px;margin-top:32px;}
 .styleBtn{font-size:16px;margin-top:10px;margin-bottom:20px;}
 .styleTitle{float:left;padding-left:16px;padding-top:5px;}
 .styleBorderBtn{    float: left;
    padding: 8px 11px;
    background: #00adab;
    color:#fff;
    width: 82px;cursor: pointer;
    text-align: center;}
.styleBorderBtns:hover{
    background:#018a88;
}
    .styleUl :nth-child(1){
        border-radius: 5px 0px 0px 5px;
    }
    .styleUl :nth-child(2){
        border-radius: 0px;
    }
    .styleUl :nth-child(3){
       border-radius: 0px 5px 5px 0px;
    }
.on{
   background:#018a88;
}
</style>
