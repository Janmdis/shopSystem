<template>
    <div id="visit">
        <div class="visitHeader">
            <el-button>返回 <i class="icon iconfont icon-fanhui"></i></el-button>
        </div>
        <div class="visitMain">
            <el-table :data="tableVisit" border style="width:100%">
                <el-table-column fixed prop="visitNumer" label="回访编号" > </el-table-column>
                <el-table-column prop="visitTime" label="回访时间" > </el-table-column>
                <el-table-column prop="customerPhone" label="客户电话"> </el-table-column>
                <el-table-column prop="visitor" label="客服"></el-table-column>
                <el-table-column prop="visitCont" label="回访内容"></el-table-column>
                <el-table-column prop="customerFeedback" label="客户反馈"></el-table-column>
                <el-table-column prop="satisfaction" label="满意度"></el-table-column>
                <el-table-column prop="nextVisit" label="下次访问"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default{
    data () {
        return {
            tableVisit: [
                { visitNumer: 'AAAAAA',visitTime: '2018-12-12',customerPhone: '17856503541',visitor:'王小虎',
                visitCont: '查水表',customerFeedback: '水表坏了',satisfaction: '非常满意',nextVisit:'是'}
            ]
        }
    }
}
</script>
<style lang="less">
.visitMain{
    table{
        width: 100%;
    }
    table td:nth-child(3) .cell{
        border:none;
    }
    .el-table thead{
        color:#000;
    }
}
</style>
<style scoped lang="less">
#visit{
    padding:20px 20px;
    .visitHeader{
        margin-left: 90%;
        margin-bottom: 20px;
        .el-button{
            border:none;
            font-size: 18px;
            color:#00aeae;
        }
    }
}
</style>

