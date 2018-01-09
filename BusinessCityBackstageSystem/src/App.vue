<template>
  <div id="app">
    
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    // 全局的路由对象
    window.vueRouter = this.$router;
  }
};
</script>

<style lang="less">

</style>
