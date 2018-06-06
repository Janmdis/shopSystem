<template>
    <div id="related">
       <el-col :span="24">
           <!-- <div class="relation-center">
               <i class="icon iconfont icon-home"></i>
           </div>
           <div id="relation"></div> -->
           <div id="re-div" :style="{background:'url(' + imgSrc + ')'}"></div>
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
            ],
            myItemStyle0:{},
            myItemStyle:{},
            myItemStyles:{},
            links:[],
            label:{},
            imgSrc:require('../../../../../static/images/Member/relative-people.jpg')
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
    },
    methods:{
        searchInfo (id) {
            let that = this;
            this.$http.post(
                '/api/customer/relationshipGroup/queryMapByIds',
                [this.memberId]
            ).then(res =>{
                if(res.data.status == 200){
                    this.itemStyle0 = {
                        normal: {
                            show: false,
                            color: 'transparent', //圆点的颜色
                            label: {
                                textStyle: {
                                    color: '#409EFF'
                                }
                            }
                        }
                    }
                    this.myItemStyle = {
                        normal: {
                            show: false,
                            borderColor:'#409EFF',
                            borderWidth:'2',
                            borderType:'solid',
                            color: '#fff', //圆点的颜色
                            label: {
                                textStyle: {
                                    color: '#409EFF'
                                }
                            }
                        }
                    }
                    this.myItemStyles = {
                        normal: {
                            show: false,
                            borderColor:'orange',
                            borderWidth:'2',
                            borderType:'solid',
                            color: '#fff', //圆点的颜色
                            label: {
                                textStyle: {
                                    color: '#409EFF'
                                }
                            }
                        }
                    }
                    this.label = {
                        normal: {
                            show: true,
                            textStyle: {
                                fontSize: 16,
                                color:'#409EFF'
                            }
                        },
                        emphasis:{
                            show:false
                        }
                    }
                    this.links = [
                        {source: '房屋',target: '父亲',value:'父亲'}, 
                        {source: '房屋',target: '母亲',value:'母亲'}, 
                        {source: '房屋',target: '男主人',value:'男主人'}, 
                        {source: '房屋',target: '女主人',value:'女主人'}, 
                        {source: '房屋',target: '儿子',value:'儿子'}
                    ]
                    var myChart = this.$echarts.init(document.getElementById('relation'));
                    let option = {
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
                            symbolSize: 80,
                            roam: false, //禁止用鼠标滚轮缩小放大效果
                            edgeSymbol: ['circle', 'arrow'],
                            edgeSymbolSize: [0, 10],
                            focusNodeAdjacency: false, //划过只显示对应关系
                            // 连接线上的文字
                            edgeLabel: {
                                normal: {
                                    show: false,
                                    formatter:function(obj){
                                        return obj.value;
                                    }
                                }
                            },
                            lineStyle: {//  连线
                                normal: {
                                    color:"#999",   
                                    opacity: 1,
                                    width: 1,
                                    curveness: 0
                                }
                            },
                            // 圆圈内的文字
                            label: this.label,
                            force: {
                                repulsion : 2500,//节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
                                gravity : 0.03,//节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
                                edgeLength :80,//边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
                                layoutAnimation : false
                            },
                            data: [{
                                name: '房屋',
                                symbol: 'image://http://www.damndigital.com/wp-content/uploads/2010/12/steve-jobs.jpg',//透明
                                itemStyle:this.myItemStyle0
                            }, {
                                name: '父亲',
                                // symbol:'image://./static/images/Member/personnel-character.png',
                                category: 0,
                                draggable: false,
                                itemStyle: this.myItemStyle
                            }, {
                                name: '母亲',
                                // symbol:'image://./static/images/Member/personnel-character.png',
                                category: 0,
                                draggable: false,
                                itemStyle: this.myItemStyle
                            }, {
                                name: '男主人',
                                // symbol:'image://./static/images/Member/personnel-character.png',
                                category: 0,
                                draggable: false,
                                itemStyle: this.myItemStyle
                            }, {
                                name: '女主人',
                                // symbol:'image://./static/images/Member/personnel-character.png',
                                category: 0,
                                draggable: false,
                                itemStyle: this.myItemStyles
                            }, {
                                name: '儿子',
                                // symbol:'image://./static/images/Member/personnel-character.png',
                                category: 0,
                                draggable: false,
                                itemStyle: this.myItemStyle
                            }],
                            links: this.links
                        }]
                    };
                    myChart.setOption(option);
                }     
            }).catch(err => {console.log(err)});
        },
        
    },
    beforeDestroy(){
        this.$root.$off('loadFn3')
    }
}
</script>
<style scoped lang="less">
#related{
    position: relative;
    background: #fff;
    height: 600px;
    // padding:20px 25px 100px;
    // min-width: 700px;
    // .el-col{
    //     position:relative;
    //     padding:0px 0px 100px;
    //     height:600px;
    // }
    // .relation-center{
    //     width: 100px;
    //     height: 100px;
    //     line-height: 100px;
    //     text-align: center;
    //     border-radius:50%; 
    //     background: #409EFF;
    //     position:absolute;
    //     left: 43%;
    //     top: 42%;
    //     margin: auto;
    //     z-index:1;
    //     i{
    //         font-size: 70px;
    //         color:#fff;
    //     }
    // }
    // #relation{
    //     width:100%;
    //     height: 600px;  
    // }
    #re-div{
        width: 100%;
        height:500px;
        background-repeat:no-repeat !important;
        background-position: center center;
        background-size: 100% 100%;
        position:absolute;
        top:10%;
        left: 5%;
        z-index: 5;
    }
}
</style>
