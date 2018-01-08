<template>
  <div class="header">
    <div>{{ msg }}</div>
  </div>
</template>

<script>
export default {
  name: 'headers',
  data () {
    return {
      msg: 'headers'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  width:90%;
  height:40px;
  background:red;
  float:left;
  padding:0;
  maring:0;
}
</style>
