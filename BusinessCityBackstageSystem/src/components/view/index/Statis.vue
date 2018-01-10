<template>
  <div class="grid-content">
    <img class="top-img" :src="imgurl" alt="" />
    <p class="nums" :value="num">{{num}}</p>
    <p class="tips" :value='describe'>{{describe}}</p>
  </div>
</template>
<script>
export default {
  data(){
    return {
      num:0,
      describe:'当日用户新增数',
      imgurl:'../../../../static/images/index/main1.png'
    }
  },
  props:{
    typedata:Number
  },
  created:function(){
    let type=this.typedata;
    if(type==1){
      this.describe='当日用户新增数';
      this.imgurl='../../../../static/images/index/main1.png';
    }
    else if(type==2){
      this.describe='当日客户跟踪数';
      this.imgurl='../../../../static/images/index/main2.png';
    }
    else if(type==3){
      this.describe='当日营业额';
      this.imgurl='../../../../static/images/index/main3.png';
    }
  }
}
</script>

<style scoped>
.nums{
  color:#26BBA4;
	font-size: 48px;
	padding-top: 20px;
	padding-bottom: 20px;
}
.tips{
  font-size: 16px;
}
.grid-content{
  background-color: white;
  height: 185px;
  padding-top: 20px;
  border-radius: 10px;
  text-align: center;
}
</style>
