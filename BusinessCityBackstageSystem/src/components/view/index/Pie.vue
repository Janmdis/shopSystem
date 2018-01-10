<template>
  <div class="grid-content">
        <p class="title">
            <img :src="imgurl" alt="" />
            <span>{{tips}}</span>
        </p>
        <div  :id="idname" class="echar"  ></div>
  </div>
</template>
<script>
export default {
    props:['objdata'],
    data(){
        return {
            imgurl:'',
            tips:'',
            listdatetype:[],
            totaltip:'',
            idname:''
        }
    },
    created:function(){
        console.log(this.objdata);
        this.tips=this.objdata.title;
        this.imgurl=this.objdata.url;
        this.listdatetype=this.objdata.listdatetype;
        this.totaltip=this.objdata.totaltip;
        this.idname=this.objdata.idname;
    },
    mounted:function(){
        this.draw();
    },
    methods:{
        draw(){
            let idname=this.idname;
            let myChart = this.$echarts.init(document.getElementById(idname));
            let option={
                    title: {
                        text:this.totaltip+' \n',
                        left:'center',
                        top:'0%',
                        left:'53%',
                        x:'center',
                        y:'bottom',
                        padding:[65,0],
                        textStyle:{
                            color:'grey',
                            align:'center',
                            fontSize:'11',
                            fontWeight:"normal",
                            borderWidth:'1%'
                        }
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b} <br/> {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:this.listdatetype,
                        icon: 'circle',
                        itemHeight:'15',
                        padding:[40,0],
                        top:'5%'
                    },
                    series: [
                        {
                            name:this.tips,
                            type:'pie',
                            radius: ['50%', '70%'],
                            center: ['60%', '50%'],
                            avoidLabelOverlap: false,
                            itemStyle:{ 
                                normal:{ 
                                    label:{ 
                                        show: true, 
                                        formatter:'{d}%' 
                                    }, 
                                    labelLine :{show:true},
                                    color: function(params) {
                                        var colorList = ["#FF7559","#FFBA27","#48A5F7"];
                                        return colorList[params.dataIndex]
                                    }
                                },
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            label: {
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '15',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true,
                                    length:0.00001
                                }
                            },
                            data:[
                                    {value:335, name:this.listdatetype[0]},
                                    {value:310, name:this.listdatetype[1]},
                                    {value:234, name:this.listdatetype[2]}
                            ]
                        }
                    ]
            }
            myChart.setOption(option);
        }
    }
}
</script>
<style scoped>
.title{
    font-size: 16px;
	padding-left: 20px;
}
.title img,
.title span{
    float: left;
}
.title span{
    padding-top: 7px;
}
.grid-content{
    height: 200px;
    margin-bottom: 20px;
    background-color: white;
    padding-top: 20px;
    border-radius: 10px;
    text-align: center;
    position: relative;
}
.echar{
    width: 100%;
    height: 80%;
    margin-left: 20px;
}
</style>
