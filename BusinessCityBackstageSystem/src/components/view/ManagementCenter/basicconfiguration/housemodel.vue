<template>
    <div id="house-model">
        <h5>配置类型</h5>
        <ul class="basic-content">
            <li v-for="(info,index) in typeData" :key="index" @click="findInfo(index,urlList[index].url)">
                <el-button type="primary" :class="{active:info.isActive}" :data-id="index" @click="handleBtn($event)" plain><i :class="info.icon"></i>{{info.name}}</el-button>
            </li>  
        </ul>
    </div>
</template>
<script>
export default {
    data () {
        return {
            typeData:[
                {'index':1,'icon':'el-icon-edit','isActive':true,'name':'房屋类型'},
                {'index':2,'icon':'el-icon-menu','isActive':false,'name':'租住状态'}
            ],
            urlList:[
                {id:'id',url:'/api/customer/housingCategory/queryCategory',des:'房屋类型',name:'name'},
                {id:'id',url:'/api/customer/housingRentalStatus/queryStatus',des:'租住状态',name:'name'}
            ],
            datalist:[]   
        }
    },
    created(){
        this.getDate(0,this.urlList[0].url);
        this.$root.$on('transFn6',data => {
            this.getDate(data,this.urlList[data].url);
        });
    },
    methods:{
        handleBtn(event){
            this.typeData.forEach((e,i) => {
                e.isActive = false;
            })
            let index = event.currentTarget.getAttribute("data-id");
            this.typeData[index].isActive = true;
        },
        findInfo(index,i){
            this.$root.$emit('loadInfo',true);
            this.getDate(index,i);
        },
        getDate(index,i) {
            this.$http({
                url:i,
                method: 'POST',
                data:{},
            }).then(res => {       
                this.datalist=(res.data.info);
                this.$root.$emit('searchInfo',[this.urlList[index].name,this.datalist,index,this.urlList[index].id,this.urlList[index].des]);
                this.$root.$emit('loadInfo',false);
            }).catch(error=>{
                console.log(error);
                alert('网络错误，不能访问');
            })
        }
    },
    beforeDestroy(){
        this.$root.$off('transFn6');
    }
}
</script>
<style lang="less">
#house-model{
    .el-button--primary.is-plain.active{
        background:#409EFF;
        span{
            color:#fff !important;
        }    
    }
}
</style>
<style scoped lang="less">
#house-model{
    h5{
        color:#8E8E8E;
        font-size:16px;
        padding:15px 0;
        margin-left:30px;
    }
    .add-btn{
        padding:5px 15px;
        float: right;
        margin-right:20px;
        margin-top:-30px;
        border-radius:5px;
    }
    .basic-content{
        padding-top:30px;
        border-top:1px solid #f4f4f4;
    }
    .basic-content{
        display:flex;
        justify-content:flex-start;
        flex-wrap:wrap;
        li{
            width: 30%;
            margin:0 0 20px 2.5%;
            .el-button--primary.is-plain{
                width: 100%;
                height:120px;
                padding:0 0;
                background:#fff;
                i{
                    width: 50px;
                    height:50px;
                    background:#409EFF;
                    border-radius:5%;
                    text-align:center;
                    line-height:50px;
                    font-size:30px;
                    margin-right:10px;
                    color:#fff;
                    vertical-align: middle;
                }
            }
            .el-button--primary.is-plain:hover{
                background:#409EFF;
                i{
                    background:#fff;
                    color:#409EFF;
                }
            }
            .el-button--primary.is-plain.active{
                background:#409EFF;
                i{
                    background:#fff;
                    color:#409EFF;
                }
            }
        }
    }
}
</style>

