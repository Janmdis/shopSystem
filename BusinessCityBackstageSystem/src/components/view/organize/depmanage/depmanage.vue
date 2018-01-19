<template>
    <el-main>
        <el-row :gutter="25">
            <el-col :span="9">
                <Deplist></Deplist>
            </el-col>
            <el-col :span="6">
                <Rolelist></Rolelist>
            </el-col>
            <el-col :span="9">
                <Memberlist></Memberlist>
            </el-col>
        </el-row>
        
    </el-main>
</template>
<script>
import Deplist from '../depmanage/deplist'
import Rolelist from '../depmanage/rolelist'
import Memberlist from '../depmanage/memberlist'
export default {
    components:{Deplist,Rolelist,Memberlist}
    // data(){
    //     return {
    //         dialogDepVisible:false,     //模态框是否显示
    //         addLoading: false, 
    //     }
    // },
    // methods:{
    //     opendialogDep(){
    //         this.dialogDepVisible=true;
    //     }
    // }
}
</script>
<style scoped>

.el-row{
    height: 100%;
}
.el-col{
    height: 100%;
}

</style>
<style>
.tree li{
    margin-top: 10px !important;
}
</style>

