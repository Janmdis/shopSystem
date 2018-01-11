<template>
  <ul class='fatherUl'>
    <li :key="item.id" v-for="item in child">
        <div class='select'>
            <div class='name'>
                <i v-if='item.child.length' :data-id='item.id' class='el-icon el-icon-minus' @click="pack($event)"></i>
                <span>{{item.name}}</span>
            </div>
            <div class='check el-checkbox__input' typediv='opcan' @click="select($event)" :msg='msg'>
                <input type="checkbox" :data-id='item.id'>
                <span class="checkfor el-checkbox__inner"></span>
            </div>
            <div class='check el-checkbox__input' typediv='seecan' @click="select($event)" :msg='msg'>
                <input type="checkbox" :data-id='item.id'>
                <span class="checkfor el-checkbox__inner"></span>
            </div>
        </div>
        <Datarolelist :list='item.child' :test='msg'></Datarolelist>
    </li>
  </ul>
</template>
<script>
export default {
    name:'Datarolelist',
    props:['list','test'],
    data(){
        return {
            child:[],
            msg:''
        }
    },
    created:function(){
        this.child=this.list;
        this.msg= this.test+'1';
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
            // this.$root.$emit("changestatu",e);
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
                console.log(ststus);
                result[i].childNodes[0].checked=!ststus;
            }
            // 改变父集状态
            let msg=target.getAttribute("msg");
            var lensublim=target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('check');
            let result2=this.getElementByAttr('msg',msg,lensublim);
            // 点击选择框的元素的同辈元素
            result2=this.getElementByAttr('typediv',attr,result2);
            console.log(result2.length);
            // this.$root.$emit("changestatu",target);
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
    margin-top: 0px;
    margin-left: -20px;
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
.el-checkbox__input.is-checked .el-checkbox__inner{
    background-color:#25c3bf;
    border-color:#25c3bf;
}
</style>
