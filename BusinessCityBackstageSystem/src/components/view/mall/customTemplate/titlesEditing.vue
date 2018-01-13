<template>
  <div>
        <div class="imgLists">
           <div class="carouselListInfo">
               <div class="editSelectDiv">
                     <div class="mainTitleDiv">
                        <span class="mainTitle">主标题：</span>
                        <el-input v-model="input" class="mainTitleInput"></el-input>
                        <div style="clear:both;"></div>
                    </div>
                    <div class="subtitleDiv">
                        <span class="subtitle">副标题：</span>
                        <el-input v-model="input" class="subtitleInput"></el-input>
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
         }
     }
 }
</script>
<style>
.el-input__inner{
    height: 30px;
}
/* 引入标题编辑时 框变小 */
.template-edit-div{
    min-width: 457px !important;
}
</style>
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
 .mainTitleDiv{margin-top:20px;margin-bottom:20px;}
 .mainTitle{display:inline-block;float:left;padding-top:6px}
 .mainTitleInput{display:inline-block;float:left;width:285px;}
 .subtitleDiv{margin-top:20px;margin-bottom:20px;}
 .subtitle{display:inline-block;float:left;padding-top:6px}
 .subtitleInput{display:inline-block;float:left;width:285px;}
</style>
