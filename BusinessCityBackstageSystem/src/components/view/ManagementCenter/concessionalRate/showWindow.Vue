<template>
    <el-dialog class='headerBottom' :title="ruleForm.textInfo" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span='6'>
                    <el-form-item label="开始时间" prop="starTime">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.starTime" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="数量" prop='couponAmount'>
                        <el-input v-model="ruleForm.couponAmount"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='6'>
                    <el-form-item label="结束时间" prop='endTime'>
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.endTime" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="样式" prop='couponStyle'>
                        <el-select v-model="ruleForm.couponStyle" placeholder="请选择样式">
                            <el-option label="样式一" value="0"></el-option>
                            <el-option label="样式二" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span='6'>
                    <el-form-item label="优惠劵金额" prop='couponMoney'>
                        <el-input v-model="ruleForm.couponMoney"></el-input>
                    </el-form-item>
                    <el-form-item label="账户最多领" prop='receiveCapped'>
                        <el-input v-model="ruleForm.receiveCapped" style='width: 80%;'></el-input>
                        个
                    </el-form-item>
                </el-col>
                <el-col :span='6'>
                    <el-form-item label="优惠劵状态" prop='couponStatus'>
                        <el-select v-model="ruleForm.couponStatus" placeholder="请选择样式">
                            <el-option label="过期" value="0"></el-option>
                            <el-option label="可使用" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="优惠劵名称" prop='couponName'>
                        <el-input v-model="ruleForm.couponName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="优惠劵说明" prop='explains'>
                        <el-input v-model="ruleForm.explains"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='6'>
                    <el-form-item label="类型" prop='couponType'>
                        <el-select v-model="ruleForm.couponType" @change='onChange()' placeholder="请选择活类型">
                            <el-option label="满减" value="0"></el-option>
                            <el-option label="专享" value="1"></el-option>
                            <el-option label="无门槛" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span='6' class='smallBox' v-show='isChild'>
                    <el-form-item label="满" prop='fullAmount'>
                        <el-input v-model="ruleForm.fullAmount" style='width: 70%;'></el-input> 使用
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class='minheight' v-show='isShow'>
                <el-col :span='6'>
                    <el-form-item label="商品分类" prop='shopBoxArr'>
                        <el-select v-model="ruleForm.shopBox" placeholder="请选择商品" @change='change'>
                            <el-option v-for=' (item,index) in this.ruleForm.shopBoxArr ' :key="index" :label='item.name' :value="item.id"></el-option>
                            <!--<el-option label="香蕉你个巴拉" value="0"></el-option>
                                                                                                                                    <el-option label="韭菜炒大虫" value="1"></el-option>!-->
                        </el-select>
                    </el-form-item>
                    <el-col :span='20' style='margin-left:40px;'>
                        <el-form-item prop='showBoxArr' class='clreaMarng'>
                            <ul class='ulDel' style='border-radius: 5px;' v-show='this.ruleForm.showBoxArr != ""'>
                                <li @click="delBox(index)" v-for=' (item,index) in this.ruleForm.showBoxArr ' v-if='item.name' :key="index" :label='item.name' :value="item.id">{{item.name }}<span class='delBox'>删除</span></li>
                            </ul>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span='1' class='hiehlIn'>
                    (多选)
                </el-col>
                <el-col :span='6'>
                    <el-form-item label="商品" prop='shopsArr'>
                        <el-select v-model="ruleForm.shops" placeholder="请选择商品分类" @change='changes'>
                            <el-option v-for=' (item,index) in this.ruleForm.shopsArr ' :value="item.id" :key="index" :label='item.name' v-if='item.name'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-col :span='20' style='margin-left:40px;'>
                        <el-form-item prop='shopShowBoxArr' class='clreaMarng'>
                            <ul class='ulDel' style='border-radius: 5px;' v-show='this.ruleForm.shopShowBoxArr != ""'>
                                <li @click="delBoxs(index)" v-for=' (item,index) in this.ruleForm.shopShowBoxArr ' :key="index" :label='item.name' :value="item.id">{{item.name }}<span class='delBox'>删除</span></li>
                            </ul>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span='1' class='hiehlIn' v-show='isAdd'>
                    (多选)
                </el-col>
                <el-col :span='9' v-show='isAdd'>
                    <el-col :span='12' style='height:62px;'>
                        <el-form-item label="城市" prop='city' class='isShoAdd'>
                            <input type="text" class="form-control inputName" placeholder="请输入想要搜索关键字" v-model="ruleForm.city" @keyup="gets($event)" @keydown.down.prevent="selectDown" @keydown.up.prevent="selectUp">
                            </input>
                        </el-form-item>
                        <el-form-item prop='isShoAdd' class='isShoAdd'>
                            <ul class='addName' v-show='ruleForm.isShoAdd'>
                                <li class="text-center" @click="cityAdd(item.regionName)" v-for="(item,index) in  ruleForm.myData" :key="index" :label='item.regionName' :value="item.id">{{item.regionName}}</li>
                            </ul>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12' style='height:62px;'>
                        <el-form-item label="区县" prop='shopAdd' class='isShoAdd'>
                            <el-select v-model="ruleForm.shopAdd" placeholder="请选择地区">
                                <el-option @click.native='getAdds(item.regionName,item.id)' v-for=' (item,index) in this.ruleForm.addBoxArr ' :value="item.id" :key="index" :label='item.regionName'></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span='20' style='margin-left:40px;'>
                        <el-form-item prop='addTextArr' class='isShoAdd'>
                            <ul class='ulDel' style='border-radius: 5px;' v-show='this.ruleForm.addTextArr != ""'>
                                <li class="text-center" @click='addDelBox(item)' v-for="(item,index) in  ruleForm.addTextArr" :key="index" :label='item' :value="item">{{item}}<span class='delBox'>删除</span></li>
                            </ul>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span='1' class='hiehlIn'>
                    (多选)
                </el-col>
            </el-row>
            <el-row class='clearM' v-show='isNormal'>
                <el-col :span='2'>
                    <el-form-item prop='overlay'>
                        <el-checkbox-group v-model="ruleForm.overlay">
                            <el-checkbox label="是否可叠加使用" name="overlay"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item prop='activity'>
                        <el-checkbox-group v-model="ruleForm.activity">
                            <el-checkbox label="是否参加活动使用" name="activity"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item prop='specials'>
                        <el-checkbox-group v-model="ruleForm.specials">
                            <el-checkbox label="特价商品是否可以使用" name="specials"></el-checkbox>
                        </el-checkbox-group>
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
</style>
<script>
    import qs from 'qs'
    export default {
        data() {
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('结束日期不能为空'))
                }
                setTimeout(() => {
                    if (value < this.ruleForm.starTime) {
                        callback(new Error('结束日期必须大于开始日期'))
                    } else {
                        callback()
                    }
                }, 1000)
            }
            return {
                dialogVisible: false,
                isShow: true,
                isNormal: false,
                isChild: true,
                isAdd: false,
                companyId: "",
                addArrBox: [],
                ruleForm: {
                    isShoAdd: false,
                    textInfo: '新增优惠劵',
                    couponName: '',
                    explains: '',
                    starTime: '', //开始时间
                    endTime: '', //结束时间
                    couponStatus: '', //优惠券状态
                    receiveCapped: "", //账户最多领取的个数
                    couponMoney: '', //优惠券金额
                    couponStyle: '', //样式
                    couponAmount: '', //数量
                    types: [],
                    couponType: '0', //优惠券类型
                    fullAmount: '', //满减的金额
                    shops: '',
                    ids: '',
                    shopShowBoxArr: [], //商品分类集合
                    shopShowBoxArrId: [], //商品分类集合
                    shopBox: '',
                    showBoxArr: [], //商品集合
                    showBoxArrId: [], //商品集合
                    shopAdd: '',
                    city: '',
                    cityId: '',
                    shopAdArr: [],
                    shopShowAdd: [], //集合
                    oneData: {},
                    twoData: {},
                    threeData: {},
                    myData: [],
                    now: -1,
                    addBoxArr: [],
                    addTextArr: [],
                    addTextArrData: [],
                    addTextArrObj: {},
                    addTextArrObjArr: [],
                    dataObj: '',
                    explain: '',
                    overlay: '',
                    activity: '',
                    specials: ''
                    // addShowBox: false,
                    // addBox: [] //地区集合
                },
                rules: {
                    couponAmount: [{
                        required: true,
                        message: '请输入数量',
                        trigger: 'blur'
                    }, ],
                    couponMoney: [{
                        required: true,
                        message: '请输入金额',
                        trigger: 'blur'
                    }, ],
                    couponName: [{
                        required: true,
                        message: '请输入名称',
                        trigger: 'blur'
                    }, ],
                    starTime: [{
                        required: true,
                        message: '请选择开日期',
                        trigger: 'change'
                    }],
                    couponType: [{
                        required: true,
                        message: '请选择类型',
                        trigger: 'change'
                    }],
                    endTime: [{
                        validator: checkAge,
                        message: '结束日期小于开始日期',
                        trigger: 'change'
                    }],
                }
            };
        },
        methods: {
            option(test, status) {
                this.$message({
                    message: test,
                    type: status ? status : 'warning'
                })
            },
            submitForm(formName) {
                let that = this;
                if (this.ruleForm.textInfo == "新增优惠劵") {
                    that.$refs[formName].validate((valid) => {
                        this.onChange();
                        if (valid) {
                            let url = '/api/product/coupon/info/insert';
                            this.$http({
                                    url: url,
                                    method: 'POST',
                                    // 请求体重发送的数据
                                    // headers: {
                                    //     'Content-Type': 'application/json'
                                    // },
                                    data: this.ruleForm.dataObj
                                })
                                .then(response => {
                                    if (response.data.status == 510) {
                                        this.option(response.data.msg);
                                        return false;
                                    }
                                    if (response.data.status == 200) {
                                        this.option(response.data.msg, 'success');
                                        this.handleClose();
                                        this.ruleForm.showBoxArrId = [];//商品
                                        this.ruleForm.shopShowBoxArrId = []; //商品分类
                                        this.ruleForm.addTextArrObjArr = []
                                        this.dialogVisible = false;
                                    }
                                   
                                   
                                    this.$root.$emit('getDatezdy', 1)
                                })
                                .catch(error => {
                                    console.log(error);
                                    // alert('网络错误，不能访问');
                                })
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                }
                if (this.ruleForm.textInfo == "编辑优惠劵") {
                    console.log(this.ruleForm.dataObj)
                    that.$refs[formName].validate((valid) => {
                        this.onChange();
                        if (valid) {
                            let url = '/api/product/coupon/info/update';
                            this.$http({
                                    url: url,
                                    method: 'POST',
                                    // 请求体重发送的数据
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    data: [this.ruleForm.dataObj]
                                })
                                .then(response => {
                                    this.dialogVisible = false;
                                    this.$root.$emit('getDatezdy', 1)
                                })
                                .catch(error => {
                                    console.log(error);
                                    // alert('网络错误，不能访问');
                                })
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                }
            },
            handleClose() {　　
                this.$refs['ruleForm'].resetFields();
                this.dialogVisible = false;
                this.onChange(0)
            },
            resetForm() {
                this.$refs['ruleForm'].resetFields();
            },
            addDelBox(item) {
                var newArr = [];
                for (let i = 0; i < this.ruleForm.addTextArr.length; i++) {
                    if (this.ruleForm.addTextArr[i] != item) {
                        if(this.ruleForm.addTextArr[i]!==null||this.ruleForm.addTextArr[i]!==undefined){
                            newArr.push(this.ruleForm.addTextArr[i])
                        }
                        
                    }
                }
                this.ruleForm.addTextArr = newArr
                console.log(this.ruleForm.addTextArr)
                var newArrText = [];
                for (let i = 0; i < this.ruleForm.addTextArrObjArr.length; i++) {
                    if (this.ruleForm.addTextArrObjArr[i] != item) {
                        if(this.ruleForm.addTextArr[i]!==null||this.ruleForm.addTextArr[i]!==undefined){
                             newArrText.push(this.ruleForm.addTextArr[i])
                        }
                       
                    }
                }
                this.ruleForm.addTextArrObjArr = newArrText
                console.log(this.ruleForm.addTextArrObjArr)
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
                        // alert('网络错误，不能访问');
                    })
            },
            getAdds(name, id) {
                let addNames = ''
                addNames = this.ruleForm.city + name;
                this.ruleForm.addTextArr.push(addNames);
                var newArr = Array.from(new Set(this.ruleForm.addTextArr));
                this.ruleForm.addTextArr = newArr
                this.ruleForm.addTextArrObj = {
                    cityName: this.ruleForm.city,
                    cityId: this.ruleForm.cityId,
                    regionName: name,
                    regionId: id
                }
                this.ruleForm.addTextArrObjArr.push(this.ruleForm.addTextArrObj);
                var hash = {};
                this.ruleForm.addTextArrObjArr = this.ruleForm.addTextArrObjArr.reduce(function(item, next) {
                    hash[next.regionId] ? '' : hash[next.regionId] = true && item.push(next);
                    return item
                }, [])
            },
            gets(event) {
                if (this.ruleForm.city != "") {
                    this.ruleForm.isShoAdd = true;
                } else {
                    this.ruleForm.isShoAdd = false;
                }
                if (this.ruleForm.city == "") return;
                if (event.keyCode == 38 || event.keyCode == 40) return;
                if (event.keyCode == 13) {
                    this.ruleForm.isShoAdd = false;
                    for (let i = 0; i < this.ruleForm.myData.length; i++) {
                        if (this.ruleForm.myData[i].regionName == this.ruleForm.city) {
                            this.ruleForm.addBoxArr = this.ruleForm.myData[i].sysRegionList
                        }
                    }
                    this.ruleForm.shopAdd = '';
                }
                let url = '/api/public/region/fulzz?name=' + this.ruleForm.city + '&grade=2';
                this.$http({
                        url: url,
                        method: 'get',
                        //headers: { 'Content-Type': ' application/x-www-form-urlencoded' },
                    })
                    .then(respone => {
                        //that.addArrBox = [];
                        console.log(respone)
                        this.ruleForm.myData = respone.data.info
                    })
                    .catch(error => {
                        console.log(error);
                        // alert('网络错误，不能访问');
                    })
            },
            selectDown: function() {
                this.ruleForm.now++;
                if (this.ruleForm.now == this.ruleForm.myData.length) this.ruleForm.now = -1;
                if (this.ruleForm.myData[this.ruleForm.now] == undefined) {
                    return false
                };
                this.ruleForm.city = this.ruleForm.myData[this.ruleForm.now].regionName;
                this.ruleForm.cityId = this.ruleForm.myData[this.ruleForm.now].id;
            },
            selectUp: function() {
                this.ruleForm.now--;
                if (this.ruleForm.now == -2) this.ruleForm.now = this.ruleForm.myData.length - 1;
                if (this.ruleForm.myData[this.ruleForm.now] == undefined) {
                    return false
                };
                this.ruleForm.city = this.ruleForm.myData[this.ruleForm.now].regionName;
                this.ruleForm.cityId = this.ruleForm.myData[this.ruleForm.now].id;
            },
            //判断类型
            onChange() {
                if (this.ruleForm.couponType == 0) {
                    this.isShow = true;
                    this.isNormal = false;
                    this.isChild = true;
                    this.isAdd = false;
                    this.ruleForm.oneData = {
                        // companyId:this.companyId,
                        id: this.ruleForm.ids,
                        starTime: this.goTime(this.ruleForm.starTime), //开始时间
                        endTime: this.goTime(this.ruleForm.endTime), //结束时间
                        couponAmount: this.ruleForm.couponAmount, //数量
                        couponType: this.ruleForm.couponType, //优惠券类型
                        couponStatus: this.ruleForm.couponStatus, //状态
                        receiveCapped: this.ruleForm.receiveCapped, //最多领取
                        couponMoney: this.ruleForm.couponMoney, //优惠券金额
                        couponStyle: this.ruleForm.couponStyle, //样式
                        fullAmount: this.ruleForm.fullAmount, //满减的金额
                        couponName: this.ruleForm.couponName, //优惠卷名称
                        explains: this.ruleForm.explains, //优惠券说明
                        couponCommodityList:this.ruleForm.shopShowBoxArrId, //商品分类
                        couponCommodityCategoryList:   this.ruleForm.showBoxArrId//商品
                    }
                    this.ruleForm.showBoxArr = [];
                    this.ruleForm.shopShowBoxArr = [];
                    this.ruleForm.shopShowBoxArrId = [];
                    this.ruleForm.showBoxArrId = [];
                    this.ruleForm.dataObj = this.ruleForm.oneData
                } else if (this.ruleForm.couponType == 1) {
                    if(this.ruleForm.addTextArrObjArr){
                        let newArr = [];
                        this.ruleForm.addTextArrObjArr.forEach((e,i)=>{
                            if(e){
                                newArr.push(e)
                            }
                        })
                         this.ruleForm.addTextArrObjArr = newArr
                    }
                    this.isShow = true;
                    this.isNormal = false;
                    this.isChild = false;
                    this.isAdd = true;
                    this.ruleForm.twoData = {
                        companyId: this.companyId,
                        id: this.ruleForm.ids,
                        starTime: this.goTime(this.ruleForm.starTime), //开始时间
                        endTime: this.goTime(this.ruleForm.endTime), //结束时间
                        couponAmount: this.ruleForm.couponAmount, //数量
                        couponType: this.ruleForm.couponType, //优惠券类型
                        couponStatus: this.ruleForm.couponStatus, //状态
                        receiveCapped: this.ruleForm.receiveCapped, //最多领取
                        couponMoney: this.ruleForm.couponMoney, //优惠券金额
                        couponStyle: this.ruleForm.couponStyle, //样式
                        fullAmount: '', //满减的金额
                        couponName: this.ruleForm.couponName, //优惠卷名称
                        explains: this.ruleForm.explains, //优惠券说明
                       couponCommodityList:this.ruleForm.shopShowBoxArrId, //商品分类
                        couponCommodityCategoryList: this.ruleForm.showBoxArrId,//商品
                        couponRegionList: this.ruleForm.addTextArrObjArr
                    }
                    this.ruleForm.showBoxArr = [];
                    this.ruleForm.shopShowBoxArr = [];
                    this.ruleForm.shopShowBoxArrId = [];
                    this.ruleForm.showBoxArrId = [];
                    this.ruleForm.dataObj = this.ruleForm.twoData
                } else if (this.ruleForm.couponType == 2) {
                    // companyId:this.companyId,
                    this.ruleForm.fullAmount = '';
                    this.ruleForm.showBoxArrId = ''; //商品分类
                    this.ruleForm.shopShowBoxArrId = ''; //商品分类
                    this.ruleForm.shopShowBoxArr = "";
                    this.ruleForm.showBoxArr = '';
                    this.isShow = false;
                    this.isNormal = true;
                    this.isChild = false;
                    this.ruleForm.threeData = {
                        id: this.ruleForm.ids,
                        starTime: this.goTime(this.ruleForm.starTime), //开始时间
                        endTime: this.goTime(this.ruleForm.endTime), //结束时间
                        couponAmount: this.ruleForm.couponAmount, //数量
                        couponType: this.ruleForm.couponType, //优惠券类型
                        couponStatus: this.ruleForm.couponStatus, //状态
                        receiveCapped: this.ruleForm.receiveCapped, //最多领取
                        couponMoney: this.ruleForm.couponMoney, //优惠券金额
                        couponStyle: this.ruleForm.couponStyle, //样式
                        couponName: this.ruleForm.couponName, //优惠卷名称
                        explains: this.ruleForm.explains, //优惠券说明
                        overlay: this.ruleForm.overlay,
                        activity: this.ruleForm.activity,
                        specials: this.ruleForm.specials
                    }
                    this.ruleForm.dataObj = this.ruleForm.threeData
                    console.log(this.ruleForm.dataObj)
                }
            },
            //转换成时间戳
            goTime(tiem) {
                let strtime = tiem;
                // 可以这样做
                let date = new Date(strtime);
                let time1 = date.getTime();
                return time1
            },
            //获取商品分离
            getShop() {
                let url = '/api/product/commodity/category/queryMap' /*'+[data[0].id]*/ ;
                this.$http({
                        url: url,
                        method: 'post',
                        //headers: { 'Content-Type': ' application/x-www-form-urlencoded' },
                        data: {}
                    })
                    .then(respone => {
                        this.ruleForm.shopBoxArr = respone.data.info;
                    })
                    .catch(error => {
                        console.log(error);
                        // alert('网络错误，不能访问');
                    })
            },
            //获取商品
            getShops() {
                let url = '/api/product/commodity/info/queryMap' /*'+[data[0].id]*/ ;
                this.$http({
                        url: url,
                        method: 'post',
                        //headers: { 'Content-Type': ' application/x-www-form-urlencoded' },
                        data: {}
                    })
                    .then(respone => {
                        this.ruleForm.shopsArr = respone.data.info;
                    })
                    .catch(error => {
                        console.log(error);
                        // alert('网络错误，不能访问');
                    })
            },
            addBoxArr(addName, id) {
                this.ruleForm.city = addName
            },
            //选中商品
            change(value) {
                // this.ruleForm.shopShowBoxArrId = [];
                let obj = {};
                let newObj = {};
                obj = this.ruleForm.shopBoxArr.find((item) => {
                    if (item.id === value) {
                        if (value !== "" || value !== null) {
                            newObj = {
                                commodityCategoryId: item.id
                            }
                            this.ruleForm.showBoxArrId.push(newObj)
                        }
                    }
                    return item.id === value;
                });
                this.ruleForm.showBoxArr.push(obj);
                console.log(this.ruleForm.showBoxArr)
                //过滤重复项
                var hash = {};
                this.ruleForm.showBoxArr = this.ruleForm.showBoxArr.reduce(function(item, next) {
                    hash[next.name] ? '' : hash[next.name] = true && item.push(next);
                    return item
                }, [])
                //过滤id
                var hashId = {};
                this.ruleForm.showBoxArrId = this.ruleForm.showBoxArrId.reduce(function(item, next) {
                    hashId[next.commodityCategoryId] ? '' : hashId[next.commodityCategoryId] = true && item.push(next);
                    return item
                }, [])
                this.ruleForm.shopBox = '';
            },
            changes(value) {
                let obj = {};
                let newObjs = {};
                obj = this.ruleForm.shopsArr.find((item) => {
                    if (item.id === value) {
                        if (value !== "" || value !== null) {
                            newObjs = {
                                commodityId: item.id
                            }
                            this.ruleForm.shopShowBoxArrId.push(newObjs)
                        }
                    }
                    return item.id === value;
                });
                this.ruleForm.shopShowBoxArr.push(obj);
                //过滤重复项
                var hash = {};
                this.ruleForm.shopShowBoxArr = this.ruleForm.shopShowBoxArr.reduce(function(item, next) {
                    hash[next.name] ? '' : hash[next.name] = true && item.push(next);
                    return item
                }, [])
                //id
                var hashId = {};
                this.ruleForm.shopShowBoxArrId = this.ruleForm.shopShowBoxArrId.reduce(function(item, next) {
                    hashId[next.commodityId] ? '' : hashId[next.commodityId] = true && item.push(next);
                    return item
                }, [])
                this.ruleForm.shops = '';
            },
            //封装
            //删除已经存在的商品
            delBox(index) {
                let list = [];
                for (let i = 0; i < this.ruleForm.showBoxArr.length; i++) {
                    if (index == i) {
                        let url = '/api/product/coupon/commodity/category/remove';
                        this.$http({
                            url: url,
                            method: 'post',
                            data: [{
                                couponId: this.ruleForm.ids,
                                commodityCategoryId: this.ruleForm.showBoxArr[i].id,
                                isActive: false
                            }]
                        }).then((msg) => {
                            console.log(msg)
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                    if (index != i) {
                        list.push(this.ruleForm.showBoxArr[i]);
                        this.$message({
                            type: 'success',
                            message: '删除成功！'
                        });
                    }
                }
                this.ruleForm.showBoxArr = list;
                let listId = [];
                for (let i = 0; i < this.ruleForm.showBoxArrId.length; i++) {
                    if (index != i) {
                        listId.push(this.ruleForm.showBoxArrId[i]);
                    }
                }
                this.ruleForm.showBoxArrId = listId;
            },
            delBoxs(index) {
                let list = [];
                for (let i = 0; i < this.ruleForm.shopShowBoxArr.length; i++) {
                    if (index == i) {
                        let url = '/api/product/coupon/commodity/remove';
                        this.$http({
                            url: url,
                            method: 'post',
                            data: [{
                                couponId: this.ruleForm.ids,
                                commodityId: this.ruleForm.shopShowBoxArr[i].id,
                                isActive: false
                            }]
                        }).then((msg) => {
                            console.log(msg)
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                    if (index != i) {
                        list.push(this.ruleForm.shopShowBoxArr[i]);
                        this.$message({
                            type: 'success',
                            message: '删除成功！'
                        });
                    }
                }
                this.ruleForm.shopShowBoxArr = list;
                let listId = [];
                for (let i = 0; i < this.ruleForm.shopShowBoxArrId.length; i++) {
                    if (index != i) {
                        listId.push(this.ruleForm.shopShowBoxArrId[i]);
                    }
                }
                this.ruleForm.shopShowBoxArrId = listId;
            },
        },
        created: function() {
            this.$root.$on('showWindow', (data) => {
                let dataId = data[0].id
                if (data != 'no') {
                    this.ruleForm.textInfo = '编辑优惠劵';
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
                        .then(respone => {
                            this.ruleForm.addTextArrObjArr = [];
                            this.ruleForm.addTextArr = [];
                            let data = respone.data.info.list[0];
                            this.ruleForm.ids = dataId
                            this.companyId = data.companyId;
                            this.ruleForm.starTime = data.starTime; //开始时间
                            this.ruleForm.endTime = data.endTime; //结束时间
                            this.ruleForm.couponAmount = data.couponAmount; //数量
                            this.ruleForm.couponType = data.couponType; //优惠券类型
                            this.ruleForm.receiveCapped = data.receiveCapped; //最多领取
                            this.ruleForm.couponMoney = data.couponMoney; //优惠券金额
                            this.ruleForm.couponStyle = data.couponStyle; //样式
                            this.ruleForm.couponName = data.couponName; //优惠卷名称
                            this.ruleForm.explains = data.explains; //优惠券说明
                            this.ruleForm.couponStatus = data.couponStatus; //状态
                            this.ruleForm.fullAmount = data.fullAmount; //状态
                            this.onChange(data.couponStatus)
                            this.ruleForm.showBoxArr = [];
                            this.ruleForm.shopShowBoxArr = [];
                            this.ruleForm.shopShowBoxArrId = [];
                            this.ruleForm.showBoxArrId = [];
                            this.ruleForm.shopShowBoxArr = data.commodityInfoList; //商品分类
                            for (let i = 0; i < data.commodityInfoList.length; i++) {
                                this.ruleForm.shopShowBoxArrId.push({
                                    commodityId: data.commodityInfoList[i].id
                                })
                            }
                            this.ruleForm.showBoxArr = data.commodityCategoryList; //商品
                            for (let i = 0; i < data.commodityCategoryList.length; i++) {
                                this.ruleForm.showBoxArrId.push({
                                    commodityCategoryId: data.commodityCategoryList[i].id
                                })
                            }
                            if (data.couponRegionList[0].cityName != null) {
                                for (let i = 0; i < data.couponRegionList.length; i++) {
                                    this.ruleForm.addTextArr.push(data.couponRegionList[i].cityName + data.couponRegionList[i].regionName);
                                    if (data.couponRegionList[0].cityId != null || data.couponRegionList[0].cityName != null) {
                                        this.ruleForm.addTextArrObjArr.push({
                                            cityId: data.couponRegionList[i].cityId,
                                            cityName: data.couponRegionList[i].cityName,
                                            regionId: data.couponRegionList[i].regionId,
                                            regionName: data.couponRegionList[i].regionName
                                        })
                                    }
                                }
                            }
                            this.ruleForm.overlay = data.overlay;
                            this.ruleForm.activity = data.activity;
                            this.ruleForm.specials = data.specials;
                        })
                        .catch(error => {
                            console.log(error);
                            // alert('网络错误，不能访问');
                        })
                    this.dialogVisible = true;
                } else {
                    this.ruleForm.textInfo = '新增优惠劵';
                    this.dialogVisible = true;
                }
            });
            this.getShop();
            this.getShops();
            //this.addSearchFn();
        },
        beforeDestroy() {
            this.$root.$off('showWindow');
        }
    }
</script>

