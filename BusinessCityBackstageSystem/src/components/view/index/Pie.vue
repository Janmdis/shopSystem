<template>
  <div class="grid-content">
        <div class="h-t">
            <el-col class='tip' :span='8'>
                <img :src="imgurl" alt="">
                <label for="">{{tips}}</label>
            </el-col>
            <el-col class='btnsPie' :span='16' style='padding-bottom:5px;'>
                <el-button type="primary" class='on' @click.native='switchbtn($event)' style="margin-left:20%;">全部</el-button>
                <el-button type="primary" @click.native='switchbtn($event)'>本月</el-button>
                <el-button type="primary"  @click.native='switchbtn($event)'>更多</el-button>
               
            </el-col>
        </div>
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
            idname:''
        }
    },
    created:function(){
        this.imgurl=this.objdata.url;
        this.idname=this.objdata.idname;
        this.tips=this.objdata.title;
        // this.draw();
    },
    mounted:function(){
        this.draw();
    },
    methods:{
        switchbtn(e){
            let target=e.target.tagName=='BUTTON'?e.target:e.target.parentNode;
            let btns=target.parentNode.getElementsByTagName('button');
            for(let i=0;i<btns.length;i++){
                btns[i].setAttribute('class','el-button el-button--primary');
            }
            target.setAttribute('class','el-button on el-button--primary');
        },
        draw(){
            let idname=this.idname;
            let myChart = this.$echarts.init(document.getElementById(idname));
            let listdatetype=this.objdata.listdatetype;
            let datalist=this.objdata.listdata;
            let datas=[];
            for(let i=0;i<datalist.length;i++){
                let json={
                    value:datalist[i],
                    name:listdatetype[i]
                }
                datas.push(json);
            }
            let option={
                    title: {
                        text:this.objdata.totaltip+' \n',
                        left:'center',
                        top:datalist.length>3?'35%':'55%',
                        left:datalist.length>3?'45%':'35%',
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
                        data:listdatetype,
                        orient:'horizontal',
                        icon: 'circle',
                        padding:[20,0],
                        top:'0%'
                    },
                    series: [
                        {
                            name:this.tips,
                            type:'pie',
                            radius:datalist.length>3?['40%', '50%']:['0','50%'],
                            center:['50%', datalist.length>3?'65%':'50%'],
                            avoidLabelOverlap: false,
                            itemStyle:{ 
                                normal:{ 
                                    label:{ 
                                        show: true, 
                                        formatter:'{d}%' 
                                    }, 
                                    labelLine :{show:true},
                                    color: function(params) {
                                        var colorList = ["#48a5f7","#ff7559","#ffba27","#00c0be","#c17efa","#ffba27","b6d962","#244dd3","#a4a4a4"];
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
                                    // length:20
                                }
                            },
                            data:datas
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
    height: 310px;
    margin-bottom: 20px;
    background-color: white;
    padding-top: 20px;
    border-radius: 10px;
    /* text-align: center; */
    position: relative;
    color:#606266;
}
.echar{
    width: 100%;
    height: 90%;
}
.h-t{
    border-bottom: 1px solid #ccc;
    overflow: hidden;
}
.tip img{
    float: left;
    margin-left: 15px;
}
.tip label{
    font-size: 14px;
    position: absolute;
    top: 28px;
}
.btnsPie button{
    width: 25%;
    height: 25px;
    padding: 0;
    margin-left: 0;
    margin-top: 3px;
    font-size: 12px;
    background-color: #00c0be;
    border-color: #00c0be;
}
.btnsPie .on{
    background-color: #0d908f;
    border-color: #0d908f;
}
</style>
