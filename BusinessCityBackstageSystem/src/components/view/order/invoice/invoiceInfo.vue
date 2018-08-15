<template>
<div>
    <div v-if='this.dataInfo==null' class='cinvoiceInfo' style='line-height:400px;text-align: center;'>
        暂无发票信息
    </div>
    <div class='cinvoiceInfo'>
        <el-row class='infoTopBox' v-if='invoiceType=="未处理"'>
            <el-col :span='10' :offset='2' class='invoicText'>
                发票类型: 发票类型--{{invoisState==11?'个人普通发票':invoisState==21?'单位普通发票':invoisState==22?'单位专用发票':""}}
            </el-col>
            <el-col :span='10' :offset='2' style='position:relative;'>
                <p>申请时间：{{dataInfo.createTime}} </p>
                金额：￥{{dataInfo.orderInfo.orderMoney}}
                <div class='invoiceState'>
                    <span class='rotates'>{{invoiceType}}</span>
                </div>
            </el-col>
        </el-row>
        <el-row class='infoTopBox' v-else-if='invoiceType=="驳回"'>
            <el-col :span='10' :offset='2' class='invoicText'>
                驳回原因：<textarea style='resize:none;width:200px;height:40px;'>{{dataInfo.disallowanceReason}}</textarea>
            </el-col>
            <el-col :span='10' :offset='2' style='position:relative;'>
                <p>申请时间：{{dataInfo.createTime}} </p>
                <p>处理时间：{{dataInfo.finishTime}}</p>
                <div class='invoiceState'>
                    <span class='rotates'>{{invoiceType}}</span>
                </div>
            </el-col>
        </el-row>
        <el-row class='infoTopBox' v-else-if='(invoiceType=="发放完成"&&invoisState==22)'>
            <el-col :span='10' :offset='2' class='invoicText'>
                快递公司: {{dataInfo.logisticsCompany}} 快递单号：{{dataInfo.logisticsNumber}}
            </el-col>
            <el-col :span='10' :offset='2' style='position:relative;'>
                <p>申请时间：{{dataInfo.createTime}} </p>
                <p>处理时间：{{dataInfo.finishTime}} </p>
                <div class='invoiceState'>
                    <span class='rotates'>{{invoiceType}}</span>
                </div>
            </el-col>
        </el-row>
        <el-row class='infoTopBox' v-else-if='(invoiceType=="发放完成"&&invoisState==21)'>
            <el-col :span='10' :offset='2' class='invoicText'>
                发票类型: 发票类型--{{invoisState==11?'个人普通发票':invoisState==21?'单位普通发票':invoisState==22?'单位专用发票':""}}
            </el-col>
            <el-col :span='10' :offset='2' style='position:relative;'>
                <p>申请时间：{{dataInfo.createTime}} </p>
                <p>处理时间：{{dataInfo.finishTime}} </p>
                <div class='invoiceState'>
                    <span class='rotates'>{{invoiceType}}</span>
                </div>
            </el-col>
        </el-row>
        <el-row class='infoTopBox' v-else-if='(invoiceType=="发放完成"&&invoisState==11)'>
            <el-col :span='10' :offset='2' class='invoicText'>
                电子发票：<img :src='imageUrl' style="width:150px;height:100px;" />
            </el-col>
            <el-col :span='10' :offset='2' style='position:relative;'>
                <p>申请时间：{{dataInfo.createTime}} </p>
                <p>处理时间：{{dataInfo.finishTime}} </p>
                <div class='invoiceState'>
                    <span class='rotates'>{{invoiceType}}</span>
                </div>
            </el-col>
        </el-row>
        <el-row class='payInvoice'>
            <h2>开票信息</h2>
            <el-row v-if='invoisState==22'>
                <el-col :span='10' :offset='2'>
                    <ul>
                        <li>公司名称：{{dataInfo.title}}</li>
                        <li>税&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：{{dataInfo.taxIdentity}}</li>
                        <li>注册地址：{{dataInfo.companyAddress}}</li>
                        <li>公司电话：{{dataInfo.companyTelephone}}</li>
                    </ul>
                </el-col>
                <el-col :span='10' :offset='2'>
                    <ul>
                        <li>开户银行：{{dataInfo.bankName}}</li>
                        <li>银行账户：{{dataInfo.bankAccount}}</li>
                        <li>一般纳税人证明：<img :src='dataInfo.taxpayerCertificate'  style="width:200px;height:150px;"/></li>
                    </ul>
                </el-col>
            </el-row>
            <el-row v-else-if='invoisState==21'>
                <el-col :span='10' :offset='2'>
                    <ul>
                        <li>公司名称：{{dataInfo.title}}</li>
                        <li>税&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：{{dataInfo.taxIdentity}}</li>
                    </ul>
                </el-col>
            </el-row>
            <el-row v-else-if='invoisState==11'>
                <el-col :span='10' :offset='2'>
                    <ul>
                        <li>个人名称：{{dataInfo.title}}</li>
                    </ul>
                </el-col>
            </el-row>
        </el-row>
        <el-row>
            <el-col :span='16' class=''>
                <el-col :span='3' :offset='2'>备注：</el-col>
                <el-col :span='18'>
                    <textarea readonly='readonly' class='textareaName'>{{dataInfo?dataInfo.remark:""}}</textarea>
                </el-col>
            </el-col>
        </el-row>
        <el-row class='playButon'>
            <el-col :span="12" :offset="6">
                <el-col :span="8">
                    <el-button @click='reject'>驳 回</el-button>
                </el-col>
                <el-col :span="8">
                    <el-button v-if='invoisState==22' @click='showInvoice'>上传单号</el-button>
                </el-col>
                <el-col :span="8" v-if='invoisState!=22'>
                    <el-upload class="cavatar-uploader" :action="importFileUrl" :show-file-list="false" :data="urlImg" name='fileUpload' :type='admin' :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        上传发票
                    </el-upload>
                </el-col>
            </el-col>
        </el-row>
        <el-dialog title="驳回" :visible.sync="rejects" :append-to-body="true">
            <el-form :model="form">
                <el-form-item label="驳回理由" :label-width="formLabelWidth">
                    <textarea v-model="form.Reject" style='width:80%;min-height:80px;padding:10px;resize:none;border-radius:5px;' auto-complete="off"></textarea>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="rejectsClear">取 消</el-button>
                <el-button type="primary" @click="rejectsOk">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="寄单地址" :visible.sync="invosiceBox" :append-to-body="true">
            <el-form :model="form">
                <el-form-item label="快递公司" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="快递单号" :label-width="formLabelWidth">
                    <el-input v-model="form.number" type='number' auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="invosiceBox = false">取 消</el-button>
                <el-button type="primary" @click="iSoK">确 定</el-button>
            </div>
        </el-dialog>
    </div>
    </div>
