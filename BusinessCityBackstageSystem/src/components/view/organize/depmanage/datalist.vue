<template>
    <div>
        <ul>
            <li :data-id="item.id" :key="item.id" :data-num='item.num' class="parent_li" v-for="item in childlist">
                <span :data-id="item.id" title="收起">
                    <i class="el-icon el-icon-minus"  v-if='item.children' @click="pack($event)"></i>
                    <strong :data-id="item.id" :data-num='item.number' @click="selectNode($event)">{{item.info}}</strong>
                </span>
                <Datalist :list='item.children'></Datalist>
            </li>
        </ul>
        
    </div>
</template>
<script>
export default {
    name:'Datalist',
    props:['list'],
    data(){
        return {
           childlist:[]
        }
    },
    created:function(){
        this.childlist=this.list;
        console.log(this.list);
    },
    methods:{
        pack(e){
            var title=e.currentTarget.parentNode.getAttribute('title');
            if(title=="收起"){
                e.currentTarget.parentNode.setAttribute('title',"展开");
                e.currentTarget.setAttribute('class','el-icon el-icon-plus');
                e.currentTarget.parentNode.parentNode.getElementsByTagName('ul')[0].style.display="none";
            }
            else if(title=="展开"){
                e.currentTarget.parentNode.setAttribute('title',"收起");
                e.currentTarget.setAttribute('class','el-icon el-icon-minus');
                e.currentTarget.parentNode.parentNode.getElementsByTagName('ul')[0].style.display="block";
            }
        },
        selectNode(e){
            let strongnode=document.getElementsByClassName('on')[0];
            // console.log(strongnode);
            if(strongnode){
                strongnode.setAttribute("class",'');
            }
            let dom=e.currentTarget.parentNode.parentNode.getElementsByTagName("li");
            // 是否有子节点
            let haschild=dom.length?true:false;
            e.currentTarget.setAttribute("class","on");
            let currentid=e.currentTarget.getAttribute('data-id');
            let currentname=e.currentTarget.innerHTML;
            // 当前部门编号
            let currentnum=e.currentTarget.getAttribute('data-num');
            // 最后一个子节点的编号
            let lastchildnum=dom.length?dom[dom.length-1].getAttribute('data-num'):'';  
           // 修改‘删除’按钮状态
            this.$root.$emit("haschild",{show:!haschild,currentid,currentname,currentnum,lastchildnum});
            this.$root.$emit('currentrole',{depid:currentid,depname:currentname});
        }
    }
}
</script>
<style>
.tree{
    height: 78%;
    overflow-y: auto;
}
.tree .el-icon{
    color: #03aeac;
}
.tree strong{
    color: #acacac;
    border-radius:5px;
    padding:2px;
}
strong{
    font-weight:normal;
    cursor: pointer;
}
strong.on{
    background-color:rgb(0, 173, 171);
    color: rgb(255, 255, 255); 
}
li{
    list-style-type: none;
}
.tree ul{
    padding-left: 10%;
}
</style>
