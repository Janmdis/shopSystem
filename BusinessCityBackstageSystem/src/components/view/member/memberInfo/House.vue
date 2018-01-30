<template>
    <div id="house" >
        <div class="houseHome" v-show="isSwitchHouseDetail">
            <div class="houseHeader"><span class="addHouseBtn" @click="addCover">新增</span></div>
            <ul class="houseMain" >
                <li v-for="(info,index) in memberHouse" :key="index" >
                    <div class="houseDiv"><span>小区/写字楼 : {{info.estateId}}</span><span>房屋类型 : {{houseCategory[info.categoryId]}}</span></div>
                    <div class="houseDiv"><span>地址 : {{info.address}}</span><span>租住状态 : {{rentalStatus[info.rentalStatusId]}}</span></div>
                    <div class="houseBtn">
                        <el-button @click="jumpHouseDetail($event)" :dataId="index" >查看详情</el-button>
                    </div>
                </li>
            </ul>
            <public-pagination></public-pagination>
        </div>
        <el-dialog class="dialogAddHouse" :append-to-body="true" title="新增" :visible.sync="showHouseCover" :before-close="handleClose"> 
            <el-form :model="houseForm" ref="houseForm" label-width="100px" class="demo-houseForm">
                <el-form-item label="小区/写字楼" prop="smallDistrict">
                    <el-select v-model="houseForm.smallDistrict" placeholder="请选择">
                        <el-option  value="更换"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="房屋类型" prop="houseType"> 
                    <el-select v-model="houseForm.houseType" placeholder="请选择">
                        <el-option v-for="(item,key) in houseCategory" :key="key" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="租住状态" prop="houseState">
                    <el-select v-model="houseForm.houseState" placeholder="请选择">
                        <el-option v-for="(item,key) in rentalStatus" :key="key" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-show="isHousing" label="房型" class="house-type-item">
                    <input type="text" v-model="houseForm.room"> 室 
                    <input type="text" v-model="houseForm.office"> 厅 
                    <input type="text" v-model="houseForm.toilet"> 卫 
                    <input type="text" v-model="houseForm.kitchen"> 厨 
                    <input type="text" v-model="houseForm.balcony"> 阳台
                </el-form-item>
                <el-form-item class="house-address-item" label="地址" prop="houseAddress" >
                    <span>
                        <el-select v-model="houseForm.bigDistrict" @change="bigDis" placeholder="请选择">
                            <el-option v-for="(item,index) in houseInfo" :key="index" :label="item.regionName" :value="item.regionName"></el-option> 
                        </el-select>
                        <i>大区</i>
                    </span>
                    <span>
                        <el-select v-model="houseForm.provinceValue" @change="proDis(bigDis())" placeholder="请选择">
                            <el-option v-for="(item,index) in proInfo" :key="index" :label="item.regionName" :value="item.regionName"></el-option>
                        </el-select><i>省</i>
                    </span>
                    <span>
                        <el-select v-model="houseForm.cityValue" @change="cityDis" placeholder="请选择">
                             <el-option v-for="(item,index) in cityInfo" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select><i>市</i>
                    </span>
                    <span>
                        <el-select v-model="houseForm.countyDistrict" @change="countyDis" placeholder="请选择">
                            <el-option v-for="(item,index) in countyInfo" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select><i>县区</i>
                    </span>
                    <span>
                        <el-select v-model="houseForm.streetValue" @change="streetDis" placeholder="请选择">
                            <el-option v-for="(item,index) in option1" :key="index" :label="item.label" :value="item.label"></el-option>
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
         >
        </house-details>
    </div>
</template>
<script>
import publicPagination from '@/components/common/pagination/pagination.vue'
import houseDetails from './HouseDetail.vue'
export default{
    props:[
        'memberHouse','houseCategory','rentalStatus',
    ],
    data () {
        return {
            isClick:false,
            memberHouseDetail:this.memberHouse,
            houseCategoryDetail:this.houseCategory,
            rentalStatusDetail:this.rentalStatus,
            isSwitchHouseDetail:true,
            showHouseCover:false,
            isHousing:false,
            option1:[
                {value: '选项1',label: '黄金糕'}, 
                {value: '选项2',label: '双皮奶'},
            ],
            houseForm: {
                smallDistrict: [],houseType: '',houseState: '',bigDistrict:'',provinceValue:'',
                cityValue:'',countyDistrict:'',streetValue:'',
                streetMore:null,balcony:'',room:'',office:'',
                toilet:'',kitchen:'',
            },
            houseInfo:[],
            proInfo:[],
            cityInfo:[],
            countyInfo:[],
            bigDisId:{},
            proDisId:{},
            cityDisId:{},
        }
    },
    created:function(){
        this.$root.$on('houseShow',() => {
            this.isSwitchHouseDetail = true
        })
    },
    watch:{
        houseForm: {
            handler:function(value,oldValue){
                // console.log(this.houseForm.smallDistrict);
                // console.log(this.houseForm.houseType);
                // console.log(this.houseForm.houseState);
                // console.log(this.houseForm.houseStreet);
                if(this.houseForm.houseType == '住宅'){
                    this.isHousing = true;
                }else{
                    this.isHousing = false;
                }
                // if(this.houseForm.bigDistrict == ){

                // }
            },
            deep:true
        }
    },
    methods: {
        addCover(){ //  新增房屋事件
            var that = this;
            this.showHouseCover = true;
            this.$http.get('/api/public/region/findParent?levels=3')
            .then(res => {
                if (res.data.info == null) {
                    alert(res.data.error)
                } else {
                    that.houseInfo = res.data.info;
                    (res.data.info).forEach(function(e,i){
                    //     //console.log(e,i)
                        that.proInfo = that.houseInfo[e.id-1].sysRegionList;
                        that.bigDisId[e.id]= e.regionName;
                        that.proDisId[e.id] =  that.proInfo;     
                    //     console.log(that.proInfo)
                    //     that.proInfo.forEach(function(e,i){
                    //         // console.log(e,i);
                    //         //that.cityInfo = that.proInfo[i].sysRegionList;
                    //     });
                    });
                    console.log(that.bigDisId);
                    console.log(that.proDisId)
                }
            }).catch(err => {console.log(err)});
        },
        bigDis(){
            console.log(this.houseForm.bigDistrict);
            console.log(this.bigDisId.indexOf(this.houseForm.bigDistrict));
            return this.houseForm.bigDistrict;
        },
        proDis(dis,id){
            console.log(this.houseForm.provinceValue);
            if(this.houseForm.bigDistrict == dis){
                
            }
        },
        cityDis(){
            console.log(this.houseForm.cityValue);
        },
        countyDis(){
            console.log(this.houseForm.countyDistrict);
        },
        streetDis(){
            console.log(this.houseForm.streetValue);
        },
        jumpHouseDetail (event) {
            let number = event.target.parentNode.getAttribute('dataId')
            this.isSwitchHouseDetail = false;
            this.$root.$emit('houseDetailShow',number);
        },
        cancelAlert(formName){
            this.showHouseCover = false;
            this.$refs[formName].resetFields();
        },
        saveFormData(formName){

            this.showHouseCover = false;
            this.$refs[formName].resetFields();
        },
        handleClose(done) {//  新增弹出框关闭按钮的事件
            this.showHouseCover = false
        },
        handleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
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
    }
</style>

<style lang="less" scoped>
.houseHome{
    padding:0 25px 20px;
}
#house{
    background: #fff;
    //min-width:750px;
    .houseHeader{
        padding-top:20px;
        padding-right: 30px;
        height: 60px;
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
                background:#00aeaa;
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
