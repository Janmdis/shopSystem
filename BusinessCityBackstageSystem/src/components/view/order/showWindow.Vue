<template>
    <el-dialog class='headerBottom' :title="ruleForm.textInfo" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row style="height: 230px;">
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
                        <el-input type="text" v-model="ruleForm.phone" :disabled='disabShow' @keyup.native="gets($event)" @keydown.native.down.prevent="selectDown" @keydown.native.up.prevent="selectUp"></el-input>
                    </el-form-item>
                    <el-form-item prop='isShoAdd' class='isShoAdd'>
                        <ul class='addName' v-show='ruleForm.isShoAdd' style='position:absolute;top:-22px;'>
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
                        <el-input v-model="ruleForm.name" :disabled='disabShow'></el-input>
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
                        <el-input v-model="ruleForm.sourceAccount" :disabled='disabShow'></el-input>
                    </el-form-item>
                    <el-form-item label="会员等级">
                        <el-input v-model="ruleForm.level" :disabled='viplevelIS'></el-input>
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
                </el-col>
            </el-row>
            <el-row>
                <el-form-item class='boxs' v-show='addShow'>
                    <el-col :span='24' style='margint-top:15px;'>
                        <el-col :span='4' :offset='1' style='position:relative;margin-bottom:10px;'>
                            <span>
                                                                    <el-select v-model="houseForm.estate"  placeholder="请选择">
                                                                        <el-option v-for="(item,index) in estateArr" :key="index" :label="item.name" :value="item.id"></el-option>
                                                                    </el-select>
                                                                    <strong class="street citys">小区</strong>
                                                                </span>
                        </el-col>
                        <el-col :span='4' :offset='1' style='position:relative;margin-bottom:10px;'>
                            <span>
                                                                    <el-select v-model="houseForm.bigDistrict" @change="bigDis" placeholder="请选择">
                                                                        <el-option v-for="(item,index) in houseInfo" :key="index" :label="item.regionName" :value="index+1"></el-option> 
                                                                    </el-select>
                                                                    <strong class='citys'>大区</strong>
                                                                </span>
                        </el-col>
                        <el-col :span='4' :offset='1' style='position:relative;margin-bottom:10px;'>
                            <span>
                                                                    <el-select v-model="houseForm.provinceValue" @change="proDis" placeholder="请选择">
                                                                        <el-option v-for="(item,index) in proDisId" :key="index" :label="item" :value="index"></el-option>
                                                                    </el-select><strong  class='citys'>省</strong>
                                                                </span>
                        </el-col>
                        <el-col :span='4' :offset='1' style='position:relative;margin-bottom:10px;'>
                            <span>
                                                                    <el-select v-model="houseForm.cityValue" @change="cityDis" placeholder="请选择">
                                                                         <el-option v-for="(item,index) in cityDisId" :key="index" :label="item" :value="index"></el-option>
                                                                    </el-select><strong  class='citys'>市</strong>
                                                                </span>
                        </el-col>
                        <el-col :span='4' :offset='1' style='position:relative;margin-bottom:10px;'>
                            <span>
                                                                    <el-select v-model="houseForm.countyDistrict" @change="countyDis" placeholder="请选择">
                                                                        <el-option v-for="(item,index) in countyInfo" :key="index" :label="item.regionName" :value="item.id"></el-option>
                                                                    </el-select>
                                                                    <strong  class='citys'>县区</strong>
                                                                </span>
                        </el-col>
                        <el-col :span='4' :offset='1' style='position:relative;margin-bottom:10px;'>
                            <span>
                                                                    <el-select v-model="houseForm.streetValue" @change="streetDis" placeholder="请选择">
                                                                        <el-option v-for="(item,index) in streetInfo" :key="index" :label="item.regionName" :value="item.id"></el-option>
                                                                    </el-select>
                                                                    <strong class="street citys">街道</strong>
                                                                </span>
                        </el-col>
                        <el-col :span='4' :offset='1' style='position:relative;margin-bottom:10px;'>
                            <input type="text" v-model="houseForm.streetMore" placeholder="请输入详细地址" style='padding:0;' class="detailAddress">
                        </el-col>
                    </el-col>
                </el-form-item>
                <el-row style='height:100px;marging-top:-10px;' v-show='addyeAdd'>
                    <el-col :span='18'>
                        <el-form-item label="地址" prop='detailAddresst' style='margin-top:15px;position: absolute;left:0;width:50%;'>
                            <el-input v-model="ruleForm.detailAddresst" style='width:80%;' :disabled='disabShow' @keyup.native="getAdds($event)" @keydown.native.down.prevent="addDown" @keydown.native.up.prevent="addUp"></el-input>
                            <el-form-item prop='isShoAdd' class='isShoAdd'>
                                <ul class='addName' v-show='vipaddShow'>
                                    <li class="text-center" v-for="(item,index) in addNewBox" :key="index" :label='item.alladd' @click='checkAdd(item.alladd)' :value='item.alladd'>{{item.alladd}}</li>
                                </ul>
                            </el-form-item>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-row>
            <el-row v-show='vipShow'>
                <el-form-item>
                    <el-button @click.native='crearVip'>创建会员</el-button>
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
                <el-col :span='5' :offset='1'>
                    请输入数量：
                    <el-input style='width:60px;' type='number' v-model='shopNum'></el-input>
                </el-col>
                <el-col :span='2' :offset='1'>
                    <el-button @click='addTable' :disabled='disabShow' >添加</el-button>
                </el-col>
                <el-col :span='22' :offset='1'>
                    <el-table id='overclear' style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column label="商品名称" width="200">
                        </el-table-column>
                        <!--<el-table-column label="规格">
                                                                    </el-table-column>!-->
                        <el-table-column label="数量">
                        </el-table-column>
                        <!--<el-table-column label="产品库存" show-overflow-tooltip>
                                                                    </el-table-column>!-->
                        <el-table-column label='购买数量' show-overflow-tooltip>
                        </el-table-column>
                        <!--<el-table-column label="单价" show-overflow-tooltip>
                                                                    </el-table-column>!-->
                        <!--<el-table-column label="实际单价" show-overflow-tooltip>
                                                                    </el-table-column>!-->
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <span @click='delBox(scope.row)' >删除</span>
                            </template>
                    </el-table-column>
                </el-table>
                </el-col>
                <el-col :span='22' id="overBox" :offset='1' v-for='(item,index) in ruleForm.addBox' :key="index" style="position: relative;z-index: 999;">
                    <el-table  ref="multipleTable" :data="item" tooltip-effect="dark"   style="width: 100%;background:red;" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" >
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column  prop='name' width="200">
                        </el-table-column>
                        <!--<el-table-column prop="specificationValue" >
                        </el-table-column>!-->
                        <el-table-column prop="displayQuantity" >
                        </el-table-column>
                        <!--<el-table-column prop="inventoryQuantity"  >
                        </el-table-column>!-->
                        <el-table-column  >
