<template>
    <el-main>
        <el-row :gutter='20'>
            <el-col :span='6'>
                <Deplist></Deplist>
            </el-col>
            <el-col :span='18'>
                <Rolelist ref='test'></Rolelist>
            </el-col>
        </el-row>
    </el-main>
</template>
<script>
import Deplist from "../authmanage/deplist.vue";
import Rolelist from "./rolelist.vue";
export default {
    components:{Deplist,Rolelist}
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