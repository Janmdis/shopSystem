<template>
    <div id="house" >
        <div class="houseHome" v-show="isSwitchHouseDetail">
            <div class="houseHeader"><span class="addHouseBtn" @click="addCover">新增</span></div>
            <ul class="houseMain" >
                <li v-for="(info,index) in memberHouse" :key="index" >
                    <div class="houseDiv"><span>小区/写字楼 : {{info.estateId}}</span><span>房屋类型 : {{houseCategory[info.categoryId]}}</span></div>
                    <div class="houseDiv"><span>地址 : {{info.address}}</span><span>租住状态 : {{rentalStatus[info.rentalStatusId]}}</span></div>
                    <div class="houseBtn" :dataId="index">
                        <el-button @click="jumpHouseDetail($event)" :dataId="index" >查看详情</el-button>
                    </div>
                </li>
            </ul>
            <public-pagination data-name="房屋" :houseCount="houseCount"></public-pagination>
        </div>
        <el-dialog class="dialogAddHouse" :append-to-body="true" title="新增" :visible.sync="showHouseCover" :before-close="handleClose"> 
            <el-form :model="houseForm" ref="houseForm" label-width="100px" class="demo-houseForm">
                <el-form-item label="小区/写字楼" prop="smallDistrict">
                    <el-select v-model="houseForm.smallDistrict" :filterable="true" placeholder="请选择">
                        <el-option v-for="(item,index) in smallDisInfo" :key="index" :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="房屋类型" prop="houseType"> 
                    <el-select v-model="houseForm.houseType" placeholder="请选择">
                        <el-option v-for="(item,key) in houseCategory" :key="key" :label="item" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="租住状态" prop="houseState">
                    <el-select v-model="houseForm.houseState" placeholder="请选择">
                        <el-option v-for="(item,key) in rentalStatus" :key="key" :label="item" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-show="isHousing" label="房型" class="house-type-item">
                    <input type="text" v-model="houseForm.room"> 室 
                    <input type="text" v-model="houseForm.hall"> 厅 
                    <input type="text" v-model="houseForm.toilet"> 卫 
                    <input type="text" v-model="houseForm.kitchen"> 厨 
                    <input type="text" v-model="houseForm.balcony"> 阳台
                </el-form-item>
                <el-form-item class="house-address-item" label="地址" prop="houseAddress" >
                    <span>
                        <el-select v-model="houseForm.bigDistrict" @change="bigDis" placeholder="请选择">
                            <el-option v-for="(item,index) in houseInfo" :key="index" :label="item.regionName" :value="index+1"></el-option> 
                        </el-select>
                        <i>大区</i>
                    </span>
                    <span>
                        <el-select v-model="houseForm.provinceValue" @change="proDis" placeholder="请选择">
                            <el-option v-for="(item,index) in proDisId" :key="index" :label="item" :value="index"></el-option>
                        </el-select><i>省</i>
                    </span>
                    <span>
                        <el-select v-model="houseForm.cityValue" @change="cityDis" placeholder="请选择">
                             <el-option v-for="(item,index) in cityDisId" :key="index" :label="item" :value="index"></el-option>
                        </el-select><i>市</i>
                    </span>
                    <span>
                        <el-select v-model="houseForm.countyDistrict" @change="countyDis" placeholder="请选择">
                            <el-option v-for="(item,index) in countyInfo" :key="index" :label="item.regionName" :value="item.id"></el-option>
                        </el-select><i>县区</i>
                    </span>
                    <span>
                        <el-select v-model="houseForm.streetValue" @change="streetDis" placeholder="请选择">
                            <el-option v-for="(item,index) in streetInfo" :key="index" :label="item.regionName" :value="item.id"></el-option>
                        </el-select><i class="street">街道</i>
                    </span>
                    <input type="text" v-model="houseForm.streetMore" placeholder="请输入详细地址" class="detailAddress">
                </el-form-item>
                <el-form-item>
                    <span class="dialog-footer">
                        <el-button @click="cancelAlert('houseForm')">取 消</el-button>
                        <el-button type="primary" @click="saveFormData('houseForm')">确 定</el-button>  
                    </span>
                </el-form-item>
            </el-form>    
        </el-dialog>
        <house-details
         :memberHouseDetail="memberHouseDetail" :houseCategoryDetail="houseCategoryDetail" :rentalStatusDetail="rentalStatusDetail"
         :smallDisInfo="smallDisInfo" :memberIdChild="memberIdChild"
         >
        </house-details>
    </div>
