<template>
    <el-main id="member">
        <div class="memberNav">
            <el-row class="navChild">
                <el-col :span="12" class="navLeft">
                    <span>客户资料</span>
                </el-col>
                <el-col :span="12" class="navRight">
                    <el-input placeholder="请输入内容" v-model="searchFn"></el-input>
                    <i class="el-icon-search"></i> 
                    <span>新增</span>
                    <i class="el-icon-refresh"></i>
                    <el-button :class="{active:isActive}">导入</el-button><el-button :class="{active:isActive}">导出</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="memberMain">

            <div>
            <el-table
                :data="tableData3"
                style="width: 100%"
                height="250">
                <el-table-column
                fixed
                prop="date"
                label="日期"
                width="150">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="120">
                </el-table-column>
                <el-table-column
                prop="province"
                label="省份"
                width="120">
                </el-table-column>
                <el-table-column
                prop="city"
                label="市区"
                width="120">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址"
                width="300">
                </el-table-column>
                <el-table-column
                prop="zip"
                label="邮编"
                width="120">
                </el-table-column>
            </el-table>
            </div>
            <member-info class="infoCover"></member-info>
        </div>
    </el-main>
</template>
<script>
import memberInfo from './memberInfo/MemberInfo.vue'
export default {
    name:'member',
    data () {
        return {
            searchFn:'',
            isActive:false,
            tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
        }
    },
    components:{
        memberInfo,
    },
}
</script>
<style>
.el-input__inner{
    border-radius:40px;
}
</style>
<style scoped lang="less">
@media only screen and (min-width: 992px) {
.el-main{
width: 83.33333%;
left: 16.66667%;
}
}
@media only screen and (min-width: 1200px) {
.el-main{
width: 87.5%;
left: 12.5%;
} 
}
#member{
    width:90%;
    min-width: 1200px;
    height:100%;
    margin:70px 0 0 0;
    position: absolute;
    .memberNav{
        width: 100%;
        height:80px;
        background:#fff;
        position: absolute;
        .navChild{
            height: 63px;
            display:flex;
            padding-top: 15px;
            margin-bottom: 10px;
            .navLeft{
                font-size: 20px;
                font-weight: 400;
                color: #253a4d;
                margin-top:10px;
                span{
                    margin-left: 40px;
                }
            }
            .navLeft::before{
                content:'';
                display:inline-block;
                width: 4px;
                height: 22px;
                background-color: #000;
                margin: 0 15px 0 18px;
                position: absolute;
            }
            .navRight{
                position: relative;
                .el-input{
                    width: 30%; 
                }
                .el-icon-search{
                    font-size: 22px;
                    cursor: pointer;
                    color:#00aeaa;
                    position: absolute;
                    top:9px;
                    left:26%;
                }
                span{
                    padding:9px 25px;
                    background:#00aeaa;
                    color:#fff;
                    border-radius:10px;
                    margin:0 40px 0 25px;
                    cursor: pointer;
                }
                .el-icon-refresh{
                    position: absolute;
                    font-size: 35px;
                     cursor: pointer;
                    color:#00aeaa;
                    top:2px;
                }
                .el-button:nth-of-type(1){
                    width: 80px;
                    margin-left: 80px;
                    border-radius:20px 0 0 20px;
                    background:#00aeaa;
                    color:#fff;
                }
                .el-button:nth-of-type(2){
                    width: 80px;
                    border-radius:0 20px 20px 0;
                    background:#fff;
                    color:#000;
                }
                .el-button+.el-button{
                    margin-left: -1px;
                }
            }
        }
    }
    .memberNav::after{
        content:'';
        display:block;
        background: #fff;
        margin-right: 16px;
        border-top: 6px solid #56d2f4;
    }
    .memberMain{
        height:100%;
        background:#8ab130;
        position:relative;
        top:100px;
        .infoCover{
            width:100%;
            height: 100%;
            padding: 0;
            background-color: #F2F3F4;
            position:absolute;
            left:16%;
            z-index: 999;
            box-shadow: rgb(198, 198, 198) 0px 0px 10px 0px;
            // display:none;
        }
    }
}

</style>