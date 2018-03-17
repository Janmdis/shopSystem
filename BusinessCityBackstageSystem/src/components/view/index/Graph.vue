<template>
  <div class="grid-content">
        <p class="title">
            <img src="../../../../static/images/index/main5.png" alt="" />
            <span>产品销售TOP10</span>
        </p>
        <div id="charts-sell"></div>
  </div>
</template>
<script>
export default {
    mounted(){
        this.draw();
    },
    methods:{
        draw(){
            let myChart = this.$echarts.init(document.getElementById('charts-sell'));
            let option={
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ["","","","","","","","","",""],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        show : false,
                    }
                ],
                series : [
                    {
                        name:'销量',
                        type:'bar',
                        barWidth: '60%',
                        data:[0,0,0,0,0,0,0,0,0,0],
                        label: {
                            normal: {
                                show: true,
                                position: 'outside',
                                color:'#000'
                            }
                        },
                        itemStyle: {
                            normal: {
                                // color: new echarts.graphic.LinearGradient(
                                //             0, 0,1,1,
                                //             [
                                //                 {offset: 0.5, color: '#1CDABA'},
                                //                 {offset: 0.1, color: '#17A0D9'}
                                //             ]
                                //     ),
                                barBorderRadius:[10, 10, 10, 10]
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option);
        }
    }
}
</script>
<style scoped>
.title{
  font-size: 16px;
  padding-left: 20px;
  overflow: hidden;
}
.title img,
.title span{
    float: left;
}
.title span{
    padding-top: 7px;
}
.grid-content{
  background-color: white;
  height: 410px;
  padding-top: 20px;
  border-radius: 10px;
  text-align: center;
  position: relative;
  padding-bottom: 40px
}
#charts-sell{
    width: 100%;
    height:100%;
}
</style>
