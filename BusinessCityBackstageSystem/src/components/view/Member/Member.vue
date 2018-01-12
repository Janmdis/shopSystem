<template>
    <el-main id="member">
        <div class="memberNav">
            <div class="navChild">
                <div class="navLeft">
                    <span>客户资料</span>
                </div>
                <div class="navRight">
                    <el-input placeholder="请输入内容" v-model="searchFn"></el-input>
                    <i class="el-icon-search"></i> 
                    <span>新增</span>
                    <i class="el-icon-refresh"></i>
                    <el-button :class="{active:isActive}">导入</el-button><el-button :class="{active:isActive}">导出</el-button>
                </div>
            </div>
        </div>
        <div class="memberMain">
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
#member{
    width:90%;
    height:100%;
    margin:70px 0 0 195px;
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
            .navLeft{
                width:40%;
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
                width:60%;
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
                    left:48%;
                    top:2px;
                }
                .el-button:nth-of-type(1){
                    margin-left: 60px;
                    border-radius:20px 0 0 20px;
                    background:#00aeaa;
                    color:#fff;
                }
                .el-button:nth-of-type(2){
                    border-radius:0 20px 20px 0;
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
            display:none;
        }
    }
}

</style>