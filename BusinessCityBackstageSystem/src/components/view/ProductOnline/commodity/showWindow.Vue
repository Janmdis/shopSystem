<template>

    <el-dialog  :visible.sync="dialogVisible" width="80%" height='80%' class='commodity'>
        <el-form ref="form" :model="form" width="80px" class='elesentBox'>
        <el-form-item >
            <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        </el-form>
        
        <el-table :data="tableData"  style="width: 100%" class="srcollTbale">
        <el-table-column
        type="index"
        label="N"
        :index="indexMethod">
        </el-table-column>
            <el-table-column prop="date" label="图片" width="180">
                <template slot-scope="scope">
                    <img src='http://www.baidu.com/link?url=JUaZ5P3qfOKvnySgoziCyPR5yQrAtAcCiuUxa_XOPlp6yEuQovvdF5AyRp0d3wThNlaQrcS28-i48i5H4uT1968i9DZx_1xmR6dErvcDmBmfadxcGIRr8y7r1b2umQgiXGiMO_alJPQGbU-8mPRLUuWldkDI7uuOjlx4DVxQnkrkT-vf6GjezLrQhs9ZB6oSa5iY2cB7-T6n7k_d8UOn2Is9zmmuTVvae2x_yWidu8cApzChRpeZfE5CsAVY3uGLAra-U8r06vBlXvvR67XJenO0arOlUzlMAzM0L-frAF8Z2pfHJyCCab97zgWwQu6vatTbfk3JvgCjyasT5UCN8F_V7-wmvHL9o6K1B3-OSJ2OKqnooIAant512kHZ5NJUQfXEZxu23Bok0_zwX5gJYKIpubOjwCEa1BUTEiuRAXtOWi3OBx3EJHm8lJ8yYvT_mHTMuzELoZL4WKOT3QEEbI9sFzo8c8MLBpI41QveshPtH1sAGnlQUgYKf71GV5zUmdOFY3v8LvGn40vXGJqjFdIQ4O9m1DvTYtNvj0TKytVTyPnol2zFQbAjOdK88_GlPMN7gJngpkwRbjUjh9p7jK&timg=http%3A%2F%2Fa.cphotos.bdimg.com%2Ftimg%3Fimage%26quality%3D100%26size%3Db4000_4000%26sec%3D1518072074%26di%3D3ab172897f846b8797665bd7aff47529%26src%3Dhttp%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F3ac79f3df8dcd10088b14b1c798b4710b9122fd9.jpg&click_t=1518072077100&s_info=1423_769&wd=&eqid=82f3e44b00009bbf000000045a7bf109'/>
                    <img src='http://www.baidu.com/link?url=JUaZ5P3qfOKvnySgoziCyPR5yQrAtAcCiuUxa_XOPlp6yEuQovvdF5AyRp0d3wThNlaQrcS28-i48i5H4uT1968i9DZx_1xmR6dErvcDmBmfadxcGIRr8y7r1b2umQgiXGiMO_alJPQGbU-8mPRLUuWldkDI7uuOjlx4DVxQnkrkT-vf6GjezLrQhs9ZB6oSa5iY2cB7-T6n7k_d8UOn2Is9zmmuTVvae2x_yWidu8cApzChRpeZfE5CsAVY3uGLAra-U8r06vBlXvvR67XJenO0arOlUzlMAzM0L-frAF8Z2pfHJyCCab97zgWwQu6vatTbfk3JvgCjyasT5UCN8F_V7-wmvHL9o6K1B3-OSJ2OKqnooIAant512kHZ5NJUQfXEZxu23Bok0_zwX5gJYKIpubOjwCEa1BUTEiuRAXtOWi3OBx3EJHm8lJ8yYvT_mHTMuzELoZL4WKOT3QEEbI9sFzo8c8MLBpI41QveshPtH1sAGnlQUgYKf71GV5zUmdOFY3v8LvGn40vXGJqjFdIQ4O9m1DvTYtNvj0TKytVTyPnol2zFQbAjOdK88_GlPMN7gJngpkwRbjUjh9p7jK&timg=http%3A%2F%2Fa.cphotos.bdimg.com%2Ftimg%3Fimage%26quality%3D100%26size%3Db4000_4000%26sec%3D1518072074%26di%3D3ab172897f846b8797665bd7aff47529%26src%3Dhttp%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F3ac79f3df8dcd10088b14b1c798b4710b9122fd9.jpg&click_t=1518072077100&s_info=1423_769&wd=&eqid=82f3e44b00009bbf000000045a7bf109'/>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="名称" width="180">
            </el-table-column>
            <el-table-column prop="address" label="规格">
            </el-table-column>
            <el-table-column prop="address" label="单位">
            </el-table-column>
            <el-table-column prop="address" label="品牌">
            </el-table-column>
            <el-table-column prop="address" label="操作">
                <template slot-scope="scope">
                    <el-button type="text"  @click="handleClick(scope.row)" size="small">选择</el-button>
                </template>
            </el-table-column>
        </el-table>
           <div class="memberMain">
            <el-row>
                <el-col :span='10'>
                    <p class='lineHeight'>从1到{{this.pageS}}/共<span>{{this.totalCount}}</span>条数据</p>
                </el-col>
                <el-col :span='12' :offset="12">
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-size="pageSize" layout=" prev, pager, next, jumper,total" :total="totalCount">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
    </el-dialog>
</template>
<style>
    .imgBox {
        width: 100px;
        height: 100px;
        border: 1px solid #ddd;
    }
    .lineBline {
        border-bottom: 1px solid #ddd;
    }
    
    .commodity .el-dialog__header{
        background:#fff;
    }
    .commodity .elesentBox{
        width:20%;
        position:absolute;
        top:10px;
    }
    .commodity .srcollTbale{
        border-top:2px solid #ddd;
        max-height:400px;
        overflow-y: scroll;
    }
    
</style>
<script>
    import qs from 'qs'
    export default {
        data() {
            return {
                dialogVisible: false,
                textInfo: '新增会员',
                totalCount:1,
                pageS:1,
                pageIndex: 1,
                pageSize: 10,
                
                form: {
                    region: ''
                },
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            };
        },
        methods:{
            handleSizeChange(val) {
                this.pageSize = val;
                this.$root.$emit('pageSize', {
                    value: this.pageSize
                })
                },
                handleCurrentChange(val) {
                this.pageIndex = val;
                this.$root.$emit('pageIndex', {
                    value: this.pageIndex
                })
             },
             handleClick(val){
                 console.log(val)
                this.dialogVisible = false;
                this.$root.$emit('showTables',false);
                this.$root.$emit("shopDetailss",true);
             },
             indexMethod(index) {
                return index + 1
             },
        },
        created: function() {
            this.$root.$on('showWindow', (data) => {
                this.dialogVisible = true;
            });
        }
    }
</script>