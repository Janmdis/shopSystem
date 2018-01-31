<template>
  <div>
       <div style="margin:25px 0px 15px 24px;color:black;text-align:left;">选择图片：
           <span class="add-new-Btn" @click="addNewImg">添加图片</span>
       </div>
        <div class="imgLists">
             <keep-alive v-for='(item,index) in imgAdlist' :key='index'>
               <components :deleteImgAdData='index' :is='item'  :type='item' ></components>
            </keep-alive>
        </div>
  </div>
</template>
<script>
// 图片广告图片列表
import addImgList from './addImgList'
    export default{
     data() {
         return{
             imgAdlist:['addImgList']
         }
     },
     created:function(){
         this.$root.$on('imgADdeleteId',(id)=>{
            let list=[];
            for(let i=0;i<this.imgAdlist.length;i++){
                if(id!=i){
                    list.push(this.imgAdlist[i]);
                }
            }
             if(list.length < 1){
              this.$message({
                    type: 'warning',
                    message: '最后一张，取消删除！'
                });
                 return false;
             }else{
                 this.$message({
                    type: 'info',
                    message: '删除成功！'
                });
                 this.imgAdlist=list;
             }
            
         });
     },
     methods:{
         addNewImg(){
             if(this.imgAdlist.length >= 5){
                 this.$message({
                    type: 'warning',
                    message: '最多添加5张图片广告！'
                });
                 return false
             }
            this.imgAdlist.push('addImgList');
         }
     },
     components:{
         addImgList
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
  cursor: pointer;
  position: relative;
}
</style>
