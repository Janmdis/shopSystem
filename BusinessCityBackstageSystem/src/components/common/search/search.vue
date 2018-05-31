<template>
    <div class='searchareabox'>
        <el-form ref="form" :model="form" label-width="80px" id='searcher'>
            <!-- 日志 -->
            <el-row v-if='showlog' class='logform'>
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
                        v-model="valuelog"
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
            <!-- 会员 -->
            <el-row v-if='showaccount'>
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="手机号">
                            <el-input v-model="form.account.mobile"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" >
                        <el-form-item label="客户类型">
                            <el-select v-model="form.account.categoryId" placeholder="请选择">
                                <el-option v-for='(item,index) in accounttype' :key='index' :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" >
                        <el-form-item label="会员等级">
                            <el-select v-model="form.account.level" placeholder="请选择">
                                <el-option v-for='(item,index) in accountlevel' :key='index' :label="item.levelName" :value="item.level"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" >
                        <el-form-item label="城市">
                            <el-cascader
                            :options="citys"
                            :show-all-levels="false"
                            @change='changcity'
                            :props="propslog2"
                            ></el-cascader>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5" >
                        <el-form-item label="小区">
                            <el-select v-model="form.account.estateId" placeholder="请选择">
                                <el-option v-for='(item,index) in estats' :key='index' :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" >
                        <el-form-item label="来源">
                            <el-select v-model="form.account.recommendedSourceId" placeholder="请选择">
                                <el-option v-for='(item,index) in accountrecommendedSource' :key='index' :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" :offset='1' style='line-height:40px;'>
                        <el-checkbox v-model="form.account.birthDatecheck">今日生日</el-checkbox>
                    </el-col>
                </el-row>
                
            </el-row>
            <!-- 订单 -->
            <el-row v-if='showorder'>
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="订单号">
                            <el-input v-model="form.order.number"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="手机号">
                            <el-input v-model="form.order.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" >
                        <el-form-item label="订单状态">
                            <el-select v-model="form.order.orderState" placeholder="请选择">
                                <el-option v-for='(item,index) in orderStatelist' :key='index' :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" >
                        <el-form-item label="来源">
                            <el-select v-model="form.order.sourceId" placeholder="请选择">
                                <el-option v-for='(item,index) in ordersourse' :key='index' :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5" >
                        <el-form-item label="服务状态">
                            <el-select v-model="form.order.serviceState" placeholder="请选择">
                                <el-option v-for='(item,index) in orderServiceState' :key='index' :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label="时间段" :span='10' class='datepick'>
                            <el-date-picker
                            v-model="form.order.daterange"
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
            <!-- 退款订单 -->
            <el-row v-if='showrefund'>
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="订单号">
                            <el-input v-model="form.refund.number"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="手机号">
                            <el-input v-model="form.refund.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="退款单号">
                            <el-input v-model="form.refund.refundNumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" >
                        <el-form-item label="退款状态">
                            <el-select v-model="form.refund.orderState" placeholder="请选择">
                                <el-option v-for='(item,index) in refundStatus' :key='index' :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='8'>
                        <el-form-item label="时间段" :span='10' class='datepick'>
                            <el-date-picker
                            v-model="form.refund.daterange"
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
            <!-- 发票 -->
            <el-row v-if='showinvoice'>
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="订单号">
                            <el-input v-model="form.invoice.orderNumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="手机号">
                            <el-input v-model="form.invoice.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" >
                        <el-form-item label="订单状态">
                            <el-select v-model="form.invoice.orderState" placeholder="请选择">
                                <el-option v-for='(item,index) in orderStatelist' :key='index' :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" >
                        <el-form-item label="发票类型">
                            <el-select v-model="form.invoice.category" placeholder="请选择">
                                <el-option v-for='(item,index) in invoiceCategory' :key='index' :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5" >
                        <el-form-item label="发票状态">
                            <el-select v-model="form.invoice.invoiceState" placeholder="请选择">
                                <el-option v-for='(item,index) in invoiceState' :key='index' :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label="时间段" :span='10' class='datepick'>
                            <el-date-picker
                            v-model="form.invoice.daterange"
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
                valuelog:[],
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
                        daterange:'',
                        birthDate:''
                    },
                    account:{
                        mobile:'',
                        categoryId:'',
                        level:'',
                        cityId:'',
                        estateId:'',
                        recommendedSourceId:'',
                        birthDatecheck:false
                    },
                    order:{
                        number:'',
                        phone:'',
                        sourceId:'',
                        daterange:'',
                        orderState:'',
                        orderType:'',
                        serviceState:'',
                        daterange:''
                    },
                    invoice:{
                        orderNumber:'',
                        phone:'',
                        orderState:'',
                        category:'',
                        invoiceState:'',
                        daterange:''
                    },
                    refund:{
                        number:'',
                        phone:'',
                        refundNumber:'',
                        orderState:'',
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
                accounttype:[],
                accountlevel:[],
                citys:[],
                estats:[],
                accountrecommendedSource:[],
                orderStatelist:[
                    {
                        id:1,
                        name:'未完成'
                    },
                    {
                        id:2,
                        name:'已完成'
                    },
                    {
                        id:3,
                        name:'异常订单'
                    },
                    {
                        id:4,
                        name:'退款中'
                    },
                    {
                        id:5,
                        name:'退款完成'
                    },
                    {
                        id:6,
                        name:'已取消'
                    },
                    {
                        id:7,
                        name:'退款驳回'
                    }
                ],
                orderpayState:[
                    {
                        id:1,
                        name:'已支付'
                    },
                    {
                        id:2,
                        name:'未支付'
                    },
                    {
                        id:3,
                        name:'已过期'
                    }
                ],
                orderServiceState:[
                    {
                        id:1,
                        name:'待服务'
                    },
                    {
                        id:2,
                        name:'服务中'
                    },
                    {
                        id:3,
                        name:'已完成'
                    }
                ],
                orderType:[
                    {
                        id:1,
                        name:'新增服务订单'
                    },
                    {
                        id:2,
                        name:'新增上门订单'
                    },
                    {
                        id:3,
                        name:'追单'
                    }
                ],
                invoiceCategory:[
                    {
                        id:11,
                        name:'个人普通发票'
                    },
                    {
                        id:22,
                        name:'单位普通发票'
                    },
                    {
                        id:22,
                        name:'单位专用发票'
                    }
                ],
                invoiceState:[
                    {
                        id:1,
                        obj:{
                            isFinished:true,
                            isDisallowance:true
                        },
                        name:'驳回'
                    },
                    {
                        id:2,                        
                        obj:{
                            isFinished:true,
                            isDisallowance:false
                        },
                        name:'发放完成'
                    },
                    {
                        id:3,                        
                        obj:{
                            isFinished:false,
                            isDisallowance:''
                        },
                        name:'未处理'
                    }
                ],
                refundStatus:[
                    {
                        id:'4',
                        name:'未处理'
                    },
                    {
                        id:'5',
                        name:'已完成'
                    },
                    {
                        id:'7',
                        name:'驳回'
                    }
                ],
                ordersourse:[],
                showlog:this.type=='operalog',
                showchannel:this.type=='channel',
                showknowledge:this.type=='knowledge',
                showcoupon:this.type=='coupon',
                showsupplier:this.type=='supplier',
                showcommodity:this.type=='commodity',
                showproduct:this.type=='product',
                showusers:this.type=='users',
                showaccount:this.type=='member',
                showorder:this.type=='order',
                showinvoice:this.type=='invoice',
                showrefund:this.type=='refund',
                showworklist:this.type=='worklist',
                propslog: {
                    label:'label',
                    value: 'depid',
                    children: 'users'
                },
                propslog2: {
                    label:'regionName',
                    value: 'id',
                    children: 'sysRegionList'
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
                case 'member':{
                    this.getMembertype();
                    this.getMemberlevel();
                    this.getCitys();
                    this.getEstate();
                    this.getRecommendedSource();
                    break;
                }
                case 'order':{
                    this.getEstate();
                    this.getOrdersource();
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
                    },
                    account:{
                        mobile:'',
                        categoryId:'',
                        level:'',
                        cityId:'',
                        estateId:'',
                        recommendedSourceId:'',
                        birthDatecheck:false
                    },
                    order:{
                        number:'',
                        phone:'',
                        sourceId:'',
                        daterange:'',
                        orderState:'',
                        orderType:'',
                        serviceState:'',
                        daterange:''
                    },
                    invoice:{
                        orderNumber:'',
                        phone:'',
                        orderState:'',
                        category:'',
                        invoiceState:'',
                        daterange:''
                    },
                    refund:{
                        number:'',
                        phone:'',
                        refundNumber:'',
                        orderState:'',
                        daterange:''
                    }
                };
                this.valuelog=[];
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
            changcity(val){
                this.form.account.cityId=val[2]
                // console.log(val);
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
                            // cosnole.log(that.userlist);
                            let list=res.data.info.list;
                            that.userlist=[];
                            list.forEach(item=>{
                                let json={
                                    label:item.adminName,
                                    depid:item.id
                                }
                                that.userlist.push(json);
                            });
                            // console.log(that.userlist);
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
                        // that.$message(res.data.msg);
                    }
                })
                .catch(err=>{
                    console.log(err);
                    that.$message('员工类型获取失败');
                });
            },
            // 获取会员类型
            getMembertype(){
                let that=this;
                this.$http.post('/api/customer/customerCategory/findCategory')
                .then(res=>{
                    if(res.data.status==200){
                        that.accounttype=res.data.info
                    }
                    
                })
                .catch(err=>{
                    console.log(err);
                });
            },
            // 获取会员等级
            getMemberlevel(){
                let that=this;
                this.$http.post('/api/customer/customerLevelComputing/query')
                .then(res=>{
                    if(res.data.status==200){
                        that.accountlevel=res.data.info
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
            },
            // 查询城市
            getCitys(){
                let that=this;
                this.$http.get('/api/public/region/findParent?levels=3&parentId=0')
                .then(res=>{
                    if(res.data.status==200){
                        that.citys=res.data.info
                    }
                    // console.log(res);
                })
                .catch(err=>{
                    console.log(err);
                });
            },
            // 获取小区
            getEstate(){
                let that=this;
                this.$http.get('/api/customer/estate/queryDataList?pageSize=1000')
                .then(res=>{
                    if(res.data.status==200){
                        that.estats=res.data.info.list;
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
            },
            // 获取推荐来源
            getRecommendedSource(){
                let that=this;
                this.$http.post('/api/customer/recommendedSource/findSource')
                .then(res=>{
                    if(res.data.status==200){
                        that.accountrecommendedSource=res.data.info;
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
            },
            // 获取订单来源
            getOrdersource(){
                let that=this;
                this.$http.post('/api/product/order/source/query')
                .then(res=>{
                    if(res.data.status==200){
                        that.ordersourse=res.data.info
                        // that.accountrecommendedSource=res.data.info;
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
            },
            searchdata(){
                this.$root.$emit('search',this.form);
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
        beforeDestroy(){
            this.$root.$off('switch');
        }
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