<template>
  <div id="app">
    
    <LeftNav></LeftNav>
    <Headers></Headers>
    <router-view/>
  </div>
</template>

<script>
import Headers from '@/components/common/Headers'
import LeftNav from '@/components/common/LeftNav'
export default {
  name: 'app',
  components: {
    Headers,
    LeftNav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
