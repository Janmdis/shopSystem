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
                                    v-for="(item,index) in customerCategory"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                                    </el-option></el-select>
                                
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="visit-item" label="城市:" prop="city">
                                <el-select v-model="ruleForm.city" clearable  filterable placeholder="请选择">
                                    <el-option
                                    :popper-append-to-body="false"
                                    v-for="(item,index) in cities"
                                    :key="index"
                                    :label="item.regionName"
                                    :value="item.id"
                                    @click="selectQY(item.id)">
                                    </el-option></el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">  
                            <el-form-item class="visit-item" label="区域:" prop="userVillage">
                                    <el-select v-model="ruleForm.userVillage" placeholder="请选择">
                                        <el-option
                                        :popper-append-to-body="false"
                                        v-for="(item,index) in regions"
                                        :key="index"
                                        :label="item.housingEstate.name"
                                        :value="item.housingEstate.id">
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
                serType:'',
                city:'',
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
            var url = '/api/admin/employeetype/queryList';
            this.$http({
                url: url,
                method: 'get',
                data: '',
            }).then(respone => {
                if (respone.data.info.list){
                    let data = respone.data.info.list;
                    that.ruleForm.customerCategory = data
                }
            })
        },
        getCity(){
            let that = this;
            this.$http.get(
                '/api/public/region/findParent?grade=2'
            ).then(res => {
                console.log(res.data.info)
                that.cities = res.data.info;
            })
        },
        selectQY(cityId){
            let that = this;
            let cId = cityId
            this.$http.get(
                '/api/public/region/findParent?grade=3&parentId='+cId
            ).then(res => {
                console.log(res.data.info)
                that.regions = res.data.info;
            })
        },
        getList(){
            let that = this;
            var url = '/api/admin/account/multiConditionalQuery'
            // let datas = {
            //     serTypeName:,typeid:,cityName:,disName:
            // }
            this.$http({
                url: url,
                method: 'post',
                data: datas,
            }).then(respone => {
                console.log(respone)
            })
        },
    }
}
</script>
<style>

/* admin/employeetype/queryList  服务人员类型查询 */
/* admin/account/multiConditionalQuery 服务人员列表条件查询 */
</style>
