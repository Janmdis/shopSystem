<template>
    <div class="grid-content">
        <div class="rolHeader">
            部门列表
            <div class="pull-right">
                <span class="addRole" data-toggle="modal" data-target="#productModal" type="button" @click="opendialogDep">添加</span>
                <span class="clearBorder" data-toggle="modal" data-target="#delModal" @click='deletedep' v-show="deleteshow">删除</span>
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
                    info:'烛之萤火',
                    children:[
                        {
                            id:105,
                            info:'张俊俊',
                            children:[
                                {
                                    id:107,
                                    info:'111',
                                    children:[
                                        {
                                            id:108,
                                            info:'11',
                                            children:[]
                                        }
                                    ]
                                    
                                }
                            ]
                        },
                        {
                            id:106,
                            info:'测试',
                            children:[]
                        }
                    ]
                }
            ],
            deleteshow:true,
            currentid:'',
            currentname:'',
            curentnum:'',
            lastchildnum:'',
            dialogDepVisible:false     //模态框是否显示
        }
    },
    created:function(){
        this.$root.$on("haschild",(data)=>{
            this.deleteshow=data.show;
            this.currentid=data.currentid;
            this.currentname=data.currentname;
            this.curentnum=data.currentnum;
            this.lastchildnum=data.lastchildnum;
        });
        let that=this;
        this.$http.post('/api/admin/manage/department/find?type=1&range=0',{})
        .then(function (response) {
            console.log(response);
            let data=response.data;
            if(data.msg=='查询成功'){
                that.list.push(data.info.treeAll);
            }
            console.log(that.list);
        })
        .catch(function (response) {
            console.log(response);
        });
    },
    methods:{
        opendialogDep(){
            //父部门id
            let departmentFatherid=this.currentid;
            // 父部门名称
            let departmentFathername=this.currentname;
            // 父部们编号
            let departmentFathernum=this.curentnum;
            // 最后一个同辈节点编号
            let deplastchildnum=this.lastchildnum;
            this.$root.$emit("exportvis",{departmentFatherid,departmentFathername,departmentFathernum,deplastchildnum});
        },
        delete(){
            this.$http.post('/api/admin/manage/department/update',{
                id:this.currentid,
                isActive:false
            })
            .then(function (response) {
                return{
                    type:'success',
                    message:'删除成功!'
                };
            })
            .catch(function (response) {
                return {
                    type:'info',
                    message:'删除失败!'
                };
            });
        },
        deletedep(){
            this.$confirm('确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                let msg=this.delete();
                this.$message(msg);
            }).catch(()=>{
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
            
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
li{
    margin-top: 10px !important;
}
</style>


