<template>
    <el-dialog title='库存列表'  :visible.sync="dialogVisible"  width="60%">
        <el-row style='padding-bottom:10px;'>
            <el-col :span="4">
                <el-select v-model="type" placeholder="分类" class='typeselect'>
                    <el-option
                    v-for="item in listtype"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-table :data="listgoods" style="width: 100%;height:75%;" height='100%' class='table-goods'>
            <el-table-column
            type="index"
            label="N"
            >
            </el-table-column>
            <el-table-column type='selection'>
            </el-table-column>
            <el-table-column   label="图片"  >
                <template slot-scope="scope">
                    <img :src="scope.row.imgurl" alt="">
                </template>
            </el-table-column>
            <el-table-column  prop="title" label="标题"  >
            </el-table-column>
            <el-table-column  prop="price" label="价格"  >
            </el-table-column>
            <el-table-column  prop="nums" label="库存"  >
            </el-table-column>
        </el-table>
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pages"
        layout="prev, pager, next, jumper"
        :total="total">
        </el-pagination>
        <div style='text-align:center;position:absolute;bottom:3%;left:0;right:0;'>
            <el-button type="primary" style="height：30px;line-height:7px;" @click="adddata">保存</el-button>
        </div>
    </el-dialog>
</template>
<style scoped>
    .imgBox {
        width: 100px;
        height: 100px;
        border: 1px solid #ddd;
    }
    .lineBline {
        border-bottom: 1px solid #ddd;
    }
    .el-table{
        border-top: 6px solid #56d2f4;
    }
    .el-pagination{
        /* margin-top: 0px; */
        text-align: right;
        position:absolute;
        bottom:11%;
        right:2%;
    }
    .table-goods img{
        width:70px;
        height:40px;
        /* border: 1px solid; */
    }
    
</style>
<style>
    .typeselect .el-input__inner{
        height: 30px;
    }
     table td:nth-child(3) .cell{
        border:none !important;
    }
    .el-dialog__wrapper{
        width:100%;
        height:100%;
    }
    .el-dialog{
        height:80%;
        padding-bottom:0px;
    }
    .el-dialog__body{
        height:80%;
        padding-top:10px;
    }
    .table-goods tr td:nth-child(3){
        padding:0;
        text-align:center;
    }
    .table-goods tr td:nth-child(3) .cell{
        width:70px;
        height:40px;
        margin:0 auto;
        padding:0;
        line-height:10px;
        background-color:#ebeef5;
    }
</style>

<script>
    export default {
        data() {
            return {
                dialogVisible: false,
                currentPage:1,
                total:100,
                pages:10,
                type:'',
                listtype:[
                    {
                        id:'1',
                        value:'test1'
                    },
                    {
                        id:'2',
                        value:'test2'
                    },
                    {
                        id:'3',
                        value:'test3'
                    }
                ],
                listgoods:[
                    {
                        id:'',
                        imgurl:'static/images/Login/logo.png',
                        title:'',
                        price:'20',
                        nums:'2'
                    },
                    {
                        id:'',
                        imgurl:'static/images/Login/background.jpg',
                        title:'',
                        price:'20',
                        nums:'2'
                    },
                    {
                        id:'',
                        imgurl:'../',
                        title:'',
                        price:'20',
                        nums:'2'
                    },
                    {
                        id:'',
                        imgurl:'../',
                        title:'',
                        price:'20',
                        nums:'2'
                    },
                    {
                        id:'',
                        imgurl:'../',
                        title:'',
                        price:'20',
                        nums:'2'
                    },
                    {
                        id:'',
                        imgurl:'../',
                        title:'',
                        price:'20',
                        nums:'2'
                    },
                    {
                        id:'',
                        imgurl:'../',
                        title:'',
                        price:'20',
                        nums:'2'
                    },
                    {
                        id:'',
                        imgurl:'../',
                        title:'',
                        price:'20',
                        nums:'2'
                    },
                    {
                        id:'',
                        imgurl:'../',
                        title:'',
                        price:'20',
                        nums:'2'
                    },
                    {
                        id:'',
                        imgurl:'../',
                        title:'',
                        price:'20',
                        nums:'2'
                    }
                ]
            };
        },
        methods: {
            adddata(){
                this.dialogVisible=false;
                this.$root.$emit('adddata');
            },
            handleSizeChange(){},
            handleCurrentChange(){}
        },
        created: function() {
            this.$root.$on('showWindow', () => {
                // alert(111);
                this.dialogVisible=true;
                
            });  
        },
        beforeDestroy(){
            this.$root.$off('showWindow');
        }
    }
</script>