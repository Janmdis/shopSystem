<template>
    <el-dialog id="addEstate" :title="ruleForm.textInfo" :before-close="closeDialog" :visible.sync="dialogVisible" width="30%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="预约时间">
                <el-col :span="24">
                    <el-date-picker type="date" placeholder="预约时间" default-time='12:00:00' v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="预约时间段">
                <el-select v-model="ruleForm.date1s" placeholder="预约时间段">
                    <el-option label="上午" :value="1"></el-option>
                    <el-option label="下午" :value="2"></el-option>
                    <el-option label="全天" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="修改预约时间">
                <el-col :span="24">
                    <el-date-picker type="date" placeholder="修改预约时间" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="修改时间段">
                <el-select v-model="ruleForm.date2s" placeholder="修改时间段">
                    <el-option label="上午" :value="1"></el-option>
                    <el-option label="下午" :value="2"></el-option>
                    <el-option label="全天" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="修改预约时间" v-if='ruleForm.date2'>
                <el-radio-group v-model="ruleForm.resource">
                    <el-radio label="true">有效</el-radio>
                    <el-radio label="false">无效</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item class="estate-btn">
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<style lang="less">
    #addEstate {
        .imgBox {
            width: 100px;
            height: 100px;
            border: 1px solid #ddd;
        }
        .lineBline {
            border-bottom: 1px solid #ddd;
        }
        .estate-btn {
            .el-form-item__content {
                text-align: center;
                margin-left: 0 !important;
            }
        }
        .el-dialog {
            padding-bottom: 5px;
        }
        .citys {
            float: left;
        }
    }
</style>
<script>
    import qs from 'qs'
    export default {
        data() {
            return {
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
                dialogVisible: false,
                ruleForm: {
                    textInfo: '新增会员',
                    resource: 'true',
                    date1: "",
                    date1s: "",
                    date2: '',
                    date2s: '',
                    thisId: ''
                },
                rules: {
                    name: [{
                        required: true,
                        message: '请输入小区名称',
                        trigger: 'blur'
                    }, ],
                    mode: [{
                        required: false,
                        message: '请输入小区别名',
                        trigger: 'blur'
                    }, ]
                },
            };
        },
        watch() {
        },
        methods: {
            closeDialog(done) {
                this.dialogVisible = false;
                this.$refs['ruleForm'].resetFields();
                this.ruleForm.name = ''
            },
            submitForm(formName) {
                // if (this.ruleForm.textInfo == "新增小区") {
                //     let url = '/api/customer/estate/insertData';
                //     this.$http({
                //             url: url,
                //             method: 'POST',
                //             // 请求体重发送的数据
                //             // headers: {
                //             //     'Content-Type': 'application/json'
                //             // },
                //             data: [{
                //                 'name': this.ruleForm.name,
                //                 'alias': this.ruleForm.mode,
                //                 'areaId': this.houseForm.bigDistrict - 0,
                //                 'provinceId': this.houseForm.provinceValue - 0,
                //                 'cityId': this.houseForm.cityValue - 0,
                //                 'districtId': this.houseForm.countyDistrict - 0,
                //                 'regionId': this.houseForm.streetValue - 0,
                //                 'address': this.ruleForm.address,
                //             }]
                //         })
                //         .then(res => {
                //             this.dialogVisible = false;
                //             console.log(res.data.msg);
                //             this.$root.$emit('getDatezdy', 1);
                //         })
                //         .catch(error => {
                //             console.log(error);
                //             //         alert('网络错误，不能访问');
                //         })
                // }
                if (this.ruleForm.textInfo == "编辑预约时间") {
                    console.log(youWant)
                    var d = new Date(this.ruleForm.date1);
                    let youWant = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                    var t = new Date(this.ruleForm.date2);
                    let youWants = t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate() + ' ' + t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds();
   
                    var obj;
                    if (new Date(youWants.split(" ")[0].replace(/-/g, '/')).getTime()) {
                        obj = {
                            appointTime: new Date(youWant.split(" ")[0].replace(/-/g, '/')).getTime(),
                            appointSlot: this.ruleForm.date1s,
                            id: this.thisId,
                            updateAppointSlot: this.ruleForm.date2s,
                            updateAppointTime: new Date(youWants.split(" ")[0].replace(/-/g, '/')).getTime(),
                            updateAppointTimeIsActive: this.ruleForm.resource,
                        }
                    } else {
                        obj = {
                            appointTime: new Date(youWant.split(" ")[0].replace(/-/g, '/')).getTime(),
                            appointSlot: this.ruleForm.date1s,
                            id: this.thisId
                        }
                    }
                    let url = '/api/product/order/update/OrderDetail';
                    this.$http({
                            url: url,
                            method: 'POST',
                            // 请求体重发送的数据
                            // headers: {
                            //     'Content-Type': 'application/json'
                            // },
                            data: obj
                        })
                        .then(response => {
                            this.dialogVisible = false;
                            this.$root.$emit('getDatezdy', 1)
                        })
                        .catch(error => {
                            console.log(error);
                            //         alert('网络错误，不能访问');
                        })
                }
                this.dialogVisible = false;
                this.$refs[formName].resetFields();
            }
        },
        created: function() {
            this.$root.$on('showWindowss', (data) => {
                this.$nextTick(() => {
                    if (data.type != 'no') {
                        this.dialogVisible = true;
                        this.ruleForm.textInfo = '编辑预约时间';
                        this.ruleForm.resource = 'true'
                        this.ruleForm.date1 = data.rowData.appointTime ? new Date(data.rowData.appointTime) : '';
                        this.ruleForm.date2 = data.rowData.updateAppointTime ? new Date(data.rowData.updateAppointTime) : "";
                        this.ruleForm.date1s = data.rowData.appointSlot
                        this.ruleForm.date2s = data.rowData.updateAppointSlot,
                            this.thisId = data.rowData.id
                    } else {
                        this.dialogVisible = true;
                        this.ruleForm.textInfo = '新增小区';
                    }
                })
            });
        },
        beforeDestroy() {
            this.$root.$off('showWindowss');
        }
    }
</script>