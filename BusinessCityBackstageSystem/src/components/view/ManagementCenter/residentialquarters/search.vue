<template>
    <div>
    
        <el-form ref="form" :model="form" label-width="80px">
    
            <el-row>
    
                <el-col :span="4">
    
                    <el-form-item label="手机号">
    
                        <el-input v-model="form.iphone"></el-input>
    
                    </el-form-item>
    
                </el-col>
    
                <el-col :span="4">
    
                    <el-form-item label="小区">
    
                        <el-input v-model="form.quarters"></el-input>
    
                    </el-form-item>
    
                </el-col>
    
                <el-col :span="4">
    
                    <el-form-item label="来源">
    
                        <el-select v-model="form.source" @click.native='sourceFn' placeholder="请选择活动区域">
    
                             <el-option v-for=' (item,index) in this.form.sourceFns ' :key="index" :label='item.name' :value="item.id"></el-option>
    
                        </el-select>
    
                    </el-form-item>
    
                </el-col>
    
            </el-row>
    
            <el-row>
    
                <el-col :span="4">
    
                    <el-form-item label="订单状态">
    
                        <el-select v-model="form.Order" placeholder="请选择活动区域">
    
                            <el-option label="区域一" value="shanghai"></el-option>
    
                            <el-option label="区域二" value="beijing"></el-option>
    
                        </el-select>
    
                    </el-form-item>
    
                </el-col>
    
                <el-col :span="4">
    
                    <el-form-item label="客户类型" >
    
                        <el-select v-model="form.Customer" @click.native='showData' placeholder="请选择活动区域">
    
                            <el-option v-for=' (item,index) in this.form.curDate ' :key="index" :label='item.name' :value="item.id"></el-option>
    
                        </el-select>
    
                    </el-form-item>
    
                </el-col>
    
                <el-col :span="4">
    
                    <el-form-item label="回访记录">
    
                        <el-select v-model="form.Visit" placeholder="请选择活动区域"  @change="changeValue">
    
                            <el-option label="区域一" value="shanghai"></el-option>
    
                            <el-option label="区域二" value="beijing"></el-option>
    
                        </el-select>
    
                    </el-form-item>
    
                </el-col>
    
                <el-col :span="2" class="mLeft" @click.native="getData">
    
                    <el-button type="primary" class='btnW' round>查询</el-button>
    
                </el-col>
    
                <el-col :span="2" style='margin-left:10px;'>
    
                    <i @click="formClear" class='icon iconfont icon-shuaxin1'></i>
    
                </el-col>
    
            </el-row>
    
        </el-form>
    
    </div>
</template>
<style>
    .btnW{
        width:100%;
        background:27a1f2;
        border:1px solid 27a1f2;
    }
</style>
<script>
    export default {
        data() {
    
            return {
    
                form: {
    
                    iphone: '',

                    quarters: '',
    
                    source: '',
    
                    Order: '',
    
                    Customer: '',
    
                    Visit: '',
                    curDate:[],
                    sourceFns:[]
    
                }
    
            }
    
        },
        created(){
            this.sourceFn();
            this.showData()
        },
        methods:{
            formClear(){
                this.form.iphone="";
                this.form.quarters="";
                this.form.source="";
                this.form.Order="";
                this.form.Customer="";
                this.form.Visit="";
            },
            getData(){
                let iphone = this.form.iphone;
                let quarters = this.form.quarters;
                let source = this.form.source;
                let Order = this.form.Order;
                let Customer = this.form.Customer;
                let Visit = this.form.Visit;
                console.log(iphone,quarters,source,Customer)
            },
            changeValue(value) {
                console.log(value);
            },
            showData(){
               let url='/api/customer/customerCategory/findCategory';
               this.$http({
                   url:url,
                   method:'post',
                   headers:{ 'Content-Type': 'application/json' },
                   data:{}
               })
               .then(respone =>{
                   this.form.curDate = respone.data.info;
               })
               .catch(error=>{
                   console.log(error);
                   alert('网络错误，不能访问');
               })
            },
            sourceFn(){
               let url='/api/customer/recommendedSource/findSource';
               this.$http({
                   url:url,
                   method:'post',
                   headers:{ 'Content-Type': 'application/json' },
                   data:{}
               })
               .then(respone =>{
                   this.form.sourceFns = respone.data.info;
                   console.log(this.form.sourceFns)
               })
               .catch(error=>{
                   console.log(error);
                   alert('网络错误，不能访问');
               })
            }

        }
    
    }
</script>
