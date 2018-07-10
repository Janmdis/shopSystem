<template>
    <div id="orderListSearch">
        <el-form :model="ruleForm" ref="ruleForm" 
                label-width="100px" class="demo-ruleForms" style="margin-top:20px;">
                    
                    <el-col class="item-body" :span="24">
                        <el-col :span="8">
                            <el-form-item class="visit-item" label="业务类型:" prop="customerType">
                                <el-select v-model="ruleForm.customerType" placeholder="请选择">
                                    <el-option
                                    :popper-append-to-body="false"
                                    v-for="(item,index) in ruleForm.customerCategory"
                                    :key="index"
                                    :label="item.serName"
                                    :value="item.id">
                                    </el-option></el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="日期：" prop="startTime">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.inputTime"></el-date-picker>
                            </el-form-item>
                         </el-col>
                         <el-col :span="8">
                            <el-form-item class="visit-item" label="时间格子模板:" prop="region">
                                <el-select v-model="ruleForm.region" placeholder="请选择" @change="getTempId(ruleForm.region)">
                                    <el-option
                                    :popper-append-to-body="false"
                                    v-for="(item,index) in ruleForm.tempalteTime"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id"
                                    @change.native='getTempIds(item.name)'>
                                    </el-option></el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item class="visit-item" label="时间格子:" prop="timeSelected">
                                <el-select v-model="ruleForm.timeSelected" placeholder="请选择">
                                    <el-option
                                    :popper-append-to-body="false"
                                    v-for="(item,index) in ruleForm.times"
                                    :key="index"
                                    :label="item.startTime+'-'+item.endTime"
                                    :value="item.id"
                                    @change.native='getTime(item.startTime,item.endTime)'>
                                    </el-option></el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">   
                            <el-form-item class="visit-item" label="城市:">
                                <el-select v-model="ruleForm.cityValue" placeholder="请选择" @change="selectQY(ruleForm.cityValue)">
                                     <el-option
                                    :popper-append-to-body="false"
                                    v-for="(item,index) in ruleForm.cityDisId"
                                    :key="index"
                                    :label="item.regionName"
                                    :value="item.id"
                                    >
                                    </el-option></el-select>
                            </el-form-item>
                        </el-col>
                        
                        <el-col :span="8">  
                            <el-form-item class="visit-item" label="区域:">
                                    <el-select v-model="ruleForm.countyDistrict" placeholder="请选择" @change="countyDis(ruleForm.countyDistrict)">
                                        <el-option
                                        v-for="(item,index) in ruleForm.regions"
                                        :key="index"
                                        :label="item.regionName"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                            </el-form-item>
                         </el-col>
                         <el-col :span="8"> 
                            <el-form-item class="visit-item" label="街道:">
                                    <el-select v-model="ruleForm.streetValue" placeholder="请选择">
                                        <el-option
                                        v-for="(item,index) in ruleForm.streetInfo"
                                        :key="index" 
                                        :label="item.regionName" 
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" style="margin-left:10%;">
                            <el-button type="primary" @click="searchTable">查询</el-button>
                        </el-col>
                    </el-col>
                </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            templaetName:'',
            startTime:'',
            endTime:'',
            ruleForm: {
                writer: '',
                inputTime: '',
                customerCategory:[],
                customerType:'',
                region:'',
                tempalteTime:[],
                timeSelected:'',
                times:[],
                cityDisId:[],
                cityValue:'',
                regions:[],
                countyDistrict:'',
                streetInfo:[],
                streetValue:''
            },
        }
    },
    created: function() {
        this.newDate = this.getNowFormatDate().replace(/-/g, '/');
        this.getTemplate();
        this.cityDis();
        this.getcustonerCategory();
    },
    methods: {
        getcustonerCategory(){
          //  业务类型查询
            let that = this;
            var url = '/api/product/serviceType/queryList';
            this.$http({
                url: url,
                method: 'post',
                data: {},
            }).then(respone => {
                console.log(respone.data.info)
                if(respone.data.info){
                    let datas = respone.data.info
                    that.ruleForm.customerCategory = datas;
                }
            }).catch(error => {
                console.log(error)
            })
        },
        getTemplate(){
          //  alert(1)
            //获取时间模板
            let that = this;
            var url = '/api/product/commodity/periodTemplate/query';
            this.$http({
                url: url,
                method: 'post',
                data: {},
            }).then(respone => {
                if (respone.data.info.list){
                    console.log(respone)
                    let data = respone.data.info.list;
                    let arr = [];
                    data.forEach((e, j) => {
                        arr.push(e)
                    })
                    that.ruleForm.tempalteTime = arr
                }
            }).catch(error => {
                console.log(error)
            })
        },
        getTempIds(name) {
            this.templaetName = name
        },
        getTime(startTime,endTime){
            this.startTime = startTime;
            this.endTime = endTime;
        },
        getTempId(id) { 
            //时间模版选中后的数据
                this.ruleForm.times = [];
                this.ruleForm.timeSelected = ''
                let that = this;
                var url = '/api/product/period/query';
                this.$http({
                    url: url,
                    method: "post",
                    data: {
                        templateId: id,
                        date:that.newDate.replace(/\//g,'-')
                    },
                }).then(respone => {
                    console.log(respone.data.info.list)
                    if (respone.data.info.list) {
                        let data = respone.data.info.list
                        if (data[1]){
                             that.ruleForm.times = data[1]
                        }
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
             cityDis() {
                 let that = this;
                this.$http.get(
                    '/api/public/region/findParent?grade=2'
                ).then(res => {
                // console.log(res.data.info)
                    if(res.data.info == '尚未登录'){
                        alert('登录超时！')
                    }else{
                        that.ruleForm.cityDisId = res.data.info;
                         console.log(that.ruleForm.cityDisId)
                    }
                })
            },
            selectQY(cityId){
                this.ruleForm.countyDistrict = '';
                this.ruleForm.regions = [];
                this.ruleForm.streetValue = '';
                this.ruleForm.streetInfo = [];
                let that = this;
                let cId = cityId
                this.$http.get(
                    '/api/public/region/findParent?grade=3&parentId='+cId
                ).then(res => {
                //  console.log(res.data.info)
                    that.ruleForm.regions = res.data.info;
                })
            },
            countyDis(countyDistrictId){
                this.ruleForm.streetValue = '';
                this.ruleForm.streetInfo = [];
                let that = this;
                let counId = countyDistrictId
                this.$http.get(
                    '/api/public/region/findParent?grade=4&parentId='+counId
                ).then(res => {
                //  console.log(res.data.info)
                    that.ruleForm.streetInfo = res.data.info;
                })
            },
            searchTable(){
                //日期
                var d = new Date(this.ruleForm.inputTime);
                var youWant = d.getFullYear() + '-' + this.getzf((d.getMonth() + 1)) + '-' + this.getzf(d.getDate());
                if (youWant == 'NaN-NaN-NaN') {
                    youWant = ''
                } else {
                    youWant = youWant+' '
                }
                console.log(youWant+this.startTime)
                console.log(youWant+this.endTime)
                let searchData = {
                    startTime:youWant+this.startTime,
                    endTime:youWant+this.endTime,
                    templateId:this.ruleForm.region,
                    orderDetail:{
                        serviceTypeId:this.ruleForm.customerType,
                        cityId:this.ruleForm.cityValue,
                        areaId:this.ruleForm.countyDistrict,
                        streetId:this.ruleForm.streetValue
                    }
                }
                this.$root.$emit('orderListloading',true)
                let that = this;
                var url = '/api/product/appointment/findquery';
                this.$http({
                    url: url,
                    method: 'post',
                    data: searchData,
                }).then(respone => {
                    console.log(respone)
                    that.$root.$emit('dataListOrderList',respone.data.info.list)
                    this.$root.$emit('pages',respone.data.info.pages)
                    this.$root.$emit('total',respone.data.info.total)
                }).catch(error => {
                    console.log(error)
                })
            },
            //时间转化
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
            //补0操作  
            getzf(num) {
                if (parseInt(num) < 10) {
                    num = '0' + num;
                }
                return num;
            },
    }
}
</script>
<style>
#orderListSearch .el-date-editor.el-input,
#orderListSearch .el-date-editor.el-input__inner{
    width: 98%;
}
</style>
