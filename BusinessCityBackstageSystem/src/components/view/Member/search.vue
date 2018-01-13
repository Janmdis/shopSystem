<template>
    <div>
    
        <el-form ref="form" :model="form" label-width="80px">
    
            <el-row>
    
                <el-col :span="4">
    
                    <el-form-item label="手机号">
    
                        <el-input v-model="form.name"></el-input>
    
                    </el-form-item>
    
                </el-col>
    
                <el-col :span="4">
    
                    <el-form-item label="小区">
    
                        <el-input v-model="form.name"></el-input>
    
                    </el-form-item>
    
                </el-col>
    
                <el-col :span="4">
    
                    <el-form-item label="来源">
    
                        <el-select v-model="form.region" placeholder="请选择活动区域">
    
                            <el-option label="区域一" value="shanghai"></el-option>
    
                            <el-option label="区域二" value="beijing"></el-option>
    
                        </el-select>
    
                    </el-form-item>
    
                </el-col>
    
            </el-row>
    
            <el-row>
    
                <el-col :span="4">
    
                    <el-form-item label="订单状态">
    
                        <el-select v-model="form.region1" placeholder="请选择活动区域">
    
                            <el-option label="区域一" value="shanghai"></el-option>
    
                            <el-option label="区域二" value="beijing"></el-option>
    
                        </el-select>
    
                    </el-form-item>
    
                </el-col>
    
                <el-col :span="4">
    
                    <el-form-item label="客户类型">
    
                        <el-select v-model="form.region2" placeholder="请选择活动区域">
    
                            <el-option label="区域一" value="shanghai"></el-option>
    
                            <el-option label="区域二" value="beijing"></el-option>
    
                        </el-select>
    
                    </el-form-item>
    
                </el-col>
    
                <el-col :span="4">
    
                    <el-form-item label="回访记录">
    
                        <el-select v-model="form.region3" placeholder="请选择活动区域">
    
                            <el-option label="区域一" value="shanghai"></el-option>
    
                            <el-option label="区域二" value="beijing"></el-option>
    
                        </el-select>
    
                    </el-form-item>
    
                </el-col>
    
                <el-col :span="3" class="mLeft">
    
                    <el-button type="primary" round>查询</el-button>
    
                </el-col>
    
                <el-col :span="2">
    
                    <i class="el-icon-refresh"></i>
    
                </el-col>
    
            </el-row>
    
        </el-form>
    
    </div>
</template>
<style>
    
</style>
<script>
    export default {
    
        data() {
    
            return {
    
                form: {
    
                    name: '',
    
                    region: '',
    
                    region1: '',
    
                    region2: '',
    
                    region3: '',
    
                    date1: '',
    
                    date2: '',
    
                    delivery: false,
    
                    type: [],
    
                    resource: '',
    
                    desc: ''
    
                }
    
            }
    
        }
    
    }
</script>
