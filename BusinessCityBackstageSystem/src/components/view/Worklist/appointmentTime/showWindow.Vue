<template>
    <el-dialog id="addEstate" :title="ruleForm.textInfo" :before-close="closeDialog" :visible.sync="dialogVisible" width="30%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="预约时间">
                <el-col :span="24">
                    <el-date-picker type="date" placeholder="预约时间" disabled :picker-options="pickerOptions0" default-time='12:00:00' v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="预约时间段">
                <el-select v-model="ruleForm.date1s" disabled placeholder="预约时间段">
                    <el-option v-for='(item,index) in listTimeArr' disabled :key="index" :label="item.startTime+'——'+item.startTime" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="修改预约时间">
                <el-col :span="24">
                    <el-date-picker type="date" placeholder="修改预约时间"  :picker-options="pickerOptions0" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="修改时间段">
                <el-select v-model="ruleForm.date2s" placeholder="修改时间段">
                    <el-option v-for='(item,index) in listTimeArr' :key="index" :label="item.startTime+'——'+item.startTime" @click.native='markeget(item.startTime,item.startTime)' :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="修改预约时间" v-if='ruleForm.date2'>
                <el-radio-group v-model="ruleForm.resource">
                    <el-radio :label='1'>有效</el-radio>
                    <el-radio :label='0'>无效</el-radio>
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
                 listTimeArr:[],
                 strTime:'',
                 addTime:'',
                 templateId:'',
                 periodId:'',
                 pickerOptions0: {
                     disabledDate(time) {
                            let curDate = (new Date()).getTime();
                            let three = 30 * 24 * 3600 * 1000;
                            let threeMonths = curDate + three;
                            return time.getTime() < Date.now() || time.getTime() > threeMonths;;
                        }
                },  
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
        watch:{
            ruleForm:{
                handler(news,old){
                    console.log(news.date2)
                    console.log(old.date2)
                    this.ruleForm.date2 = old.date2;
                    this.getdateTime();
                },
                deep:true
            }
        },
        methods: {
            getdateTime(){
                let that = this;
                 var d = new Date(this.ruleForm.date2);
                        let youWant = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                        youWant = youWant?youWant.split(" ")[0]:'';
                        let url = '/api/product/period/query';
                        this.$http({
                            url: url,
                            method: 'POST',
                            // 请求体重发送的数据
                            // headers: {
                            //     'Content-Type': 'application/json'
                            // },
                            data: {
                                "templateId":this.templateId,
                                    "date":youWant
                                }
                        })
                        .then(response => {
                            let newArr = []
                            if( response.data.info.list){
                                response.data.info.list[0].forEach((item,index)=>{
                                response.data.info.list[1][index].totl = item;
                                newArr.push(response.data.info.list[1][index]);
                            })
                            that.listTimeArr = newArr;
                            }
                            
                            
                        })
                        .catch(error => {
                            console.log(error);
                            //         alert('网络错误，不能访问');
                        })
            },
            closeDialog(done) {
                this.dialogVisible = false;
                this.$refs['ruleForm'].resetFields();
                this.ruleForm.name = ''
            },
            markeget(val1,val2){
                
                this.strTime=val1;
                this.addTime=val2;
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
                    // console.log(youWant)
                    var d = new Date(this.ruleForm.date2);
                    let youWant = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                    this.strTime = this.strTime?this.strTime:(this.ruleForm.date2s.split('——')[0]);
                    this.addTime = this.addTime?this.addTime:(this.ruleForm.date2s.split('——')[1]);
                    var t = new Date();
                    let youWants = t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate() + ' ' + t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds();
                     youWant = youWant?youWant.split(" ")[0]:'';
                    // var obj;
                    // if (new Date(youWants.split(" ")[0].replace(/-/g, '/')).getTime()) {
                    //     obj = {
                    //         appointTime: new Date(youWant.split(" ")[0].replace(/-/g, '/')).getTime(),
                    //         appointSlot: this.ruleForm.date1s,
                    //         id: this.thisId,
                    //         updateAppointSlot: this.ruleForm.date2s,
                    //         updateAppointTime: new Date(youWants.split(" ")[0].replace(/-/g, '/')).getTime(),
                    //         updateAppointTimeIsActive: this.ruleForm.resource,
                    //     }
                    // } else {
                    //     obj = {
                    //         appointTime: new Date(youWant.split(" ")[0].replace(/-/g, '/')).getTime(),
                    //         appointSlot: this.ruleForm.date1s,
                    //         id: this.thisId
                    //     }
                    // }
                    
                    let url = '/api/product/appointment/update';
                    this.$http({
                            url: url,
                            method: 'POST',
                            // 请求体重发送的数据
                            // headers: {
                            //     'Content-Type': 'application/json'
                            // },
                            data: {
                               id: this.thisId,
                               startTime: youWant+' '+this.strTime,
                               endTime:youWant+' '+this.addTime,
                               periodId:this.periodId?this.periodId:this.ruleForm.date2s,
                               templateId:this.templateId,
                               updateTime:youWants,
                               isService:this.ruleForm.resource
                            }
                        })
                        .then(response => {
                            this.strTime = '';
                            this.addTime='';
;                           
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
                        let that = this;
                        this.dialogVisible = true;
                        this.ruleForm.textInfo = '编辑预约时间';
                        this.ruleForm.resource = data.rowData.isService;
                        let newDate = data.rowData.endTime?data.rowData.endTime.split(" ")[0]:"";
                        var d = new Date(this.ruleForm.date2);
                        this.getdateTime(data);
                        this.templateId =data.rowData.templateId;
                        this.periodId =data.rowData.periodId;
                        var curDate = new Date();
                        var t = new Date((curDate/1000+86400)*1000);
                        let youWants = t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate() + ' ' + t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds();
                        this.ruleForm.date1 = data.rowData.startTime ? new Date(data.rowData.startTime.split(" ")[0]) : '';
                        this.ruleForm.date2 = youWants.split(" ")[0];
                        this.ruleForm.date1s = ((data.rowData.startTime?data.rowData.startTime.split(" ")[1]:"")+"——"+(data.rowData.endTime?data.rowData.endTime.split(" ")[1]:""));
                        this.ruleForm.date2s = ((data.rowData.startTime?data.rowData.startTime.split(" ")[1]:"")+"——"+(data.rowData.endTime?data.rowData.endTime.split(" ")[1]:""));
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