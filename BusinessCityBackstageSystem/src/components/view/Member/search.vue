<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px" id='searcher' v-show="false">
            <el-row>
                <el-col :span="24">
                    <el-col :span="5">
                        <el-form-item label="手机" prop='iphone'>
                            <el-input v-model="form.iphone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="小区" prop='quarters'>
                            <el-input v-model="form.quarters"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="来源" prop='Label'>
                            <el-select v-model="form.Label" @click.native='sourceFn' placeholder="请选择活动区域">
                                <el-option v-for=' (item,index) in this.form.sourceFns ' :key="index" :label='item.name' :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="标签" prop='Visit'>
                            <el-select v-model="form.Visit" placeholder="请选择活动区域" @change="changeValue">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="订单状态" prop='Order'>
                            <el-select v-model="form.Order" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="客户类型" prop='Customer'>
                            <el-select v-model="form.Customer" @click.native='showData' placeholder="请选择活动区域">
                                <el-option v-for=' (item,index) in this.form.curDate ' :key="index" :label='item.name' :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="会员等级"  prop='Visit'>
                            <el-select v-model="form.Visit" placeholder="请选择活动区域" @change="changeValue">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="margin-left:40px;" @click.native="getData">
                        <el-button type="primary" class='btnW' round>今天生日</el-button>
                    </el-col>
                </el-col>
            </el-row>
            <el-row style='border-top:1px solid #ddd; padding-top:20px; '>
                <el-col :span="2" style="margin-left:44%;" @click.native="getData">
                    <el-button type="primary" class='btnW' round>查询</el-button>
                </el-col>
                <el-col :span="2" style='margin-left:10px;'>
                    <el-button type="primary" class='btnW' @click='resetForm' round>重置</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<style>
    .btnW {
        width: 100%;
        background: #00aeaa;
        border: 1px solid #00aeaa;
    }
    #searcher {
        position: relative;
        z-index: 10;
        background: #fff;
        border: 1px solid #ddd;
        padding: 20px 0;
    }
</style>
<script>
    export default {
        data() {
            return {
                form: {
                    Label: '',
                    iphone: '',
                    quarters: '',
                    source: '',
                    Order: '',
                    Customer: '',
                    Visit: '',
                    curDate: [],
                    sourceFns: []
                }
            }
        },
        created() {
            this.sourceFn();
            this.showData()
        },
        methods: {
            resetForm() {
                this.$refs['form'].resetFields();
            },
            formClear() {
                this.form.iphone = "";
                this.form.quarters = "";
                this.form.source = "";
                this.form.Order = "";
                this.form.Customer = "";
                this.form.Visit = "";
            },
            getData() {
                let iphone = this.form.iphone;
                let quarters = this.form.quarters;
                let source = this.form.source;
                let Order = this.form.Order;
                let Customer = this.form.Customer;
                let Visit = this.form.Visit;
                console.log(iphone, quarters, source, Customer)
            },
            changeValue(value) {
                console.log(value);
            },
            showData() {
                let url = '/api/customer/customerCategory/findCategory';
                this.$http({
                        url: url,
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: {}
                    })
                    .then(respone => {
                        this.form.curDate = respone.data.info;
                    })
                    .catch(error => {
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
            sourceFn() {
                let url = '/api/customer/recommendedSource/findSource';
                this.$http({
                        url: url,
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: {}
                    })
                    .then(respone => {
                        this.form.sourceFns = respone.data.info;
                        //console.log(this.form.sourceFns)
                    })
                    .catch(error => {
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            }
        }
    }
</script>
