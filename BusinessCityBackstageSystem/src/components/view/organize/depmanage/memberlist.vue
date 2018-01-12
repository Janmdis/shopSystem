<template>
    <div class="grid-content">
        <div class="rolHeader">
            成员列表
            <div class="pull-right">
                    <button class="btn  btn-xs userModals" >新建用户</button>
            </div>
        </div>
        <div class="roleSection">
            <table class="member">
                <tbody>
                    <tr>
                        <th>用户名称</th>
                        <th>性别</th>
                        <th>工作状态</th>
                        <th>联系方式</th>
                        <th>操作</th>
                    </tr>
                </tbody>
                <tbody class="roleBody">
                    <tr :key='item.id' v-for="item in list">
                        <td data-id="item.id">{{item.username}}</td>
                        <td data-id="item.id">{{item.sex}}</td>
                        <td data-id="item.id">{{item.status}}</td>
                        <td data-id="item.id">{{item.phone}}</td>
                        <td data-id="item.id"><span class="delrole">删除</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
  data(){
      return{
          list:[
              {
                  id:1,
                  username:'user1',
                  sex:'男',
                  status:'在线',
                  phone:'111111'
              },
              {
                  id:2,
                  username:'user2',
                  sex:'男',
                  status:'在线',
                  phone:'111111'
              },
              {
                  id:3,
                  username:'user3',
                  sex:'男',
                  status:'在线',
                  phone:'111111'
              }
          ]
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
.pull-right span:nth-child(1){
	color:#03aeac;
}
.pull-right span:nth-child(2){
	color:#e56838;
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
.roleSection .member{
	border-top:0;
	margin:auto;
	width:80%;
    border: none;
    border-spacing: 0;
    border-collapse: collapse;
    font-size: 14px;
}
.roleSection .member th{
	width:16%;
	height:50px;
	border:1px solid #bcbcbc ;
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
	color:#00adab;
	cursor:pointer;
}
</style>
