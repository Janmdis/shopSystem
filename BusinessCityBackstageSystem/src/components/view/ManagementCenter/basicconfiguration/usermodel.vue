<template>
    <div id="user-model">
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
                {'index':1,'icon':'el-icon-edit','isActive':true,'name':'服务类型'},
                {'index':2,'icon':'el-icon-menu','isActive':false,'name':'产品类型'},
                {'index':3,'icon':'el-icon-sold-out','isActive':false,'name':'账户名称'},
                {'index':4,'icon':'el-icon-document','isActive':false,'name':'员工类型'}
            ],
            urlList:[
                {id:'id',url:'/api/product/serviceType/find?pageSize=0',des:'服务类型',name:'serName'},
                {id:'id',url:'/api/product/type/find?pageSize=0',des:'产品类型',name:'productName'},
                {id:'id',url:'/api/admin/grade/find?pageSize=0',des:'账户名称',name:'gradeName'},
                {id:'id',url:'/api/admin/employeetype/queryList',des:'员工类型',name:'employeeTypeName'}
            ],
            datalist:[],
        }
    },
    created(){
        this.getDate(0,this.urlList[0].url);
        this.$root.$on('transFn5',data => {
            // console.log(data);
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
            this.$root.$emit('showLevel',index);
            this.$root.$emit('loadInfo',true);
            this.getDate(index,i);
        },
        getDate(index,i) {
            if(index == 3){
                var type = 'GET';
            }else{
                var type = 'POST';
            }
            this.$http({
                url:i,
                method:type,
                data:{},
            }).then(res => {
                // console.log(res)       
                if(index == 3){
                    this.datalist=(res.data.info);
                }else{
                    this.datalist=(res.data.info.list);
                }
                this.$root.$emit('searchInfo',[this.urlList[index].name,this.datalist,index,this.urlList[index].id,this.urlList[index].des]);
                this.$root.$emit('loadInfo',false);
            }).catch(error=>{
                console.log(error);
                alert('网络错误，不能访问');
            })
        }
    },
    beforeDestroy(){
        this.$root.$off('transFn5');
    }
}
</script>
<style lang="less">
#user-model{
    .el-button--primary.is-plain.active{
        background:#409EFF;
        span{
            color:#fff !important;
        }    
    }
}
</style>
<style scoped lang="less">
#user-model{
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

