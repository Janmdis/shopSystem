<template>
    <el-table
    :data="datalist"
    @select='showextra(false)'
    @select-all='showextra(true)'
    style="width: 100%"
    :stripe='true'>
        <el-table-column
        type="index"
        style="width: 5%">
        </el-table-column>
        <el-table-column
        type="selection"
        style="width: 5%">
        </el-table-column>
        <el-table-column
        prop="name"
        label="角色名称"
        align='center'
        style="width: 20%">
        </el-table-column>
        <el-table-column
        prop="id"
        label="角色编号"
        align='center'
        style="width: 40%">
        </el-table-column>
        <el-table-column
        prop="belongdep"
        label="角色所属部门"
        align='center'
        style="width: 20%">
        </el-table-column>
        <el-table-column
        prop="authority"
        label="菜单权限"
        align='center'
        style="width: 20%">
        </el-table-column>
  </el-table>
</template>
<script>
export default {
    props:['data'],
    data(){
        return {
            datalist:[]
        }
    },
    created:function(){
        this.datalist=this.data;
    },
    methods:{
        showextra(isall){
            let inputdom=document.getElementsByClassName('el-table__body-wrapper')[0].getElementsByTagName('input');
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
            
            // console.log(num);
            // if((!isall&&num==allnum)||(isall&&num==0)){
            //     console.log('全选');
            // }
        }
    }

}
</script>
