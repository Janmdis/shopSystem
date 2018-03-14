<template>
    <el-dialog class='headerBottom' :title="ruleForm.textInfo" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span='6'>
                    <el-form-item label="下单时间" prop="createTime">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.createTime" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="订单金额" prop='orderMoney'>
                        <el-input v-model="ruleForm.orderMoney"></el-input>
                    </el-form-item>
                    <el-form-item label="来源" prop='sourceId'>
                        <el-select v-model="ruleForm.sourceId" placeholder="请选择样式">
                            <el-option label="样式一" value="0"></el-option>
                            <el-option label="样式二" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="手机号" prop='phone'>
                        <el-input type="text" v-model="ruleForm.phone" @keyup.native="gets($event)" @keydown.native.down.prevent="selectDown" @keydown.native.up.prevent="selectUp"></el-input>
                    </el-form-item>
                    <el-form-item prop='isShoAdd' class='isShoAdd'>
                            <ul class='addName' v-show='ruleForm.isShoAdd'>
                                <li class="text-center" @click="cityAdd(item.regionName)" v-for="(item,index) in  ruleForm.myData" :key="index" :label='item.regionName' :value="item.id">{{item.regionName}}</li>
                            </ul>
                        </el-form-item>
                </el-col>
                <el-col :span='6'>
                    <el-form-item label="订单号" prop='number'>
                        <el-input v-model="ruleForm.number"></el-input>
                    </el-form-item>
                    <el-form-item label="支付金额" prop='orderMoney'>
                        <el-input v-model="ruleForm.orderMoney"></el-input>
                    </el-form-item>
                    <el-form-item label="来源明细" prop='sourceDetail'>
                        <el-input v-model="ruleForm.sourceDetail"></el-input>
                    </el-form-item>
                    <el-form-item label="业主姓名" prop='name'>
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='6'>
                    <el-form-item label="订单状态" prop='orderState'>
                        <el-select v-model="ruleForm.orderState" placeholder="请选择样式">
                            <el-option label="未完成" value="0"></el-option>
                            <el-option label="已完成" value="1"></el-option>
                            <el-option label="异常订单" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="未支付金额" prop='unpaidMoney'>
                        <el-input v-model="ruleForm.unpaidMoney"></el-input>
                    </el-form-item>
                    <el-form-item label="推荐人" prop='sourceAccount'>
                        <el-input v-model="ruleForm.sourceAccount"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop='detailAddress'>
                        <el-input v-model="ruleForm.detailAddress"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='6'>
                    <el-form-item label="订单类型" prop='orderType'>
                        <el-select v-model="ruleForm.orderType" placeholder="请选择样式">
                            <el-option label="新增服务订单" value="0"></el-option>
                            <el-option label="新增上门订单" value="1"></el-option>
                            <el-option label="追单" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="退款金额" prop='refundMoney'>
                        <el-input v-model="ruleForm.refundMoney"></el-input>
                    </el-form-item>
                    <el-form-item style='margin-top:84px;' label="会员等级" prop='starTime'>
                        <el-input v-model="ruleForm.starTime"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item>
                    <el-button>创建会员</el-button>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="备注:">
                    <el-input class="textareaBox" type="textarea" v-model="ruleForm.remark"></el-input>
                </el-form-item>
            </el-row>
            <el-row class='textInfo'>
                <span>商品/活动信息</span>
            </el-row>
            <el-row>
                <el-col :span='6'>
                    <el-form-item label="分类" >
                        <el-select v-model="ruleForm.classification" placeholder="请选择样式" @change='changes'>
                            <el-option v-for=' (item,index) in this.ruleForm.classificationBox' :companyIds='item.companyId'  :key="index" :label='item.name' :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span='8'>
                    <el-form-item label="商品" >
                        <el-select v-model="ruleForm.shop" placeholder="请选择样式">
                             <el-option v-for=' (item,index) in this.ruleForm.shopBox '  :key="index" :label='item.name' :value="item.companyId"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span='2' :offset='1'>
                    <el-button>添加</el-button>
                </el-col>
                <el-col :span='20' :offset='2'>
                    <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column label="商家名称"  prop='date'>
                        </el-table-column>
                        <el-table-column prop="name" label="规格" >
                        </el-table-column>
                        <el-table-column prop="name" label="数量">
                        </el-table-column>
                        <el-table-column prop="address" label="产品库存" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="address" label="单价"  show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="address" label="实际单价"  show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="name" label="操作" >
                            <template slot-scope="scope">
                                    删除
                        </template>
                    </el-table-column>
                </el-table>
                </el-col>
            </el-row>
            <el-row class='textInfo' style='margin-top:50px;'>
                <span>支付信息</span>
            </el-row>
            <el-row >
            <el-col :span='6'>
                <el-form-item label="支付方式" prop='starTime'>
                    <el-input v-model="ruleForm.starTime"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span='6'>
                <el-form-item label="支付时间" prop="payTime">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.payTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span='6'>
                <el-form-item label="实付金额" prop='actualMoney'>
                    <el-input v-model="ruleForm.actualMoney"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span='6'>
                <el-form-item label="已付金额" prop='paidMoney'>
                    <el-input v-model="ruleForm.paidMoney"></el-input>
                </el-form-item>
            </el-col>
            </el-row>
            <el-form-item>
                <el-button class='mTop' type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<style>
    .textInfo {
        position: relative;
        left: -20px;
        width: 103%;
        padding-left: 4%;
        height: 60px;
        line-height: 60px;
        background: #f6fbff;
        margin-bottom: 20px;
    }
    .textareaBox textarea {
        height: 148px;
        resize: none;
    }
    .clreaMarng .el-form-item__content {
        margin-left: 0 !important;
    }
    .clearM .el-checkbox+.el-checkbox {
        margin-left: 0px;
    }
    .ulDel {
        height: 100px;
        overflow-y: scroll;
        padding: 10px 20px;
        border: 1px solid #ddd;
    }
    .ulDel li {
        height: 30px;
        overflow: hidden;
    }
    .ulDel span {
        float: right;
    }
    .minheight .hiehlIn {
        line-height: 40px;
        text-align: center;
    }
    .imgBox {
        width: 100px;
        height: 100px;
        border: 1px solid #ddd;
    }
    .lineBline {
        border-bottom: 1px solid #ddd;
    }
    .wNight {
        width: 90%;
    }
    .delBox {
        cursor: pointer;
    }
    .headerBottom .el-dialog__header {
        background: #fff;
        border-bottom: 4px solid #409eff;
    }
    .headerBottom .el-dialog__title {
        color: #716f6f;
    }
    .headerBottom .showBox {
        padding-top: 10px;
        background: #f5f3f394;
    }
    .headerBottom .mTop {
        margin-top: 10px;
    }
    .icon-tianjia {
        position: absolute;
        right: 1%;
        top: 8%;
        font-size: 32px;
        color: #3a8ee6;
        z-index: 5;
        cursor: pointer;
    }
    .smallBox .el-form-item__content {
        margin-left: 50px !important;
    }
    .smallBox .el-form-item__label {
        width: 50px !important;
    }
    .addName {
        height: 100px;
        overflow-y: scroll;
        width: 100%;
        margin-top: -23px;
        background: #fff;
        position: relative;
        z-index: 9;
        border: 1px solid #ddd;
    }
    .addName li {
        text-align: center;
    }
    .inputName {
        width: 100%;
        height: 40px;
        border: 1px solid #dcdfe6;
        text-align: center;
        border-radius: 5px;
    }
    .addName {
        height: 100px;
        overflow-y: scroll;
        width: 100%;
        margin-top: -23px;
        background: #fff;
        position: relative;
        z-index: 9;
        border: 1px solid #ddd;
    }
    .addName li {
        text-align: center;
    }
