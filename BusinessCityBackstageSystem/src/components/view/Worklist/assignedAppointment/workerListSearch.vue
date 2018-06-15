<template>
    <div id="orderListSearch">
        <el-form :model="ruleForm" ref="ruleForm" 
                label-width="100px" class="demo-ruleForms" style="margin-top:20px;">
                    
                    <el-col class="item-body" :span="24">
                        <el-col :span="12">
                            <el-form-item class="visit-item" label="服务人员类型:" prop="userType">
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
                        <el-col :span="12">
                            <el-form-item class="visit-item" label="城市:" prop="userCity">
                                <el-select v-model="ruleForm.userCity" clearable  filterable placeholder="请选择">
                                    <el-option
                                    :popper-append-to-body="false"
                                    v-for="(item,index) in cities"
                                    :key="index"
                                    :label="item.regionName"
                                    :value="item.id">
                                    </el-option></el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">  
                            <el-form-item class="visit-item" label="区域:" prop="userVillage">
                                    <el-select v-model="ruleForm.userVillage" placeholder="请选择">
                                        <el-option
                                        :popper-append-to-body="false"
                                        v-for="(item,index) in memberHouse"
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
                userName: '',
                userExperience: 0,
                userPoint: '',
                userLevel: '',
                userPhone: '',
                userType: '',
                userCity: '',
                userVillage: '',
                userOrder: '',
                userOrigin: '',
                userBirth: '',
                writer: '',
                inputTime: ''
            },
        }
    }
}
</script>
<style>
/* admin/employeetype/queryList  服务人员类型查询 */
/* admin/account/multiConditionalQuery 服务人员列表条件查询 */
</style>
