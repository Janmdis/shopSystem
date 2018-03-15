<template>
    <div id="houseDetail" v-show="isSwitchHouse">
        <div class="detailHeader" >
            <p class="return_back" @click="returnBack"><i class="el-icon-back" ></i></p>
            <p class="edit_btn" @click="editBtn">编辑</p>
        </div>
        <el-form class="houseDetailHeader" :model="houseProps" ref="houseProps" >
            <el-form-item class="houseDetailDiv1">
                <span>小区/写字楼 : <el-select v-model="houseProps.buildings" :filterable="true" :disabled="isEdit" placeholder="请选择">
                    <el-option v-for="(item,index) in smallDisInfo" :key="index" :label="item.name" :value="index"></el-option>
                    </el-select>
                </span>
                <span>租住状态 : <el-select v-model="houseProps.rentalStatus" :disabled="isEdit" placeholder='请选择'>
                    <el-option v-for="(value,key) in rentalStatusDetail" :key="key" :label="value" :value="value"></el-option>
                    </el-select>
                </span>
                <span>房屋类型 : <el-select v-model="houseProps.houseType" :disabled="isEdit" placeholder='请选择'>
                    <el-option v-for="(value,key) in houseCategoryDetail" :key="key" :label="value" :value="value"></el-option>
                    </el-select>
                 </span>
            </el-form-item>
            <el-form-item class="houseDetailDiv2" v-show="isHousing">
                房型 : <input type="text" v-model="houseProps.room" :disabled="isEdit" placeholder='memberHouseDetail[houseNum].areaId'> 室 <input type="text" :disabled="isEdit" v-model="houseProps.office" > 厅 
                <input type="text" :disabled="isEdit" v-model="houseProps.toilet"> 卫 <input type="text" :disabled="isEdit" v-model="houseProps.kitchen"> 厨 
                <input type="text" :disabled="isEdit" v-model="houseProps.balcony"> 阳台
            </el-form-item>
            <el-form-item class="houseDetailDiv3">
                <p>地址 : </p>
                <span>
                    <el-select v-model="houseProps.bigDistrict" :disabled="isEdit" @change="bigDis" placeholder="请选择">
                        <el-option v-for="(item,index) in houseInfo" :key="index" :label="item.regionName" :value="index+1"></el-option>
                    </el-select><i>大区</i>
                </span>
                <span><el-select v-model="houseProps.provinceValue" @change="proDis" :disabled="isEdit" placeholder="请选择">
                        <el-option v-for="(item,index) in proDisId" :key="index" :label="item" :value="index"></el-option>
                    </el-select><i>省</i>
                </span>
                <span><el-select v-model="houseProps.cityValue" @change="cityDis" :disabled="isEdit" placeholder="请选择">
                        <el-option v-for="(item,index) in cityDisId" :key="index" :label="item" :value="index"></el-option>
                    </el-select><i>市</i>
                </span>
                <span><el-select v-model="houseProps.countyDistrict" @change="countyDis" :disabled="isEdit" placeholder="请选择">
                        <el-option v-for="(item,index) in countyInfo" :key="index" :label="item.regionName" :value="item.id"></el-option>
                    </el-select><i>县区</i>
                </span>
                <span><el-select v-model="houseProps.streetValue" @change="streetDis" :disabled="isEdit" placeholder="请选择">
                        <el-option v-for="item in streetInfo" :key="item.value" :label="item.regionName" :value="item.id"></el-option>
                    </el-select><i class="street">街道</i>
                </span>
                <input type="text" placeholder="请输入详细地址" :disabled="isEdit" v-model="houseProps.streetMore" class="detailAddress">
            </el-form-item>
        </el-form>
        <div class="houseDetailMain">
            <div class="mainTable" >
                <div class="tableDes" data-name="家用" data-id="0">家用信息表<el-button class="btn1" @click="handleAdd($event)" data-id="0" data-name="家用" round>新增</el-button><span class="titleSpan1">( 共{{number1}}条 )</span><span @click="showTables($event)">收起</span></div>
                <el-collapse-transition>
                    <div v-show="showTable1">
                        <el-table class="transition-box" v-show="showTable1" :data="houseEquipment1" height="208" border style="width: 100%">
                            <el-table-column prop="name" label='家用设备'></el-table-column>
                            <el-table-column prop="brand" label="品牌"></el-table-column>
                            <el-table-column prop="specification" label="型号"></el-table-column>
                            <el-table-column prop="isReplaced" label="是否更换"></el-table-column>
                            <el-table-column prop="name" label="保养记录"></el-table-column>
                            <el-table-column prop="opration" label="操作">
                                <template slot-scope="scope">
                                    <el-button class="btn1 btn0" size="mini" data-name="家用" @click="handleEdit(scope.$index, scope.row,$event)">编辑</el-button>
                                    <el-button class="btn2 btn00" size="mini" data-name="家用" type="danger" @click="handleDelete(scope.$index, scope.row,$event)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-collapse-transition>
            </div>
            <div class="mainTable" >
                <div class="tableDes" data-name="家装" data-id="1">家装信息表<el-button class="btn1 btn2" @click="handleAdd($event)" data-name="家装" data-id="1" round>新增</el-button><span class="titleSpan1">( 共{{number2}}条 )</span><span @click="showTables($event)">收起</span></div>
                <el-collapse-transition>
                    <div v-show="showTable2">
                        <el-table  :data="houseEquipment2" border style="width: 100%" height="208">
                            <el-table-column prop="name" label="家用设备"></el-table-column>
                            <el-table-column prop="brand" label="品牌"></el-table-column>
                            <el-table-column prop="specification" label="型号"></el-table-column>
                            <el-table-column prop="isReplaced" label="是否更换"></el-table-column>
                            <el-table-column prop="name" label="保养记录"></el-table-column>
                            <el-table-column prop="opration" label="操作">
                                <template slot-scope="scope">
                                    <el-button class="btn1 btn0" size="mini" data-name="家装" @click="handleEdit(scope.$index, scope.row,$event)">编辑</el-button>
                                    <el-button class="btn2 btn00" size="mini" type="danger" data-name="家装" @click="handleDelete(scope.$index, scope.row,$event)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-collapse-transition>
            </div>
            <!-- <div class="houseDetailBtn"><el-button class="btn1" round>保存</el-button></div> -->
        </div>
        <el-dialog class="dialog1" v-if="add_alert" :append-to-body="true" title="新增" :visible.sync="dialogVisible" :before-close="handleClose"> 
            <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
                <el-form-item v-if="showItem" id="equipment" label="家用设备" prop="equipName">
                    <el-input v-model="ruleForm1.equipName"></el-input>
                </el-form-item>
                <el-form-item v-else id="equipment" label="家装设备" prop="equipName">
                    <el-input v-model="ruleForm1.equipName"></el-input>
                </el-form-item>
                <el-form-item label="是否更换" prop="isChange"> 
                    <el-select v-model="ruleForm1.isChange" placeholder="">
                        <el-option label="是" value=1></el-option>
                        <el-option label="否" value=0></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="品牌" prop="equipBrand">
                    <el-input v-model="ruleForm1.equipBrand"></el-input>
                </el-form-item>
                <el-form-item label="型号" prop="equipTypeNumber">
                    <el-input v-model="ruleForm1.equipTypeNumber"></el-input>
                </el-form-item>
                <el-form-item label="保养记录" prop="equipMaintain">
                    <el-input type="textarea" :rows="2" v-model="ruleForm1.equipMaintain"></el-input>
                </el-form-item>
                <el-form-item>
                    <span class="dialog-footer">
                        <el-button @click="cancelAlert('ruleForm1')">取 消</el-button>
                        <el-button type="primary" @click="saveFormData('ruleForm1',$event)">确 定</el-button>  
                    </span>
                </el-form-item>
            </el-form>    
        </el-dialog>
        <el-dialog class="dialog2" v-else :append-to-body="true" title="编辑" :visible.sync="dialogVisible" :before-close="handleClose"> 
            <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item v-if="showItem" id="equipment" label="家用设备" prop="equipName">
                    <el-input v-model="ruleForm2.equipName"></el-input>
                </el-form-item>
                <el-form-item v-else id="equipment" label="家装设备" prop="equipName">
                    <el-input v-model="ruleForm2.equipName"></el-input>
                </el-form-item>
                <el-form-item label="是否更换" prop="isChange"> 
                    <el-select v-model="ruleForm2.isChange" placeholder="">
                        <el-option label="是" value=1></el-option>
                        <el-option label="否" value=0></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="品牌" prop="equipBrand">
                    <el-input v-model="ruleForm2.equipBrand"></el-input>
                </el-form-item>
                <el-form-item label="型号" prop="equipTypeNumber">
                    <el-input v-model="ruleForm2.equipTypeNumber"></el-input>
                </el-form-item>
                <el-form-item label="保养记录" prop="equipMaintain">
                    <el-input type="textarea" :rows="2" v-model="ruleForm2.equipMaintain"></el-input>
                </el-form-item>
                <el-form-item>
                    <span class="dialog-footer">
                        <el-button @click="cancelAlert('ruleForm2')">取 消</el-button>
                        <el-button type="primary" @click="saveFormData2('ruleForm2',$event)">确 定</el-button>  
                    </span>
                </el-form-item>
            </el-form>    
        </el-dialog>
    </div>
