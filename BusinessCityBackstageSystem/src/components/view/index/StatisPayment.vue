<template>
  <div class="grid-content">
      <img class="top-img" src="../../../../static/images/index/main4.png" alt="" />
      <span class="date">{{datecurrent}}</span>
      <div classs="moneyline" id="moneyline"> </div>
      <p class="getmoney-label">当月应付款</p>
      <p class="paymoney-label">当月应收款</p>
  </div>
</template>
<script>
export default {
  data(){
      return {
          datecurrent:''
      }
  },
  mounted(){
    this.draw();
  },
  created:function(){
      let date=new Date().Format("yyyy-MM-dd");
      this.datecurrent=date;
  },
  methods:{
    draw(){
        let myChart = this.$echarts.init(document.getElementById('moneyline'));
        let option = {
            grid: {
                left: '10%',
                right: '4%',
                bottom: '10%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: {
                splitLine:{show: false},
                show : false,
                type : 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                splitLine:{show: false},
                show : false,
                data: ['当月应收款','当月应付款']
            },
            series: [
                {
                    type: 'bar',
                    data: [10, 200],
                    label: {
                        normal: {
                            show: true,
                            position: 'inside',
                            color:'#fff',
                            formatter: '￥{c}'
                        }
                    },
                    itemStyle: {
                        normal: {
                            // color: function(params) {
                            //     var colorList = [
                            //         new echarts.graphic.LinearGradient(
                            //                 0, 0,1,1,
                            //                 [
                            //                     {offset: 0.1, color: '#E26160'},
                            //                     {offset: 0.5, color: '#E26160'}
                            //                 ]
                            //         ),
                            //       new echarts.graphic.LinearGradient(
                            //             0, 0,1,1,
                            //             [
                            //                 {offset: 0.1, color: '#17A0D9'},
                            //                 {offset: 0.5, color: '#1CDABA'}
                            //             ]
                            //         )
                            //     ];
                            //     return colorList[params.dataIndex]
                            // },
                            color:function(params){
                              let colorList = ['#E26160','#17A0D9']; 
                              return colorList[params.dataIndex] ;
                            },
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
.nums{
  color:#26BBA4;
	font-size: 48px;
	padding-top: 20px;
	padding-bottom: 20px;
}
.tips{
  font-size: 16px;
}
.grid-content{
  background-color: white;
  height: 185px;
  padding-top: 20px;
  border-radius: 10px;
  text-align: center;
  position: relative;
}
#moneyline{
	width: 100%;
	height: 100%;
	margin-top: -25px !important;
	display: flex;
	align-items: center;
	justify-content: center;
	/*margin-left: 50px;*/
}
.paymoney-label{
	left: 10px;
  position: absolute;
  bottom: 30px;
}
.getmoney-label{
  left: 10px;
  position: absolute;
	top: 115px;
}
.date{
  color:#26BBA4;
  position: absolute;
  left: 20px;
}
</style>