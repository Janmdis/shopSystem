<template>
    <div>
        <ul>
            <li :data-id="item.id" :key="item.id" class="parent_li" v-for="item in childlist">
                <span :data-id="item.id" title="收起">
                    <i class="el-icon el-icon-minus"  v-if='item.children.length' @click="pack($event)"></i>
                    <strong :data-id="item.id" @click="selectNode($event)">{{item.info}}</strong>
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
        //    currentid:this.list.length?this.list[0].id:0
        }
    },
    created:function(){
        this.childlist=this.list;
    },
    // computed:{
    //     currentid:function(){
    //         var currentnode=document.getElementsByClassName('on')[0];
    //         return currentnode?currentnode.getAttribute('data-id'):this.list[0].id;
    //     }
    // },
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
            // 是否有子节点
            let haschild=e.currentTarget.parentNode.parentNode.getElementsByTagName("li").length?true:false;
            e.currentTarget.setAttribute("class","on");
            let currentid=e.currentTarget.getAttribute('data-id');
            let currentname=e.currentTarget.innerHTML;
            // 修改‘删除’按钮状态
            this.$root.$emit("haschild",{show:!haschild,currentid,currentname});
            this.$root.$emit('currentrole',(currentid));
            // var ulnode=strongnode;
            // console.log(ulnode);
        }
    }
}
</script>
<style>
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
