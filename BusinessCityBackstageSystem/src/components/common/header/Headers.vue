<template>
  <div class="header">
    <el-row class="textCenter textW navBox">
      <el-col :span="18">
         <ul class='navTab'>
          <li v-for="info in navInfo" 
           @click="selected(info.infoText)" 
           :class="{active: activeName == info.infoText}"
           >
            <i :class = info.imgClass ></i>
            <p>{{info.infoText}}</p>
          </li>
         </ul>
      </el-col>
      <el-col :span="6">
      <ul class="leftName">
        <li>商城前台</li>
        <li>
          <el-dropdown :hide-on-click="false">
            <span class="el-dropdown-link">
              系统消息
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item >黄金糕</el-dropdown-item>
              <el-dropdown-item divided>狮子头</el-dropdown-item>
              <el-dropdown-item divided>螺蛳粉</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li>
          <el-dropdown :hide-on-click="false">
            <span class="el-dropdown-link">
              个人信息
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item >
                <router-link to="userInfos">个人信息</router-link>
              </el-dropdown-item>
              <el-dropdown-item divided>狮子头</el-dropdown-item>
              <el-dropdown-item divided>螺蛳粉</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import headers from './headers';
export default headers;
</script>




<style scoped lang='less'>
@import './header'; 
</style>
