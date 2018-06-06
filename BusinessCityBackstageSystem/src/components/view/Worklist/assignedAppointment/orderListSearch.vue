<template>
    <div id="orderListSearch">
        <el-form :model="ruleForm" ref="ruleForm" 
                label-width="100px" class="demo-ruleForms" >
                    
                    <el-col class="item-body" :span="24">
                        <el-form-item class="visit-item item-padding" label="手机号:" prop="userPhone">
                            <el-input :disabled='ruleForm.active' v-model="ruleForm.userPhone"></el-input>
                        </el-form-item>
                        <el-form-item class="visit-item" label="客户类型:" prop="userType">
                            <el-col :span="22"><el-select v-model="ruleForm.userType" :disabled="ruleForm.active" placeholder="请选择">
                                <el-option
                                :popper-append-to-body="false"
                                v-for="(item,index) in customerCategory"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                                </el-option></el-select>
                            </el-col>
                        </el-form-item>   
                        <el-form-item class="visit-item" label="城市:" prop="userCity">
                            <el-col :span="22"><el-select v-model="ruleForm.userCity" clearable  filterable :disabled="ruleForm.active" placeholder="请选择">
                                <el-option
                                :popper-append-to-body="false"
                                v-for="(item,index) in cities"
                                :key="index"
                                :label="item.regionName"
                                :value="item.id">
                                </el-option></el-select>
                            </el-col>
                        </el-form-item>  
                        <el-form-item class="visit-item" label="小区:" prop="userVillage">
                            <el-col :span="22">
                                <el-select v-model="ruleForm.userVillage" :disabled="ruleForm.active" placeholder="请选择">
                                    <el-option
                                    :popper-append-to-body="false"
                                    v-for="(item,index) in memberHouse"
                                    :key="index"
                                    :label="item.housingEstate.name"
                                    :value="item.housingEstate.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>  
                        <el-form-item class="visit-item" label="订单状态:" prop="userOrder">
                            <el-input :disabled="active" v-model="ruleForm.userOrder"></el-input>
                        </el-form-item>
                        <el-form-item class="visit-item" label="来源:" prop="userOrigin">
                            <el-col :span="22"><el-select v-model="ruleForm.userOrigin" :disabled="ruleForm.active" placeholder="请选择">
                                <el-option
                                :popper-append-to-body="false"
                                v-for="(item,index) in recommendedSource"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                                </el-option></el-select>
                            </el-col>
                        </el-form-item>  
                        <el-form-item class="visit-item" label="生日:" prop="userBirth">
                            <el-input :disabled="ruleForm.active" v-model="ruleForm.userBirth"></el-input>
                        </el-form-item>
                        <!--<el-form-item class="visit-item" label="录入人:" prop="writer">
                            <el-input :disabled="ruleForm.active" v-model="ruleForm.writer"></el-input>
                        </el-form-item>!-->
                        <el-form-item class="visit-item" label="录入时间:" prop="inputTime">
                            <el-input :disabled="ruleForm.active" v-model="ruleForm.inputTime"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
    </div>
</template>
<script>

</script>
<style>

</style>
