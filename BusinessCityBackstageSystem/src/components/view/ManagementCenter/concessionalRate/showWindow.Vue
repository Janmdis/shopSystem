<template>
    <el-dialog class='headerBottom' :title="ruleForm.textInfo" :visible.sync="dialogVisible" width="70%">
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
                    <el-form-item label="样式">
                        <el-select v-model="ruleForm.couponStyle" placeholder="请选择样式">
                            <el-option label="样式一" value="0"></el-option>
                            <el-option label="样式二" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span='6'>
                    <el-form-item label="优惠劵金额">
                        <el-input v-model="ruleForm.couponMoney"></el-input>
                    </el-form-item>
                    <el-form-item label="账户最多领">
                        <el-input v-model="ruleForm.receiveCapped" style='width: 80%;'></el-input>
                        个
                    </el-form-item>
                </el-col>
                <el-col :span='6'>
                    <el-form-item label="优惠劵状态">
                        <el-select v-model="ruleForm.couponStatus" placeholder="请选择样式">
                            <el-option label="过期" value="0"></el-option>
                            <el-option label="可使用" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="优惠劵名称">
                        <el-input v-model="ruleForm.couponName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="优惠劵说明">
                        <el-input v-model="ruleForm.explains"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='6'>
                    <el-form-item label="类型">
                        <el-select v-model="ruleForm.couponType" @change='onChange()' placeholder="请选择活类型">
                            <el-option label="满减" value="0"></el-option>
                            <el-option label="专享" value="1"></el-option>
                            <el-option label="无门槛" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span='6' class='smallBox' v-show='isChild'>
                    <el-form-item label="满">
                        <el-input v-model="ruleForm.fullAmount" style='width: 70%;'></el-input> 使用
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class='minheight' v-show='isShow'>
                <el-col :span='6'>
                    <el-form-item label="商品分类">
                        <el-select v-model="ruleForm.shopBox" placeholder="请选择商品分类" @change='change'>
                            <el-option v-for=' (item,index) in this.ruleForm.shopBoxArr ' :key="index" :label='item.name' :value="item.id"></el-option>
                            <!--<el-option label="香蕉你个巴拉" value="0"></el-option>
                                                                <el-option label="韭菜炒大虫" value="1"></el-option>!-->
                        </el-select>
                    </el-form-item>
                    <el-col :span='20' style='margin-left:40px;'>
                        <ul class='ulDel' style='border-radius: 5px;' v-show='this.ruleForm.showBoxArr != ""'>
                            <li @click="delBox(index)" v-for=' (item,index) in this.ruleForm.showBoxArr ' :key="index" :label='item.name' :value="item.id">{{item.name }}<span class='delBox'>删除</span></li>
                        </ul>
                    </el-col>
                </el-col>
                <el-col :span='1' class='hiehlIn'>
                    (多选)
                </el-col>
                <el-col :span='6'>
                    <el-form-item label="商品">
                        <el-select v-model="ruleForm.shops" placeholder="请选择商品" @change='changes'>
                            <el-option v-for=' (item,index) in this.ruleForm.shopsArr ' :value="item.id" :key="index" :label='item.name'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-col :span='20' style='margin-left:40px;'>
                        <ul class='ulDel' style='border-radius: 5px;' v-show='this.ruleForm.shopShowBoxArr != ""'>
                            <li @click="delBoxs(index)" v-for=' (item,index) in this.ruleForm.shopShowBoxArr ' :key="index" :label='item.name' :value="item.id">{{item.name }}<span class='delBox'>删除</span></li>
                        </ul>
                    </el-col>
                </el-col>
                <el-col :span='1' class='hiehlIn' v-show='isAdd'>
                    (多选)
                </el-col>
                <el-col :span='9' v-show='isAdd'>
                    <el-col :span='12'>
                        <el-form-item label="城市">
                            <el-select v-model="ruleForm.shopAdd" placeholder="请选择地区">
                                <el-option label="区域一" value="0"></el-option>
                                <el-option label="区域二" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label="区县">
                            <el-select v-model="ruleForm.shopAdd" placeholder="请选择地区">
                                <el-option label="区域一" value="0"></el-option>
                                <el-option label="区域二" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span='20' style='margin-left:40px;'>
                        <ul class='ulDel' style='border-radius: 5px;'>
                            <li>分类 <span>删除</span></li>
                            <li>分类 <span>删除</span></li>
                            <li>分类 <span>删除</span></li>
                            <li>分类 <span>删除</span></li>
                        </ul>
                    </el-col>
                </el-col>
                <el-col :span='1' class='hiehlIn'>
                    (多选)
                </el-col>
            </el-row>
            <el-row class='clearM' v-show='isNormal'>
                <el-form-item>
                    <el-col :span='2'>
                        <el-checkbox-group v-model="ruleForm.types">
                            <el-checkbox label="美食/餐厅线上活动" name="types"></el-checkbox>
                            <el-checkbox label="地推活动" name="types"></el-checkbox>
                            <el-checkbox label="线下主题活动" name="types"></el-checkbox>
                            <el-checkbox label="单纯品牌曝光" name="types"></el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-form-item>
                <el-button class='mTop' type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<style>
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
                ruleForm: {
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
                    shopsArr: [],
                    shopShowBoxArr: [], //分类集合
                    shopShowBoxArrId: [], //分类集合
                    shopBox: '',
                    shopBoxArr: [],
                    showBoxArr: [], //商品集合
                    showBoxArrId: [], //商品集合
                    shopAdd: '',
                    shopAdArr: [],
                    shopShowAdd: [], //集合
                    oneData: {},
                    twoData: {},
                    threeData: {}
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
                    endTime: [{
                        validator: checkAge,
                        trigger: 'change'
                    }],
                }
            };
        },
        methods: {
            submitForm(formName) {
                let that = this;
                if (this.ruleForm.textInfo == "新增会员") {
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
                                    data: this.ruleForm.oneData
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
                            let url = '/api/customer/account/update';
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
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //判断类型
            onChange() {
                if (this.ruleForm.couponType == 0) {
                    this.isShow = true;
                    this.isNormal = false;
                    this.isChild = true;
                    this.isAdd = false;
                    this.ruleForm.oneData = {
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
                        explains: this.ruleForm.explain, //优惠券说明
                        couponCommodityList: this.ruleForm.showBoxArrId, //商品分类
                        couponCommodityCategoryList: this.ruleForm.shopShowBoxArrId //商品分类
                    }
                } else if (this.ruleForm.couponType == 1) {
                    this.isShow = true;
                    this.isNormal = false;
                    this.isChild = false;
                    this.isAdd = true;
                } else if (this.ruleForm.couponType == 2) {
                    this.isShow = false;
                    this.isNormal = true;
                    this.isChild = false;
                }
            },
            //转换成时间戳
            goTime(tiem) {
                let strtime = tiem;
                // 可以这样做
                let date = new Date(strtime);
                console.log(date)
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
                        console.log(respone.data.info)
                        this.ruleForm.shopBoxArr = respone.data.info;
                    })
                    .catch(error => {
                        console.log(error);
                        alert('网络错误，不能访问');
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
                        console.log(respone.data.info)
                        this.ruleForm.shopsArr = respone.data.info;
                    })
                    .catch(error => {
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
            //选中商品分类
            change(value) {
                let obj = {};
                let newObj = {};
                obj = this.ruleForm.shopBoxArr.find((item) => {
                    if (item.id === value) {
                        if (value !== "" || value !== null) {
                            newObj = {
                                commodityCategoryId: item.id
                            }
                            this.ruleForm.shopShowBoxArrId.push(newObj)
                        }
                    }
                    return item.id === value;
                });
                this.ruleForm.showBoxArr.push(obj);
                //过滤重复项
                var hash = {};
                this.ruleForm.showBoxArr = this.ruleForm.showBoxArr.reduce(function(item, next) {
                    hash[next.name] ? '' : hash[next.name] = true && item.push(next);
                    return item
                }, [])
                //过滤id
                var hashId = {};
                this.ruleForm.shopShowBoxArrId = this.ruleForm.shopShowBoxArrId.reduce(function(item, next) {
                    hashId[next.commodityCategoryId] ? '' : hashId[next.commodityCategoryId] = true && item.push(next);
                    return item
                }, [])
                console.log(this.ruleForm.shopShowBoxArrId)
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
                            this.ruleForm.showBoxArrId.push(newObjs)
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
                this.ruleForm.showBoxArrId = this.ruleForm.showBoxArrId.reduce(function(item, next) {
                    hashId[next.commodityId] ? '' : hashId[next.commodityId] = true && item.push(next);
                    return item
                }, [])
                console.log(this.ruleForm.showBoxArrId)
            },
            //封装
            //删除已经存在的商品
            delBox(index) {
                let list = [];
                for (let i = 0; i < this.ruleForm.showBoxArr.length; i++) {
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
                console.log()
            },
            delBoxs(index) {
                let list = [];
                for (let i = 0; i < this.ruleForm.shopShowBoxArr.length; i++) {
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
            //查询区域
            addSearchFn() {
                let url = '/api/public/region/findParent' /*'+[data[0].id]*/ ;
                this.$http({
                        url: url,
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: {
                            "levels": 3
                        }
                    })
                    .then(respone => {
                        console.log(respone)
                    })
                    .catch(error => {
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            }
        },
        created: function() {
            this.$root.$on('showWindow', (data) => {
                if (data != 'no') {
                    this.ruleForm.textInfo = '编辑会员';
                    let url = '/api/customer/account/queryMapByIds' /*'+[data[0].id]*/ ;
                    this.$http({
                            url: url,
                            method: 'post',
                            //headers: { 'Content-Type': ' application/x-www-form-urlencoded' },
                            data: [data[0].id]
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
            this.getShop();
            this.getShops();
            this.addSearchFn();
        }
    }
</script>