<template>
    <el-dialog class='headerBottom' :title="ruleForm.textInfo" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span='6'>
                    <el-form-item label="下单时间" prop="createTime">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.createTime" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="订单金额" prop='orderMoney'>
                        <el-input v-model="ruleForm.orderMoney" type='number'></el-input>
                    </el-form-item>
                    <el-form-item label="来源" prop='sourceId'>
                        <el-select v-model="ruleForm.sourceId" placeholder="请选择样式">
                            <el-option v-for=' (item,index) in this.ruleForm.sourceArr ' :key="index" :label='item.name' :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="手机号" prop='phone'>
                        <el-input type="text" v-model="ruleForm.phone" @keyup.native="gets($event)" @keydown.native.down.prevent="selectDown" @keydown.native.up.prevent="selectUp"></el-input>
                    </el-form-item>
                    <el-form-item prop='isShoAdd' class='isShoAdd'>
                        <ul class='addName' v-show='ruleForm.isShoAdd'>
                            <li class="text-center" @click="cityAdd(item.mobile)" v-for="(item,index) in  ruleForm.myData" :key="index" :label='item.mobile' :value="item.id">{{item.mobile}}</li>
                        </ul>
                    </el-form-item>
                </el-col>
                <el-col :span='6'>
                    <el-form-item label="订单号" prop='number'>
                        <el-input v-model="ruleForm.number"></el-input>
                    </el-form-item>
                    <el-form-item label="支付金额" prop='actualMoney'>
                        <el-input v-model="ruleForm.actualMoney" type='number'></el-input>
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
                        <el-input v-model="ruleForm.unpaidMoney" type='number'></el-input>
                    </el-form-item>
                    <el-form-item label="推荐人" prop='sourceAccount'>
                        <el-input v-model="ruleForm.sourceAccount"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop='detailAddress'>
                        <el-input v-model="ruleForm.detailAddress" @keyup.native="getAdds($event)" @keydown.native.down.prevent="addDown" @keydown.native.up.prevent="addUp"></el-input>
                    </el-form-item>
                    <el-form-item prop='isShoAdd' class='isShoAdd'>
                        <ul class='addName' v-show='vipaddShow'>
                            <li class="text-center" v-for="(item,index) in addNewBox" :key="index" :label='item.alladd' @click='checkAdd(item.alladd)' :value=item.alladd>{{item.alladd}}</li>
                        </ul>
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
                        <el-input v-model="ruleForm.refundMoney" type='number'></el-input>
                    </el-form-item>
                    <el-form-item style='margin-top:84px;' label="会员等级">
                        <el-input v-model="ruleForm.level" :disabled='viplevelIS'></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item>
                    <el-button v-show='vipShow' @click.native='crearVip'>创建会员</el-button>
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
                    <el-form-item label="分类">
                        <el-select v-model="ruleForm.classification" placeholder="请选择样式" @change='changes'>
                            <el-option v-for=' (item,index) in this.ruleForm.classificationBox' :companyIds='item.companyId' :key="index" :label='item.name' :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span='8'>
                    <el-form-item label="商品">
                        <el-select v-model="ruleForm.shop" placeholder="请选择样式" @change='changeTable'>
                            <el-option v-for=' (item,index) in this.ruleForm.shopBox ' :key="index" :label='item.name' :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span='2' :offset='1'>
                    <el-button @click='addTable'>添加</el-button>
                </el-col>
                <el-col :span='20' :offset='2'>
                    <el-table ref="multipleTable" :data="ruleForm.addBox" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column label="商品名称" prop='name'>
                        </el-table-column>
                        <el-table-column prop="specificationValue" label="规格">
                        </el-table-column>
                        <el-table-column prop="displayQuantity" label="数量">
                        </el-table-column>
                        <el-table-column prop="inventoryQuantity" label="产品库存" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="discount_price" label="单价" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="current_price" label="实际单价" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                                    <span @click='delBox(scope.row)' >删除</span>
