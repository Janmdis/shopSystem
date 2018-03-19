<template>
    <div class='searchareabox'>
        <el-form ref="form" :model="form" label-width="80px" id='searcher'>
            <!-- 日志 -->
            <el-row v-if='showlog'>
                <el-col :span="5">
                    <el-form-item label="操作名称" prop='opearte' >
                        <el-input v-model="form.log.content"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" >
                    <el-form-item label="操作人" prop='deplist'>
                        <el-cascader
                        :options="deplist"
                        @change='changeuser'
                        @active-item-change="handleItemChange"
                        :props="propslog"
                        ></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col style='width:728px;'>
                    <el-form-item label="时间段" :span='10' class='datepick'>
                        <el-date-picker
                        v-model="form.log.daterange"
                        value-format='yyyy-MM-dd'
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- 渠道 -->
            <el-row v-if='showchannel'>
                <el-col :span="5">
                    <el-form-item label="名称">
                        <el-input v-model="form.channel.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" >
                    <el-form-item label="类型">
                        <el-select v-model="form.channel.typeId" placeholder="请选择类型">
                            <el-option v-for='(item,index) in teamtypelist' :key='index' :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5" >
                    <el-form-item label="等级">
                        <el-select v-model="form.channel.levelId" placeholder="请选择等级">
                            <el-option v-for='(item,index) in teamlevellist' :key='index' :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- 知识库 -->
            <el-row v-if='showknowledge'>
                <el-col :span="5">
                    <el-form-item label="问题">
                        <el-input v-model="form.knowledge.problemTitle"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" >
                    <el-form-item label="类型">
                        <el-select v-model="form.knowledge.knowledgeSortId" placeholder="请选择类型">
                            <el-option v-for='(item,index) in knowledgetypelist' :key='index' :label="item.sortName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5" >
                    <el-form-item label="知识点">
                        <el-select v-model="form.knowledge.knowledgePointId" placeholder="请选择类型">
                            <el-option v-for='(item,index) in knowledgepointlist' :key='index' :label="item.content" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- 优惠券 -->
            <el-row v-if='showcoupon'>
                <el-col :span="5">
                    <el-form-item label="名称" prop='opearte' >
                        <el-input v-model="form.coupon.couponName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" >
                    <el-form-item label="类型">
                        <el-select v-model="form.coupon.couponType" placeholder="请选择类型">
                            <el-option v-for='(item,index) in coupontype' :key='index' :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5" >
                    <el-form-item label="状态">
                        <el-select v-model="form.coupon.couponStatus" placeholder="请选择状态">
                            <el-option v-for='(item,index) in couponstate' :key='index' :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span='8'>
                    <el-form-item label="时间段" :span='10' class='datepick'>
                        <el-date-picker
                        v-model="form.coupon.daterange"
                        value-format='yyyy-MM-dd'
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- 供应商 -->
            <el-row v-if='showsupplier'>
                <el-col :span="5">
                    <el-form-item label="名称">
                        <el-input v-model="form.supplier.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" >
                    <el-form-item label="类型">
                        <el-select v-model="form.supplier.categoryId" placeholder="请选择类型">
                            <el-option v-for='(item,index) in suppliertype' :key='index' :label="item.categoryName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5" >
                    <el-form-item label="等级">
                        <el-select v-model="form.supplier.levelId" placeholder="请选择等级">
                            <el-option v-for='(item,index) in supplierlevel' :key='index' :label="item.levelName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="电话">
                        <el-input v-model="form.supplier.contactMobile"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" >
                    <el-form-item label="标签">
                        <el-select v-model="form.supplier.labelId" placeholder="请选择标签">
                            <el-option v-for='(item,index) in supplierlabel' :key='index' :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- 套餐/商品 -->
            <el-row v-if='showcommodity'>
                <el-col :span="5">
                    <el-form-item label="名称">
                        <el-input v-model="form.commodity.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" >
                    <el-form-item label="分类">
                        <el-select v-model="form.commodity.categoryId" placeholder="请选择类型">
                            <el-option v-for='(item,index) in commoditytype' :key='index' :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5" >
                    <el-form-item label="状态">
                        <el-select v-model="form.commodity.isOnSale" placeholder="请选择状态">
                            <el-option v-for='(item,index) in commoditystate' :key='index' :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" >
                    <el-form-item label="价格区间" class='rangeprice'>
                        <el-col :span='10'>
                            <el-input v-model.number="form.commodity.minPrice"></el-input>
                        </el-col>
                        <span class='el-icon-minus' :span='2' style='float:left;height:40px;line-height:40px;display:inline-block;'></span>
                        <el-col :span='10'>
                            <el-input v-model.number="form.commodity.maxPrice"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- 产品管理 -->
            <el-row v-if='showproduct'>
                <el-col :span="5">
                    <el-form-item label="名称">
                        <el-input v-model="form.product.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" >
                    <el-form-item label="分类">
                        <el-select v-model="form.product.classificationId" placeholder="请选择分类">
                            <el-option v-for='(item,index) in productclassify' :key='index' :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4" >
                    <el-form-item label="类别">
                        <el-select v-model="form.product.typeId" placeholder="请选择类别">
                            <el-option v-for='(item,index) in producttype' :key='index' :label="item.productName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4" >
                    <el-form-item label="品牌">
                        <el-select v-model="form.product.brandId" placeholder="请选择品牌">
                            <el-option v-for='(item,index) in productbrand' :key='index' :label="item.brandName" :value="item.brandId"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="库存" class='red'>
                        <el-input v-model.number="form.product.inventoryQuantity"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- 员工 -->
            <el-row v-if='showusers'>
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="姓名">
                            <el-input v-model="form.users.adminName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="手机号">
                            <el-input v-model="form.users.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" >
                        <el-form-item label="状态">
                            <el-select v-model="form.users.accStatus" placeholder="请选择">
                                <el-option v-for='(item,index) in useraccStatus' :key='index' :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" >
                        <el-form-item label="类型">
                            <el-select v-model="form.users.employeeTypeId" placeholder="请选择">
                                <el-option v-for='(item,index) in useremployeetype' :key='index' :label="item.employeeTypeName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-row>
                    <el-col :span='10'>
                        <el-form-item label="时间段" :span='10' class='datepick'>
                            <el-date-picker
                            v-model="form.users.daterange"
                            value-format='yyyy-MM-dd'
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                
            </el-row>
            <el-row style=' padding-top:20px; '>
                <el-col :span="2" style="margin-left:44%;">
                    <el-button type="primary" class='btnW' size="medium"  @click="searchdata">查询</el-button>
                </el-col>
                <el-col :span="2" style='margin-left:10px;'>
                    <el-button type="primary" class='btnW' size="medium" @click='resetForm' style='background-color:#fff;color:#27a1f2;'>重置</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        props:['type'],
        data() {
            return {
                form: {
                    log:{
                        userId:'',
                        content:'',
                        daterange:''
                    },
                    channel:{
                        name:'',
                        typeId:'',
                        levelId:''
                    },
                    knowledge:{
                        problemTitle:'',
                        knowledgeSortId:'',
                        knowledgePointId:''
                    },
                    coupon:{
                        couponName:'',
                        couponStatus:'',
                        couponType:'',
                        daterange:''
                    },
                    supplier:{
                        name:'',
                        categoryId:'',
                        levelId:'',
                        contactMobile:'',
                        labelId:''
                    },
                    commodity:{
                        name:'',
                        categoryId:'',
                        isOnSale:'',
                        minPrice:'',
                        maxPrice:''
                    },
                    product:{
                        name:'',
                        classificationId:'',
                        typeId:'',
                        brandId:'',
                        inventoryQuantity:''
                    },
                    users:{
                        adminName:'',
                        phone:'',
                        accStatus:'',
                        employeeTypeId:'',
                        daterange:''
                    }
                },
                userlist:[],
                teamtypelist:[],
                teamlevellist:[],
                knowledgetypelist:[],
                knowledgepointlist:[],
                couponstate:[
                    {
                        id:0,
                        name:'过期'
                    },
                    {
                        id:1,
                        name:'可使用'
                    }
                ],
                coupontype:[
                    {
                        id:0,
                        name:'满减'
                    },
                    {
                        id:1,
                        name:'专享'
                    },
                    {
                        id:3,
                        name:'无门槛'
                    }
                ],
                suppliertype:[],
                supplierlevel:[],
                supplierlabel:[],
                commoditytype:[],
                commoditystate:[
                    {
                        id:false,
                        name:'未上架'
                    },
                    {
                        id:true,
                        name:'上架中'
                    }
                ],
                productclassify:[],
                producttype:[],
                productbrand:[],
                useraccStatus:[
                    {
                        id:0,
                        name:'停用'
                    },
                    {
                        id:1,
                        name:'正常'
                    }
                ],
                useremployeetype:[],
                showlog:this.type=='operalog'?true:false,
                showchannel:this.type=='channel'?true:false,
                showknowledge:this.type=='knowledge'?true:false,
                showcoupon:this.type=='coupon'?true:false,
                showsupplier:this.type=='supplier'?true:false,
                showcommodity:this.type=='commodity'?true:false,
                showproduct:this.type=='product'?true:false,
                showusers:this.type=='users'?true:false,
                propslog: {
                    label:'label',
                    value: 'depid',
                    children: 'users'
                },
            }
        },
        created(){
            switch(this.type){
                case 'channel':{
                    this.getTeamtype();
                    this.getTeamlevel();
                    break;
                }
                case 'knowledge':{
                    this.getKnowledgetype();
                    this.getKnowledgepoint();
                    break;
                }
                case 'supplier':{
                    this.getSuppliertype();
                    this.getSupplierlevel();
                    this.getSupplierlabel();
                    break;
                }
                case 'commodity':{
                    this.getCommodity();
                    break;
                }
                case 'product':{
                    this.getProductclassify();
                    this.getProducttype();
                    this.getProductbrand();
                    break;
                }
                case 'users':{
                    this.getUsertype();
                    break;
                }
                default:{
                    break;
                }
            }
            this.$root.$on('switch',(flag)=>{
                let dom=document.querySelector('.searchareabox');
                if(flag){
                    dom.setAttribute('class','searchareabox on');
                }
                else{
                    dom.setAttribute('class','searchareabox');
                }
            });
        },
        methods: {
            resetForm() {
                this.form={
                    log:{
                        userid:'',
                        operate:'',
                        daterange:''
                    },
                    channel:{
                        name:'',
                        typeId:'',
                        levelId:''
                    },
                    knowledge:{
                        problemTitle:'',
                        knowledgeSortId:'',
                        knowledgePointId:''
                    },
                    coupon:{
                        couponName:'',
                        couponStatus:'',
                        couponType:'',
                        daterange:''
                    },
                    supplier:{
                        name:'',
                        categoryId:'',
                        levelId:'',
                        contactMobile:'',
                        labelId:''
                    },
                    commodity:{
                        name:'',
                        categoryId:'',
                        isOnSale:'',
                        minPrice:'',
                        maxPrice:''
                    },
                    product:{
                        name:'',
                        classificationId:'',
                        typeId:'',
                        brandId:'',
                        inventoryQuantity:''
                    },
                    users:{
                        adminName:'',
                        phone:'',
                        accStatus:'',
                        employeeTypeId:'',
                        daterange:''
                    }
                };
                this.$refs['form'].resetFields();
                
            },
            handleItemChange(val){
                console.log(val);
                let index1='';
                this.deplist.forEach((item,index)=>{
                    if(item.depid==val[0]){
                        index1=index;
                    }
                });
                setTimeout(_ => {
                    if(this.deplist[index1].users.length==0){
                        this.getUsers(val[0]).then(success=>{
                            if(success){
                                this.deplist[index1].users=this.userlist;
                            }
                        });
                    }
                }, 300)
                // console.log(val[0]);
            },
            changeuser(value){
                let userid=value[1];
                this.form.log.userId=userid;
            },
            // 获取部门下的员工
            getUsers(depid){
                return new Promise((resolve,reject)=>{
                    let that=this;
                    this.$http.post('/api/admin/account/multiConditionalQuery',
                    {
                        departmentId:depid
                    })
                    .then(res=>{
                        if(res.data.status==200){
                            // cosnole.log();
                            let list=res.data.info.list;
                            that.userlist=[];
                            list.forEach(item=>{
                                let json={
                                    label:item.adminName,
                                    depid:item.id
                                }
                                that.userlist.push(json);
                            });
                            console.log(that.userlist);
                            resolve(true);
                        }
                        else{
                            that.$message(res.data.msg);
                            resolve(false);
                        }
                    })
                    .catch(res=>{
                        that.$message('用户获取失败');
                        console.log(res);
                        resolve(false);
                    })
                });
                
            },
            // 获取团队类型
            getTeamtype(){
                let that=this;
                this.$http.post('/api/admin/teamType/queryTeamType',{})
                .then(res=>{
                    if(res.data.status==200){
                        that.teamtypelist=res.data.info;
                    }
                    else{
                        that.$message(res.data,msg);
                    }
                })
                .catch(err=>{
                    console.log(err);
                    that.$message('团队类型列表获取失败');
                });
            },
            // 获取团队等级
            getTeamlevel(){
                let that=this;
                this.$http.post('/api/admin/teamLevel/queryTeamLevel',{})
                .then(res=>{
                    if(res.data.status==200){
                        that.teamlevellist=res.data.info;
                    }
                    else{
                        that.$message(res.data,msg);
                    }
                })
                .catch(err=>{
                    console.log(err);
                    that.$message('团队等级列表获取失败');
                });
            },
            // 获取知识库类别
            getKnowledgetype(){
                let that=this;
                this.$http.post('/api/public/knowledge/sort/find?pageSize=100',{})
                .then(res=>{
                    if(res.data.status==200){
                        that.knowledgetypelist=res.data.info.list
                    }
                    else{
                        that.$message(res.data.msg);
                    }
                })
                .catch(err=>{
                    console.log(err);
                    that.$message('知识库类别查询失败');
                })
            },
            // 获取知识库知识点
            getKnowledgepoint(){
                let that=this;
                this.$http.post('/api/public/knowledge/point/find',{})
                .then(res=>{
                    if(res.data.status==200){
                        that.knowledgepointlist=res.data.info.list
                    }
                    else{
                        that.$message(res.data.msg);
                    }
                })
                .catch(err=>{
                    console.log(err);
                    that.$message('知识点查询失败');
                })
            },
            // 获取供应商类型
            getSuppliertype(){
                let that=this;
                this.$http.post('/api/product/category/query',{})
                .then(res=>{
                    if(res.data.status==200){
                        that.suppliertype=res.data.info
                    }
                    else{
                        that.$message(res.data.msg);
                    }
                })
                .catch(err=>{
                    console.log(err);
                    that.$message('供应商获取失败');
                })
            },
            // 获取供应商等级
            getSupplierlevel(){
                let that=this;
                this.$http.post('/api/product/level/query',{})
                .then(res=>{
                    if(res.data.status==200){
                        that.supplierlevel=res.data.info
                    }
                    else{
                        that.$message(res.data.msg);
                    }
                })
                .catch(err=>{
                    console.log(err);
                    that.$message('供应商等级失败');
                })
            },
            // 获取供应商标签
            getSupplierlabel(){
                let that=this;
                this.$http.post('/api/product/label/query',{})
                .then(res=>{
                    if(res.data.status==200){
                        that.supplierlabel=res.data.info
                    }
                    else{
                        that.$message(res.data.msg);
                    }
                })
                .catch(err=>{
                    console.log(err);
                    that.$message('供应商标签失败');
                })
            },
            // 获取商品分类
            getCommodity(){
                let that=this;
                this.$http.post('/api/product/commodity/category/queryMap',{parentId:0})
                .then(res=>{
                    if(res.data.status==200){
                        that.commoditytype=res.data.info;
                    }
                    else{
                        that.$message(res.data.msg);
                    }
                })
                .catch(err=>{
                    console.log(err);
                    that.$message('商品分类获取失败');
                })
            },
            // 获取产品分类
            getProductclassify(){
                let that=this;
                this.$http.post('/api/product/sort/find?pageSize=0')
                .then(res=>{
                    if(res.data.status=200){
                        that.productclassify=res.data.info.list;
                    }
                    else{
                        that.$message(res.data.msg);
                    }
                })
                .catch(err=>{
                    console.log(err);
                    that.$message('产品分类获取失败');
                })
            },
            // 获取产品类别
            getProducttype(){
                let that=this;
                this.$http.post('/api/product/type/find?pageSize=0')
                .then(res=>{
                    if(res.data.status=200){
                        that.producttype=res.data.info.list;
                    }
                    else{
                        that.$message(res.data.msg);
                    }
                })
                .catch(err=>{
                    console.log(err);
                    that.$message('产品类别获取失败');
                })
            },
            // 获取品牌类别
            getProductbrand(){
                let that=this;
                this.$http.post('/api/product/brand/find?pageSize=0')
                .then(res=>{
                    if(res.data.status=200){
                        that.productbrand=res.data.info.list;
                    }
                    else{
                        that.$message(res.data.msg);
                    }
                })
                .catch(err=>{
                    console.log(err);
                    that.$message('产品品牌获取失败');
                })
            },
            // 获取员工类型
            getUsertype(){
                let that=this;
                this.$http.get('/api/admin/employeetype/queryList')
                .then(res=>{
                    if(res.data.status==200){
                        that.useremployeetype=res.data.info;
                    }
                    else{
                        that.$message(res.data.msg);
                    }
                })
                .catch(err=>{
                    console.log(err);
                    that.$message('员工类型获取失败');
                });
            },
            searchdata(){
                this.$root.$emit('search',this.form);
                // let dom=document.querySelector('.searchareabox');
                // dom.setAttribute('class','searchareabox');
            }
        },
        computed:{
            ...mapState({
                deplist: function(state){
                    if(this.type=='operalog'){
                        let list=[];
                        state.deplist.deplistall.forEach(item=>{
                            list.push({
                                label:item.departmentName,
                                depid:item.id,
                                users:[]
                            });
                        });
                        return list
                    }
                } 
            })
        },
        // beforeDestroy(){
        //     this.$root.$off('');
        // }
    }
</script>
<style>
    .searchareabox{
        display: none;
        background-color: #f9f9f9;
    }
    .searchareabox.on{
        display: block;
    }
    .searchareabox .btnW {
        width: 100%;
        background: #27a1f2;
        border: 1px solid #27a1f2;
    }
    .searchareabox #searcher {
        position: relative;
        z-index: 10;
        /* background: #fff; */
        /* border: 1px solid #ddd; */
        padding: 20px 0;
    }
    .datepick .el-form-item__content .el-date-editor{
        width:100% !important;
    }
    .red label{
        color: red;
    }
    .searchareabox .el-form-item{
        margin-bottom: 10px;
    }
    /* .rangeprice */
</style>