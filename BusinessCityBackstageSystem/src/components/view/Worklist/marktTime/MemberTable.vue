<template>
    <div class="ctemplate">
        <el-row>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <calendars></calendars>
                </div>
            </el-col>
            <el-col :span="14" :offset='1' class='paddingStyle'>
                <div class="floatBox" style="min-width:2400px;">
                    <div class="childBox" v-for='(items,indexs) in tempalteTimeBox' :key='indexs'>
                        <div class="grid-content bg-purple-light">
                            <el-form :inline="true" class="demo-form-inline">
                                <el-form-item>
                                    <el-select v-model="items.region" placeholder="请选择预约膜版" @change='getTempId(indexs,items.region)'>
                                        <el-option v-for='(item,index) in tempalteTime' @click.native='getTempIds(item.name)' :key='index' :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-col v-if='indexs == tempalteTimeBox.length-1' class='boxSize' @click.native="addTempalet()">
                                        <i class='icon iconfont icon-tianjia'></i>
                                    </el-col>
                                    <el-col v-else class='boxSize' @click.native="removeTempalet(indexs)">
                                        <i class='icon icon iconfont icon-icon--'></i>
                                    </el-col>
                                </el-form-item>
                            </el-form>
                        </div>
                        <el-row>
                            <el-col :span="16">
                                <div class="grid-content bg-purple">时间</div>
                            </el-col>
                            <el-col :span="8">
                                <div class="grid-content bg-purple-light">余</div>
                            </el-col>
                        </el-row>
                        <div class="lines"></div>
                        <el-row>
                            <el-col :span="16">
                                <div class="grid-content bg-purple">
                                    <el-checkbox-group v-model="items.checkList" v-for='(gooditem,index) in items.times' :key="index" @change="handleCheckedCitiesChange" style="width:200px;">
                                        <el-checkbox :label="gooditem" @change="changeBox(this)" :disabled="gooditem.yl==0">
                                            {{gooditem.startTime+"-"+gooditem.endTime}}
                                            <span style="position:relative;right:-100px;">{{gooditem.yl}}</span>
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <div style='height:30px;'>预约时间</div>
                <div class="grid-content bg-purple">
                    <div class='heightP' v-for='(item,index) in textBox'>
                        <el-row>
                            <el-col :span='18'>
                                <p>{{item.name}}<span class="datas">{{item.newDate.split("/")[0]+'年'+item.newDate.split("/")[1]+'月'+item.newDate.split("/")[2]+'日'}} | {{item.startTime.split(":")[0]+':'+item.startTime.split(":")[1]+'-'+item.endTime.split(":")[0]+':'+item.endTime.split(":")[1]}}</span></p>
                                <p>
                                    <el-input v-model="item.mark" placeholder="备注"></el-input>
                                </p>
                            </el-col>
                            <el-col :span='5'>
                                <p>&nbsp;&nbsp;余 : {{item.yl-1}}</p>
                                <el-button @click="delBox(index)">删除</el-button>
                            </el-col>
                            <el-col :span='18'>
                                <p>&nbsp;</p>
                                <el-button @click="addShop(textBox,index)">添加商品</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-light">
                    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                        <el-form-item label="联系人">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="手机">
                            <el-input v-model="ruleForm.phone" @keyup.native="gets($event)"></el-input>
                        </el-form-item>
                        <el-form-item prop='isShoAdd' class='isShoAdd'>
                            <ul class='addName' v-show='ruleForm.isShoAdd' style='position:absolute;top:-22px;'>
                                <li class="text-center" @click="cityAdds(item.mobile,item)" v-for="(item,index) in  ruleForm.myData" :key="index" :label='item.mobile' :value="item.id">{{item.mobile}}</li>
                            </ul>
                        </el-form-item>
                        <el-form-item label="小区">
                            <el-input v-model="form.querte" @focus='showShowAdd'></el-input>
                        </el-form-item>
                        <el-form-item prop='isShoAdd' class='isShoAdd'>
                            <ul class='addName' v-if='form.isShoAdd' style='position:absolute;top:-22px;'>
                                <li v-for="(item,index) in querteBox" :key="index" @click="cityAdd(item,index)">
                                    {{item.name}}
                                </li>
                            </ul>
                        </el-form-item>
                        <el-row v-show='vipShow'>
                            <el-form-item>
                                <el-button @click.native='crearVip'>创建会员</el-button>
                            </el-form-item>
                        </el-row>
                        <el-form-item label="地址">
                            <el-col :span='24'>
                                <!--<el-form-item label="地址" prop='address'>
                                    <el-input v-model="ruleForm.address"></el-input>
                                </el-form-item>!-->
                                <el-row>
                                    <el-col :span='24' style='position:relative;margin-bottom:10px;'>
                                        <el-form-item label="大区">
                                            <el-select v-model="houseForm.bigDistrict" @change="bigDis" placeholder="请选择">
                                                <el-option v-for="(item,index) in houseInfo" :key="index" :label="item.regionName" :value="index+1"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span='24' style='position:relative;margin-bottom:10px;'>
                                        <el-form-item label="省">
                                            <el-select v-model="houseForm.provinceValue" @change="proDis" placeholder="请选择">
                                                <el-option v-for="(item,index) in proDisId" :key="index" :label="item" :value="index"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span='24' style='position:relative;margin-bottom:10px;'>
                                        <el-form-item label="市">
                                            <el-select v-model="houseForm.cityValue" @change="cityDis" placeholder="请选择">
                                                <el-option v-for="(item,index) in cityDisId" :key="index" :label="item" :value="index"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span='24' style='position:relative;margin-bottom:10px;'>
                                        <el-form-item label="县区">
                                            <el-select v-model="houseForm.countyDistrict" @change="countyDis" placeholder="请选择">
                                                <el-option v-for="(item,index) in countyInfo" :key="index" :label="item.regionName" :value="item.id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-col :span='24' style='position:relative;margin-bottom:10px;'>
                                    <el-form-item label="街道">
                                        <el-select v-model="houseForm.streetValue" @change="streetDis" placeholder="请选择">
                                            <el-option v-for="(item,index) in streetInfo" :key="index" :label="item.regionName" :value="item.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='24' style='position:relative;margin-bottom:10px;'>
                                    <el-form-item label="详细地址">
                                        <el-input type="text" v-model="houseForm.address" placeholder="请输入详细地址" style='padding:0;' class="detailAddress"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <p>*完善客户基本信息</p>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">创建订单</el-button>
                        </el-form-item>
                        <el-dialog id="addEstate" :title="textInfo" style='text-align: left;' :visible.sync="dialogVisible" width="60%">
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
                                    <el-button @click='addTable' :disabled='disabShow'>添加</el-button>
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
                                    <span @click='delBoxs(scope.row)' >删除</span>
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
    <span @click='delBoxs(scope.row,index)' v-show="scope.row.trues=='yes'?false:true">删除</span>
