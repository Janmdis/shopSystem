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
        <Dialogedit></Dialogedit>
        <Dialogaddrole></Dialogaddrole>
        <Dialogpromise></Dialogpromise>
    </el-main>
</template>
<script>
import Deplist from "../usermanage/deplist.vue";
import Rolelist from "./rolelist.vue"
import Dialogedit from "./dialogedit.vue"
import Dialogaddrole from "./dialogaddrole.vue"
import Dialogpromise from "./dialogpromise.vue"
export default {
    components:{Deplist,Rolelist,Dialogedit,Dialogaddrole,Dialogpromise}
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