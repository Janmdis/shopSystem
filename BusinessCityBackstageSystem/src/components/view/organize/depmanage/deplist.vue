<template>
    <div class="grid-content">
        <div class="rolHeader">
            部门列表
            <div class="pull-right">
                <span class="addRole" data-toggle="modal" data-target="#productModal" type="button" @click="opendialogDep">添加</span>
                <transition name="fade">
                    <span class="clearBorder" data-toggle="modal" data-target="#delModal" @click='deletedep' v-show="deleteshow">删除</span>                    
                </transition>
            </div>
        </div>
        <div class="list ">
            <el-tree ref='tree' :data="list"  node-key="id" :props="defaultProps" :default-expand-all='true' :expand-on-click-node='false' @node-click='pick'></el-tree>
        </div>
        <Dialogadddep :ishow='dialogDepVisible'></Dialogadddep>
        
    </div>
</template>
<script>
import Dialogadddep from './dialogadddep'
import { mapState } from 'vuex'
/* eslint-disable */
export default {
    components:{Dialogadddep},
    data(){
        return {
            defaultProps: {
                children: 'children',
                label: 'info'
            },
            deleteshow:false,
            currentid:'',
            currentname:'',
            curentnum:'',
            lastchildnum:'',
            dialogDepVisible:false     //模态框是否显示
        }
    },
    methods:{
        opendialogDep(){
            //父部门id
            let departmentFatherid=this.currentid;
            // 父部门名称
            let departmentFathername=this.currentname;
            // 父部们编号
            let departmentFathernum=this.curentnum;
            // 最后一个同辈节点编号
            let deplastchildnum=this.lastchildnum;
            console.log(deplastchildnum);
            this.$root.$emit("exportvis",{departmentFatherid,departmentFathername,departmentFathernum,deplastchildnum});
        },
        deletedep(){
            let that=this;
            this.$confirm('确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                this.$http.post('/api/admin/manage/department/update',[{
                    id:that.currentid,
                    isActive:'0'
                }])
                .then(function (response) {
                    console.log(response);
                    if(response.data.msg=='更新成功'){
                        that.$message({
                            type:'success',
                            message:'删除成功!'
                        });
                        that.$store.dispatch('getDeplisttree');
                    }
                    else{
                        that.$message({
                            type:'info',
                            message:response.data.msg
                        });
                    }
                })
                .catch(function (response) {
                    that.$message({
                        type:'info',
                        message:'删除失败!'
                    });
                });
            }).catch(()=>{
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        pick(data,node,vuecomponent){
            console.log(data,node,vuecomponent);
            let dom_current=vuecomponent.$el.firstChild.lastChild;
            let classname=dom_current.getAttribute('class');
            let don_on=document.getElementsByClassName('on');
            don_on.length?don_on[0].setAttribute('class','el-tree-node__label'):void(0);
            dom_current.setAttribute('class','el-tree-node__label on');
            // console.log(node);
           // 修改‘删除’按钮状态
            this.deleteshow=data.children?false:true;
            this.currentid=data.id;
            this.currentname=data.info;
            this.curentnum=data.number;
            this.lastchildnum=node.childNodes.length?node.childNodes[node.childNodes.length-1].data.number:'';
            let parm={
                depid:data.id
            }
            this.$store.dispatch('getRolelist',parm);
        }
    },
    computed: {
        ...mapState({
            list: state => state.deplist.deplisttree
        })
    },
    watch:{
        list(){
            console.log(111);
            // console.log(this.$refs.tree);
            // this.pick()
        }
    },
    beforeDestroy:function(){
        this.$root.$off('undatadep');
    }
}
</script>
<style scoped>
.grid-content{
    height:80%;
	border:1px solid #27a1f2;
	border-radius:5px;
    background:#fff;
    overflow: hidden;
}
.rolHeader{
	height:90px;
	color:#8b8b8b;
	line-height:90px;
	padding-left:10%;
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
.pull-right{
    padding-right:40px;
    float: right;
}
li{
    margin-top: 10px !important;
}
</style>
<style>
.el-tree{
    height:95%;
    overflow:auto;
}
.el-tree-node__expand-icon{
    color:rgb(0, 173, 171);
    font-size:14px;
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
    font-size:14px;
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

