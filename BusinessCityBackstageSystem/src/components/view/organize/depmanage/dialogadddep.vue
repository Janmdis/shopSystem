<template>
  <el-dialog title="新增产品" :visible="dialogDepVisible" :modal='true' :before-close="ai_dialog_close"> 
            <el-row>
                 <el-col :span="3" :offset='3'>
                     <div class="grid-content labelName">
                         部门名称
                     </div>
                 </el-col>
                 <el-col :span="16">
                     <div class="grid-content input">
                         <input type="text" placeholder="请输入部门名称">
                     </div>
                 </el-col>
            </el-row>
            <el-row>
                 <el-col :span="3" :offset='3'>
                     <div class="grid-content labelName">
                         部门编号
                     </div>
                 </el-col>
                 <el-col :span="16">
                     <div class="grid-content input">
                         <input type="text" placeholder="请输入部门编号">
                     </div>
                 </el-col>
            </el-row>
            <el-row>
                 <el-col :span="3" :offset='3'>
                     <div class="grid-content labelName">
                         部门描述
                     </div>
                 </el-col>
                 <el-col :span="16">
                     <div class="grid-content input">
                         <textarea class="tearteacher" name="" id="" cols="30" rows="10"></textarea>
                         <span class="pull-right infoText">不超过50个字</span>
                     </div>
                 </el-col>
            </el-row>
             <el-row>
                 <el-col :span="3" :offset='3'>
                     <div class="grid-content labelName">
                         所属部门
                     </div>
                 </el-col>
                 <el-col :span="16">
                     <div class="grid-content valueName">
                         你猜
                     </div>
                 </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer" :center='true'>
                <el-button type="primary" round   @click="adddata">新增</el-button>
            </div>
        </el-dialog>
</template>
<script>
export default {
    props:['ishow'],
    data(){
        return {
            dialogDepVisible:true
        }
    },
    created:function(){
        console.log(this.ishow);
        this.dialogDepVisible=this.ishow;
        this.$root.$on('exportvis',(data)=>{
            this.dialogDepVisible=data;
        });
        // var closei=document.getElementsByClassName('el-dialog')[0].getElementsByClassName('el-dialog__close')[0];
        // closei.setAttribute('class','el-dialog__close');
        // closei.innerHTML='X';
    },
    methods:{
        adddata(){
            
            this.dialogDepVisible=false;
        },
        ai_dialog_close(){
            this.dialogDepVisible = false;
        },
    }
}
</script>
<style scoped>
/* 模态框 */
.el-dialog{
    width:40%;
}
.el-dialog__header{
    background:#109997;
    padding:20px 32px;
}
.el-dialog__title,.el-dialog__headerbtn .el-dialog__close{
    color:white;
}
.el-dialog__headerbtn{
    width: 29px;
	height: 29px;
	background: #fff;
	border-radius: 50%;
	line-height: 20px;
	opacity: 1;
	color: #dd460a;
	font-size: 22px;
}
.el-dialog__body{
    padding-bottom:0px;
}
.el-dialog__close{
    font-size:16px;
    color:#dd460a !important;
    font-style:normal;
}
.el-dialog__footer{
    border-top:1px solid #f1f1f1;
    width: 80%;
    margin: 0 auto;
}
.el-dialog__footer .el-button{
    width:140px;
    font-size:14px;
    background:#00adab;
    margin:0 auto;
    display: block;
}
.el-dialog .el-row{
    margin-bottom: 15px;
}
.el-dialog .grid-content{
    border:none;
}
.el-dialog .grid-content.labelName,
.el-dialog .grid-content.valueName{
    font-size: 14px;
    padding-top: 5px;
    padding-right: 0;
}
.el-dialog .grid-content.valueName{
    padding-left: 15px;
}
.el-dialog .grid-content input{
    width: 80%;
    height: 20px;
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 3px;
    border:1px solid #ccc;
}
.el-dialog .grid-content.input{
    padding-left: 15px;
}
.el-dialog .grid-content textarea{
    border:1px solid #c7c7c7;
	width:80%;
	height:100px;
	border-radius:5px;
	resize:none;
	padding:5px 10px;
}
.el-dialog .grid-content .infoText{
    color:#00adab;
    display: block;
    text-align: right;
    padding-right: 12%;
}
</style>