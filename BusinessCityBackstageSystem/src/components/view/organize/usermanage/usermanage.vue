<template>
    <el-main>
        <el-row :gutter='20'>
            <el-col :span='6'>
                <Deplist :type='type'></Deplist>
            </el-col>
            <el-col :span='18'>
                <Memberlist ref='test'></Memberlist>
            </el-col>
        </el-row>
        <Dialogedit></Dialogedit>
    </el-main>
</template>
<script>
import Deplist from "./deplist.vue";
import Memberlist from "./memberlist.vue";
import Dialogedit from "./dialogedit.vue";
export default {
    components:{Deplist,Memberlist,Dialogedit},
    data(){
        return {
            type:'usermanage'
        }
    },
    created:function(){
        this.$store.dispatch('getDeplisttree');
        this.$store.dispatch('getDeplistall');
    },
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
