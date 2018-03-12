<template>
    <div class="block">
        <span class="demonstration">从{{houseCount.firstPage}}到{{houseCount.lastPage}}/共{{houseCount.total}}条数据</span>
        <el-pagination
            @current-change="handleCurrentChange" 
            :current-page="houseCount.pageNum" 
            :page-size="houseCount.pageSize"
            layout="prev, pager, next,jumper"
            :total="houseCount.total">
        </el-pagination>
    </div>
</template>
<script>
export default{
    props:['houseCount'],
    data () {
        return {
            // totalCount:10,// 默认数据总数
            // pageSize:3,// 每页数据条数
            // pageIndex: 1,// 当前页
            // number:1,
        }
    },
    created(){
        // console.log(this.houseCount);
    },
    methods: {
        handleCurrentChange(val) {
            this.$root.$emit('housePage',val);
        }
    },
}
</script>
<style lang="less">
.block{
    display:flex;
    align-items: center;
    justify-content: center;
    .el-pagination{
        // width: 70%;
        // margin: auto;
        font-size: 14px;
    }
}
</style>

