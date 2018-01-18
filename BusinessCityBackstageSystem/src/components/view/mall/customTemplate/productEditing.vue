<template>

<!-- <el-col class='btnsPie' :span='16' style='padding-bottom:5px;'>
                <el-button type="primary" class='on' @click.native='switchbtn($event)' style="margin-left:20%;">全部</el-button>
                <el-button type="primary" @click.native='switchbtn($event)'>本月</el-button>
                <el-button type="primary"  @click.native='switchbtn($event)'>更多</el-button>
               
            </el-col> -->

            <!-- switchbtn(e){
            let target=e.target.tagName=='BUTTON'?e.target:e.target.parentNode;
            let btns=target.parentNode.getElementsByTagName('button');
            for(let i=0;i<btns.length;i++){
                btns[i].setAttribute('class','el-button el-button--primary');
            }
            target.setAttribute('class','el-button on el-button--primary');
        }, -->
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
</template>
<script>
    export default{
     data() {
         return{
         }
         
     },
     methods:{
         opendialogPro(){
             this.$root.$emit('opendialogProduct',true)
         },
         switchbtn(e,index){
             //alert(index)
             this.$root.$emit('probtnid',index);             
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
