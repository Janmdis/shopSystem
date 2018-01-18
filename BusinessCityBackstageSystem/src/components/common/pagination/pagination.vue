<template>
    <div id="public-pagination">
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="100"
            layout="sizes,total,prev, pager, next, jumper"
            :total="1000">
        </el-pagination>
    </div>
</template>
<script>
export default{
    data () {
        return {
            currentPage3: 1,
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    },
}
</script>
<style lang="less">
#public-pagination{
    .el-pagination{
        width: 70%;
        margin: auto;
        font-size: 14px;
        color:#575757;
        .btn-next:hover,.btn-prev:hover{
            color:#fff;
            background: #00c0be;
        }
        .el-pagination__jump{
            margin-left:5px;
        }
        .el-pager li.active{
            background:#00c0be;
            border-radius:50%;
        }
    }
}
</style>

