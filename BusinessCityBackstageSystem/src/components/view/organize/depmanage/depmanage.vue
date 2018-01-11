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
    components:{Deplist,Rolelist,Memberlist},
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
.el-main{
    width: 83.33333%;
    left: 16.66667%;
    height: 100%;
    margin-bottom: -70px;
    background-color: #f0f3f6;
    position: absolute;
    top: 70px;
    
}
@media only screen and (min-width: 992px) {
    .el-main{
        width: 83.33333%;
        left: 16.66667%;
    }  
}
@media only screen and (min-width: 1200px) {
    .el-main{
        width: 87.5%;
        left: 12.5%;
    }   
}
.el-row{
    height: 100%;
}
.el-col{
    height: 100%;
}
</style>