</style>
<script>
    import qs from 'qs'
    export default {
        data() {
            return {
                companyIds:'',
                dialogVisible: false,
                tableData3: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                ruleForm: {
                    isShoAdd: false,
                    textInfo: '新增优惠劵',
                    starTime: '', //开始时间
                    orderMoney: '',
                    phone:'',
                    number:'',
                    orderMoney:'',
                    sourceDetail:'',
                    name:'',
                    classification:'',
                    classificationBox:'',
                    shop:'',
                    shopBox:'',
                    orderState:'',
                    unpaidMoney:'',
                    detailAddress:'',
                    orderType:'',
                    refundMoney:'',
                    remark:'',
                    now: -1,
                    payTime:'',
                    actualMoney:'',
                    paidMoney:'',
                    sourceAccount:'',
                    sourceId:"",
                    myData:''
                },
                rules: {
                    couponAmount: [{
                        required: true,
                        message: '请输入数量',
                        trigger: 'blur'
                    }, ],
                    starTime: [{
                        required: true,
                        message: '请选择开日期',
                        trigger: 'change'
                    }],
                }
            };
        },
        methods: {
            submitForm(formName) {
                let that = this;
                let dataInfo = {
                    orderMoney: this.ruleForm.orderMoney,
                    phone:this.ruleForm.phone,
                    number:this.ruleForm.number,
                    sourceDetail:this.ruleForm.sourceDetail,
                    name:this.ruleForm.name,
                    orderState:this.ruleForm.orderState,
                    unpaidMoney:this.ruleForm.unpaidMoney,
                    detailAddress:this.ruleForm.detailAddress,
                    orderType:this.ruleForm.orderType,
                    refundMoney:this.ruleForm.refundMoney,
                    remark:this.ruleForm.remark,
                    payTime:this.ruleForm.payTime,
                    actualMoney:this.ruleForm.actualMoney,
                    paidMoney:this.ruleForm.paidMoney,
                    sourceAccount:this.ruleForm.sourceAccount,
                    sourceId:this.ruleForm.sourceId
                }
                if (this.ruleForm.textInfo == "新增会员") {
                     this.handleClose();
                    that.$refs[formName].validate((valid) => {
                        
                        if (valid) {
                           
                            let url = '/api/product/coupon/info/insert';
                            this.$http({
                                    url: url,
                                    method: 'POST',
                                    // 请求体重发送的数据
                                    // headers: {
                                    //     'Content-Type': 'application/json'
                                    // },
                                    data: dataInfo
                                })
                                .then(response => {
                                    
                                    this.dialogVisible = false;
                                    this.$root.$emit('getDatezdy', 1)
                                })
                                .catch(error => {
                                    console.log(error);
                                    alert('网络错误，不能访问');
                                })
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                }
                if (this.ruleForm.textInfo == "编辑会员") {
                    that.$refs[formName].validate((valid) => {
                        if (valid) {
                            let url = '/api/product/coupon/info/update';
                            this.$http({
                                    url: url,
                                    method: 'POST',
                                    // 请求体重发送的数据
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    data: {}
                                })
                                .then(response => {
                                    this.dialogVisible = false;
                                    this.$root.$emit('getDatezdy', 1)
                                })
                                .catch(error => {
                                    console.log(error);
                                    alert('网络错误，不能访问');
                                })
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                }
            },
            cityAdd(name) {
                this.ruleForm.isShoAdd = false;
                this.ruleForm.city = name
                let url = '/api/public/region/fulzz?name=' + this.ruleForm.city + '&grade=3';
                this.$http({
                        url: url,
                        method: 'get',
                        //headers: { 'Content-Type': ' application/x-www-form-urlencoded' },
                    })
                    .then(respone => {
                        //that.addArrBox = [];
                        console.log(respone)
                        this.ruleForm.myData = respone.data.info
                        for (let i = 0; i < this.ruleForm.myData.length; i++) {
                            if (this.ruleForm.myData[i].regionName == this.ruleForm.city) {
                                this.ruleForm.addBoxArr = this.ruleForm.myData[i].sysRegionList
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
            gets(event) {
                if (this.ruleForm.phone != "") {
                    this.ruleForm.isShoAdd = true;
                } else {
                    this.ruleForm.isShoAdd = false;
                }
                if (this.ruleForm.phone == "") return;
                if (event.keyCode == 38 || event.keyCode == 40) return;
                if (event.keyCode == 13) {
                    this.ruleForm.isShoAdd = false;
                    for (let i = 0; i < this.ruleForm.myData.length; i++) {
                        if (this.ruleForm.myData[i].regionName == this.ruleForm.phone) {
                            this.ruleForm.addBoxArr = this.ruleForm.myData[i].sysRegionList
                        }
                    }
                }
                let url = '/api/public/region/fulzz?name=' + this.ruleForm.phone + '&grade=3';
                this.$http({
                        url: url,
                        method: 'get',
                        //headers: { 'Content-Type': ' application/x-www-form-urlencoded' },
                    })
                    .then(respone => {
                        //that.addArrBox = [];
                        this.ruleForm.myData = respone.data.info
                    })
                    .catch(error => {
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
            selectDown: function() {
                this.ruleForm.now++;
                if (this.ruleForm.now == this.ruleForm.myData.length) this.ruleForm.now = -1;
                if (this.ruleForm.myData[this.ruleForm.now] == undefined) {
                    return false
                };
                this.ruleForm.phone = this.ruleForm.myData[this.ruleForm.now].regionName;
            },
            selectUp: function() {
                this.ruleForm.now--;
                if (this.ruleForm.now == -2) this.ruleForm.now = this.ruleForm.myData.length - 1;
                if (this.ruleForm.myData[this.ruleForm.now] == undefined) {
                    return false
                };
                this.ruleForm.phone = this.ruleForm.myData[this.ruleForm.now].regionName;
            },
            getclassificationBox(){
                let url  = 'api/product/commodity/category/query';
                this.$http({
                            url: url,
                            method: 'post',
                            // headers: {
                            //     'Content-Type': ' application/x-www-form-urlencoded'
                            // },
                            data: {
                                
                            }
                        })
                        .then(respone => {
                            // console.log(respone)
                            this.ruleForm.classificationBox = respone.data.info.list;
                            
                        })
                        .catch(error => {
                            console.log(error);
                            alert('网络错误，不能访问');
                        })
            },
            changes(){
                this.getShopBox();
            },
            getShopBox(){
                let url  = 'api/product/commodity/info/query';
                this.$http({
                            url: url,
                            method: 'post',
                            // headers: {
                            //     'Content-Type': ' application/x-www-form-urlencoded'
                            // },
                            data:{id:this.ruleForm.classification}
                            
                        })
                        .then(respone => {
                            this.ruleForm.shopBox = respone.data.info.list
                            // console.log(this.ruleForm.shopBox)
                        })
                        .catch(error => {
                            console.log(error);
                            alert('网络错误，不能访问');
                        })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleClose() {　　
                this.$refs['ruleForm'].resetFields();
            },
            resetForm() {
                this.$refs['ruleForm'].resetFields();
            },
        },
        created: function() {
            this.$root.$on('showWindow', (data) => {
                let dataId = data[0].id
                if (data != 'no') {
                    this.ruleForm.textInfo = '编辑会员';
                    let url = '/api/product/coupon/info/find';
                    this.$http({
                            url: url,
                            method: 'post',
                            // headers: {
                            //     'Content-Type': ' application/x-www-form-urlencoded'
                            // },
                            data: {
                                id: dataId
                            }
                        })
                        .then(respone => {})
                        .catch(error => {
                            console.log(error);
                            alert('网络错误，不能访问');
                        })
                    this.dialogVisible = true;
                } else {
                    this.ruleForm.textInfo = '新增会员';
                    this.dialogVisible = true;
                }
            });
            this.getclassificationBox();
            this.getShopBox();
        }
    }
</script>

