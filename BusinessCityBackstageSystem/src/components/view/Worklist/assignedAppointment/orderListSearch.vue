<template>
    <div id="orderListSearch">
        <el-form :model="ruleForm" ref="ruleForm" 
                label-width="100px" class="demo-ruleForms" style="margin-top:20px;">
                    
                    <el-col class="item-body" :span="24">
                        <el-col :span="8">
                            <el-form-item class="visit-item" label="业务类型:" prop="userType">
                                <el-select v-model="ruleForm.userType" placeholder="请选择">
                                    <el-option
                                    :popper-append-to-body="false"
                                    v-for="(item,index) in customerCategory"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                                    </el-option></el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="日期：" prop="startTime">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.userBirth"></el-date-picker>
                            </el-form-item>
                         </el-col>
                         <el-col :span="8">
                            <el-form-item class="visit-item" label="时间格子模板:" prop="userType">
                                <el-select v-model="ruleForm.region" placeholder="请选择" @change="getTempId(indexs,items.region)">
                                    <el-option
                                    :popper-append-to-body="false"
                                    v-for="(item,index) in tempalteTime"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id"
                                    @change.native='getTempIds(item,name)'>
                                    </el-option></el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item class="visit-item" label="时间格子:" prop="userType">
                                <el-select v-model="ruleForm.userType" placeholder="请选择">
                                    <el-option
                                    :popper-append-to-body="false"
                                    v-for="(item,index) in customerCategory"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                                    </el-option></el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">   
                            <el-form-item class="visit-item" label="城市:">
                                <el-select v-model="ruleForm.cityValue" @change="cityDis" placeholder="请选择">
                                    <el-option
                                    v-for="(item,index) in cityDisId"
                                    :key="index"
                                    :label="item"
                                    :value="index">
                                    </el-option></el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">  
                            <el-form-item class="visit-item" label="区域:">
                                    <el-select v-model="ruleForm.countyDistrict" @change="countyDis" placeholder="请选择">
                                        <el-option
                                        v-for="(item,index) in countyInfo"
                                        :key="index"
                                        :label="item.regionName"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                            </el-form-item>
                         </el-col>
                         <el-col :span="8"> 
                            <el-form-item class="visit-item" label="街道:">
                                    <el-select v-model="ruleForm.streetValue" @change="streetDis" placeholder="请选择">
                                        <el-option
                                        v-for="(item,index) in streetInfo"
                                        :key="index" 
                                        :label="item.regionName" 
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" style="margin-left:10%;">
                            <el-button type="primary">查询</el-button>
                        </el-col>
                    </el-col>
                </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            ruleForm: {
                region:'',
                userName: '',
                userExperience: 0,
                userPoint: '',
                userLevel: '',
                userPhone: '',
                userType: '',
                userOrder: '',
                userOrigin: '',
                userBirth: '',
                writer: '',
                inputTime: '',

                tempalteTime: []
            },
        }
    },
    created: function() {
        this.getTemplate();
    },
    methods: {
        getTemplate(){
            let that = this;
            var url = '/api/product/commodity/periodTemplate/query';
            this.$http({
                url: url,
                method: 'post',
                data: {},
            }).then(respone => {
                if (respone.data.info.list){
                    let data = respone.data.info.list;
                    let arr = [];
                    data.forEach((e, j) => {
                        arr.push(e)
                    })
                    that.tempalteTime = arr
                }
            })
        },
        getTempIds(name) {
            this.templaetName = name
        },
        getTempId(index, id, name) { //模版选中后的数据
            this.periodTemplateId = id
                var url = '/api/product/period/query';
                this.$http({
                    url: url,
                    method: "post",
                    data: {
                        templateId: id,
                        date:this.newDate.replace(/\//g,'-')
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
    }
}
</script>
<style>
#orderListSearch .el-date-editor.el-input,
#orderListSearch .el-date-editor.el-input__inner{
    width: 98%;
}
</style>
