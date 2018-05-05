<template>
    <div class='detailcommodity off' ref='detailcommodity'>
        <el-row  class='contain'>
            <el-col :span="12" >
                <el-row>
                    <el-form ref="formmsg" class='formmsg' :model="formmsg" :rules="rules" label-width="80px">
                        <el-form-item label="标题：" prop='name'>
                            <el-input v-model="formmsg.name"></el-input>
                        </el-form-item>
                        <el-row :gutter='20'>
                            <el-col :span='12'>
                                <el-form-item label="详情页：">
                                    <el-input v-model="formmsg.detailTemplateInfoName" placeholder="请查询" :disabled="true"></el-input>
                                    <el-button type="primary" @click.native="selectDetailPage">查询详情页</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span='12'>
                                <el-form-item label="分类：" prop='categoryId'>
                                    <el-select v-model="formmsg.categoryId" placeholder="请选择" @change='changegoodstype'>
                                        <el-option
                                        v-for="item in goodstype"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter='20'>
                            <el-col :span='12'>
                                <el-form-item label="品牌：" prop='brand'>
                                    <el-input v-model="formmsg.brand"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span='12'>
                                <el-form-item label="库存：" prop='displayQuantity'>
                                    <el-input v-model="formmsg.displayQuantity"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter='20'>
                            <el-col :span='12'>
                                <el-form-item label="价格：" prop='originalPrice'>
                                    <el-input v-model="formmsg.originalPrice"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span='12'>
                                <el-form-item label="销量：" prop='totalSales'>
                                    <el-input v-model="formmsg.totalSales"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="商品规格：" prop='options'>
                            <!-- <el-input type="textarea" v-model="formmsg.options" ></el-input> -->
                            <transition name="fade">
                            <el-button type="primary" @click="addOptions" v-if="addOptionBtn">添加规格</el-button>
                            </transition>
                            <transition name="fade">
                                <el-col :span='24' v-if="addOptionsShow" style="padding: 10px 10px;border-radius: 5px;border: 1px solid #c0c4cc;">
                                    <el-col :span='24'>
                                        <el-col :span='4'>规格名称：</el-col>
                                        <el-col :span='8'>
                                            <el-input v-model="specificationName"></el-input>
                                        </el-col>
                                    </el-col>
                                    <el-col :span='24'>
                                        <el-col :span='4' style="padding-left: 14px;">规格值：</el-col>
                                        <el-col :span='20'>
                                            <el-tag
                                            :key="tag"
                                            v-for="tag in dynamicTags"
                                            closable
                                            :disable-transitions="false"
                                            @close="handleClose(tag)">
                                            {{tag}}
                                            </el-tag>
                                            <el-input
                                            class="input-new-tag"
                                            v-if="inputVisible"
                                            v-model="inputValue"
                                            ref="saveTagInput"
                                            size="small"
                                            @keyup.enter.native="handleInputConfirm"
                                            @blur="handleInputConfirm"
                                            >
                                            </el-input>
                                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新 规格值</el-button>
                                        </el-col>
                                    </el-col>
                                    <el-col :span='24' style="margin-top: 16px;">
                                        <el-button type="primary" @click="sureAddOptions" style="height:30px;line-height: 5px;">确认</el-button>
                                        <el-button type="primary" @click="closeAddOptions" style="height:30px;line-height: 5px;">取消</el-button>
                                    </el-col>
                                </el-col>
                            </transition>
                            <transition name="fade">
                                <transition-group>
                                    <el-col :span='24' v-if="specificationArr.length == 0?false:true" v-for="(item,index) in specificationArr" :key="index" style="padding: 10px 10px;border-radius: 5px;border: 1px solid #c0c4cc;margin-top: 15px;">
                                        <el-col :span='24'>
                                            <el-col :span='20' style="font-size: 18px;">{{ item.name }}</el-col>
                                            <el-col :span='4'>
                                                <span style="font-size: 18px;"></span>
                                                <span @click="tagUpdata(index)" style="color: #27a1f2;display:inline-block;margin-right:15px;cursor:pointer;">编辑</span>
                                                <span @click="deleteUpdata(index)" style="color: #ff3b30;cursor:pointer;">删除</span>
                                            </el-col>
                                        </el-col>
                                        <el-col :span='24'>
                                                <el-tag
                                                :key="tag"
                                                v-for="tag in item.value"
                                                :closable="item.tagIsUpdata"
                                                :disable-transitions="false"
                                                @close="handleCloses(tag,index)">
                                                {{tag}}
                                                </el-tag>
                                                <el-input
                                                class="input-new-tag"
                                                v-if="item.inputVisibles"
                                                v-model="item.inputValues"
                                                ref=index
                                                size="small"
                                                @keyup.enter.native="handleInputConfirms(index)"
                                                @blur="handleInputConfirms(index)"
                                                >
                                                </el-input>
                                                <el-button v-show="item.tagIsUpdata" v-else class="button-new-tag" size="small" @click="showInputs(index)">+ New Tag</el-button>
                                        </el-col>
                                        <el-col :span='24' v-if="item.tagIsUpdata" style="margin-top: 16px;">
                                            <el-button type="primary" @click="sureModifyOptions(index)" style="height:30px;line-height: 5px;">确认</el-button>
                                            <el-button type="primary" @click="closeModifyOptions(index)" style="height:30px;line-height: 5px;">取消</el-button>
                                        </el-col>
                                    </el-col>
                               </transition-group>
                            </transition>
                        </el-form-item>
                        <el-form-item label="描述：" prop='desc'>
                            <el-input type="textarea" v-model="formmsg.desc" ></el-input>
                        </el-form-item>
                        <el-form-item label="" prop=''>
                            <el-row :gutter='20'>
                                <el-col :span='4'>
                                    <el-checkbox v-model="pointsDeduction">允许积分抵扣</el-checkbox>
                                </el-col>
                                <el-col :span='5' v-show="pointsDeduction?true:false">
                                        <el-input v-model="pointsNum"></el-input>
                                </el-col>
                                <el-col :span='2' v-show="pointsDeduction?true:false" style="padding-left:0px;padding-right:0px;">
                                        积分抵扣
                                </el-col>
                                <el-col :span='4' v-show="pointsDeduction?true:false">
                                        <el-input v-model="pointsMoney"></el-input>
                                </el-col>
                                <el-col :span='2' v-show="pointsDeduction?true:false" style="padding-left:0px;">
                                        元
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="" prop=''>
                            <el-row :gutter='20'>
                                <el-col :span='3'>
                                    <el-checkbox v-model="sendPoints">送积分</el-checkbox>
                                </el-col>
                                <el-col :span='4' v-show="sendPoints?true:false" style="padding-left:0px;">
                                        <el-input v-model="sendPointsNum"></el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="图片：">
                            <div class="mTop">
                                <el-upload
                                class="avatar-uploader"
                                :action="importFileUrl"
                                :data='imgdata'
                                :show-file-list="false"
                                :multiple='false'
                                name='fileUpload'
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class='tips'>
                                    <p>提示：1.本地上传图片大小不超过500k，750*678像素（建议尺寸）</p>
                                    <p style='text-indent:3em;'>2.最多可上传5张图片</p>
                                </div>
                            </div>
                            <ul class='imglist'>
                                <li v-for="(item,index) in listimg" :key="index" :dataid='item.id' :dataorder='item.displayOrder' >
                                    <i class='close' @click="deleteimg(index,item.id)">X</i>
                                    <img :src="item.url" alt="">
                                    <span class='opera'>
                                        <i class='left icon iconfont arrow-left icon-arrowleft' @click='changeimgindex(index,"left")'></i>
                                        <i class='right icon iconfont arrow-right icon-arrowright' @click='changeimgindex(index,"right")'></i>
                                    </span>
                                </li>
                            </ul>
                        </el-form-item>
                    </el-form>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row class='timemodel'>
                    <el-row class='selectmodal'>
                        <el-col :span='5'>
                            <el-select v-model="tmselected" placeholder="选择模板" @change='changedatemodel'>
                                <el-option
                                v-for="item in listmodaltime"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span='4'>
                            <el-button type="primary" size='small' @click="createdatemodal">新建模板</el-button>
                        </el-col>
                    </el-row>
                    <el-row style='margin:10px 10%;'>
                        <el-col :span='10' style='font-size:12px;'>
                            <el-input v-model="tmvalue" class='title none' disabled  placeholder=""></el-input>
                            <!-- <span class='title'>{{tmvalue}}</span> -->
                        </el-col>
                        <el-col :span='10' :offset='4' style='text-align:right;'>
                            <el-button plain type="primary" size='mini' @click='edittimetable'>编辑</el-button>
                            <el-button plain type="danger" size='mini' @click='deletetimetable'>删除</el-button>
                        </el-col>
                    </el-row>
                    <el-table
                    class='ssss'
                    :data="listtime"
                    border
                    size='mini'
                    style="width: 80%;margin:0 auto;"
                    v-loading='loadingdate'>
                        <el-table-column
                            prop='date'
                            min-width='100'
                            label="">
                            <template slot-scope="scope" :span='10'>
                                <span>{{scope.row.date}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width='60'
                            label="一">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.monday" :disabled='disabled'></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width='60'
                            label="二">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.tuesday" :disabled='disabled' ></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width='60'
                            label="三">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.wednesday" :disabled='disabled'></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width='60'
                            label="四">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.thursday" :disabled='disabled'></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width='60'
                            label="五">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.friday" :disabled='disabled'></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width='60'
                            label="六">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.saturday" :disabled='disabled'></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width='60'
                            label="七">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.sunday" :disabled='disabled'></el-checkbox>
                            </template>
                        </el-table-column>
                        
                    </el-table>
                    <el-button type="primary" style='height:30px;line-height:5px;float:right;margin:10px 10%;' @click='savetimetable'>保存</el-button>
                </el-row>
                <el-row class='areaservice'>
                    <el-row class='selectmodal'>
                        <el-col :span='5'>
                            <el-select v-model="areamselected" placeholder="选择模板" @change='changeareamodel'>
                                <el-option
                                v-for="item in listmodalarea"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span='4'>
                            <el-button type="primary" size='small' @click="createareamodal">新建模板</el-button>
                        </el-col>
                    </el-row>
                    <el-row style='margin:10px 10%;'>
                        <el-col :span='8' style='font-size:12px;'>
                            <el-input v-model="areamvalue" class='title none' disabled  placeholder=""></el-input>
                        </el-col>
                        <el-col :span='16' :offset='0' class='btns'>
                            <el-button plain type="danger" size='mini' @click="deleteareamodal">删除</el-button>
                            <el-button plain type="primary" size='mini' @click="editareamodal">编辑</el-button>
                            <el-col :span='7'>
                                <el-cascader
                                :options="listcitys"
                                :show-all-levels="false"
                                v-model="cityvalue"
                                @change='changecity'
                                :disabled='disablecity'
                                ></el-cascader>
                            </el-col>
                        </el-col>
                    </el-row>
                    <el-row>
                        <div class='areas'>
                            <ul  v-loading='loadingarea'>
                            <li v-for='item in listarea' :key='item.id' :class='{active:item.isActive}' :dataid='item.id'  @click="selectarea(item.id,$event)">
                                    {{item.regionName}}
                                </li>
                            </ul>
                        </div>
                    </el-row>
                    <el-button type="primary" style='height:30px;line-height:5px;float:right;margin:10px 10%;' @click='savetemparea'>保存</el-button>                
                </el-row>
            </el-col>
        </el-row>
        <el-row class='btnsgroup'>
            <el-button  plain @click="resetForm">重置</el-button>
            <el-button  plain >预览</el-button>
            <el-button type="primary" @click.native="savedata">保存</el-button>
        </el-row>
        
    </div>
   
</template>
<script>

// import imgUp from './userChildren/ImgUp.vue'
export default {
    // components:{imgUp},
    data(){
        var checkPrice=(rule,value,callback)=>{
            var pattern = /^(-?\d*.?\d*)$/;
            console.log(value=='');
            if (value=='') {
                return callback(new Error('价格不能为空！'));
            }
            else if (!pattern.test(value)) {
                callback(new Error('请输入正确的内容'));
            } 
            else {
                callback()
            }
        };
        var checkQuantity=(rule,value,callback)=>{
            var pattern = /^(-?\d*.?\d*)$/;
            if (value=='') {
                return callback(new Error('库存不能为空！'));
            }
            else if (!pattern.test(value)) {
                callback(new Error('请输入正确的内容'));
            } 
            else {
                callback()
            }
        };
        var checkSales=(rule,value,callback)=>{
            var pattern = /^(-?\d*.?\d*)$/;
            if (value=='') {
                return callback(new Error('销售量不能为空！'));
            }
            else if (!pattern.test(value)) {
                callback(new Error('请输入正确的内容'));
            } 
            else {
                callback()
            }
        };
        return {
            packid:'',
            from:'',
            id:'',
            listimg:[],
            imgdata:{
                'type':'admin'
            },
            listmodaltime:[],
            listtime:[],
            tmvalue:'',
            tmselected:'',
            tmid:'',
            tmtype:'',
            datetempcontent:[],
            listmodalarea:[],
            listcitys:[],
            listarea:[],
            areamid:'',
            areamvalue:'',
            areamselected:'',
            citymid:'',
            cityvalue:[],
            areatempcontent:[],
            areabeforeids:[],
            typearea:'',
            formmsg:{
                name:'',
                displayQuantity:'',
                originalPrice:'',
                totalSales:'',
                categoryId:'',
                brand:'',
                detailTemplateInfoName:'',
                detailTemplateInfoId:''
            },
            goodstype:[],
            disabled:true,
            // 图片删除URL
            importFileUrl:'api/zuul/sms/file/fileUpload',
            loadingdate:false,
            loadinggoods:false,
            loadingarea:false,
            eidtdate:false,
            displayOrder:0,
            disablecity:true,
            rules:{
                name:[
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ],
                originalPrice:[
                    { required:true,validator: checkPrice, trigger: 'blur' }
                ],
                displayQuantity:[
                    { validator: checkQuantity, trigger: 'blur' }
                ],
                totalSales:[
                    { validator: checkSales, trigger: 'blur' }
                ],
                categoryId:[
                    { required: true, message: '请选择商品', trigger: 'change' }
                ]
            },
            specificationName:'',
            dynamicTags:[],
            specificationArr:[],
            inputVisible: false,
            inputValue: '',
            inputVisibles:false,
            inputValues: '',
            addOptionsShow:false,
            addOptionBtn:true,
            oldTagValue:'',
            pointsDeduction:false,
            pointsNum:'',
            pointsMoney:'',
            sendPoints:false,
            sendPointsNum:''
        }
    },
    created(){
        this.$root.$on('editcommodity',(datas)=>{
            this.id=datas.id;
            this.$refs.detailcommodity.setAttribute('class','detailcommodity on');
            this.getcommodityinfo();
            this.getcategory();
            this.getimglist();
            this.getdatemodel();
            this.getcitys();
        });
        this.$root.$on('editcomm',(data)=>{
            this.id=data.comid;
            this.packid=data.packageid;
            this.from='package';
            this.$refs.detailcommodity.setAttribute('class','detailcommodity on');
            this.getcommodityinfo();
            this.getcategory();
            this.getimglist();
            this.getdatemodel();
            this.getcitys();
        });
        this.$root.$on('saveDetailTemplateInfos', (data) => {
             this.formmsg.detailTemplateInfoName = data.templateName
             this.formmsg.detailTemplateInfoId = data.templateID
        })
    },
    methods:{
        addOptions(){
            this.specificationName = ''
            this.dynamicTags = []
            setTimeout(() => {
                this.addOptionsShow = true
                
            }, 180);
            this.addOptionBtn = false
            if(this.specificationArr){
                this.specificationArr.forEach(item =>{
                    item.tagIsUpdata =false
                })
            }
        },
        closeAddOptions(){
            setTimeout(() => {
                this.addOptionBtn = true
            }, 180);
            this.addOptionsShow = false
        },
        sureAddOptions(){
            let arr=[];
            this.dynamicTags.forEach(item=>{
                arr.push(item);
            })
            //console.log(arr);
            let obj = {
                name:this.specificationName,
                value:arr,
                inputVisibles:false,
                inputValues:'',
                tagIsUpdata:false
            }
           // console.log(this.specificationArr)
            if(this.specificationArr == null |this.specificationArr == 'null'){
                this.specificationArr = []
            }
            this.specificationArr.push(obj)
           // console.log(this.specificationArr)
            this.specificationName = ''
            this.dynamicTags = []
        },
        //添加规格
        handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
            this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        //规格删改
        handleCloses(tag,index) {
        this.specificationArr[index].value.splice(this.specificationArr[index].value.indexOf(tag), 1);
        },
        showInputs(index) {
            this.specificationArr[index].inputVisibles = true;
            this.$nextTick(_ => {
              this.$refs.index[0].$refs.input.focus()
            });
        },
        handleInputConfirms(index) {
            let inputValues = this.specificationArr[index].inputValues;
            if (inputValues) {
            this.specificationArr[index].value.push(inputValues);
            }
            this.specificationArr[index].inputVisibles = false;
            this.specificationArr[index].inputValues = '';
        },
        tagUpdata(index){
            setTimeout(() => {
                this.addOptionBtn = true
            }, 180);
            this.addOptionsShow = false
            this.specificationArr.forEach(item =>{
                    item.tagIsUpdata =false
                })
            let oldValue = JSON.stringify(this.specificationArr[index])
            //console.log(oldValue)
            this.oldTagValue = oldValue
            //console.log(this.oldTagValue)
            this.specificationArr[index].tagIsUpdata = true
        },
        sureModifyOptions(index){
            this.specificationArr[index].tagIsUpdata = false
        },
        closeModifyOptions(index){
            //console.log(JSON.parse(this.oldTagValue))
            let old = JSON.parse(this.oldTagValue)
            this.$set(this.specificationArr,index,old)
            this.specificationArr[index].tagIsUpdata = false
        },
        deleteUpdata(index){
            confirm('是否删除')
            this.specificationArr.splice(index,1)
        },
        // 获取商品信息
        getcommodityinfo(){
            let that=this;
            this.$http.post('/api/product/commodity/info/queryMap',{id:that.id})
            .then(function(response){
                if(response.data.msg=='查询成功'){
                    let data=response.data.info[0];
                    that.formmsg.name=data.name;
                    that.formmsg.displayQuantity=data.displayQuantity.toString();
                    that.formmsg.originalPrice=data.originalPrice.toString();
                    that.formmsg.totalSales=data.totalSales.toString();
                    that.formmsg.categoryId=data.categoryId==0?null:data.categoryId;
                    that.formmsg.brand=data.brand;
                    that.formmsg.detailTemplateInfoId = data.detailTemplateId
                    that.formmsg.desc = data.description
                    that.tmid=data.periodTemplateId;
                    that.areamid=data.regionTemplateId;
                    that.specificationArr=JSON.parse(data.options)
                    if(data.giftPoints){
                        that.sendPoints = true
                        that.pointsMoney = data.giftPoints
                    }else{
                        that.sendPoints = false
                    }
                    if(data.originalPriceMoney || data.originalPricePoint){
                        that.pointsDeduction = true
                        that.pointsNum = data.originalPricePoint
                        that.pointsMoney =data.originalPrice - data.originalPriceMoney  //需要一个字段来保存 积分抵扣了多少钱
                    }else{
                        that.pointsDeduction = false
                    }
                    // console.log(that.formmsg.categoryId);
                    let url = '/api/product/mall/template/query?page=1&pageSize=10';
                    let detailTemplateIds = data.detailTemplateId
                            that.$http({
                                url: url,
                                method: 'POST',
                                // 请求体重发送的数据
                                // headers: { 'Content-Type': 'application/json' },
                                data:{
                                    'templateID':detailTemplateIds,
                                    'templateType':3
                                },
                            })
                            .then(response => {
                               // console.log(response)
                                if(response.data.info.list.length == 0){
                                }else{
                                    that.formmsg.detailTemplateInfoName = response.data.info.list[0].templateName
                                }
                        })
                        .catch(error=>{
                            console.log(error);
                            alert('网络错误，不能访问');
                        })
                }
                else{
                    that.$message(response.data.msg);
                }
                console.log(response);
            })
            .catch(function(response){
                that.$message('商品信息读取失败！');
            })
        },
        // 获取产品分类
        getcategory(){
            let that=this;
            this.$http.post('/api/product/commodity/category/queryMap',{})
            .then(function(response){
                if(response.data.msg=='查询成功'){
                    that.goodstype=response.data.info;
                }
            })
            .catch(function(response){
                console.log(response);
            })
        },
        // 选择商品分类
        changegoodstype(value){
            this.formmsg.categoryId=value;
            console.log(value);
        },
        // 保存商品信息
        savedata(){
            if(this.formmsg.detailTemplateInfoId == '1'){
                this.$message('请绑定详情模板！');
                return false
            }
            let sure = ''
            if(this.specificationArr){
                this.specificationArr.forEach(item =>{
                    if(item.tagIsUpdata == true){
                        this.$message('有未确认的规格');
                        sure = '1'
                        return false
                    }
                })
            }
            if(sure == '1'){
                return false
            }
            this.$refs['formmsg'].validate((valid) => {
                if (valid) {
                    let that=this;
                    let data={
                        id:this.id,
                        name:this.formmsg.name,
                        originalPrice:this.formmsg.originalPrice,
                        displayQuantity:this.formmsg.displayQuantity,
                        totalSales:this.formmsg.totalSales,
                        periodTemplateId:this.tmid,
                        regionTemplateId:this.areamid,
                        categoryId:this.formmsg.categoryId,
                        brand:this.formmsg.brand,
                        isPackage:0,
                        detailTemplateId:this.formmsg.detailTemplateInfoId,
                        description:this.formmsg.desc,
                        options:JSON.stringify(this.specificationArr),
                        giftPoints:this.sendPointsNum,
                        priceRule:1,
                        originalPricePoint:this.pointsNum,
                        originalPriceMoney:this.formmsg.originalPrice - this.pointsMoney
                    };
                    this.$http.post('/api/product/commodity/info/update',data)
                    .then(function(response){
                        if(response.data.msg=='修改成功'){
                            that.$message.success('商品修改成功！');
                            that.$refs.detailcommodity.setAttribute('class','detailcommodity off');
                            console.log(that.from);
                            if(that.from=='package'){
                                that.$root.$emit('reloadpackage',that.packid);
                            }
                            else{
                                that.$root.$emit('reloadlist');
                            }
                            
                        }
                        else{
                            that.$message(response.data,msg);
                        }
                        // console.log(response);
                    })
                    .catch(function(response){
                        console.log(response);
                    })
                } else {
                    this.$alert('请将表单填写完整！', '提示', {confirmButtonText: '确定'});
                    return false;
                }
            });
            
        },
  
// 图片 
        // 获取商品图片
        getimglist(){
            let that=this;
            this.listimg=[];
            this.$http.post('/api/product/commodity/image/query',{commodityId:that.id})
            .then(function(response){
                if(response.data.msg=="查询成功"){
                    response.data.info.list.forEach(item=>{
                        that.displayOrder=item.displayOrder>that.displayOrder?item.displayOrder:that.displayOrder;
                        let url='http://'+window.location.host+'/api'+item.url;
                        let json={
                            id:item.id,
                            url:url,
                            displayOrder:item.displayOrder
                        };
                        that.listimg.push(json);
                    });
                    that.listimg.sort(that.copmareimg);
                    console.log(that.listimg);
                    // that.listimg=response.data.info;
                }
                else{
                    that.$message(response.data.msg);
                }
                
            })
            .catch(function(response){
                that.$message('查询商品图片失败！');
            });
        },
        // 图片排序
        copmareimg(img1,img2){
            if(img1.displayOrder<img2.displayOrder){
                return -1;
            }
            else if(img1.displayOrder>img2.displayOrder){
                return 1;
            }
            else{
                return 0;
            }
        },
        // 改变图片顺序
        changeimgindex(index,direction){
            console.log(index,direction);
            let length=this.listimg.length;
            let lilist=document.querySelectorAll('.imglist li');
            let [imgid1,order1,imgid2,order2]=[lilist[index].getAttribute('dataid'),lilist[index].getAttribute('dataorder'),'','']; 
            // 首尾图片向两端移动不做变化
            if((index==0&&direction=='left')||(index+1==length&&direction=='right')){
                return;
            }
            else{
                let index_change=direction=='left'?index-1:index+1;
                imgid2=lilist[index_change].getAttribute('dataid');
                order2=lilist[index_change].getAttribute('dataorder');
                this.updateimgorder(imgid1,order2);
                this.updateimgorder(imgid2,order1);
                // this.getimglist();
                this.listimg[index].displayOrder=order2;
                this.listimg[index_change].displayOrder=order1;
                this.listimg.sort(this.copmareimg);
                console.log(this.listimg);
            }
        },
        // 修改图片显示顺序
        updateimgorder(imgid,order){
            this.$http.post('/api/product/commodity/image/update',{id:imgid,displayOrder:order})
            .then(function(response){
                if(response.data.msg=='修改成功'){
                    return true;
                }
                else{
                    return false;
                }
                console.log(response);
            })
            .catch(function(response){
                return false;
                consoel.log(response.data.msg);
            })
        },
        // 上传图片
        beforeAvatarUpload(file){
            if(this.listimg.length==5){
                this.$message({
                    message: '最多可上传5张图片',
                    type: 'warning'
                });
                return false;
            }
            else{
                const isimg = file.type === 'image/jpeg'||file.type==='image/png';
                const isLt500k = file.size / 1024 / 1024/1024 < 500;
                if (!isimg) {
                    this.$message.error('只能上传图片！');
                }
                if (!isLt500k) {
                    this.$message.error('图片大小不能超过 500k!');
                }
                return isimg && isLt500k;
            }
        },
        handleAvatarSuccess(res, file){
            console.log(res);
            if(res.msg=='文件上传成功'){
                let url=res.info;
                this.addimg(url);
            }
            else{
                this.$message(res.msg);
            }
        },
        // 商品添加图片
        addimg(url){
            this.displayOrder++;
            let that=this;
            this.$http.post('/api/product/commodity/image/insertOne',
                {
                    url:url,
                    commodityId:that.id,
                    displayOrder:this.displayOrder
                }
            )
            .then(function(response){
                if(response.data.msg=='新增成功'){
                    
                    url='http://'+window.location.host+'/api'+url;
                    let json={
                        id:response.data.info.id,
                        url:url,
                        displayOrder:that.displayOrder
                    };
                    that.listimg.push(json);
                    console.log(that.listimg);
                    that.$message.success('图片添加成功！');
                }
                else{
                    this.displayOrder--;
                    that.$message(response.data.msg);
                }
                // console.log(response);
            })
            .catch(function(response){
                console.log('图片添加失败！');
            })
        },
        // 删除图片
        deleteimg(index,imgid){
            this.$confirm('是否删除图片？','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                let that=this;
                this.$http.post('/api/product/commodity/image/remove',[imgid])
                .then(function(response){
                    if(response.data.msg=='删除成功'){
                        that.listimg.splice(index,1);
                        that.$message.success('删除成功!');
                    }
                    else{
                        that.$message(response.data.msg);
                    }
                    console.log(response);
                })
                .catch(function(response){
                    console.log(response);
                })
            }).catch(()=>{
                this.$message({
                    type:'info',
                    message:'已取消删除'
                });
            });
        },
        // 详情类别
        getdetailtype(){},

// 时间模板处理
        // 获取时间模板
        getdatemodel(){
            let that=this;
            this.$http.post('/api/product/commodity/periodTemplate/queryMap',{})
            .then(function(response){
                if(response.data.msg=='查询成功'){
                    that.listmodaltime=response.data.info;
                    if(that.tmtype=='delete'){
                        that.tmid=that.listmodaltime[0].id;
                        that.tmselected=that.listmodaltime[0].name;  
                        that.tmtype='' 
                    }
                    else{
                        that.listmodaltime.forEach(item=>{
                            if(that.tmid==item.id){
                                that.tmselected=item.name;
                            }
                        });
                    }
                    that.tmvalue=that.tmselected;
                    that.getdatedetail();
                }
                else{
                    that.$message(response.data.msg);
                }
            })
            .catch(function(response){
                console.log('获取时间模板失败！');
            });
        },
        // 获取时间模板详情
        getdatedetail(){
            // 时间段为空，获取时间段
            if(!this.listtime.length){
                this.getdateperiod();
            }
            else{
                this.listtime.forEach(item=>{
                    item.monday=false;
                    item.tuesday=false;
                    item.wednesday=false;
                    item.thursday=false;
                    item.friday=false;
                    item.saturday=false;
                    item.sunday=false;
                });
            }
            let that=this;
            this.loadingdate=true;
            if(that.tmid!=null&&that.tmid!=''){
                this.$http.post('/api/product/commodity/periodTemplateContent/query?pageSize=100',{templateId:that.tmid})
                .then(function(response){
                    if(response.data.msg=='查询成功'){
                        let list=response.data.info.list;
                        that.datetempcontent=list;
                        that.listtime.forEach(time=>{
                            list.forEach(item=>{
                                if(item.periodId==time.periodId){
                                    switch(item.weekDay){
                                        case 1:{
                                            time.monday=true;
                                            break;
                                        }
                                        case 2:{
                                            time.tuesday=true;
                                            break;
                                        }
                                        case 3:{
                                            time.wednesday=true;
                                            break;
                                        }
                                        case 4:{
                                            time.thursday=true;
                                            break;
                                        }
                                        case 5:{
                                            time.friday=true;
                                            break;
                                        }
                                        case 6:{
                                            time.saturday=true;
                                            break;
                                        }
                                        case 7:{
                                            time.sunday=true;
                                            break;
                                        }
                                    }
                                }
                            });
                        });
                        that.loadingdate=false;
                    }
                    else{
                        that.$message(response.data.msg);
                    }
                    
                })
                .catch(function(){
                    that.loadingdate=false;
                    console.log("数据读取出错！");
                })
            }
            
            // this.loadingdate=true;
            // this.listmodaltime=false;
            // 查询时间段
            
        },
        changedatemodel(val){
            // console.log(val,this.listmodaltime);
            this.listmodaltime.forEach(item=>{
                if(item.id==val){
                    this.tmvalue=item.name;
                }
            });
            this.tmid=val;
            this.getdatedetail();
            this.changedatestate2();
            this.tmtype='';
            // this.getdatedetail(val);
            // alert(val);
        },
        createdatemodel(){
            this.listtime=[];
        },
        // 编辑时间模板
        edittimetable(){
            if(this.tmid!=''&&this.tmid!=null){
                this.tmtype='update';
                this.changedatestate();
            }
        },
        // 删除时间模板
        deletetimetable(){
            if(this.tmid!=''&&this.tmid!=null){
                this.tmtype='delete';
                let that=this;
                this.$confirm('是否删除该商品', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('/api/product/commodity/periodTemplate/remove',[this.tmid])
                    .then(function(response){
                        if(response.data.msg=='删除成功'){
                            let ids=[]
                            that.datetempcontent.forEach(item=>{
                                ids.push(item.id);
                            });
                            that.deletedaterelation(ids,'delete');
                            that.getdatemodel();
                        }
                        else{
                            that.$message(response.data.msg);
                        }
                    })
                    .catch(function(response){
                        console.log(response);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }
        },
        // 获取时间段
        getdateperiod(){
            this.loadingdate=true;
            let that=this;
            this.$http.post('/api/public/period/queryMap')
            .then(function(response){
                if(response.data.msg=='查询成功'){
                    let listperiod=response.data.info;
                    listperiod.forEach(item=>{
                        that.listtime.push({
                            date:item.startTime.substring(0,5)+'-'+item.endTime.substring(0,5),
                            monday:false,
                            tuesday:false,
                            wednesday:false,
                            thursday:false,
                            friday:false,
                            saturday:false,
                            sunday:false,
                            periodId:item.id
                        });
                        // that.getdatemodel();
                    });
                }
                else{
                    that.$message(response.data.msg);
                }
                that.loadingdate=false;
            })
            .catch(function(response){
                that.loadingdate=false;
                console.log(response);
            })
        },
        // 新建时间模板
        createdatemodal(){
            this.tmtype='create';
            if(document.querySelector('.timemodel').getAttribute('class')=='timemodel el-row'){
                this.changedatestate();
                this.tmvalue='';
                this.listtime.forEach(item=>{
                    item.monday=false;
                    item.tuesday=false;
                    item.wednesday=false;
                    item.thursday=false;
                    item.friday=false;
                    item.saturday=false;
                    item.sunday=false;
                });
                // this.getdateperiod();
            }
            
        },
        changedatestate(){
            let dom=document.getElementsByClassName('timemodel')[0];
            dom.setAttribute('class','timemodel edit');
            let dom1=dom.querySelector('.title');
            dom1.setAttribute('class','title el-input');
            dom1.querySelector('.el-input__inner').removeAttribute('disabled');
            // this.listtime.forEach(item=>{
            //     item.dateedit=false;
            // });
            this.disabled=false;
        },
        changedatestate2(){
            let dom=document.getElementsByClassName('timemodel')[0];
            dom.setAttribute('class','timemodel el-row');
            let dom1=dom.querySelector('.title');
            dom1.setAttribute('class','title none el-input is-disabled');
            dom1.querySelector('.el-input__inner').setAttribute('disabled','disabled');
            this.disabled=true;
        },
        // 删除时间模板关系
        deletedaterelation(ids,type,data,msg){
            let that=this;
            this.$http.post('/api/product/commodity/periodTemplateContent/remove',ids)
            .then(function(response){
                if(response.data.msg=='删除成功'){
                    console.log('关系删除成功！');
                    if(type=='edit'){
                        that.adddaterelation(data,msg);
                    }
                    else if(type=='delete'){
                        that.$message.success('时间模板删除成功！');
                    }
                }
                else{
                    console.log(response.data.msg);
                }
            })
            .catch(function(){
                console.log('数据获取失败');
            })
        },
        // 添加时间模板关系
        adddaterelation(data,msg){
            let that=this;
            this.$http.post('/api/product/commodity/periodTemplateContent/insert',data)
            .then(function(response){
                if(response.data.msg=='新增成功'){
                    that.$message.success(msg);
                    that.changedatestate2();
                }
                else{
                    console.log(response.data.msg);
                }
                console.log(response);
            })
            .catch(function(){
                console.log('数据处理失败');
            })
        },
        // 保存时间模板
        savetimetable(){
            let that=this;
            if(this.tmvalue==''){
                this.$message('模板名称不能为空！');
                return false;
            }
            // else if(this.listtime.length==0){
            //     this.$message('时间模板至少有一条数据！');
            //     return false;
            // }
            else{
                let data=[];
                that.listtime.forEach(item=>{
                    if(item.monday){
                        data.push({
                            templateId:that.tmid,
                            periodId:item.periodId,
                            weekDay:1
                        });
                    }
                    if(item.tuesday){
                        data.push({
                            templateId:that.tmid,
                            periodId:item.periodId,
                            weekDay:2
                        });
                    }
                    if(item.wednesday){
                        data.push({
                            templateId:that.tmid,
                            periodId:item.periodId,
                            weekDay:3
                        });
                    }
                    if(item.thursday){
                        data.push({
                            templateId:that.tmid,
                            periodId:item.periodId,
                            weekDay:4
                        });
                    }
                    if(item.friday){
                        data.push({
                            templateId:that.tmid,
                            periodId:item.periodId,
                            weekDay:5
                        });
                    }
                    if(item.sunday){
                        data.push({
                            templateId:that.tmid,
                            periodId:item.periodId,
                            weekDay:6
                        });
                    }
                    if(item.sunday){
                        data.push({
                            templateId:that.tmid,
                            periodId:item.periodId,
                            weekDay:7
                        });
                    }
                });
                console.log(that.listtime,data);
                // 创建新的模板
                if(this.tmtype=='create'){
                    this.$http.post('/api/product/commodity/periodTemplate/insert',[{name:this.tmvalue}])
                    .then(function(response){
                        if(response.data.msg=='新增成功'){
                            that.tmid=response.data.info[0].id;
                            data.forEach(item=>{
                                item.templateId=that.tmid
                            });
                            // console.log(data);
                            that.adddaterelation(data,'模板新增成功！');
                            that.getdatemodel();   
                        }
                        else{
                            that.$message('模板保存失败！');
                        }
                    })
                    .catch(function(response){
                        console.log(response.data.msg);
                    })
                    this.tmtype='';
                }
                // 更新模板
                else if(this.tmtype=='update'){
                    let ids=[]
                    that.datetempcontent.forEach(item=>{
                        ids.push(item.id);
                    });
                    this.$http.post('/api/product/commodity/periodTemplate/update',{id:this.tmid,name:this.tmvalue})
                    .then(function(response){
                        if(response.data.msg=='修改成功'){
                            that.deletedaterelation(ids,'edit',data,'模板修改成功！');
                            // that.getdatemodel();
                        }
                        else{
                            that.$message('模板修改失败');
                        }
                    })
                    .catch(function(){
                        console.log('模板修改失败');
                    })
                    this.tmtype='';
                }
                
            }
            // this.disabled=true;
        },

// 地区模板处理
        getareamodel(){
            let that=this;
            this.$http.post('/api/product/commodity/regionTemplate/queryMap',{})
            .then(function(response){
                if(response.data.msg=='查询成功'){
                    that.listmodalarea=response.data.info;
                    if(that.typearea=='delete'){
                        that.citymid=that.listmodalarea[0].cityId;
                        that.areamselected=that.listmodalarea[0].name;
                        that.areamid=that.listmodalarea[0].id;
                        that.typearea='';
                    }
                    else{
                        that.listmodalarea.forEach(item=>{
                            if(item.id==that.areamid){
                                that.citymid=item.cityId;
                                that.areamselected=item.name;
                            }
                        });
                    }
                    that.areamvalue=that.areamselected;
                    if(that.cityvalue==''){
                        // 获取默认城市
                        that.listcitys.forEach(item=>{
                            item.children.forEach(item1=>{
                                item1.children.forEach(item2=>{
                                    if(item2.value==that.citymid){
                                        that.cityvalue=[item.value,item1.value,item2.value]
                                    }
                                });
                            });
                        });
                        // that.getareacontent();
                    }
                    that.getarea();
                }
                else{
                    that.$message(response.data.msg);
                }
            })
            .catch(function(response){
                console.log(response);
            })
        },
        // 查询所有城市
        getcitys(){
            let that=this;
            this.$http.get('/api/public/region/findParent?parentId=0&levels=3',{})
            .then(function(response){
                if(response.data.msg=='查询成功'){
                    let list=response.data.info;
                    list.forEach(item=>{
                        item.value=item.id;
                        item.label=item.regionName;
                        item.children=item.sysRegionList;
                        delete item.sysRegionList;
                        delete item.id;
                        delete item.regionName;
                        delete item.parentCode;
                        delete item.grade;
                        item.children.forEach(item1=>{
                            item1.value=item1.id;
                            item1.label=item1.regionName;
                            item1.children=item1.sysRegionList;
                            delete item1.sysRegionList;
                            delete item1.id;
                            delete item1.regionName;
                            delete item1.parentCode;
                            delete item1.grade;
                            item1.children.forEach(item2=>{
                                item2.value=item2.id;
                                item2.label=item2.regionName;
                                item2.children=item2.sysRegionList;
                                delete item2.sysRegionList;
                                delete item2.id;
                                delete item2.regionName;
                                delete item2.parentCode;
                                delete item2.grade;
                            });
                        });
                    });
                    that.listcitys=list;
                    that.getareamodel();
                }
                // console.log(that.listcitys);
                // console.log(response);
            })
            .catch(function(){
                that.$message('城市读取出错');
            })
        },
        // 获取当前城市所有县级地址
        getarea(){
            let that=this;
            if(this.citymid!=''){
                this.loadingarea=true;
                this.$http.get('/api/public/region/findParent?levels=1&parentId='+this.citymid)
                .then(function(response){
                    if(response.data.msg=='查询成功'){
                        that.listarea=response.data.info;
                        that.listarea.forEach(item=>{
                            that.$set(item,'isActive',false);
                        });
                        that.getareacontent();
                    }
                    else{
                        that.$message(response.data.msg);
                    }
                    that.loadingarea=false;
                    console.log(response);
                })
                .catch(function(response){
                    that.loadingarea=false;
                    console.log(response);
                })
            }
            
        },
        // 获取当前地区模板内容
        getareacontent(){
            let that=this;
            // console.log(that.areamid);
            this.$http.post('/api/product/commodity/regionTemplateContent/queryMap',{templateId:that.areamid})
            .then(function(response){
                if(response.data.msg=='查询成功'){
                    let data=response.data.info;
                    that.areatempcontent=[];
                    that.areabeforeids=[];
                    data.forEach(item=>{
                        that.areatempcontent.push(item.regionId);
                        that.areabeforeids.push(item.id);
                        that.listarea.forEach(item1=>{
                            if(item1.id==item.regionId){
                                item1.isActive=true;
                            }
                        });
                    });
                }
                // console.log(that.areatempcontent);
            })
            .catch(function(response){
                console.log(response);
            })
        },
        // 选择城市
        changecity(){
            this.citymid=this.cityvalue[2];
            this.getarea();
        },
        // 选择/取消地区
        selectarea(id,e){
            if(this.typearea!=''){
                let dom=e.target;
                if(dom.getAttribute('class')==null||dom.getAttribute('class')==''){
                    dom.setAttribute('class','active');
                }
                else{
                    dom.removeAttribute('class');
                }
            }
        },
        // 选择地区模板项
        changeareamodel(value){
            this.areamid=value;
            // 改变默认城市id
            this.listmodalarea.forEach(item=>{
                if(item.id==value){
                    this.citymid=item.cityId;
                    this.areamvalue=item.name;
                }
            });
            // 改变默认选中的城市
            this.listcitys.forEach(item=>{
                item.children.forEach(item1=>{
                    item1.children.forEach(item2=>{
                        if(item2.value==this.citymid){
                            this.cityvalue=[item.value,item1.value,item2.value];
                        }
                    });
                });
            });
            this.getarea();
            // this.getareacontent();
            // console.log(this.cityvalue);
        },
        // 编辑地区模板
        editareamodal(){
            if(this.areamid!=''&&this.areamid!=null){
                let dom=document.getElementsByClassName('areaservice')[0].querySelector('.title');
                dom.setAttribute('class','title el-input');
                dom.querySelector('.el-input__inner').removeAttribute('disabled');
                this.disablecity=false;
                this.typearea='edit';
            }
            
        },
        // 创建地区模板
        createareamodal(){
            let dom=document.getElementsByClassName('areaservice')[0].querySelector('.title');
            dom.setAttribute('class','title el-input');
            dom.querySelector('.el-input__inner').removeAttribute('disabled');
            this.disablecity=false;
            this.typearea='create';
            this.areamvalue='';
            this.listarea.forEach(item=>{
                item.isActive=false;
            });
        },
        // 删除地区模板
        deleteareamodal(){
            if(this.areamid!=''&&this.areamid!=null){
                let that=this;
                if(this.typearea==''){
                    this.$confirm('是否删除该商品', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // 删除模板
                        this.typearea='delete';
                        this.$http.post('/api/product/commodity/regionTemplate/remove',[that.areamid])
                        .then(function(response){
                            if(response.data.msg=='删除成功'){
                                that.deleterelationarea({},'delete');
                            }
                            else{
                                that.$message.success(response.data.msg);
                            }
                        })
                        .catch(function(response){
                            that.$message('删除失败');
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    });
                }
            }
        },
        // 删除地区模板关系
        deleterelationarea(data,type){
            let that=this;
            console.log(that.areatempcontent);
            this.$http.post('/api/product/commodity/regionTemplateContent/remove',that.areabeforeids)
            .then(function(response){
                if(response.data.msg=='删除成功'){
                    if(type=='delete'){
                        that.$message.success('删除成功');
                        let dom=document.getElementsByClassName('areaservice')[0].querySelector('.title');
                        dom.setAttribute('class','title el-input none');
                        dom.querySelector('.el-input__inner').setAttribute('disabled','');
                        that.disablecity=true;
                        that.getareamodel();
                    }
                    else if(type=='edit'){
                        that.addrelationarea(data);
                    }
                }
                else{
                    that.$message(response.data.msg);
                }
                // console.log(response);
            })
            .catch(function(response){
                console.log(response);
            })
        },
        // 添加地区模板关系
        addrelationarea(data){
            // console.log(data);
            let that=this;
            this.$http.post('/api/product/commodity/regionTemplateContent/insert',data)
            .then(function(response){
                if(response.data.msg=='新增成功'){
                    console.log(that.typearea);
                    that.$message.success(that.typearea=='create'?'创建成功！':'修改成功！');
                    that.typearea='';
                    let dom=document.getElementsByClassName('areaservice')[0].querySelector('.title');
                    dom.setAttribute('class','title el-input none');
                    dom.querySelector('.el-input__inner').setAttribute('disabled','');
                    that.disablecity=true;
                    that.getareamodel();
                }
                else{
                    that.$message(response.data.msg);
                }
            })
            .catch(function(response){
                console.log(response);
            })
        },
        // 地区模板保存
        savetemparea(){
            // console.log(this.areamvalue,this.typearea)
            if(this.areamvalue==''){
                alert('模板名称不能为空！');
            }
            else{
                //选中的地区id集合
                // let ids=[];
                let data=[];
                let that=this;
                let dom=document.querySelector('.areaservice').querySelectorAll('.areas li.active');
                dom.forEach(item=>{
                    data.push({
                        templateId:this.areamid,
                        regionId:item.getAttribute('dataid')
                    });
                });
                // this.listarea.forEach(item=>{
                //     ids.push(item.id);
                // });
                // 修改模板
                if(this.typearea=='edit'){
                    this.$http.post('/api/product/commodity/regionTemplate/update',{id:that.areamid,name:that.areamvalue})
                    .then(function(response){
                        if(response.data.msg=='修改成功'){
                            // console.log(ids);
                            that.deleterelationarea(data,'edit');
                            // that.addrelationarea(data);
                        }
                        else{
                            that.$message(response.data.msg);
                        }
                    })
                    .catch(function(response){
                        console.log(response);
                    })
                }
                // 创建模板
                else if(this.typearea=='create'){
                    this.$http.post('/api/product/commodity/regionTemplate/insert',[{name:that.areamvalue,cityId:that.citymid}])
                    .then(function(response){
                        if(response.data.msg=='新增成功'){
                            data.forEach(item=>{
                                item.templateId=response.data.info[0].id
                            });
                            that.addrelationarea(data);
                        }
                    })
                    .catch(function(response){
                        console.log(response);
                    })
                }
            }
            
        },
        selectDetailPage(){
             this.$root.$emit('opendialogSelectDetail',true)
         },
        // 重置表单
        resetForm(){
            this.$refs.formmsg.resetFields();
            this.formmsg.detailTemplateInfoName='';
            this.formmsg.detailTemplateInfoId='';
        }
    },
    watch:{
        pointsDeduction(val,oldVal){
            if(val == false){
                this.pointsNum = ''
                this.pointsMoney = ''
            }
        },
        sendPoints(val,oldVal){
            if(val == false){
                this.sendPointsNum = ''
            }
        }
    },
    beforeDestroy(){
        // this.$root.$off('adddata');
        this.$root.$off('editpackage');
        this.$root.$off('editcomm');
        this.$root.$off('saveDetailTemplateInfos');
    }

}
</script>
<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    }



.detailcommodity{
    width: 100%;
    left: 0;
    top: 100px;
    position: absolute;
    /* padding: 0 20px; */
    z-index: 1000;
    transition: all 1s;
    -moz-transition: all 1s;
    -webkit-transition: all 1s;
    -o-transition:all 1s;
    background-color: #fff;
    padding-bottom: 20px;
    margin-bottom: 70px;
    overflow: hidden;
}
.contain{
    overflow: hidden;
    border-bottom:1px solid #dcdfe6;
}
.contain::after{
    width:5px;
    height:2000px;
    top: 0;
    position: absolute;
    border-left:5px solid #f7f7f7 !important;
    left:50% !important;
}
.btnsgroup{
    margin-top: 20px;
    text-align:center;
}
.btnsgroup button{
    height: 30px;
    line-height:8px;  
}
.btnsgroup button.is-plain{
    border:1px solid #409EFF;
    color:#409EFF;
}
.btnsgroup .el-button+.el-button{
    margin-left: 10px;
}
.detailcommodity.off{
    left:150%;
    display: none;
}
.detailcommodity.on{
    left: 0;
    display: block;
}
.header{
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
    text-align: left;
    background-color: #edf9ff;
}
.btnopera{
    width:30px;
    border: none;
    padding:0;
    background-color: transparent;
}
.btnopera:hover{
    background-color:transparent;
}
.el-button+.el-button{
    margin-left: 0;
}
.mTop{
    overflow:hidden;
}
.tips{
    width:367px;
    font-size:12px;
    color:grey;
    float: left;
    margin-left:30px;
    padding-top:10px;
}
.tips p{
    height:30px;
    line-height:30px;
}
.imglist{
    display: flex;
    justify-content:lex-start;
    flex-wrap:wrap;
    margin-top: 10px;
}
.imglist li{
    width: 90px;
    height: 90px;
    border-radius: 5px;
    background-color: #ebeef5;
    margin-right: 10px;
    float: left;
    position: relative;
    margin-bottom: 10px;
}
.imglist li img{
    width:90px;
    height:90px;
    border-radius: 5px;
}
.imglist li i{
    display: block;
    cursor: pointer;
    font-style: normal;
    position: absolute;
    
}
.imglist li .close{
    right: -5px;
    top: -5px;
    width: 15px;
    height:15px;
    line-height: 15px;
    color:#fff;
    font-size: 10px;
    border-radius: 50%;
    
    text-align: center;
    background-color:#27a1f2;
}
.imglist li .opera{
    width: 100%;
    height:20px;
    line-height: 22px;
    bottom: 0;
    position: absolute;
    overflow:hidden;
    background: #ebeef5;
    opacity: 0;  
    transition: all 1s;
    -moz-transition: all 1s;
    -webkit-transition: all 1s;
    -o-transition:all 1s;
}
.imglist li:hover .opera{
    opacity: 0.5;  
}
.imglist li .left{
    width: 30%;
    left:0;
    text-align: left;
    padding-left: 10%;
}
.imglist li .right{
    width: 30%;
    right: 0;
    text-align: right;
    padding-right: 10%;
}
.containlabel{
    width: 90%;
    height: 60px;
    /* line-height: 1.5; */
    padding:5px 15px;
    border:1px solid #dcdfe6;
    border-radius: 4px;
}
.containlabel li{
    display: inline;
    padding: 5px 10px;
    font-size: 12px;
    cursor: pointer;
    margin-right: 5px;
    border-radius: 3px;
    color: #fff;
}
.containlabel li:nth-child(1){
    background-color: #3f86fd;
}
.containlabel li:nth-child(2){
    background-color: #32a1ff;
}
.containlabel li:nth-child(3){
    background-color: #28c0f8;
}
.containlabel li:nth-child(4){
    background-color: #0ecad1;
}
.containlabel li:nth-child(5){
    background-color: #0dd980;
}
.selectmodal{
    margin-top: 20px;
    margin-left: 10%;
    /* font-size: 14px; */
}
.timemodel{
    overflow:hidden;
    position: relative;
}
.timemodel i{
    color:#1297db;
}
 
.areaservice .areas{
    width:80%;
    height:150px;
    margin:0 auto;
    padding:5px 15px;
    border:1px solid #dcdfe6;
    border-radius: 4px;
    overflow-y: auto;
    overflow-x: hidden;
}
.areaservice .areas ul{
    display: flex;
    justify-content:lex-start;
    flex-wrap:wrap;
    margin-top: 10px;
}
.areaservice .areas li{
    display: inline-block;
    border:1px solid #dcdfe6;
    padding: 5px 14px;
    margin-right:10px;
    margin-bottom: 10px;
    border-radius: 5px;
}
.adddata{
    width: 25px;
    height:25px;
    padding: 0;
    position: absolute;
    left:92%;
    top: 50px;
    background-color: #fff;
    border: 1px solid #dcdfe6;
}
.areaservice .areas li{
    cursor: pointer;
}
.areaservice .areas li.active{
    background-color: #28c0f8;
    color: #fff;
}
</style>
<style>
.adddata i{
    color:#dcdfe6 !important;
}
/* .detail table{
    margin:10px auto;
} */
.detailcommodity table tbody .imgcolum{
    padding:0;
}
.detailcommodity table tbody .imgcolum .cell{
    width:80px;
    height:35px;
    margin:0 auto;
    padding:0;
    background-color: #ebeef5;
}
.detailcommodity table tbody .imgcolum .cell img{
    width:80px;
    height:35px;
}
.formmsg{
    margin-top:10px;
    padding:0 5%;
}
/* .formmsg .el-form-item{
    margin-bottom:10px;
} */
.formmsg .el-form-item__label{
    font-size: 13px;
}
.formmsg .el-input__inner{
    height:30px;
}
.detailcommodity .el-upload,
.detailcommodity .el-upload i{
    width:80px;
    height:80px;
    line-height:80px;
}
.detailcommodity .el-upload{
    background-color:#27a1f2;
    border-radius:10%;
}
.detailcommodity .el-upload i{
    color:#fff;
    font-size:30px;
}
.avatar-uploader{
    width:80px;
    float: left;
}
/* .selectmodal .el-input--suffix{
    width:20%;
}
/* .el-select-dropdown el-popper{
    width:20%;
} */
.selectmodal .el-input__inner,
.selectmodal button,
.areaservice .el-input__inner{
    height: 30px;
} 
.selectmodal button{
    width:80%;
    line-height:12px;
    margin-left:10px;
    text-align:center;
    padding-left: 0;
    padding-right:0;
}
.timemodel.edit table tbody tr{
    background-color:grey;
}
.timemodel .el-checkbox__inner::after{
    width:5px;
    height:15px;
    top:-5px;
    border:1px solid #1297db;
    border-top-width:0;
    border-left-width:0;
}
.timemodel .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after{
    border:1px solid #1297db;
    border-top-width:0;
    border-left-width:0;
}
.timemodel .el-checkbox__inner{
    background-color: #fff !important;
    border:none;
}
.timemodel tr:hover td{
    background-color:transparent !important;
}
.timemodel.edit tr:hover td{
    color:#fff;
}
.areaservice .btns button,
.areaservice .btns .el-col{
    margin-left:10px !important;
    float: right;
}
.el-input .title{
    height:30px;
}
.title .el-input__inner{
    height:30px;
    font-size:12px;
}
.title.none .el-input__inner,
.timemodel .is-disabled{
    border:none;
}
.title.none.el-input.is-disabled .el-input__inner,
.timemodel .is-disabled,
.timemodel .el-range-editor.is-disabled input{
    color:#fff !important;
    background-color:#fff;
}
.timemodel .el-date-editor{
    width:80px;
    padding:0;
}
.timemodel .title.none input,
.areaservice .title.none input{
    position: relative;
    bottom:-10px;
}
.timemodel .el-date-editor i{
    display:none;
}
.timemodel .button-addtime
{
    color:#409EFF;
    padding:0;
    margin-top:-10px;
    right:10%;
    position: absolute;
    display:none;
}
.timemodel .button-deletetime{
    color:red;
    padding:0;
    margin-top:-10px;
    right:13%;
    position: absolute;
    display:none;
}
.timemodel.edit .el-table:hover+.button-addtime,
.timemodel.edit .el-table:hover+.button-addtime+.button-deletetime,
.timemodel .button-addtime:hover,
.timemodel .button-deletetime:hover{
    display:block;
}
.areaservice .el-cascader{
    line-height:30px;
}
.areaservice .el-cascader__label{
    height:30px;
}
.detail table td:nth-child(3) .cell{
    border:none !important;
}
</style>
