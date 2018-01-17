<template>
  <div>
        <div class="imgLists">
            <windowAddImgList></windowAddImgList>
            <windowAddImgList></windowAddImgList>
            <windowAddImgList></windowAddImgList>
            <windowAddImgList></windowAddImgList>
        </div>
  </div>
</template>
<script>
// 橱窗图片列表
import windowAddImgList from './windowAddImgList'
    export default{
     data() {
         return{
             
         }
         
     },
     methods:{
     },
     components:{
         windowAddImgList
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
