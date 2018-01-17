<template>
    <el-table
    :data="datalist"
    @select='showextra(false)'
    @select-all='showextra(true)'
    @row-click="showMemberInfo()"
    :stripe='true'
    style="width: 100%">
    <el-table-column
    fixed
    type="index"
    label="N"
    :index="indexMethod">
    </el-table-column>
        <el-table-column
        fixed
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
        class='borderRight'
        fixed
        prop="ids"
        label="用户登录名称"
        width='100'
        >
        </el-table-column>
        <el-table-column
        prop="name"
        label="姓名"
        >
        </el-table-column>
        <el-table-column
        prop="iphone"
        width='120'
        label="性别">
        </el-table-column>
        <el-table-column
        prop="types"
        label="年龄">
        </el-table-column>
        <el-table-column
        prop="city"
        label="手机号码">
        </el-table-column>
        <el-table-column
        prop="quarters"
        label="入职日期">
        </el-table-column>
        <el-table-column
        prop="state"
        label="邮件">
        </el-table-column>
        <el-table-column
        prop="source"
        width='120'
        label="工作状态">
        </el-table-column>
        <el-table-column
        prop="Inputtiem"
        width='100'
        label="所属部门">
        </el-table-column>
        <el-table-column
        prop="locking"
        label="是否锁定">
        </el-table-column>
        <el-table-column
        width='120'
        prop="tel"
        label="固定电话">
        </el-table-column>
        <el-table-column
        width='120'
        prop="birthday"
        label="出生日期">
        </el-table-column>
        <el-table-column
        prop="relation"
        label="关联角色">
        </el-table-column>
                
            </el-table>
</template>
<script>
export default {
    props:['data'],
    data(){
        return {
            datalist:[],
            showLeft:0,
        }
    },
    created:function(){
        this.datalist=this.data;
    },
    methods:{
        showMemberInfo(index){//  点击显示侧滑
            this.showLeft = 16
            this.$root.$emit('infoCoverShow',this.showLeft)
        },      
        showextra(isall){
            let inputdom=document.getElementsByClassName('el-table__fixed-body-wrapper')[0].getElementsByTagName('input');
            let num=0;
            let allnum=inputdom.length;
            for(let i=0;i<inputdom.length;i++){
                if(inputdom[i].checked){
                    num++;
                }
            }
            let show=false;
            let editcan=true;
            if(isall){
                if(num==0||num!=allnum){
                    show=true;
                    editcan=false;
                    num=allnum;
                }
                else{
                    show=false;
                    num=0;
                }
            }
            else{
                if(num!=0){
                    show=true;
                    editcan=num>1?false:true;
                }
                else{
                    show=false;
                }
            }
            this.$root.$emit('showlttip',{show,editcan,num});
        },
        indexMethod(index) {
            return index + 1
        },
    }

}
</script>
