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
    created:function(){
        this.$store.dispatch('getDeplisttree');
        this.$store.dispatch('getDeplistall');
    },
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

