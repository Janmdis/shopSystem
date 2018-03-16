<template>
    <div class="grid-content">
        <div class="rolHeader">
            成员列表
            <div class="pull-right">
                    <button class="btn  btn-xs userModals" @click="opendialog">新建用户</button>
            </div>
        </div>
        <div class="roleSection">
            <table class="member">
                <tbody>
                    <tr>
                        <th>用户名称</th>
                        <th>性别</th>
                        <th>员工类型</th>
                        <th>联系方式</th>
                        <th>操作</th>
                    </tr>
                </tbody>
                <tbody class="roleBody">
                    <tr :key='item.id' v-for="item in list">
                        <td :data-id="item.id">{{item.adminName}}</td>
                        <td :data-id="item.id">{{item.adminSex?'女':'男'}}</td>
                        <td :data-id="item.id">{{item.employeeTypeName}}</td>
                        <td :data-id="item.id">{{item.phone}}</td>
                        <td :data-id="item.id"><span :data-id="item.id" class="delrole" @click="deletedata($event)">删除</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Dialogmember></Dialogmember>
    </div>
</template>
<script>
import Dialogmember from './dialogmember';
export default {
    components:{Dialogmember},
    data(){
        return{
            list:[],
            roleid:''
        }
    },
    created:function(){
        this.$root.$on("membertorole",(data)=>{
            let depid=data.depid;
            this.roleid=data.roleid
            this.getmemberlist();
        });
        this.$root.$on("updatemember",()=>{
            this.getmemberlist();
        });
    },
    methods:{
        getmemberlist(){
            let that=this;
            this.$http.post('/api/admin/account/multiConditionalQuery',{
                groupId:this.roleid,
                pageSize:0
            })
            .then(function (response) {
                let data=response.data;
                if(data.status==200){
                    that.list=data.info;
                }
                console.log(response);
            })
            .catch(function (response) {
                console.log(response);
            });
        },
        deletedata(e){
            let target=e.target;
            let id=target.getAttribute('data-id');
            let that=this;
            // this.$http({
            //     url:'/api/admin/account/delete',
            //     method:'post',
            //     headers:{
            //         'Content-Type': 'application/x-www-form-urlencoded'
            //     },
            //     data:{ids:id}
            // })
            this.$http.post('/api/admin/account/delete?ids='+id,{})
            .then(function (response) {
                let data=response.data;
                if(data.status==200){
                    that.$message({
                        type:'success',
                        message:'删除成功'
                    });
                    that.getmemberlist();
                }
                console.log(response);
            })
            .catch(function (response) {
                that.$message({
                    type:'info',
                    message:'删除失败！'
                });
            });
        },
        opendialog(){
            this.$root.$emit('opendialogmember',true);
            // this.dialogmeberVisible=true;
        }
    },
    beforeDestroy:function(){
        this.$root.$off('membertorole');
        this.$root.$off('updatemember');
    }
}
</script>

<style scoped>
.grid-content{
    height:80%;
	border:1px solid 27a1f2;
	border-radius:5px;
    background:#fff;
    overflow-y: auto;
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
.pull-right span:nth-child(1){
	color:#03aeac;
}
.pull-right span:nth-child(2){
	color:#e56838;
}
.rolHeader .pull-right button{
    background:27a1f2;
    border-color:27a1f2;
    color:#fff;
    display: inline-block;
    cursor: pointer;
    border: 1px solid transparent;
}
.roleSection{
    /* height: 600px; */
    overflow-y: auto;
}
.roleSection .member{
	border-top:0;
	margin:auto;
	width:80%;
    border: none;
    border-spacing: 0;
    border-collapse: collapse;
    font-size: 14px;
    margin-bottom: 20px;
}
.roleSection .member th{
	width:16%;
	height:50px;
    border:1px solid #bcbcbc ;
    vertical-align: middle;
}
.roleSection .member td{
	width:110px;
	height:50px;
	border:1px solid #bcbcbc;
	background:#fff;
    vertical-align: middle;
    text-align: center;
}
.roleSection .member td span{
	color:27a1f2;
	cursor:pointer;
}
</style>
