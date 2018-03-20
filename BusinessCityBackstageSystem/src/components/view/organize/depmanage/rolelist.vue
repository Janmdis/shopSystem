<template>
    <div class="grid-content">
        <div class="rolHeader">
            角色列表	
            <div class="pull-right">
                <!-- <button class="btn btn-xs">已有角色</button> -->
                <button class="btn btn-xs roleModals" @click="opendialogrole" >创建角色</button>
            </div>
        </div>
        <div class="roleSection">
            <table class="roles">
                <tbody>
                    <tr>
                        <th>角色名称</th>
                        <th>操作</th>
                    </tr>
                </tbody>
                <tbody class="trbody">
                    <tr :key="item.id" v-for="item in list">
                        <td class="roleNames " :data-id="item.id" @click="selectrole($event)">{{item.groupName}}</td>
                        <td ><span :data-id="item.id" :data-depid='item.departmentId'  class="delrole" @click="deletedata($event)">删除</span></td>
                    </tr>
                </tbody>
            </table>
            
        </div> 
        <!-- <Dialogrole :ishow='dialogroleVisible'></Dialogrole>   -->
        <Rolepromise :ishow='dialogroleVisible'></Rolepromise>  
    </div>
</template>
<script>
import Dialogrole from './dialogrole'
import Rolepromise from '../rolepromise.vue'
import { mapState } from 'vuex'
export default {
    components:{Dialogrole,Rolepromise},
    data(){
        return {
            dialogroleVisible:false,
            depname:''
        }
    },
    methods:{
        deletedata(e){
            let target=e.target;
            let id=target.getAttribute('data-id');
            let depid=target.getAttribute('data-depid');
            let that=this;
            this.$confirm('确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                this.$http.post('/api/admin/manage/group/update',[{
                    id:id,
                    isActive:false
                }])
                .then(function (response) {
                    let data=response.data;
                    console.log(data);
                    if(data.msg=='更新成功'){
                        that.$message({
                            type:'success',
                            message:'删除成功'
                        });
                        that.$store.dispatch('getRolelist',{depid});
                    }
                    else{
                        that.$message({
                            type:'info',
                            message:data.msg
                        });
                    }
                })
                .catch(function (response) {
                    console.log(response);
                });
            }).catch(()=>{
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        opendialogrole(){
            this.$store.dispatch('getPromiselist');
            this.$root.$emit("exportvisrole",{depid:this.depid,depname:this.depname,type:'create'});
        },
        selectrole(e){
            let dom=document.getElementsByClassName('tbactive');
            if(dom.length){
                dom[0].setAttribute('class','roleNames');
            }
            e.target.setAttribute('class','roleNames tbactive');
            // 触发所属角色的成员列表函数
            this.$root.$emit('membertorole',{depid:this.depid,roleid:e.target.getAttribute('data-id')});
        }
    },
    computed: {
        ...mapState({
            list: state => state.rolelist.roledata.list
        })
    },
    beforeDestroy:function(){
        this.$root.$off('currentrole');
    }
}
</script>

<style scoped>
.grid-content{
    height:80%;
	border:1px solid #27a1f2;
	border-radius:5px;
    background:#fff;
    overflow:hidden;
}
.rolHeader{
	height:90px;
	color:#8b8b8b;
	line-height:90px;
	padding-left:10%;
}
.pull-right{
    padding-right:40px;
    float: right;
}
.pull-right span{
	padding:0 10px;
	cursor:pointer;
}
.rolHeader .pull-right button{
    background:#27a1f2;
    border-color:#27a1f2;
    color:#fff;
    display: inline-block;
    cursor: pointer;
    border: 1px solid transparent;
    padding: 5px;
}
.roleSection{
    height: 78%;
    overflow-y: auto;
    margin-bottom: 10px;
}
.roleSection .roles{
	border-top:0;
	margin:auto;
	width:80%;
    border: none;
    border-spacing: 0;
    border-collapse: collapse;
    font-size: 14px;
}
.roleSection .roles th{
	width:40%;
	height:50px;
    border:1px solid #bcbcbc ;
    vertical-align: middle;
}
.roleSection .roles td{
	width:110px;
	height:50px;
	border:1px solid #bcbcbc;
	background:#fff;
    vertical-align: middle;
    text-align: center;
}
.roleSection .roles td span{
	color:#27a1f2;
	cursor:pointer;
}
.tbactive{
    background-color: #27a1f2 !important;
    color:#fff;
}
</style>
