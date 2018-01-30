<template>
    <div id="houseDetail" v-show="isSwitchHouse">
        <div class="detailHeader" @click="returnBack">
            <i class="el-icon-back" ></i>
        </div>
        <ul class="houseDetailHeader">
            <li v-for="info in infos" :key="info.id" >
                <div class="houseDetailDiv1">
                    <span>小区/写字楼 : <el-select v-model="houseProps.buildings" :filterable="true" placeholder="你好">
                        <el-option v-for="item in option1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </span>
                    <span>租住状态 : <el-select v-model="houseProps.rentalStatus" placeholder='请选择'>
                        <el-option v-for="(value,key) in rentalStatusDetail" :key="key" :label="value" :value="value"></el-option>
                        </el-select>
                    </span>
                    <span>房屋类型 : <el-select v-model="houseProps.houseType" placeholder='请选择'>
                        <el-option v-for="(value,key) in houseCategoryDetail" :key="key" :label="value" :value="value"></el-option>
                        </el-select>
                    </span>
                </div>
                <div class="houseDetailDiv2" v-show="isHousing">
                    房型 : <input type="text" v-model="houseProps.room" placeholder='memberHouseDetail[houseNum].areaId'> 室 <input type="text" v-model="houseProps.office" > 厅 
                    <input type="text" v-model="houseProps.toilet"> 卫 <input type="text" v-model="houseProps.kitchen"> 厨 
                    <input type="text" v-model="houseProps.balcony"> 阳台
                </div>
                <div class="houseDetailDiv3">
                    <p>地址 : </p>
                    <span>
                        <el-select v-model="houseProps.bigDistrict" placeholder="请选择">
                            <el-option v-for="item in option1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select><i>区</i>
                    </span>
                    <span><el-select v-model="houseProps.provinceValue" placeholder="请选择">
                            <el-option v-for="item in option1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select><i>省</i>
                    </span>
                    <span><el-select v-model="houseProps.cityValue" placeholder="请选择">
                            <el-option v-for="item in option1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select><i>市</i>
                    </span>
                    <span><el-select v-model="houseProps.smallDistrict" placeholder="请选择">
                            <el-option v-for="item in option1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select><i>区</i>
                    </span>
                    <span><el-select v-model="houseProps.streetValue" placeholder="请选择">
                            <el-option v-for="item in option1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select><i class="street">街道</i>
                    </span>
                    <input type="text" placeholder="请输入详细地址" v-model="houseProps.streetMore" class="detailAddress">
                </div>
            </li>
        </ul>
        <div class="houseDetailMain">
            <div class="mainTable">
                <div class="tableDes">家用设备信息表<el-button class="btn1" @click="dialogVisible = true" round>新增</el-button><span class="titleSpan1">( 共3条 )</span><span>收起</span></div>
                <el-table :data="tableData1" border style="width:95%;margin-left:5%;">
                    <el-table-column prop="householdEquipment" label="家用设备"></el-table-column>
                    <el-table-column prop="equipBrand" label="品牌"></el-table-column>
                    <el-table-column prop="equipType" label="型号"></el-table-column>
                    <el-table-column prop="isReplace" label="是否更换"></el-table-column>
                    <el-table-column prop="maintenanceRecords" label="保养记录"></el-table-column>
                    <el-table-column prop="opration" label="操作">
                        <template slot-scope="scope">
                            <el-button class="btn1" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button class="btn2" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="mainTable">
                <div class="tableDes">家用设备信息表<el-button class="btn1" @click="dialogVisible = true" round>新增</el-button><span class="titleSpan1">( 共3条 )</span><span>收起</span></div>
                <el-table :data="tableData1" border style="width:95%;margin-left:5%;">
                    <el-table-column prop="householdEquipment" label="家用设备"></el-table-column>
                    <el-table-column prop="equipBrand" label="品牌"></el-table-column>
                    <el-table-column prop="equipType" label="型号"></el-table-column>
                    <el-table-column prop="isReplace" label="是否更换"></el-table-column>
                    <el-table-column prop="maintenanceRecords" label="保养记录"></el-table-column>
                    <el-table-column prop="opration" label="操作">
                        <template slot-scope="scope">
                            <el-button class="btn1" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button class="btn2" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="houseDetailBtn"><el-button class="btn1" round>保存</el-button></div>
        </div>
        <el-dialog class="dialog1" :append-to-body="true" title="新增" :visible.sync="dialogVisible" :before-close="handleClose"> 
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="家用设备" prop="equipName">
                    <el-input v-model="ruleForm.equipName"></el-input>
                </el-form-item>
                <el-form-item label="是否更换" prop="isChange"> 
                    <el-select v-model="ruleForm.isChange" placeholder="">
                        <el-option label="是" value="更换"></el-option>
                        <el-option label="否" value="不更换"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="品牌" prop="equipBrand">
                    <el-input v-model="ruleForm.equipBrand"></el-input>
                </el-form-item>
                <el-form-item label="型号" prop="equipTypeNumber">
                    <el-input v-model="ruleForm.equipTypeNumber"></el-input>
                </el-form-item>
                <el-form-item label="保养记录" prop="equipMaintain">
                    <el-input type="textarea" :rows="2" v-model="ruleForm.equipMaintain"></el-input>
                </el-form-item>
                <el-form-item>
                    <span class="dialog-footer">
                        <el-button @click="cancelAlert('ruleForm')">取 消</el-button>
                        <el-button type="primary" @click="saveFormData('ruleForm')">确 定</el-button>  
                    </span>
                </el-form-item>
            </el-form>    
        </el-dialog>
        <!-- 删除弹出框 -->
    </div>