</template>
<script>
    export default {
        props: ['orderId'],
        data() {
            return {
                importFileUrl: 'api/zuul/sms/file/fileUpload',
                rejects: false,
                invosiceBox: false,
                dataInfo: [],
                invoisState: 0,
                invoiceType: '',
                imageUrl:'',
                admin: 'admin',
                urlImg: {
                    type: 'admin'
                },
                form: {
                    name: '',
                    number: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    Reject: ''
                },
                formLabelWidth: '120px'
            }
        },
        created() {
            this.getStata()
        },
        methods: {
            getStata() {
                console.log(this.orderId)
                let url = '/api/product/order/invoice/queryByIds';
                this.$http({
                    url: url,
                    method: 'post',
                    data: [this.orderId]
                }).then((res) => {
                    this.dataInfo = (res.data.info.list[0])
                    
                    let invoiceData = (res.data.info.list[0])
                    console.log(invoiceData)
                     let hostName = location.hostname;
                    let port = location.port;
                     this.imageUrl = 'http://' + hostName + ':' + port + '/api' + invoiceData.url;
                    this.invoisState = invoiceData.category
                    if (invoiceData.isDisallowance == null) {
                        if (invoiceData.isFinished == true) {
                            this.invoiceType = "发放完成"
                        }else{
                             this.invoiceType = "未处理"
                        }
                       
                    } else if (invoiceData.isDisallowance == true) {
                        if (invoiceData.isFinished == true) {
                            this.invoiceType = "驳回"
                        }else{
                            this.invoiceType = "发放完成"
                        }
                        
                    } 
                }).catch((err) => {
                    console.log(err)
                })
            },
            showInvoice() {
                this.invosiceBox = true
            },
            reject() {
                this.rejects = true
            },
            rejectsClear() { //取消
                this.rejects = false
            },
            rejectsOk() {
                this.rejects = false
                let url = '/api/product/order/invoice/update';
                this.$http({
                    url: url,
                    method: 'post',
                    data: {
                        id: this.orderId,
                        isDisallowance: true,
                        disallowanceReason: this.form.Reject,
                        category: this.invoisState
                    }
                }).then((res) => {
                    console.log(res)
                    this.invosiceBox =  false
                }).catch((err) => {
                    console.log(err)
                })
            },
            iSoK(){
                let url = '/api/product/order/invoice/update';
                this.$http({
                    url:url,
                    method:'post',
                    data:{
                        id: this.orderId,
                        logisticsCompany:this.form.name,
                        logisticsNumber:this.form.number,
                        isFinished:1
                    }
                }).then((msg)=>{
                    console.log(msg)
                    this.invosiceBox =  false
                     this.getStata()
                }).catch((err)=>{
                    console.log(err)
                })
                this.invosiceBox = false
            },
            handleAvatarSuccess(res, file) {
                let hostName = location.hostname;
                let port = location.port;
                this.images = res.info;
                let url = '/api/product/order/invoice/update';
                this.$http({
                    url: url,
                    method: 'post',
                    data: {
                        id: this.orderId,
                        url: this.images,
                        category: this.invoisState,
                        isFinished:1
                    }
                }).then((res) => {
                    console.log(res)
                    this.$message('上传成功');
                     this.getStata()
                }).catch((err) => {
                    console.log(err)
                })
                // this.imageUrl = 'http://' + hostName + ':' + port + '/api' + this.images; //  后台返
                console.log(this.imageUrl)
            },
            beforeAvatarUpload(file) {
                console.log(file.type)
                const isJPG = file.type === 'image/jpeg';
                const isGIF = file.type === 'image/gif';
                const isPNG = file.type === 'image/png';
                const isBMP = file.type === 'image/bmp';
                const isPdf = file.type === 'application/pdf';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG && !isGIF && !isPNG && !isBMP && !isPdf) {
                    this.$message('上传图片必须是JPG/GIF/PNG/BMP/PDF 格式!');
                }
                if (!isLt2M) {
                    this.$message('上传图片大小不能超过 2MB!');
                }
                return (isJPG || isBMP || isGIF || isPNG || isPdf) && isLt2M;
            }
        }
    }
