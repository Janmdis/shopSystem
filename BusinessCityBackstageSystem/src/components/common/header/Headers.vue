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
    </el-row>
  </div>
</template>

<script>
import headers from './headers'
export default headers
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@import './header'; 
</style>
