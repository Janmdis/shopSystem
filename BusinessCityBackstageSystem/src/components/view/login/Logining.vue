<template>
  <div id="logining">
      <el-row>
        <el-col :sm="8" :md="8" :lg="8" :offset="16">
            <div class="contentRight">
                <h3>欢迎进入净润家管理系统</h3>
                <h5> Background management system </h5>
                <router-view></router-view>
            </div>
        </el-col>
    </el-row>
  </div>
</template>
<script>
/* import loginTag from './Login.vue'
import forgetTag from './ForgetPwd.vue' */
export default {
    data () {
        return {
            
        }
    },
    components:{
        
    }
}
</script>
<style scoped>
#logining{
    width:100%;
    height: 100%;
    background:url(./background.jpg) no-repeat;
    background-size:100% 100%;
    background-position: center;
    position: relative;
}
.el-row{
   width: 100%;
   height:620px;
   position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
}
.contentRight{
    max-width:450px;
    min-width:365px;
    position: relative;
}
.contentRight h3,.contentRight h5{
    text-align: center;
    color: #fff;
}
.contentRight h3{
    font-size: 24px;
     margin:25px 0;
}
.contentRight h5{
    font-size: 14px;
     margin-bottom:50px;
}
.contentRight h5:before,.contentRight h5:after{
    content:'';
    display:inline-block;
    width:30px;
    height:2px;
    background:#fff;
    vertical-align: middle;
}

</style>

