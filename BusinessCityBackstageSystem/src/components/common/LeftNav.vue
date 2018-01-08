<template>
  <div class="leatNav">
    <h1 class="bodysss">{{ msg }}</h1>
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
<style scoped lang="less">
@import '../../assets/less/color';
    .leatNav{
        height:100%;
        float:left;
        width:10%;
        background:blue;
        color:#fff;
        .bodysss{
          background:@bg;
          color:@black-2;
        }
    }
</style>