</template>
                    </el-table-column>
                </el-table>
                </el-col>
            </el-row>
            <el-row style="text-align: center;margin-top: 20px;">
            <el-button @click='seaveInfo()'>保存</el-button>
            </el-row>
                        </el-dialog>
                    </el-form>
                </div>
            </el-col>
            <el-col :span='6'>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="订单类型" prop='orderType'>
                        <el-select v-model="ruleForm.orderType" placeholder="请选择样式">
                            <el-option label="新增服务订单" value="0"></el-option>
                            <el-option label="新增上门订单" value="1"></el-option>
                            <el-option label="追单" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订单状态" prop='orderState'>
                        <el-select v-model="ruleForm.orderState" placeholder="请选择样式">
                            <el-option label="未完成" value="0"></el-option>
                            <el-option label="已完成" value="1"></el-option>
                            <el-option label="异常订单" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="支付金额" prop='actualMoney'>
                        <el-input v-model="ruleForm.actualMoney" type='number'></el-input>
                    </el-form-item>
                    <el-form-item label="订单金额" prop='orderMoney'>
                        <el-input v-model="ruleForm.orderMoney" type='number'></el-input>
                    </el-form-item>
                  </el-form>  
                    </el-col>
        </el-row>
        
    </div>
</template>
<script>
    /* eslint-disable */
    //@row-click="showMemberInfo()"
    import calendars from './calendars.vue'
    export default {
        data() {
            return {
                tempatelAddShopp: '',
                tempatelAddShoppid: '',
                userVip: '',
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
                disabShow: false,
                addShow: true,
                addyeAdd: false,
                companyIds: '',
                dialogVisible: false,
                vipShow:false,
                viplevelIS: true,
                vipaddShow: false,
                vipaddShowArr: [],
                addNewBox: [],
                newnums: [],
                shopNum: 1,
                i: 0,
                dialogVisible: false,
                addShow: true,
                textInfo: '添加商品',
                value1: '',
                querteBox: [],
                form: {
                    name: '',
                    phone: '',
                    querte: '',
                    now: -1,
                    isShoAdd: false,
                },
                input: '',
                estateArr: [],
                houseInfo: [],
                proInfoList: [],
                proInfo: [],
                cityInfoList: [],
                cityInfo: [],
                countyInfo: [],
                streetInfo: [],
                houseInfo: [],
                proDisId: [],
                cityDisId: [],
                bigDisId: [],
                countyInfo: [],
                tempalteTime: [],
                textBox: [],
                templaetName: '',
                regionNames: '',
                newDate: '',
                tempalteTimeBox: [{
                    region: '',
                    times: [],
                    dataTime: this.getNowFormatDate().replace(/-/g, '/'),
                    checkList: []
                }],
                houseForm: {
                    addBox: '',
                    estate: '',
                    smallDistrict: '',
                    houseType: null,
                    houseState: null,
                    bigDistrict: null,
                    provinceValue: null,
                    cityValue: null,
                    countyDistrict: null,
                    streetValue: null,
                    address: '',
                    streetMore: '',
                    balcony: null,
                    room: null,
                    hall: null,
                    toilet: null,
                    kitchen: null,
                    square: 0,
                },
                rules: {
                    phone: [{
                        pattern: /^1[3|4|5|7|8][0-9]{9}$/g,
                        required: true,
                        message: '请输入正确的手机号'
                    }],
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
                    // number: [{手机号
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
                },
            }
        },
        created: function() {
            this.searchInfo()
            this.newDate = this.getNowFormatDate().replace(/-/g, '/');
            this.getTemplate();
            this.$root.$on("timeDate", (data) => {
                this.newDate = data;
            })
            this.getclassificationBox();
            // this.hideShowAdd();
        },
        watch: {
            'form.querte': {
                handler(val, oldVal) {
                    console.log(val, oldVal); //但是这两个值打印出来却都是一样的
                    let url = '/api/customer/estate/queryDataList?name=' + val;
                    this.$http({
                        url: url,
                        method: "get",
                        data: {},
                    }).then(respone => {
                        if (respone.data.info.list) {
                            this.querteBox = respone.data.info.list;
                            //    this.from.isShoAdd =true
                            console.log(this.querteBox)
                        }
                    }).catch(error => {
                        console.log(error)
                    })
                },
                deep: true
            }
        },
        methods: {
            crearVip() {
                let that = this;
                 if (!that.houseForm.bigDistrict) {
                    this.$message("请填写大区")
                    return false
                }
                if (!that.houseForm.provinceValue) {
                    this.$message("请填写省份")
                    return false
                }
                console.log(that.houseForm.cityId)
                if (!this.houseForm.cityValue) {
                    this.$message("请填写城市")
                    return false
                }
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
                        this.userVip = respone.data.info
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
                                    //创建会员id
                                    console.log(respone.data)
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
                            this.userVip = '';
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
                            this.$nextTick(() => {
                                this.vipaddShow = true;
                                this.addyeAdd = false;
                                this.addShow = true;
                                this.vipShow = true;
                                this.userVip = '';
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
            seaveInfo() { //保存商品
                this.tempatelAddShopp[this.tempatelAddShoppId].shopBox = this.ruleForm.addBox;
                this.dialogVisible = false;
                console.log(this.tempatelAddShopp[this.tempatelAddShoppId])
            },
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
            addShop(el, index) {
                this.tempatelAddShopp = el;
                this.tempatelAddShoppId = index;
                this.ruleForm.classification = ''
                this.ruleForm.shop = ''
                this.ruleForm.addBox = [];
                if (this.tempatelAddShopp[this.tempatelAddShoppId].shopBox) {
                    this.ruleForm.addBox = this.tempatelAddShopp[this.tempatelAddShoppId].shopBox
                }
                this.dialogVisible = true;
            },
            showShowAdd() {
                this.form.isShoAdd = true;
                let url = '/api/customer/estate/queryDataList?name=' + this.form.querte;
                this.$http({
                    url: url,
                    method: "get",
                    data: {},
                }).then(respone => {
                    if (respone.data.info.list) {
                        this.querteBox = respone.data.info.list;
                        console.log(this.querteBox)
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            // hideShowAdd(){
            //     this.form.isShoAdd=false;
            // },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            addTempalet() { //添加膜版
                this.tempalteTimeBox.push({
                    region: '',
                    times: [],
                    dataTime: this.newDate,
                    checkList: []
                })
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
            addTable() {
                if (this.shopNum <= 0) {
                    alert('数量不能小于0')
                    return false
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
                            console.log(this.ruleForm.addBox)
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
                                console.log(newArr)
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
                                console.log(this.ruleForm.addBox);
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
                            if (this.ruleForm.addBox[k][0].id == this.ruleForm.newBox[0].id) {
                                this.ruleForm.newBox[0].specificationValue += this.ruleForm.newBox[0].specificationValue
                                flag = false;
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
                        console.log(this.ruleForm.addBox)
                    }
                }
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
                        console.log(respone)
                        this.ruleForm.shopBox = respone.data.info.list;
                        this.ruleForm.tableBox = respone.data.info.list;
                    })
                    .catch(error => {
                        console.log(error);
                        //         alert('网络错误，不能访问');
                    })
            },
            cityAdd(index) {
                this.form.querte = index.name;
                // this.houseForm.bigDistrict = index.area.regionName
                // this.houseForm.provinceValue = index.province.regionName
                // this.houseForm.cityValue = index.city.regionName
                // this.houseForm.countyDistrict = index.district.regionName
                // this.houseForm.streetValue = index.region.regionName
                // this.houseForm.address = index.address
                this.houseForm.addBox = index
                this.form.isShoAdd = false;
            },
            selectDown: function() {
                this.form.now++;
                //console.log(this.ruleForm.now)
                if (this.form.now == this.querteBox.length) this.form.now = -1;
                if (this.querteBox[this.form.now] == undefined) {
                    return false
                };
                this.form.querte = this.querteBox[this.form.now].name
            },
            selectUp: function() {
                this.form.now--;
                if (this.form.now == this.querteBox.length) this.form.now = -1;
                if (this.querteBox[this.form.now] == undefined) {
                    return false
                };
                this.form.querte = this.querteBox[this.form.now].name
            },
            removeTempalet(index) { //删除膜版
                this.tempalteTimeBox.splice(index, 1)
            },
            delBox(i) {
                this.$confirm('确认删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.textBox.splice(i, 1)
                    this.$message('删除成功');
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            getTempIds(name) {
                this.templaetName = name
            },
            getTempId(index, id, name) { //膜版选中后的数据
                var url = '/api/product/period/query';
                this.$http({
                    url: url,
                    method: "post",
                    data: {
                        templateId: id,
                        date:this.newDate
                    },
                }).then(respone => {
                    if (respone.data.info.list) {
                        let data = respone.data.info.list;
                        data[0].forEach((items,indexs)=>{
                            data[1][indexs].yl = items
                        })
                        if ( data[1]) {
                             data[1].forEach((item, index) => {
                                item.newDate = this.newDate
                                item.name = this.templaetName
                                item.shopBox = '',
                                    item.mark = ''
                                item.isTrue = this.newDate + item.startTime + item.id
                            })
                        }
                        
                        
                        
                        this.tempalteTimeBox[index].times = data[1];
                        this.$set(this.tempalteTimeBox[index].times, data[1])
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            changeBox(val) {},
            handleCheckedCitiesChange(value) {
                if (value) {
                    value.forEach((item, index) => {
                        this.textBox.push(item)
                    })
                }
                let ArrObjReduce = (arr, name) => {
                    let hash = {}
                    arr = arr.reduce((container, item) => {
                        hash[item[name]] ? "" : hash[item[name]] = true && container.push(item);
                        return container
                    }, [])
                    return arr
                }
                this.textBox = ArrObjReduce(this.textBox, 'isTrue')
                console.log(this.textBox)
            },
            getTemplate() {
                console.log(this.newDate)
                let that = this;
                var url = '/api/product/commodity/periodTemplate/query';
                this.$http({
                    url: url,
                    method: "post",
                    data: {},
                }).then(respone => {
                    if (respone.data.info.list) {
                        let data = respone.data.info.list;
                        let arr = [];
                        data.forEach((e, i) => {
                            arr.push(e)
                        })
                        that.tempalteTime = arr
                    }
                    console.log(this.tempalteTime)
                }).catch(error => {
                    console.log(error)
                })
            },
            changeDate() {},
            getNowFormatDate() {
                var date = new Date();
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate() + 1;
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
                return currentdate;
            },
            delBoxs(indexs, index) {
                var liArr = this.ruleForm.addBox;
                liArr.splice(index, 1);
                // console.log(this.ruleForm.addBox.splice(index, 1))
            },
            searchInfo() {
                //  查询地址信息
                let that = this;
                this.$http.get('/api/public/region/findParent?parentId=0&levels=3')
                    .then(res => {
                        // console.log(res)
                        this.$root.$emit('load', false);
                        if (res.data.info == null) {} else {
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
            cityAdds(name, item) {
                this.userVip = item.id
                this.ruleForm.phone = name;
                this.ruleForm.isShoAdd = false;
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
            gteAddr(id, arr) {
                if (arr.length != 0) {
                    console.log(arr)
                    let obj = {};
                    obj = arr.find((item) => {
                        return item.id === id;
                    });
                    console.log(obj)
                    return obj.regionName
                }
            },
            onSubmit() { //创建订单
                let that = this;
                
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
                let arrBox = [];
                let newBox = [];
                function clear_arr_trim(array) {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i] == "" || typeof(array[i]) == "undefined") {
                            array.splice(i, 1);
                            i = i - 1;
                        }
                    }
                    return array;
                }
                that.textBox.forEach((item, index) => {
                    for (let i = 0; i < clear_arr_trim(item.shopBox).length; i++) {
                        newBox.push(clear_arr_trim(item.shopBox)[i])
                    }
                })
                console.log(newBox)
                for (let i = 0; i < newBox.length; i++) {
                    if (newBox[i]) {
                        arrBox.push({
                            'commodityName': newBox[i][0].name,
                            'commodityId': newBox[i][0].id,
                            'saleNumber': newBox[i][0].num - 0,
                        })
                    }
                }
                console.log(arrBox)
                let re = /^1[3|4|5|7|8][0-9]{9}$/g;
                if (!re.test(this.ruleForm.phone)) {
                    this.$message("手机号不正确");
                    return false;
                }
                if(!this.userVip){
                    this.$message("请选择联系人或创建会员");
                }
                if (arrBox.length <= 0) {
                    this.$message("请填写日期和商品");
                    return false
                }
                if(!this.ruleForm.orderType){this.$message("请填写订单类型");
                    return false}
                if(!this.ruleForm.orderState){this.$message("请填写订单状态");
                    return false}
                if(!this.ruleForm.actualMoney){this.$message("请填写支付金额");
                    return false}
                if(!this.ruleForm.orderMoney){this.$message("请填写订单金额");
                    return false}
                let dataInfo = {
                    id: this.ruleForm.orderId,
                    orderMoney: this.ruleForm.orderMoney,
                    phone: this.ruleForm.phone,
                    number: this.ruleForm.number,
                    sourceDetail: this.ruleForm.sourceDetail,
                    name: this.ruleForm.name,
                    orderState: orderInfo,
                    unpaidMoney: this.ruleForm.unpaidMoney - 0,
                    detailAddress: this.ruleForm.detailAddresst == '' ? (this.bigDisId[this.houseForm.bigDistrict] + this.proDisId[this.houseForm.provinceValue] + this.cityDisId[this.houseForm.cityValue] + this.gteAddr(this.houseForm.countyDistrict, this.countyInfo) + this.gteAddr(this.houseForm.streetValue, this.streetInfo) + this.houseForm.streetMore) : this.ruleForm.detailAddresst,
                    orderType: textInfo,
                    refundMoney: this.ruleForm.refundMoney - 0,
                    remark: this.ruleForm.remark,
                    //payTime: this.ruleForm.payTime,
                    actualMoney: this.ruleForm.actualMoney - 0,
                    paidMoney: this.ruleForm.paidMoney - 0,
                    sourceAccount: this.ruleForm.sourceAccount,
                    sourceId: this.ruleForm.sourceId,
                    hasContract: false,
                    orderDetails: arrBox
                }
                if (this.ruleForm.textInfo == "新增订单") {
                    this.ruleForm.orderId = '';
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
                            if (response.data.status == 200) {
                                this.$message(response.data.msg)
                                if (response.data.info) {
                                    let newDay = that.textBox
                                    let dayBox = []
                                    newDay.forEach((item, index) => {
                                        let newdate = item.newDate.replace(/\//g, "-");
                                        let newidBox=[];
                                        for(var i =0;i<item.shopBox.length;i++){
                                             newidBox.push(item.shopBox[i][0].id)
                                        }
                                        let dataInf = {
                                            startTime: newdate + " " + item.startTime,
                                            endTime: newdate + " " + item.endTime,
                                            orderDetailId: response.data.info.id,
                                            accountId: that.userVip, //会员id
                                            templateId: item.templateId, //膜版id
                                            companyId: response.data.info.companyId, //公司id
                                            commodityId:newidBox.toString().replace(/[|]/g,""),
                                            periodId:item.id
                                        }
                                        dayBox.push(dataInf)
                                    })
                                    let url = "/api/product/appointment/insert"
                                    this.$http({
                                        url: url,
                                        method: 'POST',
                                        // 请求体重发送的数据
                                        // headers: {
                                        //     'Content-Type': 'application/json'
                                        // },
                                        data: dayBox
                                    }).then((response) => {
                                        if (response.data.status == 200) {
                                                that.tempatelAddShopp = '',
                                                that.tempatelAddShoppid = '',
                                                that.userVip = '',
                                                that.disabShow = false,
                                                that.addShow = true,
                                                that.addyeAdd = false,
                                                that.companyIds = '',
                                                that.dialogVisible = false,
                                                that.vipShow = false,
                                                that.viplevelIS = true,
                                                that.vipaddShow = false,
                                                that.vipaddShowArr = [],
                                                that.addNewBox = [],
                                                that.newnums = [],
                                                that.shopNum = 1,
                                                that.i = 0,
                                                that.dialogVisible = false,
                                                that.addShow = true,
                                                that.value1 = '',
                                                that.querteBox = [],
                                                that.input = '',
                                                that.estateArr = [],
                                                that.houseInfo = [],
                                                that.proInfoList = [],
                                                that.proInfo = [],
                                                that.cityInfoList = [],
                                                that.cityInfo = [],
                                                that.countyInfo = [],
                                                that.streetInfo = [],
                                                that.houseInfo = [],
                                                that.proDisId = [],
                                                that.cityDisId = [],
                                                that.bigDisId = [],
                                                that.countyInfo = [],
                                                that.textBox = [],
                                                that.templaetName = '',
                                                that.regionNames = '',
                                                that.newDate = '',
                                                that.ruleForm = {
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
                                                }
                                            that.form = {
                                                    name: '',
                                                    phone: '',
                                                    querte: '',
                                                    now: -1,
                                                    isShoAdd: false,
                                                },
                                            that.tempalteTimeBox = [{
                                                    region: '',
                                                    times: [],
                                                    dataTime: this.getNowFormatDate().replace(/-/g, '/'),
                                                    checkList: []
                                                }],
                                            that.houseForm = {
                                                    addBox: '',
                                                    estate: '',
                                                    smallDistrict: '',
                                                    houseType: null,
                                                    houseState: null,
                                                    bigDistrict: null,
                                                    provinceValue: null,
                                                    cityValue: null,
                                                    countyDistrict: null,
                                                    streetValue: null,
                                                    address: '',
                                                    streetMore: '',
                                                    balcony: null,
                                                    room: null,
                                                    hall: null,
                                                    toilet: null,
                                                    kitchen: null,
                                                    square: 0,
                                                }
                                        }
                                    }).catch(error => {
                                        console.log(error)
                                    })
                                }
                                this.dialogVisible = false;
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            //         alert('网络错误，不能访问');
                        })
                }
                // sessionStorage.setItem('templateTime', JSON.stringify({"addren":this.houseForm,'timeplate':this.textBox,"userInfo":this.form}));
                // this.$root.$emit('infoText', "three")
                // this.$router.push("order")
            }
        },
        components: {
            calendars
        },
        beforeDestroy() {}
    }
</script>
<style>
    #overBox .el-table th {
        display: none;
    }
    .ctemplate .el-table__empty-block {
        display: none;
    }
</style>
<style scoped>
    .addName {
        position: absolute;
        top: -22px;
        width: 100%;
        text-align: center;
        border: 1px solid #ddd;
        background: #fff;
        z-index: 999;
    }
    .el-checkbox+.el-checkbox {
        margin-left: 0;
    }
    .boxSize {}
    .boxSize i {
        color: #3caefa;
        font-size: 30px;
        cursor: pointer;
    }
    .paddingStyle {
        padding: 10px;
        overflow-x: scroll;
    }
    .floatBox .childBox {
        float: left;
    }
    .lines {
        border-top: 1px solid #ddd;
        margin: 8px;
    }
    .bg-purple-light {
        text-align: right;
        padding-right: 10px;
    }
    .bg-purple {
        padding-left: 10px;
    }
    .heightP p {
        line-height: 30px;
    }
    .datas {
        float: right;
    }
</style>
