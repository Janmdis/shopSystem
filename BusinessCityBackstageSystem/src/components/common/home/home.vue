<template>
    <div class="wrapper">
        <el-row>
            <el-col :span="4" :sm="4" :xs="4" :md="4" :lg="3"><v-sidebar :permissionTree="permissionTree" v-on:menuRouter="listenToMenuClick"></v-sidebar></el-col>
            <el-col :span="20" :sm="20" :xs="20" :md="20" :lg="21"><v-head  :currentRouter="currentRouter"></v-head></el-col>
            <div class="wrapper-head-down open">
                <div class="container">
                    <transition name="move" mode="out-in">
                        <router-view :contentProps="contentProps" ref="routerView"></router-view>
                    </transition>
                </div>
            </div>
        </el-row>
    </div>
</template>
<script>
  import homeScript from './home.js';
  export default homeScript;
</script>
<style lang="less" scoped>
 @import './home'; 
</style>