</template>
<script>
import publicPagination from '@/components/common/pagination/pagination.vue'
import houseDetails from './HouseDetail.vue'
export default{
    props:[
        'memberHouse','houseCategory','rentalStatus','memberId',
        'houseCount'
    ],
    data () {
        return {
            memberIdChild:'',
            isClick:false,
            memberHouseDetail:{},
            houseCategoryDetail:this.houseCategory,
            rentalStatusDetail:this.rentalStatus,
            isSwitchHouseDetail:true,
            showHouseCover:false,
            isHousing:false,
            houseForm: {
                smallDistrict:'',houseType: null,houseState: null,bigDistrict:null,provinceValue:null,
                cityValue:null,countyDistrict:null,streetValue:null,
                streetMore:'',balcony:null,room:null,hall:null,
                toilet:null,kitchen:null,square:0
            },
            smallDisInfo:[],
            houseInfo:[],
            proInfoList:[],
            proInfo:[],
            cityInfoList:[],
            cityInfo:[],
            countyInfo:[],
            streetInfo:[],
            bigDisId:{},
            proDisId:{},
            cityDisId:{}
        }
    },
    created:function(){
        this.$root.$on('houseShow',() => {
            this.isSwitchHouseDetail = true
        });
        this.searchInfo();
        this.$root.$on('loadFn',data =>{
            this.searchInfo();
        });
        this.memberIdChild = this.memberId
    },
    mounted(){
        this.$root.$emit('pageType',document.getElementsByClassName('block')[0].getAttribute("data-name"))
    },
    watch:{
        houseForm: {
            handler:function(value,oldValue){
                // console.log(this.houseForm.smallDistrict);
                // console.log(this.houseForm.houseType);
                // console.log(this.houseForm.houseState);
                // console.log(this.houseForm.houseStreet);
                if(this.houseForm.houseType == 1){
                    this.isHousing = true;
                }else{
                    this.isHousing = false;
                }
            },
            deep:true
        },
    },
    methods: {
        searchInfo(){
            //  查询地址信息
            let that = this;
            this.$http.get('/api/public/region/findParent?parentId=0&levels=3')
            .then(res => {
                this.$root.$emit('load',false);
                if (res.data.info == null) {
                    alert(res.data.error)
                } else {
                    that.houseInfo = res.data.info;
                    (res.data.info).forEach(function(e,i){
                        that.proInfoList = that.houseInfo[e.id-1].sysRegionList;
                        that.bigDisId[e.id]= e.regionName;
                        that.proInfoList.forEach(function(e,i){
                            that.proInfo.push(e);
                            that.cityInfoList = that.proInfoList[i].sysRegionList;
                            that.cityInfoList.forEach(function(e,i){
                                that.cityInfo.push(e);
                            });
                        });
                    });
                }
            }).catch(err => {console.log(err)});
            //  查询小区信息
            this.$http.get('/api/customer/estate/queryData')
            .then(res => {
                this.smallDisInfo = res.data.info;
                //console.log(this.smallDisInfo);
            }).catch(err => {console.log(err)});
        },
        addCover(){ //  新增房屋事件
            this.showHouseCover = true;
        },
        bigDis(){
            console.log(this.houseForm.room);
            let that = this;
            that.proDisId = {};
            that.houseForm.provinceValue = '',
            that.houseForm.cityValue = '',
            that.houseForm.countyDistrict = '',
            that.houseForm.streetValue = '',
            that.proInfo.forEach(function(e,i){
                if(e.parentCode == (that.houseForm.bigDistrict)){
                    that.proDisId[e.id] = e.regionName;
                }
            });
            
            console.log(that.proDisId);
        },
        proDis(){
            let that = this;
            that.cityDisId = {};
            that.houseForm.cityValue = '',
            that.houseForm.countyDistrict = '',
            that.houseForm.streetValue = '',
            that.cityInfo.forEach(function(e,i){
                if(e.parentCode == (that.houseForm.provinceValue)){
                    that.cityDisId[e.id] = e.regionName;
                }
            });
            //console.log(that.houseForm.provinceValue);
            //console.log(that.cityDisId);
        },
        cityDis(){
            console.log(this.houseForm.cityValue);
            this.houseForm.countyDistrict = '',
            this.houseForm.streetValue = '',
            this.$http.get('/api/public/region/findParent?parentId='+this.houseForm.cityValue)
            .then(res => {
                this.countyInfo = res.data.info;
                //console.log(this.countyInfo);
            }).catch(err => {console.log(err)});
        },
        countyDis(){
            console.log(this.houseForm.countyDistrict);
            this.houseForm.streetValue = '',
            this.$http.get('/api/public/region/findParent?parentId='+this.houseForm.countyDistrict)
            .then(res => {
                //console.log(res.data.info);
                this.streetInfo = res.data.info;
            }).catch(err => {console.log(err)});
        },
        streetDis(){
            console.log(this.houseForm.streetValue);
            let street = document.getElementsByClassName('detailAddress')[0];
            //console.log(street);
            street.focus();
        },
        jumpHouseDetail (event) {
            let number = event.target.parentNode.getAttribute('dataId');
            this.isSwitchHouseDetail = false;
            // event.cancelBubble = true;
            this.memberHouseDetail = this.memberHouse[number];
            //console.log(this.memberHouseDetail);
            this.$root.$emit('houseDetailShow');
        },
        cancelAlert(houseForm){
            this.showHouseCover = false;
            this.$refs[houseForm].resetFields();
        },
        saveFormData(houseForm){
            //console.log(this.memberId);
            let dataInfo = {
            'estateId':this.houseForm.smallDistrict,
            'areaId':parseInt(this.houseForm.bigDistrict),
            'provinceId':parseInt(this.houseForm.provinceValue),
            'cityId':parseInt(this.houseForm.cityValue),
            'districtId':parseInt(this.houseForm.countyDistrict),
            'regionId':parseInt(this.houseForm.streetValue),
            'address':this.houseForm.streetMore,
            'categoryId':parseInt(this.houseForm.houseType),
            'acreage':parseInt(this.houseForm.square),
            'rentalStatusId':parseInt(this.houseForm.houseState),
            'roomQuantity':parseInt(this.houseForm.room),
            'hallQuantity':parseInt(this.houseForm.hall),
            'toiletQuantity':parseInt(this.houseForm.toilet),
            'kitchenQuantity':parseInt(this.houseForm.kitchen),
            'balconyQuantity':parseInt(this.houseForm.balcony)
            };
            this.$http({//  添加房屋信息
                url:'/api/customer/housingInfo/addHousingInfo?customerId='+this.memberId,
                method:'POST',
                data:([dataInfo]),
            }).then(res => {
                console.log(res.data.msg);
            }).catch(err => {console.log(err)});
            this.showHouseCover = false;
            this.$refs[houseForm].resetFields();
        },
        handleClose(done) {//  新增弹出框关闭按钮的事件
            this.showHouseCover = false
        }
    },
    components: {
        houseDetails,
        publicPagination,
    },
}
</script>
<style lang="less">
    .dialogAddHouse .el-dialog{//  点击增加弹出框样式
        width:35%;
        min-width: 500px;
        .el-dialog__body{
            .el-form{
                display:flex;
                flex-wrap:wrap;
                justify-content: space-between;
                .el-form-item{
                    width:40%;
                    margin-bottom:15px;
                }
                .el-form-item:nth-child(even){
                    margin-right:5%;
                }
                .el-form-item:nth-child(4){
                    width: 95%;
                }
                .el-form-item:nth-child(5){
                    width:95%;
                    .el-form-item__content{
                        // display:flex;
                        // flex-wrap: wrap;
                        span{
                            width:27%;
                            text-align: center;
                            float: left;
                            margin-right:6%;
                        }
                        i{
                            font-style: normal;
                        }
                        input.detailAddress{
                            width:80%;
                            border-bottom:1px solid #eee;
                            outline:none;
                            padding-left:20px;
                        }
                    }
                }
                .el-form-item:last-child{
                    width:80%;
                    .el-form-item__content button:nth-child(1){
                        margin-right:30%;
                    }
                }
            }
        }
        .el-input--suffix .el-input__inner{
            font-size: 13px;
        }
    }