</template>
<script>
export default {
    props:[
        'memberHouseDetail','houseCategoryDetail','rentalStatusDetail',
        'smallDisInfo','memberIdChild'
    ],
    data () {
        return {
            showTable1:true,
            showTable2:true,
            add_alert:true,
            showItem:true,
            houseId:'',
            houseGeoryId:[],
            houseGeory:[],
            allAddress:{},
            isEdit:true,
            isSwitchHouse:false,
            isHousing:true,
            dialogVisible: false,
            houseProps:{
                buildings:'',rentalStatus:'',houseType:'',balcony:'',room:'',office:'',
                toilet:'',kitchen:'',bigDistrict:'',provinceValue:'',cityValue:'',countyDistrict:'',
                streetValue:'',streetMore:'',square:'',
            },
            houseInfo:[],
            proInfoList:[],
            proInfo:[],
            cityInfoList:[],
            cityInfo:[],
            countyInfo:[],
            streetInfo:[],
            bigDisId:{},
            proDisId:{},
            cityDisId:{},
            houseEquipment1:[],
            houseEquipment2:[],
            ruleForm1: {equipName: '',isChange: '',equipBrand: '',equipTypeNumber: '',equipMaintain:'',desc:''},
            ruleForm2: {equipName: '',isChange: '',equipBrand: '',equipTypeNumber: '',equipMaintain:'',desc:''},
            rules: {
                equipName: [
                    { required: true, message: '请填入设备', trigger: 'blur' },
                ],
                isChange: [
                    { required: true, message: '是否切换', trigger: 'change' }
                ],
                equipBrand: [
                    { required: true, message: '请填入品牌', trigger: 'blur' }
                ],
                equipTypeNumber: [
                    { required: true, message: '请填入型号', trigger: 'blur' }
                ],
                equipMaintain: [
                    { required: true, message: '请填入保养记录', trigger: 'blur' }
                ]
            },
            equipmentInfo:{}, 
            addData:{},
            editData:{},
            boxName:'',
            editName:'',
            editType:'',
            id_type:'',
            number1:0,
            number2:0,
        }
    },
    created:function(){
        this.searchInfo();
        this.houseGeoryIds();
        this.$root.$on('houseDetailShow',()=>{
            this.isSwitchHouse=true; 
        });
        let that = this;
        this.$http.get('/api/public/region/findMapList')
        .then(res => {
            that.allAddress = res.data.info;  
            // console.log( that.allAddress )
            sessionStorage.setItem('address',JSON.stringify(that.allAddress));
        }).catch(err => {console.log(err)});
    },
    mounted(){
        this.searchEquip();
    },
    watch:{
        houseProps: {
            handler:function(value,oldValue){
                // console.log(this.houseProps.houseBuilding);
                // console.log(this.houseProps.houseType);
                // console.log(this.houseProps.rentalStatus);
                // console.log(this.houseProps.houseStreet);
                if(this.houseProps.houseType == '住宅'){
                    this.isHousing = true;
                }else{
                    this.isHousing = false;
                }
            },
            deep:true
        },
        memberHouseDetail:function(){
            let address = JSON.parse(sessionStorage.getItem('address'));
            this.houseProps.buildings = this.memberHouseDetail.housingEstate;
            this.houseProps.rentalStatus = this.rentalStatusDetail[this.memberHouseDetail.rentalStatusId];
            this.houseProps.houseType = this.houseCategoryDetail[this.memberHouseDetail.categoryId];
            this.houseProps.balcony = this.memberHouseDetail.balconyQuantity;this.houseProps.room = this.memberHouseDetail.roomQuantity;this.houseProps.office = this.memberHouseDetail.hallQuantity;
            this.houseProps.toilet = this.memberHouseDetail.toiletQuantity,this.houseProps.kitchen = this.memberHouseDetail.kitchenQuantity,
            this.houseProps.bigDistrict = address[this.memberHouseDetail.areaId];
            this.houseProps.provinceValue = address[this.memberHouseDetail.provinceId];
            this.houseProps.cityValue = address[this.memberHouseDetail.cityId];
            this.houseProps.countyDistrict = address[this.memberHouseDetail.districtId];
            this.houseProps.streetValue = this.memberHouseDetail.regionName;
            this.houseProps.streetMore = this.memberHouseDetail.address;
            this.houseId = this.memberHouseDetail.id;
            this.houseGeoryId = this.memberHouseDetail.categoryId;
        }
    },
    methods:{
        showTables(event){
            if(event.target.parentNode.getAttribute("data-name") == "家用"){
                if(event.target.innerHTML = "收起"){
                    event.target.innerHTML = "展开";
                    this.showTable1 = !this.showTable1;
                }else if(event.target.innerHTML = "展开"){
                    event.target.innerHTML = "收起";
                    this.showTable1 = !this.showTable1;
                } 
            }else if(event.target.parentNode.getAttribute("data-name") == "家装"){
                if(event.target.innerHTML = "收起"){
                    event.target.innerHTML = "展开";
                    this.showTable2 = !this.showTable2;
                }else if(event.target.innerHTML = "展开"){
                    event.target.innerHTML = "收起";
                    this.showTable2 = !this.showTable2;
                } 
            }      
        },
        searchEquip(){
            let that = this;
            //  判断家装还是家用
            this.$http({
                url:'/api/customer/housingConstituteCategory/queryCategory',
                method:'POST',
            }).then(res => {
                that.houseGeory = res.data.info;
                that.houseGeory.forEach(function(e,i){
                    if(e.name == '家用设备'){
                        //  调取家用设备信息表
                        that.houseGeoryId = 1;
                        that.$http({
                            url:'/api/customer/housingConstitute/queryHousingConstitute',
                            method:'POST',
                            data:{'categoryId':that.houseGeoryId}
                        }).then(res => {
                            that.houseEquipment1 = res.data.info.list;
                            that.number1 = that.houseEquipment1.length;
                            that.houseEquipment1.forEach(function(e,i){
                                if(e.isReplaced == true){
                                    e.isReplaced = '是';
                                }else if(e.isReplaced == false){
                                    e.isReplaced = '否';
                                }
                            });
                        }).catch(err => {console.log(err)});
                    }
                    if(e.name == '家装设备'){
                        //  调取家用设备信息表
                        that.houseGeoryId = 2;
                        that.$http({
                            url:'/api/customer/housingConstitute/queryHousingConstitute',
                            method:'POST',
                            data:{'categoryId':that.houseGeoryId}
                        }).then(res => {
                            that.houseEquipment2 = res.data.info.list;
                            that.number2 = that.houseEquipment2.length;
                            that.houseEquipment2.forEach(function(e,i){
                                if(e.isReplaced == true){
                                    e.isReplaced = '是';
                                }else if(e.isReplaced == false){
                                    e.isReplaced = '否';
                                }
                            });
                        }).catch(err => {console.log(err)});
                    }
                }); 
            }).catch(err => {console.log(err)});
        },
        houseGeoryIds:function(){
            let that = this;
            this.$http({
                url:'/api/customer/housingConstituteCategory/queryCategory',
                method:'POST',
            }).then(res => {
                that.houseGeoryId = res.data.info;
            }).catch(err => {console.log(err)});
        },
        searchInfo(){
            //  查询地址信息
            let that = this;
            this.$http.get('/api/public/region/findParent?parentId=0&levels=3')
            .then(res => {
                if (res.data.info == null) {
                    alert(res.data.error)
                } else {
                    that.houseInfo = res.data.info;
                    (that.houseInfo).forEach(function(e,i){
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
        },    
        bigDis(){
            let that = this;
            that.proDisId = {};
            that.houseProps.provinceValue = '',
            that.houseProps.cityValue = '',
            that.houseProps.countyDistrict = '',
            that.houseProps.streetValue = '',
            that.proInfo.forEach(function(e,i){
                if(e.parentCode == (that.houseProps.bigDistrict)){
                    that.proDisId[e.id] = e.regionName;
                }
            });
        },
        proDis(){
            let that = this;
            that.cityDisId = {};
            that.houseProps.cityValue = '',
            that.houseProps.countyDistrict = '',
            that.houseProps.streetValue = '',
            that.cityInfo.forEach(function(e,i){
                if(e.parentCode == (that.houseProps.provinceValue)){
                    that.cityDisId[e.id] = e.regionName;
                }
            });
            console.log(that.houseProps.provinceValue);
        },
        cityDis(){
            console.log(this.houseProps.cityValue);
            this.houseProps.countyDistrict = '',
            this.houseProps.streetValue = '',
            this.$http.get('/api/public/region/findParent?parentId='+this.houseProps.cityValue)
            .then(res => {
                this.countyInfo = res.data.info;
            }).catch(err => {console.log(err)});
        },
        countyDis(){
            console.log(this.houseProps.countyDistrict);
            this.houseProps.streetValue = '',
            this.$http.get('/api/public/region/findParent?parentId='+this.houseProps.countyDistrict)
            .then(res => {
                //console.log(res.data.info);
                this.streetInfo = res.data.info;
            }).catch(err => {console.log(err)});
        },
        streetDis(){
            console.log(this.houseProps.streetValue);
            let street = document.getElementsByClassName('detailAddress')[0];
            street.focus();
        },
        returnBack(){
            this.isSwitchHouse = false
            this.$root.$emit('houseShow')
        },
        editBtn(){
            let texts = document.getElementsByClassName('edit_btn')[0].innerHTML;
            console.log(texts);
            if(texts == '编辑'){
                this.isEdit = false;
                document.getElementsByClassName('edit_btn')[0].innerHTML = '保存';
            }else if(texts ==  '保存'){
                this.isEdit = true;
                document.getElementsByClassName('edit_btn')[0].innerHTML = '编辑';
                let dataInfo = {
                'id':this.houseId,
                'estateId':this.houseProps.buildings.id,
                'areaId':parseInt(this.houseProps.bigDistrict),
                'provinceId':parseInt(this.houseProps.provinceValue),
                'cityId':parseInt(this.houseProps.cityValue),
                'districtId':parseInt(this.houseProps.countyDistrict),
                'regionId':parseInt(this.houseProps.streetValue),
                'address':this.houseProps.streetMore,
                'categoryId':this.houseProps.houseType,
                'acreage':parseInt(this.houseProps.square),
                'rentalStatusId':this.houseProps.rentalStatus,
                'roomQuantity':parseInt(this.houseProps.room),
                'hallQuantity':parseInt(this.houseProps.office),
                'toiletQuantity':parseInt(this.houseProps.toilet),
                'kitchenQuantity':parseInt(this.houseProps.kitchen),
                'balconyQuantity':parseInt(this.houseProps.balcony)
                };
                this.$http({//  添加房屋信息
                    url:'/api/customer/housingInfo/updateHousingInfo',
                    method:'POST',
                    data:(dataInfo),
                }).then(res => {
                    console.log(res.data.msg);
                }).catch(err => {console.log(err)});
            }
        },
        handleClose(done) {//  新增弹出框关闭按钮的事件
            this.dialogVisible = false;
        },
        handleAdd(event){
            this.add_alert = true;
            this.dialogVisible = true;
            this.id_type = event.target.parentNode.getAttribute("data-id");
            this.boxName = event.target.parentNode.getAttribute("data-name");
            if(this.boxName == '家用'){
                this.showItem = true;
            }else{
                this.showItem = false;
            }   
        },
        handleDelete(index, row,event) { //  删除某一种的设备
            let that = this;
            event.target.parentNode.setAttribute("data-name","编辑");
            this.editName = document.getElementsByClassName("btn00")[0].childNodes[2].innerHTML;
            this.editType = event.target.parentNode.getAttribute("data-name");
            console.log(this.editName,this.editType);
            this.$confirm('确定删除'+ row.brand +row.name+'吗?', '提示', 
                {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'})
            .then(() => {
                that.$message({
                    type: 'success',
                    message: '删除成功!',
                    duration:800,
                    onClose:that.$http.post('/api/customer/housingConstitute/deleteHousingConstitute',
                        [row.id]
                    ).then(res => {
                        console.log(res.data);
                        that.searchEquip();
                    }).catch(err => {console.log(err)})
                });
            }).catch(() => {
                that.$message({
                    type: 'info',
                    message: '已取消删除',
                    duration:800
                });          
            });   
        },
        handleEdit(index, row,event) {
            this.add_alert = false;
            this.equipmentInfo = row;
            event.target.parentNode.setAttribute("data-name","删除");
            this.editType = event.target.parentNode.getAttribute("data-name");
            this.editName = document.getElementsByClassName("btn0")[0].childNodes[2].innerHTML;
            console.log(this.editName,this.editType);
            if(this.editType == '家用'){
                this.showItem = true;
            }else{
                this.showItem = false;
            }
            this.ruleForm2.equipName = this.equipmentInfo.name;
            this.ruleForm2.isChange = this.equipmentInfo.isReplaced;
            this.ruleForm2.equipBrand = this.equipmentInfo.brand;
            this.ruleForm2.equipTypeNumber = this.equipmentInfo.specification;
            this.ruleForm2.equipMaintain = this.equipmentInfo.housingConstituteMaintenanceRecordList;
            this.dialogVisible = true;
        },
        cancelAlert(formName){
            this.dialogVisible = false;
            this.$refs[formName].resetFields();
        },
        saveFormData2(formName){
            let that = this;
            if( this.editType == '家用' && this.editName == '编辑'){
                this.$http.post('/api/customer/housingConstitute/updateHousingConstitute',{
                    "housingId":this.memberHouseDetail.id,"categoryId":this.equipmentInfo.categoryId,
                    "name":this.ruleForm2.equipName,"specification":this.ruleForm2.equipTypeNumber,
                    "isReplaced":this.ruleForm2.isChange-0,"brand":this.ruleForm2.equipBrand,
                    "id":this.equipmentInfo.id
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message:res.data.msg,
                        duration:800,
                        onClose:function(){
                            that.searchEquip();
                        }
                    });
                }).catch(err => {console.log(err)});
            }else if(this.editType == '家装' && this.editName == '编辑'){
                console.log(this.equipmentInfo);
                this.$http.post('/api/customer/housingConstitute/updateHousingConstitute',{
                    "housingId":this.memberHouseDetail.id,"categoryId":this.equipmentInfo.categoryId,
                    "name":this.ruleForm2.equipName,"specification":this.ruleForm2.equipTypeNumber,
                    "isReplaced":this.ruleForm2.isChange-0,"brand":this.ruleForm2.equipBrand,
                    "id":this.equipmentInfo.id
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message:res.data.msg,
                        duration:800,
                        onClose:function(){
                            that.searchEquip();
                        }
                    });
                }).catch(err => {console.log(err)});
            }
            this.dialogVisible = false;
            this.$refs[formName].resetFields();
        },
        saveFormData(formName){
            let that = this;
            if(this.boxName == "家用"){
                this.showItem = true;
                this.addData = {
                    "housingId":this.memberHouseDetail.id,"categoryId":this.houseGeory[this.id_type].id,
                    "name":this.ruleForm1.equipName,"specification":this.ruleForm1.equipTypeNumber,
                    "isReplaced":this.ruleForm1.isChange-0,"brand":this.ruleForm1.equipBrand
                };
                this.$http({
                    url:'/api/customer/housingConstitute/addHousingConstitute',
                    method:'POST',
                    data:[that.addData]
                }).then(res => {
                    console.log(res.data.msg);
                    that.searchEquip();
                }).catch(err => {console.log(err)});
            }else if(this.boxName == "家装"){
                this.showItem = false;
                this.addData = {
                    "housingId":this.memberHouseDetail.id,"categoryId":this.houseGeory[this.id_type].id,
                    "name":this.ruleForm1.equipName,"specification":this.ruleForm1.equipTypeNumber,
                    "isReplaced":this.ruleForm1.isChange-0,"brand":this.ruleForm1.equipBrand
                };
                this.$http({
                    url:'/api/customer/housingConstitute/addHousingConstitute',
                    method:'POST',
                    data:[that.addData]
                }).then(res => {
                    console.log(res.data.msg);
                    that.searchEquip();
                }).catch(err => {console.log(err)});
            }
            this.dialogVisible = false;
            this.$refs[formName].resetFields(); 
        }
    },
    beforeDestroy(){
        this.$root.$off('houseDetailShow')
    }
}
</script>
<style lang="less">
.mainTable{
    table td:nth-child(3) .cell{
        border:none;
    }
    .el-table__header,.el-table__body{
        table-layout: auto;
    }
    .el-table th:nth-child(6) .cell{
        width: 142px;
    }
    .el-table td:nth-child(6) .cell{
        width: 142px;
        display:flex;
        flex-wrap: wrap;
        justify-content:space-between;
    }
}
.houseDetailHeader{
    .el-input--suffix .el-input__inner{
        text-align: center;
    }
}
.houseDetailDiv3{
    .el-form-item__content{
        display:flex;
        flex-wrap: wrap;
    }
}
.el-select-dropdown__item{
    padding:0 20% !important;
}
#houseDetail{
    .el-table__body-wrapper{
        
    }
    .el-button.btn1{
        background:#fff;
        color:#00c0be;
    }
    .el-button.btn1:hover{
        background:#00c0be;
        color:#fff;
    }
} 
.dialog1 .el-dialog,.dialog2 .el-dialog{//  点击增加弹出框样式
    width: 35%;
    min-width: 470px;
    .el-dialog__body{
        .el-form{
            display:flex;
            flex-wrap:wrap;
            justify-content: space-between;
            .el-form-item{
                width:40%;
                margin-bottom:35px;
            }
            .el-form-item:nth-child(even){
                margin-right:5%;
            }
            .el-form-item:nth-child(5){
                width: 95%;
                .el-textarea__inner{
                    resize: none;
                }
            }
            .el-form-item:nth-child(6){
                width: 95%;
                padding:0 10% 0 15%;
                text-align: center;
                .el-form-item__content{
                    margin-left:0 !important;
                }
            }
        }
    }
}
</style>
<style lang="less" scoped>
.detailHeader{
    margin:20px 20px 0 20px;
    display:flex;
    justify-content: space-between;
    align-items:center;
    .return_back{
        width: 28px;
        height: 28px;
        line-height: 30px;
        text-align: center;
        border-radius:50%;
        border:2px solid #00c0be;
        cursor: pointer;
        i{
            color:#00c0be;
            font-size:20px;
            font-weight:900;
        }
    }
    .edit_btn{
        cursor: pointer;
        padding:8px 30px;
        text-align: center;
        border-radius:20px;
        border:1px solid #ccc;
        color:#00c0be;
        margin-right:10%;
    }
    .edit_btn:hover{
        background: #00c0be;
        color:#fff;
    }
}
#houseDetail{
    min-width: 750px;
    background: #fff;
    padding-bottom:60px;
    position: relative;
    .houseDetailHeader{
            width: 100%;
            font-size: 14px;
            color:#666;
            border-bottom:2px solid #ddd;
            .el-form-item{
                margin-bottom: 0;
            }
            .houseDetailDiv1{      
                padding: 35px 50px 0px 50px;
                .el-form-item__content{
                    line-height:20px;
                }
                span{
                    display:inline-block;
                    width:45%;
                    .el-select{
                        margin-left:15px;
                        margin-top:-21px;
                        width: 150px !important;
                    }
                }
                span:nth-child(even){
                    margin-left: 20px;
                }
                span:last-child{
                    margin-top: 30px;
                    .el-select{
                        margin-left:35px;
                    }
                }
            }
            .houseDetailDiv2{
                padding: 20px 90px 0 50px;
                input{
                    width: 40px;
                    border-bottom:1px solid #ddd;
                    margin:0 5px;
                    text-align:center;
                    outline:none;
                }
            }
            .houseDetailDiv3{
                padding: 20px 90px 20px 50px;
                p{
                    width: 60px;
                    min-width:40px;
                    line-height:40px;
                }
                span{
                    width:30%;
                    line-height:40px;
                    .el-select{
                        width: 70% !important;
                    }
                    i{
                        min-width:30px;
                        font-style:normal;
                        margin-left:15px;
                    }
                    i.street{
                        padding-right:10px !important;;
                    }
                }
                span:nth-of-type(n+4){
                    margin-top: 20px;
                }
                input:last-child{
                    margin-top: 20px;
                }
                .detailAddress{
                    height:10px;
                    border:1px solid #ddd;
                    border-radius:5px;
                    outline:none;
                    padding:15px;
                }
            }
    }
    .houseDetailMain{
        padding: 0 90px 50px 50px;
        .mainTable{
            .tableDes{
                margin:35px 0;
                font-size:17px;
                font-weight:500;
                color:#00c0be;
                position: relative;
                span{
                    cursor: pointer;
                    position: absolute;
                    right: 0;
                    color:#ef7747;
                }
                span.titleSpan1{
                    right:70px;
                    cursor: default;
                    color:#666;
                }
                .el-button{
                    width: 100px;
                    background:#fff;
                    color:#00c0be;
                    margin-left:45px;
                    position: absolute;
                    top:-12px;
                }
                .el-button:hover{
                    background:#00c0be;
                    color:#fff;
                }   
            }
        }
    }
}
</style>

