<template>
    <div id="related">
       <el-col :span="24">
           <div class="relation-center">
               <i class="icon iconfont icon-home"></i>
           </div>
           <div id="relation"></div>
       </el-col>
    </div>
</template>
<script>
export default{
    props:['memberId'],
    data () {
        return {
            relations:[
                // {id:0,src:'/static/images/Member/personnel-character.png',relation:'父亲'},
                // {id:1,src:'/static/images/Member/personnel-character.png',relation:'母亲'},
                // {id:2,src:'/static/images/Member/personnel-character.png',relation:'男主人'},
                // {id:3,src:'/static/images/Member/personnel-character.png',relation:'女主人'},
                // {id:4,src:'/static/images/Member/personnel-character.png',relation:'儿子'},
                // {id:5,src:'/static/images/Member/personnel-character.png',relation:'女儿'}
            ]
        }
    },
    created(){
        setTimeout(() =>{
            this.$root.$emit('load',false);
        },1000);
        this.searchInfo(this.memberId);
        this.$root.$on('loadFn3',data =>{
            this.searchInfo(data);
        });
        this.$nextTick(() => {
            var myChart = this.$echarts.init(document.getElementById('relation'));
            let option = {
                // tooltip:{
                //     show:true
                // },
                animation: false,
                series: [{
                    categories: [{
                        name: '家人',
                        itemStyle: {
                            normal: {
                                color: "#009800",
                            }
                        }
                    }],
                    type: 'graph',
                    layout: 'force',
                    symbol: "circle",
                    symbolSize: 100,
                    roam: false, //禁止用鼠标滚轮缩小放大效果
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [0, 10],
                    focusNodeAdjacency: false, //划过只显示对应关系
                    // 连接线上的文字
                    edgeLabel: {
                        normal: {
                            show: true,
                            textStyle: {
                                fontSize: 20
                            },
                            formatter:function(obj){
                                // console.log(obj);
                                return obj.value;
                            },
                            // formatter:'{@value}',
                        }
                    },
                    lineStyle: {
                        normal: {
                            opacity: 1,
                            width: 2,
                            curveness: 0
                        }
                    },
                    // 圆圈内的文字
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                fontSize: 20
                            }
                        },
                        emphasis:{
                            show:false
                        }
                    },
                    force: {
                        repulsion: 5000  //  扩散宽度
                    },
                    data: [{
                        name: '房屋',
                        symbol: 'image://http://www.damndigital.com/wp-content/uploads/2010/12/steve-jobs.jpg',
                        itemStyle: {
                            normal: {
                                color: '#f90', //圆点的颜色
                                label: {
                                    position: 'bottom',
                                    textStyle: {
                                        color: '#f90'
                                    }
                                }
                            }
                        },
                    }, {
                        name: '父亲',
                        // symbol:'image://./static/images/Member/personnel-character.png',
                        category: 0,
                        draggable: false,
                    }, {
                        name: '母亲',
                        // symbol:'image://./static/images/Member/personnel-character.png',
                        category: 0,
                        draggable: false,
                    }, {
                        name: '男主人',
                        // symbol:'image://./static/images/Member/personnel-character.png',
                        category: 0,
                        draggable: false,
                    }, {
                        name: '女主人',
                        // symbol:'image://./static/images/Member/personnel-character.png',
                        category: 0,
                        draggable: false,
                    }, {
                        name: '儿子',
                        // symbol:'image://./static/images/Member/personnel-character.png',
                        category: 0,
                        draggable: false,
                    }],
                    links: [{
                        source: '房屋',
                        target: '父亲',
                        value:'父亲',
                    }, {
                        source: '房屋',
                        target: '母亲',
                        value:'母亲',
                    }, {
                        source: '房屋',
                        target: '男主人',
                        value:'男主人',
                    }, {
                        source: '房屋',
                        target: '女主人',
                        value:'女主人',
                    }, {
                        source: '房屋',
                        target: '儿子',
                        value:'儿子',
                        }    
                    ]
                }]
            };
            myChart.setOption(option);
        });
    },
    methods:{
        searchInfo (id) {
            this.$http.post(
                '/api/customer/relationshipGroup/queryMapByIds',
                [this.memberId]
            ).then(res =>{
                console.log(res.data.msg);
                
            }).catch(err => {console.log(err)});
        },
        
    }
}
</script>
<style scoped lang="less">
#related{
    background: #fff;
    height: 600px;
    padding:20px 25px 100px;
    min-width: 700px;
    .el-col{
        position:relative;
        padding:0px 0px 100px;
        height:600px;
    }
    .relation-center{
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        border-radius:50%; 
        background: #409EFF;
        position:absolute;
        left: 43%;
        top: 42%;
        margin: auto;
        i{
            font-size: 70px;
            color:#fff;
        }
    }
    #relation{
        width:100%;
        height: 600px;  
    }
}
</style>
