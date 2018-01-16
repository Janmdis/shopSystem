<template>
  <ul class='fatherUl'>
    <li :key="item.id" v-for="(item,index) in child">
        <div class='select'>
            <div class='name'>
                <i v-if='item.child.length' :data-id='item.id' class='el-icon el-icon-minus' @click="pack($event)"></i>
                <span>{{item.name}}</span>
            </div>
            <div class='check el-checkbox__input' :data-id='item.id' typediv='opcan' @click="select($event)" :msg='msg' :msg2='index'>
                <input type="checkbox" :data-id='item.id'>
                <span class="checkfor el-checkbox__inner"></span>
            </div>
            <div class='check el-checkbox__input' :data-id='item.id' typediv='seecan' @click="select($event)" :msg='msg' :msg2='index'>
                <input type="checkbox" :data-id='item.id'>
                <span class="checkfor el-checkbox__inner"></span>
            </div>
        </div>
        <Datarolelist :list='item.child' :msgextra='msg'></Datarolelist>
    </li>
  </ul>
</template>
<script>
export default {
    name:'Datarolelist',
    props:['list','msgextra'],
    data(){
        return {
            child:[],
            msg:''
        }
    },
    created:function(){
        this.child=this.list;
        this.msg= this.msgextra+'1';
    },
    methods:{
        pack(e){
            let classname=e.target.className;
            // 收起
            if(classname=='el-icon el-icon-minus'){
                e.target.parentNode.parentNode.parentNode.getElementsByClassName('fatherUl')[0].style.display='none';
                e.target.setAttribute('class','el-icon el-icon-plus')
            }
            // 展开
           else{
               e.target.parentNode.parentNode.parentNode.getElementsByClassName('fatherUl')[0].style.display='block';
                e.target.setAttribute('class','el-icon el-icon-minus')
           }
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
            // target.childNodes[0].checked=!ischecked;
            let list=target.parentNode.parentNode.getElementsByClassName('check');
            let attr=target.getAttribute('typediv');
            let result=this.getElementByAttr('typediv',attr,list);
            // 改变子集状态
            for(let i=0;i<result.length;i++){
                let ststus=result[i].childNodes[0].checked;
                result[i].setAttribute('class',target.getAttribute('class'));
                result[i].childNodes[0].checked=!ststus;
            }
            // 改变父集状态
            // 获取当前元素的同辈元素标志
            let msg=target.getAttribute("msg");
            // 取得当前元素的同一分支节点标志
            let msg2=target.getAttribute("msg2");
           
            // 当前元素的结构树层数
            let length_tree=msg.split('test')[1].split('').length;
            // var selected
            let selectedall=true;
            let dom=target.parentNode.parentNode.parentNode.parentNode;
            for(let i=1;i<=length_tree;i++){
                // 默认每层的子元素全部被选中
                
                // 得到当前元素的第i层ul父节点
                for(let j=1;j<i;j++){
                    dom=dom.parentNode.parentNode;
                }
                let lensublim=dom.getElementsByClassName('check');
                let msg3=dom.getElementsByClassName('fatherUl')[0].childNodes[0].getElementsByClassName('check')[0].getAttribute('msg');
                let result2=this.getElementByAttr('typediv',attr,lensublim);
                
                // 点击当前层元素的同辈元素
                let result3=this.getElementByAttr('msg',msg3,result2);
                // console.log(result2);
                // 获取当前层是否全部选中
                for(let m=0;m<result3.length;m++){
                    var check=result3[m].getElementsByTagName('input')[0].checked;
                    if(!check){
                        selectedall=false;
                    }
                }
                let msg4=msg3.slice(0,msg3.length-1);
                // 当前层级的父层checkbox
                let fadom=this.getElementByAttr('msg',msg4,result2);
                if(fadom.length){
                    fadom[0].setAttribute('class',selectedall?'check  el-checkbox__input is-checked':'check  el-checkbox__input');
                    fadom[0].childNodes[0].checked=selectedall;
                }
                else{
                    this.$root.$emit('changestatu',selectedall,attr);
                }
            }
        }
    }
}
</script>
<style scoped>
.el-icon{
    color:#459796;
    font-weight: bolder;
    cursor: pointer;
    font-size: 18px;
}
input[type='checkbox']{
    z-index: 1;
    opacity: 0;
}
.fatherUl{
    padding-left: 25px;
}
.select{
    overflow: hidden;
}
.name,.check{
    float: left;
}
.name span{
    padding-left: 5px;
}
div.check{
    width: 0;
    height: 0;
    position: absolute;
    
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
li{
    margin-top: 10px !important;
}
</style>
<style>
.el-checkbox__input.is-checked .el-checkbox__inner{
    background-color:#25c3bf;
    border-color:#25c3bf;
}
</style>
