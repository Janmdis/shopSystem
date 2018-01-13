<template>
  <div>
       <div style="margin:25px 0px 15px 24px;color:black;text-align:left;">选择图片：
           <span class="add-new-Btn">新增分类</span>
       </div>
        <div class="imgLists">
            <classificationAddImgList></classificationAddImgList>
            <classificationAddImgList></classificationAddImgList>
        </div>
  </div>
</template>
<script>
// 图片广告图片列表
import classificationAddImgList from './classificationAddImgList'
    export default{
     data() {
         return{
             
         }
         
     },
     methods:{
     },
     components:{
         classificationAddImgList
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
</style>
