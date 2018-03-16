<template>
    <el-dialog id="add_dialog" :close-on-press-escape="true" @close="closeDialog" :title="ruleForm.title" :visible.sync="dialogVisible" width="50%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label='名称   :' prop="name">
                <el-row>
                    <el-col :span="24">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item class="sec_form_item" label='图片   :' prop="picture">
                <el-row>
                    <el-col class="sec_item" :span="24">
                        <el-upload id="upload_file" class="avatar-uploader" 
                        action="api/sms/file/fileUpload" 
                        list-type="picture" 
                        name="fileUpload" 
                        :show-file-list="isSave" 
                        :limit="limitNumber" :drag="isDrag" 
                        :multiple="isMultiple" :data="admin" 
                        :on-exceed="exceedLimit" 
                        :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <i class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <el-button class="load_btn" type="primary"><i class="el-icon-plus"></i></el-button>
                        <div class="sec_word">
                            <p>提示&nbsp;&nbsp;:</p>
                            <div class="word_con">
                                <p>&nbsp;1.&nbsp;本地上传图片大小不得超过500K;</p>
                                <p>&nbsp;2.&nbsp;你最多可上传5张图片;</p>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item class="show_img">
                <el-row>
                    <el-col :span="24">
                        <ul class="show_img_list" ref="img_list">
                            <li v-for="(item,index) in imgUrls" :key="index" :data-id="index"><img :src="item" />
                                <el-button @click="deleteImg($event)"><i class="el-icon-error"></i></el-button>
                            </li>
                        </ul>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item class="show_msg">
                <el-row>
                    <el-col :span="24">
                        <ul class="show_msg_list">
                            <li class="list_li_right">品牌&nbsp;:&nbsp;&nbsp;&nbsp;
                                <el-form-item prop="productBrand">
                                    <el-select v-model="ruleForm.productBrand" placeholder="请选择">
                                        <el-option v-for="item in brandList" :key="item.brandId" :label="item.brandName" :value="item.brandId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </li>
                            <li class="list_li_right">规格&nbsp;:&nbsp;&nbsp;&nbsp;
                                <el-form-item prop="productSize">
                                    <el-input class="size" v-model="ruleForm.productSize" placeholder="规格例如:30*40"></el-input>
                                </el-form-item>
                            </li>
                            <li>&nbsp;单位:&nbsp;&nbsp;&nbsp;
                                <el-form-item prop="productUnit">
                                    <el-select v-model="ruleForm.productUnit" placeholder="请选择">
                                        <el-option v-for="item in unitList" :key="item.unitId" :label="item.unitName" :value="item.unitId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </li>
                            <li class="list_li_right">库存&nbsp;:&nbsp;&nbsp;&nbsp;
                                <el-form-item prop="productStock">
                                    <el-input class="stock" v-model="ruleForm.productStock"></el-input>
                                </el-form-item>
                            </li>
                            <li class="list_li_right">分类&nbsp;:&nbsp;&nbsp;&nbsp;
                                <el-form-item prop="productClassify">
                                    <el-select v-model="ruleForm.productClassify" placeholder="请选择">
                                        <el-option v-for="item in classifyList" :key="item.id" :label="item.name" :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </li>
                            <li>类型&nbsp;:&nbsp;&nbsp;&nbsp;
                                <el-form-item prop="productType">
                                    <el-select v-model="ruleForm.productType" placeholder="请选择">
                                        <el-option v-for="item in typeList" :key="item.id" :label="item.productName" :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </li>
                        </ul>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item class="btn_item">
                <el-button class="save_btn" :disabled="isSave" type="primary" @click="submitForm('ruleForm')">保存</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<style lang="less">
    #add_dialog {
        .el-dialog {
            min-width: 700px;
            margin-top: 9vh !important;
            .el-dialog__header {
                background: #27a1f2;
            }
            .el-dialog__body {
                padding: 30px 25px;
            }
        }
        .el-form-item {
            display: flex;
            justify-content: center;
            align-items: center;
            .el-form-item__label {
                width: 60px !important;
            }
            .el-form-item__content {
                width: 90%;
                margin-left: 0 !important;
            }
            #upload_file {
                .el-upload-dragger {
                    width: 92px !important;
                    height: 90px !important;
                }
            }
        }
        .el-form-item.sec_form_item {
            margin-top: 30px;
            margin-bottom: 30px;
        }
        .el-form-item.show_img .el-form-item__label {
            visibility: hidden;
        }
        .show_msg {
            .el-form-item__content {
                width: 100%;
                .el-textarea__inner {
                    resize: none !important;
                }
            }
        } // 保存按钮
        .el-form-item.btn_item {
            .el-form-item__content {
                width: 100%;
                display: flex;
                justify-content: center;
            }
        }
    }
