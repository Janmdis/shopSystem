<template>
    <el-main>
        <el-row :gutter='20'>
            <el-col :span='6'>
                <Deplist></Deplist>
            </el-col>
            <el-col :span='18'>
                <Memberlist></Memberlist>
            </el-col>
        </el-row>
    </el-main>
    
</template>
<script>
import Deplist from "./deplist.vue";
import Memberlist from "./memberlist.vue";
export default {
    components:{Deplist,Memberlist}
}
</script>
<style scoped>
.el-row{
    height:100%;
    overflow-y: auto;
}
.el-col{
    height: 100%;
    border-radius:5px;
}

</style>
