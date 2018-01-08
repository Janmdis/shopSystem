<template>
  <div class="leatNav">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'leatNav',
  data () {
    return {
      msg: 'leatNav'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .leatNav{
        height:100%;
        float:left;
        width:10%;
        background:blue;
        color:#fff;
    }
</style>
