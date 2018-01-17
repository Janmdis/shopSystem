<template>
    <div class="grid-content">
        <div class='head-top'>
            <p>部门列表</p>
        </div>
        <div class='list'>
            <el-tree :data="list" :props="defaultProps" :expand-on-click-node='false' @node-click='pick'></el-tree>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            list:[
                {
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                        label: '三级 1-1-1'
                        }]
                    }]
                },
                {
                    label: '一级 2',
                    children: [
                        {
                            label: '二级 2-1',
                            children: [{
                            label: '三级 2-1-1'
                            }]
                        }, 
                        {
                            label: '二级 2-2',
                            children: [{
                            label: '三级 2-2-1'
                            }]
                    }]
                },
                {
                    label: '一级 3',
                    children: [
                        {
                            label: '二级 3-1',
                            children: [{
                                label: '三级 3-1-1'
                            }]
                        },
                        {
                            label: '二级 3-2',
                            children: [{
                            label: '三级 3-2-1'
                            }]
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    methods:{
        pick(data,node,vuecomponent){
            let dom_current=vuecomponent.$el.firstChild.lastChild;
            let classname=dom_current.getAttribute('class');
            let don_on=document.getElementsByClassName('on');
            don_on.length?don_on[0].setAttribute('class','el-tree-node__label'):void(0);
            dom_current.setAttribute('class','el-tree-node__label on');
            console.log(classname);
        }
    }
}
</script>
<style scoped>
.grid-content{
    min-height: 88%;
    background-color:#fff;
}
.head-top{
    height:90px;
	color:#8b8b8b;
	line-height:90px;
	padding-left:5%;
    font-size: 14px;
}


</style>
<style>
.el-tree-node__expand-icon{
    color:rgb(0, 173, 171);
}
.el-tree-node__expand-icon.expanded{
    transform: rotate(0deg)
}
.el-tree-node__expand-icon:before{
    content:"\E602"
    
}
.el-tree-node__expand-icon.expanded:before{
    content:"\E63C"
}
.list{
    margin-left: 5%;
    height:80%;
}
.list .el-tree-node__label{
    font-size:12px;
    color:#8b8b8b;
}
.el-tree-node__label{
    line-height:10px;
    padding:5px;
    border-radius:5px;
}
.el-tree-node__label.on{
    background-color: rgb(0, 173, 171);
    color:#fff;
}

</style>