</style>
<style lang="less" scoped>
    .sec_item {
        position: relative;
        #upload_file {
            display: block;
            width: 92px;
            height: 90px;
            position: absolute;
            z-index: 2;
            opacity: 0;
            cursor: pointer;
            .el-upload-dragger {
                width: 92px !important;
                height: 90px !important;
            }
            i {
                width: 92px;
                height: 90px;
                position: absolute;
                top: 0;
            }
        }
        .load_btn {
            position: absolute;
            z-index: 1;
            padding: 9px 10px;
            background: #27A2F2;
            .el-icon-plus {
                font-size: 70px;
                color: #fff;
            }
        }
        .sec_word {
            display: flex;
            padding: 10px 0 20px 0;
            height: 60px;
            margin-left: 140px;
            .word_con {
                p {
                    height: 25px;
                    letter-spacing: 1px;
                }
                p:nth-child(1) {
                    margin-bottom: 10px;
                }
            }
        }
    }
    .show_img {
        margin-bottom: 0;
    }
    .show_img_list {
        margin-left: 30px;
        display: flex;
        li:nth-child(n+2) {
            margin-left: 20px;
        }
        li {
            width: 100px;
            height: 100px; // background:#E9E9E9;
            border-radius: 5px;
            position: relative;
            img {
                position: absolute;
                z-index: 5;
                width: 100%;
                height: 100%;
            }
            .el-button {
                // background:#409EFF;
                padding: 0;
                border-radius: 50%;
                position: absolute;
                right: -10px;
                top: -10px;
                z-index: 10;
                i {
                    font-size: 20px;
                    border-radius: 50%;
                }
            }
        }
    }
    .show_msg {
        margin-top: 22px;
        margin-bottom: 0;
    }
    .show_msg_list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
            width: 30%;
            display: flex;
            align-items: center;
            margin-bottom: 30px;
            .el-form-item {
                width: 75%;
                .el-input {
                    width: 100%;
                }
                .el-select {
                    width: 100% !important;
                }
            }
        }
        li:nth-child(3n+1) {
            padding-left: 10px;
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                dialogVisible: false,
                isSave: true,
                isMultiple: true,
                isDrag: true,
                limitNumber: 5,
                admin: {
                    type: 'product'
                },
                ruleForm: {
                    title: '',
                    name: '',
                    productImage: '',
                    productBrand: '',
                    productSize: '',
                    productUnit: '',
                    productUnitVal: '',
                    productStock: null,
                    productClassify: '',
                    productType: '',
                    productTypeVal: ''
                },
                rules: {
                    name: [{
                            required: true,
                            message: '请输入产品名称',
                            trigger: 'blur'
                        },
                        {
                            min: 1,
                            max: 8,
                            message: '长度在 3 到 8 个字符',
                            trigger: 'blur'
                        },
                    ],
                    productBrand: [{
                        required: true,
                        message: '请输入产品品牌',
                        trigger: 'blur'
                    }],
                    productSize: [{
                        required: true,
                        message: '请输入产品规格',
                        trigger: 'blur'
                    }],
                    productUnit: [{
                        required: true,
                        message: '请输入单位名称',
                        trigger: 'blur'
                    }],
                    productStock: [{
                        required: true,
                        message: '请输入产品库存',
                        trigger: 'blur'
                    }],
                    productClassify: [{
                        required: true,
                        message: '请选择产品分类',
                        trigger: 'blur'
                    }],
                    productType: [{
                        required: true,
                        message: '请选择产品类型',
                        trigger: 'blur'
                    }]
                },
                brandList: [],
                classifyList: [],
                typeList: [],
                sizeList: [],
                unitList: [],
                clickTypes: '',
                productId: '',
                index: null,
                images: '',
                imageUrl: '',
                imgUrls: [],
                imageArr: []
            }
        },
        created() {
            //  品牌信息查询
            this.$http.post('/api/product/brand/find', {})
                .then(res => {
                    //console.log(res.data.info.list);
                    this.brandList = res.data.info.list;
                })
                .catch(err => {
                    console.log(err);
                });
            //  分类信息查询
            this.$http.post('/api/product/sort/find', {})
                .then(res => {
                    // console.log(res.data.info.list);
                    this.classifyList = res.data.info.list;
                })
                .catch(err => {
                    console.log(err);
                });
            //  单位信息查询
            this.$http.post('/api/product/unit/find', {})
                .then(res => {
                    //console.log(res.data.info.list);
                    this.unitList = res.data.info.list;
                })
                .catch(err => {
                    console.log(err);
                });
            //  类型信息查询
            this.$http.post('/api/product/type/find', {})
                .then(res => {
                    // console.log(res.data.info.list);
                    this.typeList = res.data.info.list;
                })
                .catch(err => {
                    console.log(err);
                });
            this.$root.$on('showWindow', (data) => { //  弹出框的显示
                console.log(data);
                this.clickTypes = data['type'];
                if (this.clickTypes) {
                    this.$nextTick(() => {
                        // this.$refs['ruleForm'].resetFields();
                        this.ruleForm = {
                            title: '新增产品'
                        };
                        this.imgUrls = [];
                    });
                } else {
                    this.ruleForm.title = '编辑产品';
                    this.$nextTick(() => {
                        if (data.rowData.productImage == '' || data.rowData.productImage == null) {
                            this.imgUrls = [];
                        } else {
                            let that = this;
                            let hostName = location.hostname;
                            let port = location.port;
                            this.imgUrls = data.rowData.productImage.split(';');
                            this.imageArr = data.rowData.productImage.split(';');
                            this.imgUrls.forEach(function(e, i) {
                                that.imgUrls[i] = ('http://' + hostName + ':' + port + '/api/sms' + that.imgUrls[i]);
                            });
                        }
                        this.sizeList = data.rowData.specificationValue;
                        this.ruleForm.name = data.rowData.name;
                        this.ruleForm.productBrand = data.rowData.brandId;
                        this.ruleForm.productSize = data.rowData.specificationValue;
                        this.ruleForm.productUnit = data.rowData.unitId;
                        this.ruleForm.productStock = data.rowData.inventoryQuantity;
                        this.ruleForm.productClassify = data.rowData.classificationId;
                        this.ruleForm.productType = data.rowData.typeId;
                        this.ruleForm.productImage = data.rowData.productImage;
                        this.productId = data.rowData.id;
                    });
                }
                this.dialogVisible = true;
            })
        },
        watch: {
            ruleForm: {
                handler: function(value, oldValue) {
                    if (this.ruleForm.name == '' || this.ruleForm.name == null || this.ruleForm.productStock == '' || this.ruleForm.productStock == null) {
                        this.isSave = true;
                    } else {
                        this.isSave = false;
                    }
                    this.ruleForm.productUnitVal = this.unitList[this.ruleForm.productUnit - 1] == undefined ? '' : this.unitList[this.ruleForm.productUnit - 1].unitName;
                    this.ruleForm.productTypeVal = this.typeList[this.ruleForm.productType - 1] == undefined ? '' : this.typeList[this.ruleForm.productType - 1].productName;
                },
                deep: true
            }
        },
        methods: {
            closeDialog() {
                this.dialogVisible = false;
                this.imgUrls = [];
                this.$refs['ruleForm'].resetFields();
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt = file.size / 1024 < 500;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt) {
                    this.$message.error('上传头像图片大小不能超过 500K!');
                }
                return isJPG && isLt;
            },
            exceedLimit() {
                this.$message.error('您最多可上传五张图片!');
            },
            handleAvatarSuccess(res, file) {
                // console.log(res,file);
                // this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
                let hostName = location.hostname;
                let port = location.port;
                this.images = res.info;
                this.imageUrl = 'http://' + hostName + ':' + port + '/api/sms' + this.images; //  后台返回来的是绝对路径,而html显示的则是带http的相对地址,所以需要拼接本机域名和端口号
                this.imgUrls.push(this.imageUrl); //  显示图片需要
                this.imageArr.push(this.images); //  上传后台需要
                this.ruleForm.productImage = this.imageArr.join(';');
            },
            deleteImg(event) {
                // console.log(event.currentTarget.parentNode);
                this.isDelete = true;
                let lis = event.currentTarget.parentNode;
                lis.parentNode.removeChild(lis);
                this.index = lis.getAttribute("data-id");
                let list = [];
                for (let i = 0; i < this.imageArr.length; i++) {
                    if (this.index != i) {
                        list.push(this.imageArr[i]);
                        this.$message({
                            type: 'success',
                            message: '删除成功！'
                        });
                    }
                }
                 this.imageArr = list;
                 this.ruleForm.productImage = this.imageArr.join(';');
            },
            submitForm(formName) {
                if (!this.clickTypes) {
                    this.$http({ //  编辑产品
                        url: '/api/product/info/update',
                        method: 'POST',
                        data: [{
                            'id': this.productId,
                            'name': this.ruleForm.name,
                            'unitId': this.ruleForm.productUnit,
                            'unitName': this.ruleForm.productUnitVal,
                            'specificationValue': this.ruleForm.productSize,
                            'typeId': this.ruleForm.productType,
                            'classificationId': this.ruleForm.productClassify,
                            'typeName': this.ruleForm.productTypeVal,
                            'brandId': this.ruleForm.productBrand,
                            'productImage': this.ruleForm.productImage
                        }]
                    }).then(res => {
                        console.log(res.data.msg);
                        this.$root.$emit('getDatezdy', 1)
                    }).catch(err => {
                        console.log(err)
                    });
                    this.dialogVisible = false;
                    this.$refs[formName].resetFields();
                } else {
                    this.$http({ //  新增产品
                        url: '/api/product/info/insert',
                        method: 'POST',
                        data: {
                            'name': this.ruleForm.name,
                            'unitId': this.ruleForm.productUnit,
                            'unitName': this.ruleForm.productUnitVal,
                            'specificationValue': this.ruleForm.productSize,
                            'typeName': this.ruleForm.productTypeVal,
                            'classificationId': this.ruleForm.productClassify,
                            'typeId': this.ruleForm.productType,
                            'brandId': this.ruleForm.productBrand,
                            'inventoryQuantity': this.ruleForm.productStock - 0,
                            'productImage': this.ruleForm.productImage
                        }
                    }).then(res => {
                        console.log(res.data.msg)
                        this.$root.$emit('getDatezdy', 1)
                    }).catch(err => {
                        console.log(err)
                    });
                    this.dialogVisible = false;
                    this.$refs[formName].resetFields();
                }
            },
        },
        beforeDestroy() {
            this.$root.$off('showWindow');
        }
    }
</script>