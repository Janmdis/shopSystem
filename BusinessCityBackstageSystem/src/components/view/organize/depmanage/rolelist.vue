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
                        <td class="roleNames " data-id="item.id" @click="selectrole($event)">{{item.name}}</td>
                        <td data-id="item.id"><span class="delrole">删除</span></td>
                    </tr>
                </tbody>
            </table>
            
        </div> 
        <Dialogrole :ishow='dialogroleVisible'></Dialogrole>  
    </div>
</template>
<script>
import Dialogrole from './dialogrole'
export default {
    components:{Dialogrole},
    data(){
        return {
            list:[
                {id:1,name:'角色1'},
                {id:2,name:'角色2'},
                {id:3,name:'角色3'},
                {id:4,name:'角色4'}
            ],
            dialogroleVisible:false,
            depid:''
        }
    },
    created:function(){
        this.$root.$on('currentrole',(depid)=>{
            let that=this;
            this.depid=depid;
            this.$http.post('/api/admin/manage/department/find?type=0',{
                id:depid
            })
            .then(function (response) {
                let data=response.data;
                if(data.msg=='查询成功'){
                    that.list.push(data.info.list);
                }
                console.log(that.list);
            })
            .catch(function (response) {
                console.log(response);
            });
        });
    },
    methods:{
        opendialogrole(){
            this.$root.$emit("exportvisrole",true);
        },
        selectrole(e){
            // console.log(document.getElementsByClassName('tbactive'));
            let dom=document.getElementsByClassName('tbactive');
            if(dom.length){
                dom[0].setAttribute('class','roleNames');
            }
            e.target.setAttribute('class','roleNames tbactive');
            // 触发所属角色的成员列表函数
            this.$root.$emit('membertorole',{depid:this.depid,roleid:e.target.getAttribute('data-id')});
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
.rolHeader .pull-right button{
    background:#00adab;
    border-color:#00adab;
    color:#fff;
    display: inline-block;
    cursor: pointer;
    border: 1px solid transparent;
}
.roleSection{
    /* height: 600px; */
    overflow-y: auto;
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
	color:#00adab;
	cursor:pointer;
}
.tbactive{
    background-color: #00adab !important;
    color:#fff;
}
</style>
