<template>
  <el-dialog id='roledialog'  width='60%' top='40px'  title="创建角色" :visible="dialogroleVisible" :modal='true' :before-close="ai_dialog_close"> 
            <el-row :gutter='20' class='topmsg'>
                 <el-col :span="7" :offset='2'>
                     <div class="grid-content">
                         <label for="" :span="2">角色名称：</label>
                         <input type="text" :span="10" placeholder="请输入角色名称">
                     </div>
                 </el-col>
                 <el-col :span="7">
                     <div class="grid-content">
                        <label>角色编号：</label>
                        <input type="text" placeholder="请输入角色编号"> 
                     </div>
                 </el-col>
                 <el-col :span="7">
                     <div class="grid-content">
                        <label>所属部门：</label>
                        <span>你猜</span> 
                     </div>
                 </el-col>
            </el-row>
            <el-row>
                <el-col :span='10' :offset='4'>
                     <div class="grid-content">持有权限</div>
                </el-col>
                <el-col :span='5'>
                     <div class="grid-content">可操作</div>
                </el-col>
                <el-col :span='5'>
                     <div class="grid-content">可查看</div>
                </el-col>
            </el-row>
            <el-row class="data">
                <el-col :span='20' :offset='2'>
                    <div class="grid-content">
                        <div class='select'>
                            <div class='name'>
                                <span>全选</span>
                            </div>
                             <div class='check el-checkbox__input' typediv='opcan' @click="select($event)">
                                <input type="checkbox">
                                <span class="checkfor el-checkbox__inner"></span>
                            </div>
                            <div class='check el-checkbox__input' typediv='seecan' @click="select($event)">
                                <input type="checkbox">
                                <span class="checkfor el-checkbox__inner"></span>
                            </div>
                        </div>
                        <Datarolelist :list='list' :test='test'></Datarolelist>
                    </div>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer" :center='true'>
                <el-button type="primary" round   @click="adddata">新增</el-button>
            </div>
        </el-dialog>
</template>
<script>
import Datarolelist from './datarolelist'
export default {
    components:{Datarolelist},
    props:['ishow'],
    data(){
        return {
            dialogroleVisible:true,
            list:[
                {
                    id:'1',
                    name:'一级1',
                    child:[
                        {
                            id:'11',
                            name:'一级1-1',
                            child:[
                                {
                                    id:'111',
                                    name:'一级1-1-1',
                                    child:[]
                                }
                            ],
                        },
                        {
                            id:'22',
                            name:'一级1-2',
                            child:[]
                        }
                    ]
                },
                {
                    id:'2',
                    name:'二级',
                    child:[]
                },
                {
                    id:'3',
                    name:'三级',
                    child:[]
                },
                {
                    id:'4',
                    name:'四级',
                    child:[]
                }
          ],
          test:'test'
        }
    },
    created:function(){
        console.log(this.ishow);
        this.dialogroleVisible=this.ishow;
        this.$root.$on('exportvisrole',(data)=>{
            this.dialogroleVisible=data;
        });
        // this.$root.$on("changestatu",(e)=>{
        //     this.select(e);
        // });
    },
    methods:{
        adddata(){
            
            this.dialogDepVisible=false;
        },
        ai_dialog_close(){
            this.dialogDepVisible = false;
        },
        getElementByAttr(attr,value,list)
        {
            let aEle=[];
            for(var i=0;i<list.length;i++)
            {
                if(list[i].getAttribute(attr)==value)
                    aEle.push( list[i] );
            }
            return aEle;
        },
        select(e){
            let target=e.target.parentNode;
            let ischecked=target.childNodes[0].checked;
            if(ischecked){
                target.setAttribute('class','check  el-checkbox__input');
            }
            else{
                target.setAttribute('class','check  el-checkbox__input is-checked');
            }
            let list=target.parentNode.parentNode.getElementsByClassName('check');
            let attr=target.getAttribute('typediv');
            let result=this.getElementByAttr('typediv',attr,list);
            for(let i=0;i<result.length;i++){
                let ststus=result[i].childNodes[0].checked;
                result[i].setAttribute('class',target.getAttribute('class'));
                result[i].childNodes[0].checked=!ststus;
            }
        }
    }
}
</script>
<style scoped>
/* .el-dialog{
    width:60%;
} */
.topmsg input{
    width: 45%;
}
.data{
    margin-top: -15px;
    height: 350px;
}
.data .grid-content{
    border: 1px solid !important;
    border-radius: 5px;
    padding:10px 20px;
    overflow: hidden;
}
.data .select{
    overflow: hidden;
}
.name{
    display: inline-block;
}
.name,.check{
    float: left;
}
div.check{
    width: 0;
    height: 0;
    position: absolute;
    
}
.check[typediv='opcan']{
    left: 59%;
}
.check[typediv='seecan']{
    left: 80%;
}
input[type='checkbox']{
    z-index: 1;
    opacity: 0;
}
.checkfor{
    display:inline-block;
    vertical-align: middle;
    position: absolute;
    left: 3px;
    top: 3px;
    width: 17px;
    height: 17px;
    border: 1px solid #cccccc;
    cursor: pointer;
    border-radius: 5px;
}
</style>

<style>
/* 模态框 */

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
.el-dialog .el-col{
    /* height: 35px; */
    line-height: 35px;
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
    /* width: 80%; */
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
.el-dialog .grid-content .infoText{
    color:#00adab;
    display: block;
    text-align: right;
    padding-right: 12%;
}
</style>