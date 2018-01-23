<template>
  <div>
        <div class="imgLists">
           <div class="carouselListInfo">
               <div class="editSelectDiv">
                     <div class="mainTitleDiv">
                        <!-- <span class="mainTitle">主标题：{{ mainTitle }}</span>
                        <el-input v-model="mainTitle" class="mainTitleInput"></el-input> -->
                        <span class="mainTitle">主标题：</span>
                        <el-input @input.native="inputchange($event)" class="mainTitleInput"></el-input>
                        <colorPicker v-model="color1" v-on:change="headleChangeColor1"></colorPicker>
                        <div style="clear:both;"></div>
                    </div>
                    <div class="subtitleDiv">
                        <span class="subtitle">副标题：</span>
                        <el-input @input.native="subinputchange($event)" class="subtitleInput"></el-input>
                        <colorPicker v-model="color2" v-on:change="headleChangeColor2"></colorPicker>
                        <div style="clear:both;"></div>
                    </div>
                </div>
               
            </div>
        </div>
  </div>
</template>
<script>
//导入插件
  import colorPicker from './../../../../assets/plugin/vue-color-picker/colorPicker'

    export default{
     data() {
         return{
             subtitle:'',
             mainTitle:'',
             color1: '#000',
             color2: '#000'
         }
         
     },
     methods:{
         inputchange($event){
             this.mainTitle = $event.target.value
             //console.log(this.mainTitle)
             this.$root.$emit('mainTitle',{value:this.mainTitle});
             
         },
         subinputchange($event){
             this.subtitle = $event.target.value
             this.$root.$emit('subtitle',{value:this.subtitle});
             
         },
         headleChangeColor1 (color1) {
            console.log(`颜色值改变事件：`+ this.color1 )
            this.$root.$emit('mainTitleColor',{color:this.color1});
            },
            headleChangeColor2 (color2) {
             console.log(`颜色值改变事件：`+ this.color2 )
             this.$root.$emit('subTitleColor',{color:this.color2});
            }
            
     },
       components:{
           colorPicker
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
