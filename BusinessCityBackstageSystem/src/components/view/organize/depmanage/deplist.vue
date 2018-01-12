<template>
    <div class="grid-content">
        <div class="rolHeader">
            部门列表
            <div class="pull-right">
                <span class="addRole" data-toggle="modal" data-target="#productModal" type="button" @click="opendialogDep">添加</span>
                <span class="clearBorder" data-toggle="modal" data-target="#delModal" v-show="deleteshow">删除</span>
            </div>
        </div>
        <div class="tree ">
            <Datalist :list='list'></Datalist>
        </div>
        <Dialogadddep :ishow='dialogDepVisible'></Dialogadddep>
        
    </div>
</template>
<script>
import Datalist from '../depmanage/datalist'
import Dialogadddep from './dialogadddep'

/* eslint-disable */
export default {
    components:{Datalist,Dialogadddep},
    data(){
        return {
            list:[
                {
                    id:85,
                    name:'烛之萤火',
                    childlist:[
                        {
                            id:105,
                            name:'张俊俊',
                            childlist:[
                                {
                                    id:107,
                                    name:'111',
                                    childlist:[
                                        {
                                            id:108,
                                            name:'11',
                                            childlist:[]
                                        }
                                    ]
                                    
                                }
                            ]
                        },
                        {
                            id:106,
                            name:'测试',
                            childlist:[]
                        }
                    ]
                }
            ],
            deleteshow:true,
            dialogDepVisible:false     //模态框是否显示
            
        }
    },
    created:function(){
        this.$root.$on("haschild",(haschild)=>{
            this.deleteshow=haschild;
        });
    },
    methods:{
        opendialogDep(){
            this.$root.$emit("exportvis",true);
        }
        
    }
    
   
}
</script>
<style scoped>
.grid-content{
    height:80%;
	border:1px solid #00adab;
	border-radius:5px;
    background:#fff;
}
.rolHeader{
	height:90px;
	color:#8b8b8b;
	line-height:90px;
	padding-left:10%;
}
.pull-right span{
	padding:0 10px;
	cursor:pointer;
}
.pull-right span:nth-child(1){
	color:#03aeac;
}
.pull-right span:nth-child(2){
	color:#e56838;
}
.pull-right{
    padding-right:40px;
    float: right;
}


</style>


