<template>
    <div id="house" >
        <div class="houseHome" v-show="isSwitchHouseDetail">
            <div class="houseHeader"><span class="addHouseBtn" @click="addCover">新增</span></div>
            <ul class="houseMain" >
                <li v-for="info in memberHouse" :key="info.id" >
                    <div class="houseDiv"><span>小区/写字楼 : {{info.estateId}}</span><span>房屋类型 : {{info.housingCategory}}</span></div>
                    <div class="houseDiv"><span>地址 : {{info.address}}</span><span>租住状态 : {{info.housingRentalStatus}}</span></div>
                    <div class="houseBtn">
                        <el-button @click="jumpHouseDetail(info.houseId)">查看详情</el-button>
                    </div>
                </li>
            </ul>
            <public-pagination></public-pagination>
        </div>
        <el-dialog class="dialogAddHouse" :append-to-body="true" title="新增" :visible.sync="showHouseCover" :before-close="handleClose"> 
            <el-form :model="houseForm" :rules="rules" ref="houseForm" label-width="100px" class="demo-houseForm">
                <el-form-item label="小区/写字楼" prop="houseBuilding">
                    <el-select v-model="houseForm.houseBuilding" placeholder="">
                        <el-option label="是" value="更换"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="房屋类型" prop="houseType"> 
                    <el-select v-model="houseForm.houseType" placeholder="">
                        <el-option label="是" value="更换"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="租住状态" prop="houseState">
                    <el-select v-model="houseForm.houseState" placeholder="">
                        <el-option label="是" value="更换"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地址" prop="houseAddress">
                    <el-input v-model="houseForm.houseAddress"></el-input>
                </el-form-item>
                <el-form-item>
                    <span class="dialog-footer">
                        <el-button @click="cancelAlert('houseForm')">取 消</el-button>
                        <el-button type="primary" @click="saveFormData('houseForm')">确 定</el-button>  
                    </span>
                </el-form-item>
            </el-form>    
        </el-dialog>
        <house-details></house-details>
    </div>
</template>
<script>
import publicPagination from '@/components/common/pagination/pagination.vue'
import houseDetails from './HouseDetail.vue'
export default{
    props:['memberHouse'],
    data () {
        return {
            isSwitchHouseDetail:true,
            showHouseCover:false,
            houseForm: {houseBuilding: '',houseType: '',houseAddress: '',houseState: ''},
            rules: {
                houseAddress: [
                    { required: true, message: '请填入地址', trigger: 'blur' }
                ]
            },    
        }
    },
    created:function(){
       this.$root.$on('houseShow',() => {
            this.isSwitchHouseDetail = true
        })
    },
    mounted(){
        
    },
    methods: {
        addCover(){ //  新增房屋事件
        this.showHouseCover = true;
        },
        jumpHouseDetail () {
            this.isSwitchHouseDetail = false
            this.$root.$emit('houseDetailShow')
        },
        cancelAlert(formName){
            this.showHouseCover = false
            this.$refs[formName].resetFields()
        },
        saveFormData(formName){
            this.showHouseCover = false
            this.$refs[formName].resetFields()
        },
        handleClose(done) {//  新增弹出框关闭按钮的事件
            this.showHouseCover = false
        },
        handleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
        }
    },
    components: {
        houseDetails,
        publicPagination,
    },
}
</script>
<style lang="less">
    .dialogAddHouse .el-dialog{//  点击增加弹出框样式
        width:35%;
        .el-dialog__body{
            .el-form{
                display:flex;
                flex-wrap:wrap;
                justify-content: space-between;
                .el-form-item{
                    width:40%;
                    margin-bottom:35px;
                }
                .el-form-item:nth-child(even){
                    margin-right:5%;
                }
                .el-form-item:nth-child(4){
                    width: 95%;
                    .el-textarea__inner{
                        resize: none;
                    }
                }
                .el-form-item:nth-child(5){
                    width: 95%;
                    padding:0 10% 0 15%;
                    .el-form-item__content{
                        margin-left: 20% !important;
                    }
                    .el-button:nth-child(2){
                        margin-left:30%;
                    }
                }
            }
        }
    }
</style>

<style lang="less" scoped>
.houseHome{
    padding:0 25px 20px;
}
#house{
    background: #fff;
    //min-width:750px;
    .houseHeader{
        padding-top:20px;
        padding-right: 30px;
        height: 60px;
        overflow: hidden;
        .addHouseBtn{
            display:inline-block;
            width: 118px;
            height: 38px;
            line-height: 38px;
            color:#6c757b;
            border:1px solid #dcdedc;
            border-radius:25px;
            text-align: center;
            cursor: pointer;
            float: right;
        }
        .addHouseBtn:hover{
                background:#00aeaa;
                color:#fff;
        }
    }
    .houseMain{
            width: 100%;
        li{
            font-size: 14px;
            color:#666;
            margin:20px 0;
            background:#F2F3F4;
            .houseDiv{      
                padding: 0 80px 0;
                display:flex;
                span{
                    display:block;
                }
                span:nth-child(odd){
                    width:60%;
                }
                span:nth-child(even){
                    margin-left: 110px;
                    width:40%;
                }
            }
            .houseDiv:nth-child(1){
                padding-top:20px;
                margin-bottom: 30px;
            }
            .houseDiv:nth-child(2){
                margin-bottom: 20px;
            }
            .houseBtn{
                border-top: 1px solid #dbdbdd;
                padding:10px 0;
                position:relative;
                height: 45px;
                .el-button{
                    background:#fff;
                    color:#00c0be;
                    position: absolute;
                    right:30px;
                    border-radius:30px;
                }
                .el-button:hover{
                    background:#00c0be;
                    color:#fff;
                }
            }
        }
    }
}
</style>
