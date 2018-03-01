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
                    <el-form-item label="金额">
                        <el-input v-model="ruleForm.fullAmount"></el-input>
                    </el-form-item>
                    <el-form-item label="账户最多领">
                        <el-input v-model="ruleForm.receiveCapped" style='width: 80%;'></el-input>
                        个
                    </el-form-item>
                </el-col>
                <el-col :span='6'>
                    <el-form-item label="状态">
                        <el-input v-model="ruleForm.couponStatus"></el-input>
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
                        <el-select v-model="ruleForm.shopBox" placeholder="请选择活动区域">
                            <el-option label="香蕉你个巴拉" value="0"></el-option>
                            <el-option label="韭菜炒大虫" value="1"></el-option>
                        </el-select>
                    </el-form-item>
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
                    <lable>(多选)</lable>
                </el-col>
                <el-col :span='6'>
                    <el-form-item label="活动区域">
                        <el-select v-model="ruleForm.shop" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-col :span='20' style='margin-left:40px;'>
                        <ul class='ulDel' style='border-radius: 5px;'>
                            <li>分类 <span>删除</span></li>
                            <li>分类 <span>删除</span></li>
                            <li>分类 <span>删除</span></li>
                            <li>分类 <span>删除</span></li>
                        </ul>
                    </el-col>
                </el-col>
                <el-col :span='1' class='hiehlIn' v-show='isAdd'>
                    <lable>(多选)</lable>
                </el-col>
                <el-col :span='6' v-show='isAdd'>
                    <el-form-item label="活动区域">
                        <el-select v-model="ruleForm.name" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
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
                    <lable>(多选)</lable>
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
        padding: 10px 20px;
        border: 1px solid #ddd;
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
                    return callback(new Error('年龄不能为空'))
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'))
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'))
                        } else {
                            callback()
                        }
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
                    starTime: '',
                    endTime: '',
                    couponStatus: '',
                    receiveCapped: "",
                    fullAmount: '',
                    couponStyle: '',
                    couponAmount: '',
                    types: [],
                    couponType: '满减',
                    fullAmount: '',
                    shop:[],
                    shopBox:[],
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
                        required: true,
                        message: '请选择结束日期',
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
                        if (valid) {
                            let url = '/api/customer/account/insert';
                            this.$http({
                                    url: url,
                                    method: 'POST',
                                    // 请求体重发送的数据
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    data: [{}]
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
            onChange() {
                if (this.ruleForm.couponType == 0) {
                    this.isShow = true;
                    this.isNormal = false;
                    this.isChild = true;
                    this.isAdd = false;
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
        }
    }
</script>