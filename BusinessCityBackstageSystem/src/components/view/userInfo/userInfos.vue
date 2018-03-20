<template>
    <el-main id='usrinfo'>
        <el-container>
            <el-header>
                <div class="linkHieht">

                </div>
                个人设置
            </el-header>
            <el-main style="width:97%; left:20px;height:90%;" class="mainBox">
            <el-tabs :tab-position="tabPosition" style="height:100%;" >
                <el-tab-pane label="基本信息">
                <users ></users>
                </el-tab-pane>
                <el-tab-pane label="修改头像">
                <imgUp ></imgUp>
                </el-tab-pane>
                <el-tab-pane label="修改密码">
                <Password ></Password>
                </el-tab-pane>
            </el-tabs>

            </el-main>
        </el-container>
    </el-main>
</template>

<script>
import user from './userChildren/User.vue'
import imgUp from './userChildren/ImgUp.vue'
import Password from './userChildren/Password.vue'
    export default {
    data() {
      return {
        tabPosition: 'left',
        
      };
    },
    components:{
        users:user,
        imgUp:imgUp,
        Password:Password
    }
  };
</script>

<style>
.mTop{
    margin-top:20px;
}
.el-tabs__item{
    width:200px;
}
.el-tabs--left .el-tabs__item.is-left{
    text-align: center;
}
#usrinfo .tablist , #usrinfo .el-tabs--left .el-tabs__item.is-left,#usrinfo .el-tabs__nav-scroll{
    background:#fff;
    color:#525252;
    border-right: 1px solid #ddd;
}
</style>

<style scoped lang='less'>


.linkHieht{
   height:26px;
   width:4px;
   position:relative;
   top:5px;
   display:inline-block;
   background:#253A4D;
   margin-right:10px;
   
}
.el-header{
 padding:0;
 height: 78px;
 background-color: #fff;
 line-height:58px;
 padding-left:50px;
 font-size:20px;
}
.el-main{
width: 83.33333%;
left: 16.66667%;
height: 100%;
margin-bottom: -70px;
background-color: #f0f3f6;
position: absolute;
padding:0;
top: 70px;
}
.mainBox{
    background:#fff;
}
@media only screen and (min-width: 992px) {
.el-main{
width: 83.33333%;
left: 16.66667%;
}
}
@media only screen and (min-width: 1200px) {
.el-main{
width: 87.5%;
left: 12.5%;
} 
}
</style>