</style>

<style lang="less" scoped>
.houseHome{
    padding:0 25px 100px;
}
#house{
    background: #fff;
    //min-width:750px;
    .houseHeader{
        padding-top:20px;
        padding-right: 30px;
        // padding-bottom:20px;
        overflow: hidden;
        .addHouseBtn{
            display:inline-block;
            width: 118px;
            height: 38px;
            line-height: 38px;
            color:#6c757b;
            border:1px solid #dcdedc;
            border-radius:25px;
            text-align: center;
            cursor: pointer;
            float: right;
        }
        .addHouseBtn:hover{
                background:#27a1f2;
                color:#fff;
        }
    }
    .houseMain{
            width: 100%;
        li{
            font-size: 14px;
            color:#666;
            margin:20px 0;
            background:#F2F3F4;
            .houseDiv{      
                padding: 0 80px 0;
                display:flex;
                span{
                    display:block;
                }
                span:nth-child(odd){
                    width:60%;
                }
                span:nth-child(even){
                    margin-left: 110px;
                    width:40%;
                }
            }
            .houseDiv:nth-child(1){
                padding-top:20px;
                margin-bottom: 30px;
            }
            .houseDiv:nth-child(2){
                margin-bottom: 20px;
            }
            .houseBtn{
                border-top: 1px solid #dbdbdd;
                padding:10px 0;
                position:relative;
                height: 45px;
                .el-button{
                    background:#fff;
                    color:#00c0be;
                    position: absolute;
                    right:30px;
                    border-radius:30px;
                }
                .el-button:hover{
                    background:#00c0be;
                    color:#fff;
                }
            }
        }
    }
}
.house-type-item{
    .el-form-item__content{
        input{
            width: 80px;
            border-bottom:1px solid #eee;
            outline:none;
            text-align:center;
        }
    }
}

</style>
