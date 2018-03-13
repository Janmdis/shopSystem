<template>
    <div id="integral">
        <el-col :span="24">
            <el-table
                :data="tableData"
                height="550"
                border
                style="width: 100%">
                <el-table-column
                prop="shopName"
                width="150"
                label="商品名称">
                </el-table-column>
                <el-table-column
                prop="shopNumber"
                label="商品编号">
                </el-table-column>
                <el-table-column
                prop="giftIntegral"
                label="赠送积分">
                </el-table-column>
            </el-table>
        </el-col>
    </div>
</template>
<script>
export default{
    props:[
        'personnelInfo','customerCategory','customerIdentity','recommendedSource',
        'defaultCategory','defaultIdentity','defaultSource',
    ],
    data () {
        return {
            tableData:[
                {shopName:'格力',shopNumber:1,giftIntegral:'20000.00'},
                {shopName:'格力',shopNumber:1,giftIntegral:'20000.00'},
                {shopName:'格力',shopNumber:1,giftIntegral:'20000.00'},
                {shopName:'格力',shopNumber:1,giftIntegral:'20000.00'},
                {shopName:'格力',shopNumber:1,giftIntegral:'20000.00'}
            ],
        }
    },
    watch:{
        items:{
            handler:function(val,oldval){
                this.disabledBtn = false;
            },
            deep:true
        },
        defaultIdentity:function(){
            this.items.customer = this.defaultCategory;
            this.items.identy = this.defaultIdentity;
            this.items.origin = this.defaultSource;
        }
    },
    methods:{

    }
}
</script>
<style lang="less" >
#integral{
    .el-table{
        table td:nth-child(3) .cell{
            border:none;
        }
    }
}
</style>
<style lang="less" scoped>
#integral{
    padding:50px 20px 50px;
}
</style>

