<template>
    <el-dialog  width='60%' top='40px'  title="新增角色" :visible="dialogroleVisible" :modal='true' :before-close="ai_dialog_close"> 
        <el-row :gutter='5' class='topmsg'>
            <el-col :span="7" :offset='1'>
                <el-col :span="10">
                    <div class="grid-content labelfor">角色名称：</div>
                </el-col>
                <el-col :span="14">
                    <div class="grid-content">
                        <el-input  placeholder="请输入角色名称" v-model="rolename"></el-input>
                    </div>
                </el-col>
            </el-col>
            <el-col :span="7">
                <el-col :span="10">
                    <div class="grid-content labelfor">角色编号：</div>
                </el-col>
                <el-col :span="14">
                    <div class="grid-content">
                        <el-input  placeholder="请输入角色编号" v-model="roleid"></el-input>
                    </div>
                </el-col>
            </el-col>
            <el-col :span="7">
                <el-col :span="10">
                    <div class="grid-content labelfor">所属部门：</div>
                </el-col>
                <el-col :span="14">
                    <div class="grid-content">
                        <el-select v-model="selectvalue"  placeholder="请选择">
                            <el-option
                            v-for="item in selectlist"
                            :key="item.id"
                            :label="item.value"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='10' :offset='4'>
                    <div class="grid-content">持有权限</div>
            </el-col>
            <el-col :offset='2' :span='3'>
                    <div class="grid-content">可操作</div>
            </el-col>
            <el-col :span='5'>
                    <div class="grid-content">可查看</div>
            </el-col>
        </el-row>
        <el-row class="data">
            <el-col :span='20' :offset='2'>
                <div class="grid-content" style="min-height:300px;">
                    <div class='select'>
                        <div class='name'>
                            <span>全选</span>
                        </div>
                            <div class='check el-checkbox__input checkall' typediv='opcan' @click="selectall($event)">
                            <input type="checkbox">
                            <span class="checkfor el-checkbox__inner"></span>
                        </div>
                        <div class='check el-checkbox__input checkall' typediv='seecan' @click="selectall($event)">
                            <input type="checkbox">
                            <span class="checkfor el-checkbox__inner"></span>
                        </div>
                    </div>
                    <Datarolelist :list='list' :msgextra='test'></Datarolelist>
                </div>
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer" :center='true'>
            <el-button type="primary" round   @click="adddata">新增</el-button>
        </div>
    </el-dialog>
</template>
<script>
import Datarolelist from '../depmanage/datarolelist'
export default {
    components:{Datarolelist},
    data(){
        return {
            dialogroleVisible:false,
            rolename:'',
            roleid:'',
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
            selectlist:[
                {
                    id:'1',
                    value:'test1'
                },
                {
                    id:'2',
                    value:'test2'
                },
                {
                    id:'3',
                    value:'test3'
                }
            ],
            selectvalue:'',
            test:'test'
        }
    },
    created:function(){
        this.$root.$on('showroledialog',()=>{
            this.dialogroleVisible=true;
        })
        this.$root.$on("changestatu",(status,type)=>{
            let dom=document.getElementsByClassName('checkall');
            dom=this.getElementByAttr('typediv',type,dom)[0];
            if(status){
                dom.setAttribute('class','check  el-checkbox__input is-checked checkall');
            }
            else{
                dom.setAttribute('class','check  el-checkbox__input checkall');
            }
            dom.getElementsByTagName('input')[0].checked=status;
        });
    },
    methods:{
        ai_dialog_close(){
            this.dialogroleVisible=false;
        },
        adddata(){
            this.dialogroleVisible=false;
            let idlistopcan=[];
            let idlistseecan=[];
            let selectedlist=document.getElementsByClassName('check  el-checkbox__input is-checked');
            // 被选中的可操作性项集合
            let selectedopcan=this.getElementByAttr('typediv','opcan',selectedlist);
             // 被选中的可查看项集合
            let selectedseecan=this.getElementByAttr('typediv','seecan',selectedlist);
            for(let i=0;i<selectedopcan.length;i++){
                idlistopcan.push(selectedopcan[i].getAttribute('data-id'));
            }
            for(let i=0;i<selectedseecan.length;i++){
                idlistseecan.push(selectedseecan[i].getAttribute('data-id'));
            }
            console.log(this.rolename,this.roleid,this.selectvalue,idlistopcan,idlistseecan);
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
        selectall(e){
            let target=e.target.parentNode;
            let ischecked=target.childNodes[0].checked;
            let selectclass='';
            if(ischecked){
                target.setAttribute('class','check  el-checkbox__input checkall');
                selectclass='check  el-checkbox__input';
            }
            else{
                target.setAttribute('class','check  el-checkbox__input is-checked checkall');
                selectclass='check  el-checkbox__input is-checked';
            }
            target.childNodes[0].checked=!ischecked;
            let list=target.parentNode.parentNode.getElementsByClassName('check');
            let attr=target.getAttribute('typediv');
            let result=this.getElementByAttr('typediv',attr,list);
            for(let i=1;i<result.length;i++){
                let ststus=result[i].childNodes[0].checked;
                result[i].setAttribute('class',selectclass);
                result[i].childNodes[0].checked=!ststus;
            }
        }
    }
}
</script>
<<style scoped>
.labelfor{
    text-align:right;
    line-height:30px;
}

.el-dropdown .el-button--primary{
    height:32px;
    width:auto;
    padding-top:9px;
    border-radius:5px;
    background-color:#fff;
    border-color:#c0c4cc;
    color:#555;
}
</style>
<style>
.el-dialog .grid-content input{
    width: 95%;
    height: 32px;
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 3px;
    border:1px solid #ccc;
}
.el-dialog .el-row{
    margin-bottom: 15px;
}
.data .grid-content{
    border: 1px solid !important;
    border-radius: 5px;
    padding:10px 20px;
    overflow: hidden;
}
.name{
    display: inline-block;
}
.name,.check{
    float: left;
}
.data .select{
    overflow: hidden;
}
div.check{
    width: 0;
    height: 0;
    position: absolute;
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
.check[typediv='opcan']{
    left: 68%;
}
.check[typediv='seecan']{
    left: 80%;
}
input[type='checkbox']{
    z-index: 1;
    opacity: 0;
}
</style>
