<template>
    <el-dialog width='30%' top='60px'  title="关联角色" :visible="dialogassociaVisible" :modal='false' :before-close="ai_dialog_close">
        <el-row>
            <el-col :span="18" :offset='3'>
                角色操作
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="18" :offset='3'>
                <div class="grid-content" style="border:1px solid;padding:0 20px;">
                    <ul style="padding-left:0;">
                        <li v-for='(item,index) in list' :key='index'>
                            <div class="role">
                                <span>{{item.name}}</span>
                            </div>
                            <el-checkbox  :data-id='item.id' :data-name='item.name'></el-checkbox>
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer" :center='true'>
            <el-button type="primary" round   @click="adddata">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    props:["datalist"],
    data(){
        return {
            list:[],
            dialogassociaVisible:false
        }
    },
    created:function(){
        this.list=this.datalist;
        this.$root.$on("associashow",(isshow)=>{
            this.dialogassociaVisible=isshow;
        });
    },
    methods:{
        ai_dialog_close(){
            this.dialogassociaVisible=false;
        },
        adddata(){
            let idlist=[];
            let rolelist=[];
            let dom=document.getElementsByClassName('el-checkbox is-checked');
            for(let i=0;i<dom.length;i++){
                idlist.push(dom[i].getAttribute('data-id'));
                rolelist.push(dom[i].getAttribute('data-name'));
            }
            this.$root.$emit('getrolerange',{idlist,rolelist});
            this.dialogassociaVisible=false;
        }
    }
}
</script>
<style scoped>
.grid-content{
    height: 280px;
    overflow-y: auto;
}
.role{
    display: inline-block;
}
ul li{
    margin-bottom: 10px;
    position: relative;
}
.el-checkbox{
    right: 0;
    position: absolute;
}
</style>

