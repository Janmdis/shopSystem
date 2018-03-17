<template>
    <div class="grid-content">
        <div class="h-t">
            <el-col class='tip' :span='8'>
                 <img src="../../../../static/images/index/main6.png" alt="">
                <label for="">待办事项</label>
            </el-col>
            <el-col class='btns' :span='16'>
                <el-button type="primary" :class='showtome?"on":""' @click.native='switchbtn("showtome",$event)'>To我</el-button>
                <el-button type="primary" :class='showoverdate?"on":""' @click.native='switchbtn("showoverdate",$event)'>超期</el-button>
                <el-button type="primary" :class='showstar?"on":""' icon="el-icon-star-on" @click.native='switchbtn("showstar",$event)'></el-button>
                <el-button type="primary" :class='showsearch?"on":""' icon="el-icon-search" @click.native='switchbtn("showsearch",$event)'></el-button>
            </el-col>
        </div>
        <div class='content-tome' v-show='showtome'>1</div>
        <div class='content-overdate' v-show='showoverdate'>2</div>
        <div class='content-star' v-show='showstar'>3</div>
        <div class='content-search' v-show='showsearch'>
            <el-input
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
                v-model="valuesearch">
            </el-input>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            showtome:true,
            showoverdate:false,
            showstar:false,
            showsearch:false,
            valuesearch:''
        }
    },
    methods:{
        switchbtn(type,e){
            this.showtome=false;
            this.showoverdate=false;
            this.showstar=false;
            this.showsearch=false;
            this[type]=true;
        }
    }
}
</script>

<style scoped>
.grid-content{
  background-color: white;
  height: 160px;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  color:#fff;
}
.tip{
    position: relative;
    
}
.h-t{
    border-bottom: 1px solid #ccc;
    overflow: hidden;
}
.tip label{
    font-size: 14px;
    position: absolute;
    top: 8px;
}
.btns button{
    width: 23%;
    height: 25px;
    padding: 0;
    margin-left: 0;
    margin-top: 3px;
    font-size: 12px;
    background-color: #00c0be;
    border-color: #00c0be;
}
.btns .on{
    background-color: #0d908f;
    border-color: #0d908f;
}
.content-search{
    width: 80%;
    height: 120px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
/* .data{
  color:#fff;
  padding-bottom: 15px;
  padding-top: 15px;
  vertical-align: middle;
  height:30px;
  line-height: 30px;
} */
</style>
