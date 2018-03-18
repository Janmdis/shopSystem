<template>
  <div class="grid-content">
    <img class="top-img" :src="imgurl" alt="" />
    <div class='data' >
      <label for="">今日{{this.datas.describe1}}</label>
      <span class="numsline1" :value="this.datas.value1">{{this.datas.value1}}</span>
    </div>
    <div class='data'>
      <label for="">昨日{{this.datas.describe2}}</label>
      <span class="numslline2" :value="this.datas.value2">{{this.datas.value2}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      datas:{}
    }
  },
  props:['data'],
  created:function(){
    this.datas=this.data;
    if(this.datas.type==1){
      this.imgurl='../../../../static/images/index/main1.png';
    }
    else if(this.datas.type==2){
      this.imgurl='../../../../static/images/index/main2.png';
    }
    else if(this.datas.type==3){
      this.imgurl='../../../../static/images/index/main3.png';
    }
     else if(this.datas.type==4){
      this.imgurl='../../../../static/images/index/main4.png';
    }
     else if(this.datas.type==5){
      this.imgurl='../../../../static/images/index/main5.png';
    }
     else if(this.datas.type==6){
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
/* .tips{
  font-size: 16px;
} */
.top-img{
  /* width: 20px; */
  position: relative;
  left: 0px;
}
.grid-content{
  background-color: white;
  height: 160px;
  padding: 20px;
  border-radius: 10px;
  position: relative;
}
.data{
  color:#fff;
  padding-bottom: 15px;
  padding-top: 15px;
  vertical-align: middle;
  height:30px;
  line-height: 30px;
}
.data label{
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  /* vertical-align: middle; */
}
.data .numsline1{
  color:#ef7747;
  font-size: 25px;
}
.data .numslline2{
  color:#26bba4;
  font-size: 16px;
}
</style>