</script>
 
<style scoped lang='less'>
    .cavatar-uploader {
        border: 1px solid #ddd;
        text-align: center;
        height: 38px;
        line-height: 38px;
    }
    .cinvoiceInfo {
        width: 100%;
        min-height: 400px;
        font-size: 14px;
    }
    .textareaName {
        width: 100%;
        height: 60px;
        resize: none;
        border: none;
    }
    .infoTopBox {
        position: relative;
        padding: 40px 40px 20px 40px;
        line-height: 50px;
        .invoicText {
            padding-top: 10px;
        }
        .invoiceState {
            text-align: center;
            padding: 10px;
            position: absolute;
            top: -10px;
            left: 60%;
            width: 66px;
            height: 66px;
            line-height: 70px;
            border-radius: 50px;
            background: #ddd;
            color: #777;
            border: 1px solid #666;
        }
        .rotates {
            display: block;
            transform: rotate(-7deg);
            -ms-transform: rotate(-7deg);
            /* IE 9 */
            -moz-transform: rotate(-7deg);
            /* Firefox */
            -webkit-transform: rotate(-7deg);
            /* Safari 和 Chrome */
            -o-transform: rotate(-7deg);
        }
    }
    .playButon {
        padding: 40px 0;
    }
    .payInvoice {
        padding: 5%;
        line-height: 40px;
    }
</style>