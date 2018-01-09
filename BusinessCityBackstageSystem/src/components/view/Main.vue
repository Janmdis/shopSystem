<template>
  <div class="mains">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'mains',
  data () {
    return {
      msg: 'mains'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.mains{
  background:yellow;
  width:100%;
  height:100%;
}
</style>
