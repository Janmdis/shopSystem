<template>
    <div id="shopInfo">
        <el-col :span="24">
            <el-table
                :data="tableData"
                height="550"
                border
                style="width: 100%">
                <el-table-column
                prop="shopName"
                label="商品名称">
                </el-table-column>
                <el-table-column
                prop="shopSize"
                label="规格">
                </el-table-column>
                <el-table-column
                prop="shopNumber"
                label="数量">
                </el-table-column>
                <el-table-column
                prop="stock"
                label="产品库存">
                </el-table-column>
                <el-table-column
                prop="shopPrice"
                label="单价">
                </el-table-column>
                <el-table-column
                prop="relPrice"
                label="实际单价">
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
                {shopName:'格力',shopSize:'',shopNumber:1,stock:5,shopPrice:'20000.00',relPrice:'20000.00'},
                {shopName:'格力',shopSize:'',shopNumber:1,stock:5,shopPrice:'20000.00',relPrice:'20000.00'},
                {shopName:'格力',shopSize:'',shopNumber:1,stock:5,shopPrice:'20000.00',relPrice:'20000.00'},
                {shopName:'格力',shopSize:'',shopNumber:1,stock:5,shopPrice:'20000.00',relPrice:'20000.00'}
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
#shopInfo{
    .el-table{
        table td:nth-child(3) .cell{
            border:none;
        }
    }
}
</style>
<style lang="less" scoped>
#shopInfo{
    padding:50px 20px 50px;
}
</style>