<template slot-scope="scope">
    <div v-show="scope.row.trues=='yes'?false:true">
        <!--<span style="width:20px;height:20px;line-height:20px;display:inline-block;border:1px solid #ddd; cursor:pointer;" @click='subFn(index)'>-</span>!-->
        <span style="width:30px;height:20px;display:inline-block;text-align:center;">{{scope.row.num}}</span>
        <!--<span style="width:20px;height:20px;line-height:20px;display:inline-block;border:1px solid #ddd;cursor:pointer;" @click='addFn(index)'>+</span>!-->
    </div>
</template>
                        </el-table-column>
                        <!--<el-table-column prop="discount_price"  >
                        </el-table-column>
                        <el-table-column prop="current_price"  >
                        </el-table-column>!-->
                        <el-table-column  >
                        <template slot-scope="scope">
                            <span @click='delBox(scope.row,index)' v-show="scope.row.trues=='yes'?false:true">删除</span>
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
    .detailAddress {
        width: 100%;
        display: inline-block;
        border-bottom: 1px solid #eee;
        outline: none;
        padding-left: 20px;
        height: 39px;
    }
    .headerBottom .boxs .el-form-item__content {
        margin-left: 50px !important;
        margin-top: 10px !important;
        line-height: 0;
    }
    .headerBottom .citys {
        position: absolute;
        top: 20px;
        left: -35px;
    }
    .el-table .warning-row {
        background: #f0f9eb;
    }
    .el-table .success-row {
        background: #f0f9eb;
    }
    .headerBottom .el-table__empty-block {
        display: none;
    }
    .boxsss .el-form-item__content {
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
    #overBox .el-table th {
        display: none;
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
    .isShoAdd .addName {
        height: 100px;
        overflow-y: scroll;
        width: 100%;
        margin-top: 0px;
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
                disabShow: false,
                addShow: true,
                addyeAdd: false,
                companyIds: '',
                dialogVisible: false,
                vipShow: false,
                viplevelIS: true,
                vipaddShow: false,
                vipaddShowArr: [],
                addNewBox: [],
                newnums: [],
                shopNum: 1,
                i: 0,
                houseForm: {
                    estate: '',
                    smallDistrict: '',
                    houseType: null,
                    houseState: null,
                    bigDistrict: null,
                    provinceValue: null,
                    cityValue: null,
                    countyDistrict: null,
                    streetValue: null,
                    streetMore: '',
                    balcony: null,
                    room: null,
                    hall: null,
                    toilet: null,
                    kitchen: null,
                    square: 0
                },
                estateArr: [],
                houseInfo: [],
                proInfoList: [],
                proInfo: [],
                cityInfoList: [],
                cityInfo: [],
                countyInfo: [],
                streetInfo: [],
                bigDisId: {},
                proDisId: {},
                cityDisId: {},
                ruleForm: {
                    createTime: '',
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
                    detailAddresst: '',
                    newdetailAddresst: '',
                    orderType: '',
                    refundMoney: '',
                    remark: '',
                    now: -1,
                    Addnow: -1,
                    orderId: '',
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
                    phone: [{
                        pattern: /^1[3|4|5|7|8][0-9]{9}$/g,
                        required: true,
                        message: '请输入正确的手机号'
                    }],
                    actualMoney: [{
                        required: true,
                        message: '填写支付金额',
                        trigger: 'blur'
                    }],
                    // number: [{
                    //     required: true,
                    //     message: '订单号',
                    //     trigger: 'blur'
                    // }],
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
            tableRowClassName({
                row,
                rowIndex
            }) {
                //console.log(row)
                if (row.bg === "#f5f7fa") {
                    return 'warning-row';
                }
                return '';
            },
            gteAddr(id,arr){
                if(arr.length!=0){
                console.log(arr)
                let obj = {};
                obj = arr.find((item)=>{
                    return item.id === id;
                });
                console.log(obj)
                return obj.regionName
                }
               
            },
            submitForm(formName) {                   
            console.log()
                for (var i = 0; i < this.ruleForm.addBox.length; i++) {
                    if (this.ruleForm.addBox[i] == "" || typeof(this.ruleForm.addBox[i]) == "undefined") {
                        this.ruleForm.addBox.splice(i, 1);
                        i = i - 1;
                    }
                }
                console.log(this.ruleForm.addBox)
                for (let i = 0; i < this.ruleForm.addBox.length; i++) {
                    if (this.ruleForm.addBox[i] != []) {
                        this.ruleForm.pushAdd.push({
                            'commodityName': this.ruleForm.addBox[i][0].name,
                            'commodityId': this.ruleForm.addBox[i][0].id,
                            'saleNumber': this.ruleForm.addBox[i][0].num - 0,
                        })
                    }
                }
                if (this.ruleForm.pushAdd.length==0) {
                    alert("订单详情不能为空");
                    return false;
                }
                let orderInfo = '';
                let textInfo = '';
                if (this.ruleForm.orderType == '新增服务订单') {
                    textInfo = 0
                } else if (this.ruleForm.orderType == '新增上门订单') {
                    textInfo = 1
                } else if (this.ruleForm.orderType == '追单') {
                    textInfo = 2
                } else {
                    textInfo = this.ruleForm.orderType
                }
                if (this.ruleForm.orderState == '未完成') {
                    orderInfo = 0
                } else if (this.ruleForm.orderState == '已完成') {
                    orderInfo = 1
                } else if (this.ruleForm.orderState == '异常订单') {
                    orderInfo = 2
                } else {
                    orderInfo = this.ruleForm.orderState
                }
                console.log(this.ruleForm.detailAddresst)
                console.log((this.bigDisId[this.houseForm.bigDistrict] + this.proDisId[this.houseForm.provinceValue] + this.cityDisId[this.houseForm.cityValue] +  this.gteAddr(this.houseForm.countyDistrict,this.countyInfo)   + this.gteAddr(this.houseForm.streetValue,this.streetInfo) +this.houseForm.streetMore))
                let that = this;
                let dataInfo = {
                    id: this.ruleForm.orderId,
                    orderMoney: this.ruleForm.orderMoney,
                    phone: this.ruleForm.phone,
                    number: this.ruleForm.number,
                    sourceDetail: this.ruleForm.sourceDetail,
                    name: this.ruleForm.name,
                    orderState: orderInfo,
                    unpaidMoney: this.ruleForm.unpaidMoney - 0,
                    detailAddress: this.ruleForm.detailAddresst == '' ? (this.bigDisId[this.houseForm.bigDistrict] + this.proDisId[this.houseForm.provinceValue] + this.cityDisId[this.houseForm.cityValue] +  this.gteAddr(this.houseForm.countyDistrict,this.countyInfo)   + this.gteAddr(this.houseForm.streetValue,this.streetInfo) +this.houseForm.streetMore) : this.ruleForm.detailAddresst,
                    orderType: textInfo,
                    refundMoney: this.ruleForm.refundMoney - 0,
                    remark: this.ruleForm.remark,
                    //payTime: this.ruleForm.payTime,
                    actualMoney: this.ruleForm.actualMoney - 0,
                    paidMoney: this.ruleForm.paidMoney - 0,
                    sourceAccount: this.ruleForm.sourceAccount,
                    sourceId: this.ruleForm.sourceId,
                    hasContract: false,
                    createTime: this.goTime(this.ruleForm.createTime),
                    orderDetails: this.ruleForm.pushAdd
                }
                console.log(dataInfo);
                if (this.ruleForm.textInfo == "新增订单") {
                    this.ruleForm.orderId = '',
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
                                        alert(response.data.msg)
                                        this.dialogVisible = false;
                                        this.$root.$emit('getDatezdy', 1);
                                        this.clearForm();
                                        this.ruleForm.newBox = [];
                                        this.ruleForm.addBox = [];
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        //         alert('网络错误，不能访问');
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
                                    this.ruleForm.addBox = [];
                                })
                                .catch(error => {
                                    console.log(error);
                                    //         alert('网络错误，不能访问');
                                })
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                }
            },
            searchInfo() {
                //  查询地址信息
                let that = this;
                this.$http.get('/api/public/region/findParent?parentId=0&levels=3')
                    .then(res => {
                        this.$root.$emit('load', false);
                        if (res.data.info == null) {
                            alert(res.data.error)
                        } else {
                            if(res.data.status!=401){
                                that.houseInfo = res.data.info;
                                (res.data.info).forEach(function(e, i) {
                                    that.proInfoList = that.houseInfo[e.id - 1].sysRegionList;
                                    that.bigDisId[e.id] = e.regionName;
                                    //console.log(that.bigDisId)
                                    that.proInfoList.forEach(function(e, i) {
                                        that.proInfo.push(e);
                                        that.cityInfoList = that.proInfoList[i].sysRegionList;
                                        that.cityInfoList.forEach(function(e, i) {
                                            that.cityInfo.push(e);
                                        });
                                    });
                                });
                            }
                            
                        }
                    }).catch(err => {
                        console.log(err)
                    });
                //  查询小区信息
                this.$http.get('/api/customer/estate/queryData')
                    .then(res => {
                        this.smallDisInfo = res.data.info;
                        //console.log(this.smallDisInfo);
                    }).catch(err => {
                        console.log(err)
                    });
            },
            getAdd() {
                if (this.ruleForm.phone == "" || this.ruleForm.phone == null) {
                    return
                }
                this.vipaddShow = true;
                //获取地址接口
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
                        console.log(data)
                        
                        if (data == '' || data == null) {
                            this.$nextTick(()=>{
                                this.vipaddShow = true;
                            this.addyeAdd = false;
                            this.addShow = true;
                            this.vipShow = true;
                            })
                            
                            return false;
                        } else {
                            this.vipaddShow = false;
                            this.addyeAdd = true;
                            this.addShow = false;
                            this.vipShow = false;
                            // this.vipaddShow = false;
                            // this.addShow = false;
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
                        this.addNewBox = [];
                    })
                    .catch(error => {
                        console.log(error);
                        //         alert('网络错误，不能访问');
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
                this.ruleForm.detailAddresst = value;
                this.vipaddShow = false;
            },
            addTable() {
                if (this.shopNum <= 0) {
                    alert('数量不能小于0')
                }
                if (this.ruleForm.newBox[0].isPackage == true) {
                    let url = '/api/product/commodity/package/queryCommodityInfoByPackageId';
                    this.$http({
                            url: url,
                            method: 'post',
                            headers: {
                                'Content-Type': ' application/x-www-form-urlencoded'
                            },
                            data: qs.stringify({
                                packageId: this.ruleForm.newBox[0].id
                            })
                        })
                        .then(respone => {
                            //添加套餐
                            let flag = true;
                            for (let k in this.ruleForm.addBox) {
                                for (let i = 0; i < this.ruleForm.addBox[k].length; i++) {
                                    console.log(this.ruleForm.addBox[k][0].id)
                                    console.log(this.ruleForm.newBox[0].id)
                                    if (this.ruleForm.addBox[k][0].id == this.ruleForm.newBox[0].id) {
                                        flag = false;
                                    }
                                }
                            }
                            if (flag) {
                                let newArr = [];
                                newArr.push(this.ruleForm.newBox[0]);
                                console.log(this.shopNum)
                                this.ruleForm.newBox[0].num = this.shopNum
                                //this.newnums.push(1)
                                // this.$set(this.newnums,index,1);
                                for (let i = 0; i < respone.data.info.length; i++) {
                                    newArr.push(respone.data.info[i]);
                                    respone.data.info[i].bg = '#f5f7fa';
                                    respone.data.info[i].trues = 'yes';
                                }
                                this.ruleForm.newBox[0].bg = '#f5f7fa';
                                this.$set(this.ruleForm.addBox, this.i++, newArr);
                                flag = false;
                                //console.log(this.ruleForm.addBox);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            //         alert('网络错误，不能访问');
                        })
                }
                if (this.ruleForm.newBox[0].isPackage == false) {
                    let flag = true;
                    for (let k in this.ruleForm.addBox) {
                        for (let i = 0; i < this.ruleForm.addBox[k].length; i++) {
                            console.log(this.ruleForm.addBox[k][0].id)
                            console.log(this.ruleForm.newBox[0].id)
                            if (this.ruleForm.addBox[k][0].id == this.ruleForm.newBox[0].id) {
                                this.ruleForm.newBox[0].specificationValue += this.ruleForm.newBox[0].specificationValue
                                flag = false;
                                console.log(flag)
                            }
                        }
                    }
                    //添加商品
                    if (flag) {
                        let shopArr = [];
                        shopArr.push(this.ruleForm.newBox[0]);
                        //this.ruleForm.newBox[0].num = 1
                        this.ruleForm.newBox[0].num = this.shopNum
                        //this.newnums.push(1)
                        this.$set(this.ruleForm.addBox, this.i++, shopArr);
                        flag = false;
                    }
                }
            },
            delBox(indexs, index) {
                console.log(this.ruleForm.addBox)
                console.log(index)
                var liArr = this.ruleForm.addBox;
                console.log(index)
                liArr.splice(index, 1);
                console.log(this.ruleForm.addBox.splice(index, 1))
            },
            addFn(index) {
                // this.$set(this.ruleForm.addBox[index][0],'num',2);
                // this.$set(this.newnums,index,this.newnums[index]++);
                this.newnums[index]++;
                //this.ruleForm.addBox[index][0].num=10;
            },
            subFn(index) {
                //this.$set(this.ruleForm.addBox[index][0],this.ruleForm.addBox[index][0].num,this.ruleForm.addBox[index][0].num--)
            },
            changeTable(value) {
                //把选中添加到选中按钮中。
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
                    for (let i = 0; i < this.ruleForm.myData.length; i++) {
                        if (this.ruleForm.myData[i].mobile == this.ruleForm.phone) {
                            this.ruleForm.addBoxArr = this.ruleForm.myData[i].mobile
                        }
                    }
                    this.getAdd();
                    
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
                        // console.log(respone)
                        //判断手机是否存在
                        if (respone.data.info.length == 0) {
                            this.ruleForm.isShoAdd = false;
                            this.vipShow = true;
                            this.addShow = true
                            this.addyeAdd = false
                        } else {
                            //this.ruleForm.isShoAdd = true;
                            this.vipShow = false;
                            this.addShow = false;
                            this.addyeAdd = true
                        }
                        this.ruleForm.myData = respone.data.info
                    })
                    .catch(error => {
                        console.log(error);
                        //         alert('网络错误，不能访问');
                    })
            },
            getAdds(event) {
                //this.vipaddShow = true;
                if (event.keyCode == 38 || event.keyCode == 40) return;
                if (event.keyCode == 13) {
                    this.vipaddShow = false;
                    //console.log(this.ruleForm.detailAddress);
                }
            },
            selectDown: function() {
                this.ruleForm.now++;
                //console.log(this.ruleForm.now)
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
                //console.log(this.ruleForm.now)
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
                //console.log(this.ruleForm.Addnow)
                if (this.ruleForm.Addnow == this.addNewBox.length) this.ruleForm.Addnow = -1;
                if (this.addNewBox[this.ruleForm.Addnow] == undefined) {
                    return false
                };
                this.ruleForm.detailAddresst = this.addNewBox[this.ruleForm.Addnow].alladd;
            },
            addUp: function() {
                this.ruleForm.Addnow--;
                //console.log(this.ruleForm.Addnow)
                if (this.ruleForm.Addnow == -2) this.ruleForm.Addnow = this.addNewBox.length - 1;
                if (this.addNewBox[this.ruleForm.Addnow] == undefined) {
                    return false
                };
                this.ruleForm.detailAddresst = this.addNewBox[this.ruleForm.Addnow].alladd;
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
                        //地址
                        console.log(respone)
                        this.ruleForm.classificationBox = respone.data.info.list;
                    })
                    .catch(error => {
                        console.log(error);
                        //         alert('网络错误，不能访问');
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
                        //         alert('网络错误，不能访问');
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
            getquck() {
                let url = 'api/customer/estate/queryData';
                this.$http({
                        url: url,
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: {}
                    })
                    .then(respone => {
                        console.log(respone.data.info)
                        this.estateArr = respone.data.info
                    })
                    .catch(error => {
                        console.log(error);
                        //         alert('网络错误，不能访问');
                    })
            },
            crearVip() {
                let url = 'api/customer/account/insertOne';
                this.$http({
                        url: url,
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: {
                            mobile: this.ruleForm.phone,
                            name: this.ruleForm.name,
                            //detailAddress: this.ruleForm.detailAddresst
                        }
                    })
                    .then(respone => {
                        if (respone.data.status == 200) {
                            let url = 'api/customer/housingInfo/addHousingInfo?customerId=' + [respone.data.info];
                            this.$http({
                                    url: url,
                                    method: 'post',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    data: [{
                                        areaId: this.houseForm.bigDistrict,
                                        provinceId: this.houseForm.provinceValue,
                                        cityId: this.houseForm.cityValue,
                                        districtId: this.houseForm.countyDistrict,
                                        regionId: this.houseForm.streetValue,
                                        estateId: this.houseForm.estate,
                                        address: this.houseForm.streetMore,
                                        categoryId: 0,
                                        acreage: 0,
                                        rentalStatusId: 0,
                                        //detailAddress: this.ruleForm.detailAddresst
                                    }]
                                })
                                .then(respone => {
                                    if (respone.data.status == 200) {
                                        alert('创建会员成功')
                                    }
                                    //this.ruleForm.sourceArr = respone.data.info;
                                    //console.log(this.ruleForm.this.ruleForm.sourceArr)
                                })
                                .catch(error => {
                                    console.log(error);
                                    //         alert('网络错误，不能访问');
                                })
                        } else {
                            alert(respone.data.msg)
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        //         alert('网络错误，不能访问');
                    })
            },
            resetForm() {
                this.$refs['ruleForm'].resetFields();
            },
            getScour() {
                let url = '/api/product/order/source/query';
                this.$http({
                        url: url,
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: {}
                    })
                    .then(respone => {
                        // console.log(respone)
                        this.ruleForm.sourceArr = respone.data.info;
                        //console.log(this.ruleForm.this.ruleForm.sourceArr)
                    })
                    .catch(error => {
                        console.log(error);
                        //         alert('网络错误，不能访问');
                    })
            },
            bigDis() {
                console.log(this.houseForm.room);
                let that = this;
                that.proDisId = {};
                that.houseForm.provinceValue = '',
                    that.houseForm.cityValue = '',
                    that.houseForm.countyDistrict = '',
                    that.houseForm.streetValue = '',
                    that.proInfo.forEach(function(e, i) {
                        if (e.parentCode == (that.houseForm.bigDistrict)) {
                            that.proDisId[e.id] = e.regionName;
                        }
                    });
                console.log(that.proDisId);
            },
            proDis() {
                let that = this;
                that.cityDisId = {};
                that.houseForm.cityValue = '',
                    that.houseForm.countyDistrict = '',
                    that.houseForm.streetValue = '',
                    that.cityInfo.forEach(function(e, i) {
                        if (e.parentCode == (that.houseForm.provinceValue)) {
                            that.cityDisId[e.id] = e.regionName;
                        }
                    });
                //console.log(that.houseForm.provinceValue);
                //console.log(that.cityDisId);
            },
            cityDis() {
                console.log(this.houseForm.cityValue);
                this.houseForm.countyDistrict = '',
                    this.houseForm.streetValue = '',
                    this.$http.get('/api/public/region/findParent?parentId=' + this.houseForm.cityValue)
                    .then(res => {
                        this.countyInfo = res.data.info;
                        //console.log(this.countyInfo);
                    }).catch(err => {
                        console.log(err)
                    });
            },
            countyDis() {
                console.log(this.houseForm.countyDistrict);
                this.houseForm.streetValue = '',
                    this.$http.get('/api/public/region/findParent?parentId=' + this.houseForm.countyDistrict)
                    .then(res => {
                        //console.log(res.data.info);
                        this.streetInfo = res.data.info;
                    }).catch(err => {
                        console.log(err)
                    });
            },
            streetDis() {
                console.log(this.houseForm.streetValue);
                let street = document.getElementsByClassName('detailAddress')[0];
                //console.log(street);
                street.focus();
            },
            changeValue(value) {
                let obj = {};
                obj = this.houseForm.countyDistrict.find((item) => {
                    return item.value === value;
                });
                console.log(obj.label);
            }
        },
        created: function() {
            this.searchInfo();
            this.$root.$on('showWindow', (data) => {
                let dataId = data[0].id
                console.log(dataId)
                if (data != 'no') {
                    this.disabShow = true;
                    this.addShow = false;
                    this.addyeAdd = true;
                    console.log(this.disabShow)
                    this.ruleForm.textInfo = '编辑订单';
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
                            //this.clearForm();
                            let data = respone.data.info.list[0];
                            console.log(data)
                            let orderInfo = '';
                            let textInfo = '';
                            if (data.orderType == 0) {
                                orderInfo = '新增服务订单'
                            } else if (data.orderType == 1) {
                                orderInfo = '新增上门订单'
                            } else if (data.orderType == 2) {
                                orderInfo = '追单'
                            }
                            if (data.orderState == 0) {
                                textInfo = '未完成'
                            } else if (data.orderState == 1) {
                                textInfo = '已完成'
                            } else if (data.orderState == 2) {
                                textInfo = '异常订单'
                            }
                            this.ruleForm.orderId = data.id;
                            this.ruleForm.orderMoney = data.orderMoney;
                            this.ruleForm.phone = data.phone;
                            this.ruleForm.number = data.number;
                            this.ruleForm.sourceDetail = data.sourceDetail;
                            this.ruleForm.name = data.name;
                            this.ruleForm.orderState = textInfo
                            this.ruleForm.unpaidMoney = data.unpaidMoney;
                            this.ruleForm.detailAddresst = data.detailAddress;
                            this.ruleForm.orderType = orderInfo;
                            this.ruleForm.refundMoney = data.refundMoney;
                            this.ruleForm.remark = data.remark;
                            this.ruleForm.paidMoney = data.paidMoney;
                            this.ruleForm.actualMoney = data.actualMoney;
                            this.ruleForm.sourceAccount = data.sourceAccount;
                            this.ruleForm.sourceId = data.sourceId;
                            this.ruleForm.createTime = data.createTime;
                            //this.ruleForm.newBox = data.orderDetailId
                        })
                        .catch(error => {
                            console.log(error);
                            //         alert('网络错误，不能访问');
                        })
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
                            console.log(respone.data.info)
                            let newArr = [];
                            let shopArr = [];
                            let newArrId = 0;
                            let shopArrId = 0;
                            for (let i = 0; i < respone.data.info.length; i++) {
                                if (respone.data.info[i].commodityInfo.commodityInfos != null) {
                                    if (respone.data.info[i].commodityInfo.commodityInfos.length > null) {
                                        
                                        newArr.push({
                                            'name': respone.data.info[i].commodityName,
                                            'id': respone.data.info[i].commodityId,
                                            'num': respone.data.info[i].saleNumber,
                                            'displayQuantity': respone.data.info[i].commodityInfo.displayQuantity,
                                            'bg': '#f5f7fa',
                                            'trues': 'yes'
                                        })
                                        for (let j = 0; j < respone.data.info[i].commodityInfo.commodityInfos.length; j++) {
                                            newArr.push({
                                                'name': respone.data.info[i].commodityInfo.commodityInfos[j].name,
                                                'id': respone.data.info[i].commodityInfo.commodityInfos[j].id,
                                                'num': respone.data.info[i].commodityInfo.commodityInfos[j].saleNumber,
                                                'displayQuantity': respone.data.info[i].commodityInfo.commodityInfos[j].displayQuantity, //数量
                                                'bg': '#f5f7fa',
                                                'trues': 'yes'
                                            })
                                        }
                                    }
                                } else {
                                    shopArr.push({
                                        'name': respone.data.info[i].commodityName,
                                        'id': respone.data.info[i].commodityId,
                                        'num': respone.data.info[i].saleNumber,
                                        'displayQuantity': respone.data.info[i].commodityInfo.displayQuantity,
                                        'trues': 'yes'
                                    })
                                }
                            }
                            this.ruleForm.pushAdd = [];
                            this.ruleForm.addBox = [];
                            this.ruleForm.addBox.push(shopArr);
                            this.ruleForm.addBox.push(newArr);
                        })
                        .catch(error => {
                            console.log(error);
                            //         alert('网络错误，不能访问');
                        })
                    this.dialogVisible = true;
                } else {
                    this.ruleForm.textInfo = '新增订单';
                    this.dialogVisible = true;
                    this.ruleForm.addBox = [];
                    this.disabShow = false;
                    this.addShow = true;
                    this.addyeAdd = false;
                    console.log(this.disabShow)
                }
            });
            this.getclassificationBox();
            //this.getShopBox();
            this.getquck();
            this.getScour();
        }
    }
</script>

