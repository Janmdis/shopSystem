<template>
    <el-main>
        <el-row :gutter='20'>
            <el-col :span='6'>
                <Deplist :type='type'></Deplist>
            </el-col>
            <el-col :span='18'>
                <Rolelist ref='test'></Rolelist>
            </el-col>
        </el-row>
        <Dialogedit></Dialogedit>
        <!-- <Dialogaddrole></Dialogaddrole> -->
        <Rolepromise></Rolepromise>
        <Dialogpromise></Dialogpromise>
    </el-main>
</template>
<script>
import Deplist from "../usermanage/deplist.vue";
import Rolelist from "./rolelist.vue"
import Dialogedit from "./dialogedit.vue"
// import Dialogaddrole from "./dialogaddrole.vue"
import Rolepromise from '../rolepromise.vue'
import Dialogpromise from "./dialogpromise.vue"
export default {
    components:{Deplist,Rolelist,Dialogedit,Dialogpromise,Rolepromise},
    data(){
        return{
            type:'rolemanage'
        }
    },
    created:function(){
        this.$store.dispatch('getDeplisttree');
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