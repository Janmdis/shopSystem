<template>
    <el-dialog id="addEstate" :title="ruleForm.textInfo" :before-close="closeDialog" :visible.sync="dialogVisible" width="30%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span='24'>
                    <el-form-item label="小区名称" prop="name">
                        <el-input @change="checkName" v-model.trim="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='24'>
                    <el-form-item label="别名" prop="mode">
                        <el-input v-model="ruleForm.mode"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='24'>
                    <!--<el-form-item label="地址" prop='address'>
                            <el-input v-model="ruleForm.address"></el-input>
                        </el-form-item>!-->
                     <el-row>
                    <el-col :span='12'  style='position:relative;margin-bottom:10px;'>
                        <el-form-item label="大区">
                            <el-select v-model="houseForm.bigDistrict" @change="bigDis" placeholder="请选择">
                                <el-option v-for="(item,index) in houseInfo" :key="index" :label="item.regionName" :value="index+1"></el-option> 
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'  style='position:relative;margin-bottom:10px;'>
                        <el-form-item label="省">
                            <el-select v-model="houseForm.provinceValue" @change="proDis" placeholder="请选择">
                                <el-option v-for="(item,index) in proDisId" :key="index" :label="item" :value="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                     </el-row>
                      <el-row>
                    <el-col :span='12'  style='position:relative;margin-bottom:10px;'>
                         <el-form-item label="市">
                            <el-select v-model="houseForm.cityValue" @change="cityDis" placeholder="请选择">
                                    <el-option v-for="(item,index) in cityDisId" :key="index" :label="item" :value="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'  style='position:relative;margin-bottom:10px;'>
                        <el-form-item label="县区">
                            <el-select v-model="houseForm.countyDistrict" @change="countyDis" placeholder="请选择">
                                <el-option v-for="(item,index) in countyInfo" :key="index" :label="item.regionName" :value="item.id"></el-option>
                            </el-select>
                            
                        </el-form-item>
                    </el-col>
                     </el-row>

                    <el-col :span='12' style='position:relative;margin-bottom:10px;'>
                        <el-form-item label="街道">
                            <el-select v-model="houseForm.streetValue" @change="streetDis" placeholder="请选择">
                                <el-option v-for="(item,index) in streetInfo" :key="index" :label="item.regionName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'  style='position:relative;margin-bottom:10px;'>
                    <el-form-item label="详细地址">
                        <el-input type="text" v-model="ruleForm.address" placeholder="请输入详细地址" style='padding:0;' class="detailAddress"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-row>
            <el-form-item class="estate-btn">
                <el-button type="primary" :disabled="cantSubmit" @click="submitForm('ruleForm')">保存</el-button>
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
                dialogVisible: false,
                cantSubmit: true,
                proInfo: [],
                cityInfoList: [],
                cityInfo: [],
                countyInfo: [],
                streetInfo: [],
                bigDisId: {},
                proDisId: {},
                cityDisId: {},
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
                ruleForm: {
                    textInfo: '新增会员',
                    name: "",
                    mode: '',
                    address: '',
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
                    }, ],
                    address: [{
                        required: false,
                        message: '请填写详细地址',
                        trigger: 'blur'
                    }],
                },
            };
        },

        methods: {
            searchInfo() {
                //  查询地址信息
                let that = this;
                this.$http.get('/api/public/region/findParent?parentId=0&levels=3')
                    .then(res => {
                        console.log(res)
                        this.$root.$emit('load', false);
                        if (res.data.info == null) {
                            alert(res.data.error)
                        } else {
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
                alert("..")
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
            },
            closeDialog(done) {
                this.dialogVisible = false;
                this.$refs['ruleForm'].resetFields();
                this.ruleForm.name = ''
            },
            checkName() {
                if (this.ruleForm.name == '') {
                    this.cantSubmit = true
                    this.$message({
                        message: '小区名不能为空',
                        type: 'warning',
                        duration: 1000
                    })
                } else {
                    this.cantSubmit = false
                }
            },
            submitForm(formName) {
                if (this.ruleForm.textInfo == "新增小区") {
                    let url = '/api/customer/estate/insertData';
                    this.$http({
                            url: url,
                            method: 'POST',
                            // 请求体重发送的数据
                            // headers: {
                            //     'Content-Type': 'application/json'
                            // },
                            data: [{
                                'name': this.ruleForm.name,
                                'alias': this.ruleForm.mode,
                                'areaId':this.houseForm.bigDistrict-0,
                                'provinceId':this.houseForm.provinceValue-0,
                                'cityId':this.houseForm.cityValue-0,
                                'districtId':this.houseForm.countyDistrict-0,
                                'regionId':this.houseForm.streetValue-0,
                                'address': this.ruleForm.address,
                            }]
                        })
                        .then(res => {
                            this.dialogVisible = false;
                            console.log(res.data.msg);
                            this.$root.$emit('getDatezdy', 1);
                        })
                        .catch(error => {
                            console.log(error);
                            //         alert('网络错误，不能访问');
                        })
                }
                if (this.ruleForm.textInfo == "编辑小区") {
                    let url = '/api/customer/estate/updateData';
                    this.$http({
                            url: url,
                            method: 'POST',
                            // 请求体重发送的数据
                            // headers: {
                            //     'Content-Type': 'application/json'
                            // },
                            data: {
                                'name': this.ruleForm.name,
                                'alias': this.ruleForm.mode,
                                'address': this.ruleForm.address,
                                'areaId':this.houseForm.bigDistrict-0,
                                'provinceId':this.houseForm.provinceValue-0,
                                'cityId':this.houseForm.cityValue-0,
                                'districtId':this.houseForm.countyDistrict-0,
                                'regionId':this.houseForm.streetValue-0,
                                'id': this.ruleForm.thisId
                            }
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
            this.searchInfo();
            this.$root.$on('showWindowss', (data) => {
                this.$nextTick(() => {
                    if (data.type != 'no') {
                        this.houseForm.bigDistrict='',
                        this.houseForm.provinceValue = '',
                        this.houseForm.cityValue = '',
                        this.houseForm.countyDistrict = '',
                        this.houseForm.streetValue = '',
                        this.ruleForm.address = ""
                        this.dialogVisible = true;
                        this.ruleForm.textInfo = '编辑小区';
                        console.log(data.rowData);
                        this.ruleForm.thisId = data.rowData.id
                        this.ruleForm.mode = data.rowData.alias
                        this.ruleForm.name = data.rowData.name
                        this.houseForm.bigDistrict=data.rowData.area.regionName,
                        this.houseForm.provinceValue = data.rowData.province.regionName,
                        this.houseForm.cityValue = data.rowData.city.regionName,
                        this.houseForm.countyDistrict = data.rowData.district.regionName,
                        this.houseForm.streetValue = data.rowData.region.regionName,
                        this.ruleForm.address = data.rowData.address
                    } else {
                        this.dialogVisible = true;
                        this.ruleForm.textInfo = '新增小区';
                        this.ruleForm.mode = ""
                        this.ruleForm.name = ""
                        this.houseForm.bigDistrict='',
                        this.houseForm.provinceValue = '',
                        this.houseForm.cityValue = '',
                        this.houseForm.countyDistrict = '',
                        this.houseForm.streetValue = '',
                        this.ruleForm.address = ""
                    }
                })
            });
        },
        beforeDestroy() {
            this.$root.$off('showWindowss');
        }
    }
</script>