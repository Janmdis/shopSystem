<template>
    <div id="orderListSearch">
        <el-form :model="ruleForm" ref="ruleForm" 
                label-width="100px" class="demo-ruleForms" style="margin-top:20px;">
                    
                    <el-col class="item-body" :span="24">
                        <el-col :span="12">
                            <el-form-item class="visit-item" label="服务人员类型:" prop="serType">
                                <el-select v-model="ruleForm.serType" placeholder="请选择">
                                    <el-option
                                    :popper-append-to-body="false"
                                    v-for="(item,index) in ruleForm.customerCategory"
                                    :key="index"
                                    :label="item.employeeTypeName"
                                    :value="item.id">
                                    </el-option></el-select>
                                
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="visit-item" label="城市:" prop="city">
                                <el-select v-model="ruleForm.city" clearable  filterable placeholder="请选择" @change="selectQY(ruleForm.city)">
                                    <el-option
                                    :popper-append-to-body="false"
                                    v-for="(item,index) in ruleForm.cities"
                                    :key="index"
                                    :label="item.regionName"
                                    :value="item.id"
                                    >
                                    </el-option></el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">  
                            <el-form-item class="visit-item" label="区域:" prop="userVillage">
                                    <el-select v-model="ruleForm.userVillage" placeholder="请选择">
                                        <el-option
                                        :popper-append-to-body="false"
                                        v-for="(item,index) in ruleForm.regions"
                                        :key="index"
                                        :label="item.regionName"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                            </el-form-item> 
                        </el-col>
                        <el-col :span="5" style="margin-left:10%;">
                            <el-button type="primary" @click="getList">查询</el-button>
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
                serType:'',
                city:'',
                userVillage:'',
                cities:[],
                regions:[],
                customerCategory:[]
            },
        }
    },
    created: function () {
        this.getSerList();
        this.getCity();
    },
    methods:{
        getSerList(){
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
            })
        },
        getCity(){
            let that = this;
            this.$http.get(
                '/api/public/region/findParent?grade=2'
            ).then(res => {
               // console.log(res.data.info)
                if(res.data.info == '尚未登录'){
                    alert('登录超时！')
                }else{
                    that.ruleForm.cities = res.data.info;
                    // console.log(that.ruleForm.cities)
                }
            })
        },
        selectQY(cityId){
            let that = this;
            let cId = cityId
            this.$http.get(
                '/api/public/region/findParent?grade=3&parentId='+cId
            ).then(res => {
              //  console.log(res.data.info)
                that.ruleForm.regions = res.data.info;
            })
        },
        getList(){
            let serType = this.ruleForm.serType
            let city = this.ruleForm.city
            let dis = this.ruleForm.userVillage
            if(serType == ''){
                serType = null
            }
            if(city == ''){
                city = null
            }
            if(dis == ''){
                dis = null
            }
            this.$root.$emit('workerloading',true)
            let that = this;
            var url = '/api/admin/account/multiConditionalQuery'
            let datas = {
                serTypeId:serType,
                cityId:city,
                disId:dis
            }
            this.$http({
                url: url,
                method: 'post',
                data: datas,
            }).then(respone => {
                console.log(respone)
                that.$root.$emit('dataListWorker',respone.data.info.list)
                this.$root.$emit('pages1',respone.data.info.pages)
                this.$root.$emit('total1',respone.data.info.total)
            })
        },
    }
}
</script>
<style>

</style>
