<template>
  <div>
        <div class="imgLists">
           <div class="carouselListInfo">
               <div class="editSelectDiv">
                    <div class="styleBtn">
                        <ul>
                            <li class="styleTitle">选择商品：</li>
                            <li class="styleBorderBtn" @click="opendialogPro" style="border-radius: 5px;">选择</li>
                        </ul>
                        <div style="clear:both;"></div>
                    </div>
                </div>
                <div class="editStyleDiv">
                    <div class="styleBtn">
                        <ul>
                            <li class="styleTitle">列表样式：</li>
                            <li class="styleBorderBtn borderBig" style="background:#018a88;">大图</li>
                            <li class="styleBorderBtn borderSmall">小图</li>
                            <li class="styleBorderBtn borderBS">一大两小</li>
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
    .borderBig{border-radius: 5px 0px 0px 5px;}
.borderSmall{border-radius: 0px;}
.borderBS{border-radius: 0px 5px 5px 0px;}
</style>
