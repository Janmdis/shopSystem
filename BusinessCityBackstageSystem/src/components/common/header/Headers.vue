<template>
  <div class="header">
    <el-row class="textCenter textW navBox">
      <el-col :span="18">
         <ul class='navTab'>
          <li v-for="info in navInfo" 
           @click="selected(info.infoText)" 
           :class="{active: activeName == info.infoText}">
            <i :class = info.imgClass ></i>
            <p>{{info.infoText}}</p>
          </li>
         </ul>
      </el-col>
      <el-col :span="6">
      <ul class="leftName">
       
        <li>
          <el-dropdown :hide-on-click="false">
            <span class="el-dropdown-link">
               <i class="icon iconfont icon-lingdang"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item >消息提醒1</el-dropdown-item>
              <el-dropdown-item divided>消息提醒2</el-dropdown-item>
              <el-dropdown-item divided>消息提醒3</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li>
          <el-dropdown :hide-on-click="false">
            <span class="el-dropdown-link">
              <i class="icon iconfont icon-shezhi1"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item >
                <router-link to="userInfos">个人设置</router-link>
              </el-dropdown-item>
              <!--<el-dropdown-item divided @click.native="dialogVisible = true">切换企业</el-dropdown-item>!-->
              <el-dropdown-item divided @click.native='handleLoginOut'>安全退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        
         <li class='userinofBox'>
          <div v-if='imgUrl'>
              <img :src="imgUrl"><span>{{userName}}</span>
          </div>
          <div v-else>
            <img src="./user.png"><span>{{userName}}</span>
          </div>
         </li>
      </ul>
      </el-col>
    </el-row>

    <el-dialog
    title="切换企业"
    :visible.sync="dialogVisible"
    width="30%"
    >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="企业" prop="region">
        <el-col :span="20"><el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="旧密码" prop="newPass">
            <el-col :span="20"><el-input type="password" 
            v-model.number="ruleForm.newPass"
            ></el-input></el-col>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer" center>
    <el-row :gutter="20">
      <el-col :span="12"><el-button class="clearBtn" @click="dialogVisible = false">取 消</el-button></el-col>
      <el-col :span="12"><el-button class="okBtn" type="primary" @click="dialogVisible = false">确 定</el-button></el-col>
    </el-row>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import headers from './headers';
export default headers;
</script>


<style lang='less' >
@import '../../../assets/less/color';
@import '../../../assets/less/elementColor';
.el-select{
  width:84%;
}
.icon-lingdang , .icon-shezhi1 {
  color:#fff;
}
.el-dialog__footer{
  text-align: center;
}
.el-dialog{
  
.dialog-footer .clearBtn{
    height: 42px;
    width: 144px;
    border-radius: 20px;
    color: #fff;
    background: #ef7747;
    margin:0 5%;
    display: inline-block;
}
.dialog-footer .okBtn{
    height: 42px;
    width: 144px;
    border-radius: 20px;
    color: #fff;
    background: #27a1f2;
    margin:0 5%;
    display: inline-block;
}
}
.el-dialog__header{
  background:@hederTbg;
      border-bottom: 4px solid #409eff;
  padding:15px;
 
 .el-dialog__title{
   color:@f;
 }
 .el-dialog__headerbtn .el-dialog__close{
   color:@CClose;
   font-weight:700;
 }
 .el-dialog__headerbtn{
   width:26px;
   height:26px;
   background:@f;
   border-radius:50%;
 }
}
</style>

<style scoped lang='less'>
@import './header'; 
</style>