</template>
<script>
export default {
    props:[
        'memberHouseDetail','houseCategoryDetail','rentalStatusDetail'
    ],
    data () {
        return {
            houseNum:0,
            isSwitchHouse:false,
            isHousing:false,
            dialogVisible: false,
            houseProps:{
                rentalStatus:this.rentalStatusDetail[1],houseType:this.houseCategoryDetail[1],
                balcony:'',room:'',office:'',
                toilet:'',kitchen:'',
                bigDistrict:'',
                provinceValue:'',
                cityValue:'',
                smallDistrict:'',
                streetValue:'',
                streetMore:''
            },
            option1:[
                {value: '选项1',label: '黄金糕'}, 
                {value: '选项2',label: '双皮奶'},
            ],
            infos:[
                {houseId:0,houseArea:'龙盛华庭',houseType1:'住宅',houseType2:'住宅',houseSquare:'120平方米',houseAddress:'上海市杨浦区长阳路1687号',houseState:'租住'},
            ], 
            tableData1: [
                { householdEquipment: '手机',equipBrand:'苹果',equipType: '123',isReplace:'是',maintenanceRecords:'家用设备'},
                { householdEquipment: '电脑',equipBrand:'耐克',equipType: '234',isReplace:'是',maintenanceRecords:'家用设备'},
                { householdEquipment: '煤气灶',equipBrand:'舒肤佳',equipType: '456',isReplace:'是',maintenanceRecords:'家用设备'},
            ],
            ruleForm: {equipName: '',isChange: '',equipBrand: '',equipTypeNumber: '',equipMaintain:'',desc:''},
            rules: {
                equipName: [
                    { required: true, message: '请填入设备', trigger: 'blur' },
                ],
                isChange: [
                    { required: true, message: '', trigger: 'change' }
                ],
                equipBrand: [
                    { required: true, message: '请填入品牌', trigger: 'blur' }
                ],
                equipTypeNumber: [
                    { required: true, message: '请填入型号', trigger: 'blur' }
                ],
                equipMaintain: [
                    { required: true, message: '请填入保养记录', trigger: 'blur' }
                ]
            },    
        }
    },
    created:function(){
        this.$root.$on('houseDetailShow',(data)=>{
            this.isSwitchHouse=true;
            this.houseNum = data;
        })
    },
    watch:{
        houseProps: {
            handler:function(value,oldValue){
                console.log(this.houseProps.houseBuilding);
                console.log(this.houseProps.houseType);
                console.log(this.houseProps.rentalStatus);
                console.log(this.houseProps.houseStreet);
                if(this.houseProps.houseType == '住宅'){
                    this.isHousing = true;
                }else{
                    this.isHousing = false;
                }
            },
            deep:true
        }
    },
    methods:{
        returnBack(){
            this.isSwitchHouse = false
            this.$root.$emit('houseShow')
        },
        cancelAlert(formName){
            this.dialogVisible = false;
            this.$refs[formName].resetFields();
        },
        saveFormData(formName){
            this.dialogVisible = false;
            this.$refs[formName].resetFields();
        },
        handleClose(done) {//  新增弹出框关闭按钮的事件
            this.dialogVisible = false;
        },
        handleDelete(index, row) {
            console.log(index, row);
            this.$confirm('确定删除{品牌}{设备}吗?', '提示', 
                {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'})
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
            });
        },
        handleEdit(index, row) {
            console.log(index, row);
            this.dialogVisible = true;
        }
    },
    beforeDestroy(){
        this.$root.$off('houseDetailShow')
    }
}
</script>
<style lang="less">
.mainTable{
    table td:nth-child(3) .cell{
        border:none;
    }
    .el-table th:nth-child(6) .cell{
        min-width: 142px;
    }
    .el-table td:nth-child(6) .cell{
        width: 142px;
        display:flex;
        flex-wrap: wrap;
        justify-content:space-between;
    }
}
.el-select-dropdown__item{
    padding:0 20% !important;
}
#houseDetail{
    .el-table__body-wrapper{
        overflow:hidden;
    }
    .el-button.btn1{
        background:#fff;
        color:#00c0be;
    }
    .el-button.btn1:hover{
        background:#00c0be;
        color:#fff;
    }
} 
.dialog1 .el-dialog{//  点击增加弹出框样式
    width: 35%;
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
            .el-form-item:nth-child(5){
                width: 95%;
                .el-textarea__inner{
                    resize: none;
                }
            }
            .el-form-item:nth-child(6){
                width: 95%;
                padding:0 10% 0 15%;
                .el-button:nth-child(2){
                    margin-left:30%;
                }
            }
        }
    }
}
</style>
<style lang="less" scoped>
.detailHeader{
    margin:20px 20px 0 20px;
    width: 28px;
    height: 28px;
    line-height: 30px;
    text-align: center;
    border-radius:50%;
    border:2px solid #00c0be;
    cursor: pointer;
    i{
        color:#00c0be;
        font-size:20px;
        font-weight:900;
    }
}
#houseDetail{
    min-width: 750px;
    background: #fff;
    padding-bottom:80px;
    position: relative;
    .houseDetailHeader{
            width: 100%;
        li{
            font-size: 14px;
            color:#666;
            border-bottom:2px solid #ddd;
            position: relative;
            .houseDetailDiv1{      
                padding: 35px 50px 30px 50px;
                display:flex;
                span{
                    display:block;
                   width: 50%;
                    .el-select{
                        margin-left:15px;
                        position: absolute;
                        top:21px;
                        width: 150px !important;
                    }
                }
                span:nth-child(even){
                    margin-left: 78px;
                    // margin-right:50px;
                }
                span:last-child{
                    margin-left:58px;
                    // margin-right:50px;
                }
            }
            .houseDetailDiv2{
                padding: 20px 90px 0 50px;
                input{
                    width: 40px;
                    border-bottom:1px solid #ddd;
                    margin:0 5px;
                    text-align:center;
                    outline:none;
                }
            }
            .houseDetailDiv3{
                padding: 35px 90px 20px 50px;
                display:flex;
                p{
                    width: 60px;
                    min-width:40px;
                    line-height:40px;
                }
                span{
                    line-height:40px;
                    display:flex;
                    .el-select{
                        width: 70% !important;
                    }
                    i{
                        min-width:30px;
                        font-style:normal;
                        margin-left:15px;
                    }
                    i.street{
                        padding-right:10px !important;;
                    }
                }
                .detailAddress{
                    height:10px;
                    border:1px solid #ddd;
                    border-radius:5px;
                    outline:none;
                    padding:15px;
                }
            }
        }
    }
    .houseDetailMain{
        padding: 0 90px 0 50px;
        .mainTable{
            .tableDes{
                margin:35px 0;
                font-size:17px;
                font-weight:500;
                color:#00c0be;
                position: relative;
                span{
                    cursor: pointer;
                    position: absolute;
                    right: 0;
                    color:#ef7747;
                }
                span.titleSpan1{
                    right:70px;
                    cursor: default;
                    color:#666;
                }
                .el-button{
                    width: 100px;
                    background:#fff;
                    color:#00c0be;
                    margin-left:45px;
                    position: absolute;
                    top:-12px;
                }
                .el-button:hover{
                    background:#00c0be;
                    color:#fff;
                }   
            }
        }
        .houseDetailBtn{
            margin:30px 0 50px;
            position: relative;
            .el-button{
                width: 150px;
                position: absolute;
                right: 0;
                top:30px;
            }
        }
    }

    //  点击编辑弹出框

    //  点击删除弹出框
}
</style>