</template>
                    </el-table-column>
                </el-table>
                </el-col>
            </el-row>
            <!--<el-row class='textInfo' style='margin-top:50px;'>
                <span>支付信息</span>
            </el-row>
            <el-row >
            <el-col :span='6'>
                <el-form-item label="订单类型" prop='starTime'>
                        <el-select v-model="ruleForm.starTime" placeholder="请选择样式">
                            <el-option label="支付宝" value="1"></el-option>
                            <el-option label="微信" value="1"></el-option>
                            <el-option label="管家代收" value="2"></el-option>
                        </el-select>
                    </el-form-item>
            </el-col>
            <el-col :span='6'>
                <el-form-item label="支付时间" prop="payTime">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.payTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span='6'>
                <el-form-item label="实付金额" prop='actualMoney'>
                    <el-input v-model="ruleForm.actualMoney" type='number'></el-input>
                </el-form-item>
            </el-col>
            <el-col :span='6'>
                <el-form-item label="已付金额" prop='paidMoney'>
                    <el-input v-model="ruleForm.paidMoney" type='number'></el-input>
                </el-form-item>
            </el-col>
            </el-row>!-->
            <el-form-item class='boxsss'>
                <el-button class='mTop' type="primary" style='margin-left:0;' @click="submitForm('ruleForm')">保存</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<style>
    .boxsss .el-form-item__content{
        margin-left: 0 !important;
        text-align: center;
    }
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
                companyIds: '',
                dialogVisible: false,
                vipShow: false,
                viplevelIS: true,
                vipaddShow: false,
                vipaddShowArr: [],
                addNewBox: [],
                i: 0,
                ruleForm: {
                    createTime:'',
                    isShoAdd: false,
                    textInfo: '新增订单',
                    starTime: '', //开始时间
                    orderMoney: '',
                    paidMoney: '',
                    phone: '',
                    number: '',
                    sourceDetail: '',
                    name: '',
                    classification: '',
                    level: 0,
                    classificationBox: '',
                    shop: '',
                    shopBox: '',
                    tableBox: [],
                    newBox: [],
                    addBox: [],
                    pushAdd: [],
                    orderState: '',
                    unpaidMoney: '',
                    detailAddress: '',
                    orderType: '',
                    refundMoney: '',
                    remark: '',
                    now: -1,
                    Addnow: -1,
                    orderId:'',
                    //payTime: '',
                    actualMoney: '',
                    paidMoney: '',
                    sourceAccount: '',
                    sourceId: "",
                    sourceArr: [],
                    myData: ''
                },
                rules: {
                    orderMoney: [{
                        required: true,
                        message: '填写订单金额',
                        trigger: 'blur'
                    }],
                    paidMoney: [{
                        required: true,
                        message: '填写支付金额',
                        trigger: 'blur'
                    }],
                    number: [{
                        required: true,
                        message: '订单号',
                        trigger: 'blur'
                    }],
                    orderState: [{
                        required: true,
                        message: '请填写订单',
                        trigger: 'change'
                    }],
                    orderType: [{
                        required: true,
                        message: '请填写订单',
                        trigger: 'change'
                    }],
                }
            };
        },
        methods: {
            submitForm(formName) {
                let that = this;
                let dataInfo = {
                    id:this.ruleForm.orderId,
                    orderMoney: this.ruleForm.orderMoney,
                    phone: this.ruleForm.phone,
                    number: this.ruleForm.number,
                    sourceDetail: this.ruleForm.sourceDetail,
                    name: this.ruleForm.name,
                    orderState: this.ruleForm.orderState,
                    unpaidMoney: this.ruleForm.unpaidMoney - 0,
                    detailAddress: this.ruleForm.detailAddress,
                    orderType: this.ruleForm.orderType,
                    refundMoney: this.ruleForm.refundMoney - 0,
                    remark: this.ruleForm.remark,
                    //payTime: this.ruleForm.payTime,
                    actualMoney: this.ruleForm.actualMoney - 0,
                    paidMoney: this.ruleForm.paidMoney - 0,
                    sourceAccount: this.ruleForm.sourceAccount,
                    sourceId: this.ruleForm.sourceId,
                    hasContract: false,
                    createTime:this.goTime(this.ruleForm.createTime),
                    orderDetails: this.ruleForm.pushAdd
                }
                if (this.ruleForm.textInfo == "新增订单") {
                    
                    this.ruleForm.orderId='',
                    that.$refs[formName].validate((valid) => {
                        if (valid) {
                            let url = '/api/product/order/insert';
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
                                    this.clearForm();
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
                if (this.ruleForm.textInfo == "编辑订单") {
                    that.$refs[formName].validate((valid) => {
                        if (valid) {
                            let url = '/api/product/order/update';
                            this.$http({
                                    url: url,
                                    method: 'POST',
                                    // 请求体重发送的数据
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
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
            },
            getAdd() {
                if (this.ruleForm.phone == "" || this.ruleForm.phone == null) {
                    return
                }
                this.vipaddShow = true;
                let url = '/api/customer/customerHousing/findHousingInfo?phone=' + this.ruleForm.phone;
                this.$http({
                        url: url,
                        method: 'get',
                        // 请求体重发送的数据
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: {}
                    })
                    .then(response => {
                        let data = response.data.info;
                        console.log(data == "")
                        if (data == '' || data == null) {
                            this.vipaddShow = false;
                            return false;
                        }
                        let adds = [];
                        for (let i = 0; i < data.length; i++) {
                            //console.log(data[i])
                            adds.push({
                                'province': data[i].provinceId,
                                'city': data[i].cityId,
                                'area': data[i].regionName
                            })
                        }
                        //console.log(adds)
                        let address = window.sessionStorage.getItem("address");
                        address = JSON.parse(address);
                        let aresObj = [];
                        let cityObj = [];
                        let areObj = [];
                        for (let i = 0; i < adds.length; i++) {
                            let ares = adds[i]['province']
                            let city = adds[i]['city']
                            for (var k in address) {
                                if (k == ares) {
                                    aresObj.push({
                                        ares: address[k]
                                    })
                                }
                            }
                            for (var k in address) {
                                if (k == city) {
                                    cityObj.push({
                                        city: address[k]
                                    })
                                }
                            }
                            areObj.push(adds[i]['area'])
                        }
                        var hash = {};
                        aresObj = aresObj.reduce(function(item, next) {
                            hash[next.ares] ? '' : hash[next.ares] = true && item.push(next);
                            return item
                        }, []);
                        for (let i = 0; i < aresObj.length; i++) {
                            let alladd = aresObj[i]['ares'] + cityObj[i]['city'] + areObj[i];
                            this.addNewBox.push({
                                'alladd': alladd
                            })
                        }
                        //console.log(this.addNewBox)
                    })
                    .catch(error => {
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
            goTime(tiem) {
                let strtime = tiem;
                // 可以这样做
                let date = new Date(strtime);
                let time1 = date.getTime();
                return time1
            },
            cityAdd(name) {
                this.ruleForm.phone = name;
                this.ruleForm.isShoAdd = false;
            },
            checkAdd(value) {
                //console.log(value)
                this.ruleForm.detailAddress = value;
                this.vipaddShow = false;
            },
            addTable() {
                this.$set(this.ruleForm.addBox, this.i++, this.ruleForm.newBox[0]);
                var hash = {};
                this.ruleForm.addBox = this.ruleForm.addBox.reduce(function(item, next) {
                    hash[next.id] ? '' : hash[next.id] = true && item.push(next);
                    return item
                }, []);
                console.log(this.ruleForm.addBox)
                let newbxo = this.ruleForm.addBox;
                let that = this;
                for (let i = 0; i < newbxo.length; i++) {
                    that.ruleForm.pushAdd.push({
                        commodityId: newbxo[i].id,
                        commodityName: newbxo[i].name,
                        saleNumber: newbxo[i].displayQuantity
                    })
                }
                var hashId = {};
                that.ruleForm.pushAdd = that.ruleForm.pushAdd.reduce(function(item, next) {
                    hashId[next.commodityId] ? '' : hashId[next.commodityId] = true && item.push(next);
                    return item
                }, []);
                console.log(that.ruleForm.pushAdd)
            },
            delBox(indexs) {
                var liArr = this.ruleForm.addBox;
                var indexArr;
                    for (var i = 0; i < liArr.length; i++) {
                        if ((liArr[i].id).indexOf(indexs.id) > -1) {
                            indexArr = i;
                            liArr.splice(indexArr, 1);
                        }
                    }
                var li = this.ruleForm.pushAdd;
                var index;
                    for (var i = 0; i < li.length; i++) {
                        if ((li[i].commodityId).indexOf(indexs.id) > -1) {
                            index = i;
                            li.splice(index, 1);
                        }
                    }
                    this.ruleForm.pushAdd = li
            },
            changeTable(value) {
                this.ruleForm.newBox = [];
                for (let i = 0; i < this.ruleForm.tableBox.length; i++) {
                    if (this.ruleForm.tableBox[i].id == value) {
                        this.ruleForm.newBox.push(this.ruleForm.tableBox[i])
                    }
                }
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
                    this.getAdd();
                    for (let i = 0; i < this.ruleForm.myData.length; i++) {
                        if (this.ruleForm.myData[i].mobile == this.ruleForm.phone) {
                            this.ruleForm.addBoxArr = this.ruleForm.myData[i].mobile
                        }
                    }
                }
                let url = '/api/customer/account/fluzzQuery';
                this.$http({
                        url: url,
                        method: 'post',
                        //headers: { 'Content-Type': ' application/x-www-form-urlencoded' },
                        data: {
                            "mobile": this.ruleForm.phone
                        }
                    })
                    .then(respone => {
                        //that.addArrBox = [];
                        console.log(respone)
                        if (respone.data.info.length == 0) {
                            this.ruleForm.isShoAdd = false;
                            this.vipShow = true;
                        } else {
                            //this.ruleForm.isShoAdd = true;
                            this.vipShow = false;
                        }
                        this.ruleForm.myData = respone.data.info
                    })
                    .catch(error => {
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
            getAdds(event) {
                //this.vipaddShow = true;
                if (event.keyCode == 38 || event.keyCode == 40) return;
                if (event.keyCode == 13) {
                    this.vipaddShow = false;
                    console.log(this.ruleForm.detailAddress);
                }
            },
            selectDown: function() {
                this.ruleForm.now++;
                console.log(this.ruleForm.now)
                if (this.ruleForm.now == this.ruleForm.myData.length) this.ruleForm.now = -1;
                if (this.ruleForm.myData[this.ruleForm.now] == undefined) {
                    return false
                };
                this.ruleForm.phone = this.ruleForm.myData[this.ruleForm.now].mobile;
                this.ruleForm.name = this.ruleForm.myData[this.ruleForm.now].name
                this.ruleForm.level = this.ruleForm.myData[this.ruleForm.now].level
            },
            selectUp: function() {
                this.ruleForm.now--;
                console.log(this.ruleForm.now)
                if (this.ruleForm.now == -2) this.ruleForm.now = this.ruleForm.myData.length - 1;
                if (this.ruleForm.myData[this.ruleForm.now] == undefined) {
                    return false
                };
                this.ruleForm.phone = this.ruleForm.myData[this.ruleForm.now].mobile;
                this.ruleForm.name = this.ruleForm.myData[this.ruleForm.now].name
                this.ruleForm.level = this.ruleForm.myData[this.ruleForm.now].level
            },
            addDown: function() {
                this.ruleForm.Addnow++;
                console.log(this.ruleForm.Addnow)
                if (this.ruleForm.Addnow == this.addNewBox.length) this.ruleForm.Addnow = -1;
                if (this.addNewBox[this.ruleForm.Addnow] == undefined) {
                    return false
                };
                this.ruleForm.detailAddress = this.addNewBox[this.ruleForm.Addnow].alladd;
            },
            addUp: function() {
                this.ruleForm.Addnow--;
                console.log(this.ruleForm.Addnow)
                if (this.ruleForm.Addnow == -2) this.ruleForm.Addnow = this.addNewBox.length - 1;
                if (this.addNewBox[this.ruleForm.Addnow] == undefined) {
                    return false
                };
                this.ruleForm.detailAddress = this.addNewBox[this.ruleForm.Addnow].alladd;
            },
            getclassificationBox() {
                let url = 'api/product/commodity/category/query';
                this.$http({
                        url: url,
                        method: 'post',
                        // headers: {
                        //     'Content-Type': ' application/x-www-form-urlencoded'
                        // },
                        data: {}
                    })
                    .then(respone => {
                        //console.log(respone)
                        this.ruleForm.classificationBox = respone.data.info.list;
                    })
                    .catch(error => {
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
            changes() {
                this.getShopBox();
            },
            getShopBox() {
                let url = 'api/product/commodity/info/query';
                this.$http({
                        url: url,
                        method: 'post',
                        // headers: {
                        //     'Content-Type': ' application/x-www-form-urlencoded'
                        // },
                        data: {
                            categoryId: this.ruleForm.classification
                        }
                    })
                    .then(respone => {
                        this.ruleForm.shopBox = respone.data.info.list;
                        this.ruleForm.tableBox = respone.data.info.list;
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
                this.dialogVisible = false;
            },
            clearForm() {　　
                this.$refs['ruleForm'].resetFields();
            },
            crearVip() {
                let url = '/api/customer/account/insert';
                this.$http({
                        url: url,
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: {
                            mobile: this.ruleForm.phone,
                            name: this.ruleForm.name,
                            detailAddress: this.ruleForm.detailAddress
                        }
                    })
                    .then(respone => {
                        this.ruleForm.sourceArr = respone.data.info;
                        //console.log(this.ruleForm.this.ruleForm.sourceArr)
                    })
                    .catch(error => {
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
            resetForm() {
                this.$refs['ruleForm'].resetFields();
            },
            getScour() {
                let url = '/api/customer/recommendedSource/findSource';
                this.$http({
                        url: url,
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: {}
                    })
                    .then(respone => {
                        this.ruleForm.sourceArr = respone.data.info;
                        //console.log(this.ruleForm.this.ruleForm.sourceArr)
                    })
                    .catch(error => {
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            }
        },
        created: function() {
            this.$root.$on('showWindow', (data) => {
                let dataId = data[0].id
                console.log(dataId)
                if (data != 'no') {
                    this.ruleForm.textInfo = '编辑订单';

                    let shopUrl = '/api/product/order/queryOrderDetails'
                    this.$http({
                            url: shopUrl,
                            method: 'post',
                            headers: {
                                'Content-Type': ' application/x-www-form-urlencoded'
                            },
                            data: qs.stringify({
                                orderId: dataId
                            })
                        })
                        .then(respone => {
                            console.log(respone)
                            let datas = respone.data.info;
                            let dataArr = [];
                            for(let i = 0 ;i<datas.length;i++){
                                console.log(datas[i].orderId)
                                console.log(dataId)
                                console.log(dataId==datas[i].orderId)
                                if(datas[i].orderId == dataId ){
                                    dataArr.push(datas[i])
                                    console.log(dataArr)
                                }
                            }
                            

                        })
                        .catch(error => {
                            console.log(error);
                            alert('网络错误，不能访问');
                        })


                    let url = '/api/product/order/queryPageList';
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
                        .then(respone => {
                            
                        this.clearForm();
                        let data = respone.data.info.list[0]
                        console.log(data)
                        
                        this.ruleForm.orderId = data.id;
                        this.ruleForm.orderMoney = data.orderMoney;
                        this.ruleForm.phone = data.phone;
                        this.ruleForm.number = data.number;
                        this.ruleForm.sourceDetail = data.sourceDetail;
                        this.ruleForm.name = data.name;
                        this.ruleForm.orderState = data.orderState;
                        this.ruleForm.unpaidMoney = data.unpaidMoney;
                        this.ruleForm.detailAddress = data.detailAddress;
                        this.ruleForm.orderType = data.orderType;
                        this.ruleForm.refundMoney = data.refundMoney;
                        this.ruleForm.remark = data.remark;
                        this.ruleForm.paidMoney = data.paidMoney;
                        this.ruleForm.sourceAccount = data.sourceAccount;
                        this.ruleForm.sourceId = data.sourceId;
                        this.ruleForm.createTime = data.createTime;
                        this.ruleForm.newBox = data.orderDetailId
                        })
                        .catch(error => {
                            console.log(error);
                            alert('网络错误，不能访问');
                        })
                    this.dialogVisible = true;
                } else {
                    this.ruleForm.textInfo = '新增订单';
                    this.dialogVisible = true;
                }
            });
            this.getclassificationBox();
            //this.getShopBox();
            this.getScour();
        }
    }
</script>

