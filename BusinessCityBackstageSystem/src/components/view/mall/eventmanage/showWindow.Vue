<template>
    <el-dialog :title="ruleForm.textInfo" @click="closeDialog" :visible.sync="dialogVisible" width="50%" class='eventtempdialogs'>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span='8'>
                    <el-form-item label="活动标题：" prop="activityTitle">
                        <el-input v-model="ruleForm.activityTitle"></el-input>
                    </el-form-item>
                    <el-form-item label="活动地点：" prop="activityPlace">
                        <el-input v-model="ruleForm.activityPlace"></el-input>
                    </el-form-item>
                    <el-form-item label="活动模板：" prop="templateId">
                        <el-button type="primary" @click.native="selectDetailPage" style="height:34px;line-height:8px;">查询活动模板</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span='8'>
                    <el-form-item label="开始时间：" prop="startTime">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.startTime" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动分类：" prop="activitySortId">
                         <el-select v-model="ruleForm.id"  placeholder="分类" class='typeselect'>
                            <el-option
                            v-for="item in listtype"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="活动标签：" prop="note">
                        <!-- 活动模板名称 -->
                        <el-input v-model="ruleForm.note" placeholder="请选择活动模板" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='8'>
                    <el-form-item label="结束时间：" prop="endTime">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.endTime" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='22'>
                    <el-form-item label="活动图片：">
                         <div id="eventPicture">
                            <div class="chooseImg" style="width: 270px;height:145px;">
                                <div class="center">
                                <img :src="eventImages" class="microImg eventimgcontent">
                                </div>
                            </div>
                            <div class="reLoadingImg">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="importFileUrl"  
                                    :show-file-list="false"
                                    :data="admin"   
                                    name='fileUpload'
                                    :on-success="handleAvatarSuccess"
                                  
                                    :before-upload="beforeAvatarUpload" style="position:absolute;top:0;left:0;width:100%;height:100%;">
                                </el-upload>
                                <p style="line-height: 887%;text-align: center;font-size: 16px;">重新上传</p>
                             </div>
                         </div>
                         <div class='tips' style="position: absolute;right: 34px;top: 65px;">
                            <p>提示：1.本地上传图片大小不超过500k，750*412像素（建议尺寸）</p>
                            <p style='text-indent:3em;'>2.最多可上传1张图片</p>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='22'>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </el-dialog>
</template>

<script>
import qs from 'qs'
    export default {
        data() {
            return {
                id:'',
                dialogVisible: false,
                importFileUrl:'api/zuul/sms/file/fileUpload',
                admin:{type:'admin'},
                eventImages:'',
                images:'',
                listtype:[],
                ruleForm: {
                    textInfo: '新增活动',
                    type:'',
                    typeid:'',
                    activityTitle:'',
                    activityPlace:'',
                    startTime:'',
                    endTime:'',
                    detailTemplateInfoId:'',
                    note:'',
                    images:'',
                    activityLink:''
                },
                rules: {
                    type: [{
                        required: true,
                        message: '请选择活动类型',
                        trigger: 'change'
                    }, ],
                    activityTitle: [{
                        required: true,
                        message: '请输入活动名称',
                        trigger: 'blur'
                    }, ],
                    activityPlace: [{
                        required: true,
                        message: '请输入活动地址',
                        trigger: 'blur'
                    }],
                    startTime: [{
                        required: true,
                        message: '请选择开始时间',
                        trigger: 'blur'
                    }],
                    endTime: [{
                        required: true,
                        message: '请选择结束时间',
                        trigger: 'blur'
                    }]
                },
                apis:'http://daojia.jingrunjia.com.cn/'
            };
        },
        methods: {
            //获取活动信息
            getActivityInfo(data){
                    if(data){
                        let hostName = location.hostname;
                        let port = location.port;
                        let data= data;
                        this.id = data.id;
                        this.ruleForm.activityTitle = data.activityTitle
                        this.ruleForm.startTime = data.startTime
                        this.ruleForm.endTime = data.endTime
                        this.ruleForm.activityPlace = data.activityPlace
                        this.ruleForm.activityLink = data.activityLink
                        this.ruleForm.images = data.image
                        this.eventImages = 'http://' + hostName + ':' + port + '/api' + that.images;
                        this.ruleForm.typeid = data.activitySortId
                        this.ruleForm.detailTemplateInfoId = data.templateId
                        this.ruleForm.note = data.note
                        // console.log(that.ruleForm.categoryId);
                        let url = '/api/product/mall/template/query?page=1&pageSize=10';
                        let detailTemplateIds = data.templateId
                                that.$http({
                                    url: url,
                                    method: 'POST',
                                    // 请求体重发送的数据
                                    // headers: { 'Content-Type': 'application/json' },
                                    data:{
                                        'templateID':detailTemplateIds,
                                        'templateType':2
                                    },
                                })
                                .then(response => {
                                // console.log(response)
                                    if(response.data.info.list.length == 0){
                                    }else{
                                        this.ruleForm.detailTemplateInfoName = response.data.info.list[0].templateName
                                    }
                            })
                            .catch(error=>{
                                console.log(error);
                                //         alert('网络错误，不能访问');
                            })
                    }else{
                        this.$message('出现错误');
                    }
            },
            //上传图片
             handleAvatarSuccess(res, file) {
                console.log(res,file);
                let hostName = location.hostname;
                let port = location.port;
                this.images = res.info;
                this.eventImages = 'http://' + hostName + ':' + port + '/api' + this.images; //  后台返回来的是绝对路径,而html显示的则是带http的相对地址,所以需要拼接本机域名和端口号
                this.ruleForm.images = this.eventImages;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isGIF = file.type === 'image/gif';
                const isPNG = file.type === 'image/png';
                const isBMP = file.type === 'image/bmp';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG & !isGIF && !isBMP) {
                this.common.errorTip('上传图片必须是JPG/GIF/PNG/BMP 格式!');
                }
                if (!isLt2M) {
                this.common.errorTip('上传图片大小不能超过 2MB!');
                }
                return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
            },
            //弹出活动模板弹框
            selectDetailPage(){
             this.$root.$emit('opendialogSelectActivity',true)
            },
            //关闭弹框清空
            closeDialog(){
                this.dialogVisible = false;
                this.$refs['ruleForm'].resetFields();
            },
            //获取活动分类信息
            getType(){
                let that=this;
                this.$http.post('/api/product/activity/sort/find?pageNo=1&pageSize=0',)
                .then(function (response) {
                    let data=response.data;
                    if(data.msg=='查询成功'){
                        that.listtype=data.info.list;
                        that.ruleForm.type=that.listtype[0]?that.listtype[0].name:'';
                        that.ruleForm.typeid=that.listtype[0]?that.listtype[0].id:'';
                    }
                    else{
                        that.$message(data.msg);
                    }
                   console.log(response);
                })
                .catch(function(response){
                    that.$message('请求出错！');
                })
            },
            //新增/修改活动
            submitForm(formName) {
                    //     this.dialogVisible = false;
                        //     this.$refs[formName].resetFields();
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        let that=this;
                        let data;
                        let url;
                        if(this.ruleForm.textInfo == "新增活动"){

                            console.log(new Date(this.ruleForm.startTime))
                            console.log(this.ruleForm.endTime)
                            var d = new Date(this.ruleForm.startTime); 
                            var f = new Date(this.ruleForm.endTime);
                            var startimedate = new Date(d);
                            var time1 = startimedate.getTime();
                            var endtimedate = new Date(f);
                            var time2 = endtimedate.getTime();
                            this.ruleForm.activityLink = this.apis+'eventTemplate?templateId='+this.ruleForm.detailTemplateInfoId
                            url='/product/activity/insert';
                            data = {
                                    activityTitle:this.ruleForm.activityTitle,
                                    startTime:time1,
                                    endTime:time2,
                                    activityPlace:this.ruleForm.activityPlace,
                                    activityLink:this.ruleForm.activityLink,
                                    image:this.ruleForm.images,
                                    activitySortId:this.ruleForm.typeid,
                                    templateId:this.ruleForm.detailTemplateInfoId,
                                    note:this.ruleForm.note
                                };
                        }else if(this.ruleForm.textInfo == "编辑活动"){
                            this.ruleForm.activityLink = this.apis+'eventTemplate?id='+this.ruleForm.detailTemplateInfoId
                            url='/product/activity/update';
                            data = [{
                                    id:this.id,
                                    activityTitle:this.ruleForm.activityTitle,
                                    startTime:this.ruleForm.startTime,
                                    endTime:this.ruleForm.endTime,
                                    activityPlace:this.ruleForm.activityPlace,
                                    activityLink:this.ruleForm.activityLink,
                                    image:this.ruleForm.images,
                                    activitySortId:this.ruleForm.typeid,
                                    templateId:this.ruleForm.detailTemplateInfoId,
                                    note:this.ruleForm.note
                                }];
                        }
                        this.$http.post('/api'+url,data)
                        .then(function(response){
                            console.log(response)
                            if(response.data.msg=='新增成功'){
                                // that.$message.success('操作成功！');
                                //清空工作
                                //更新表单
                                that.$root.$emit('markUpate')
                                that.dialogVisible = false;
                                that.$refs['ruleForm'].resetFields();
                                that.$refs.detailcommodity.setAttribute('class','detailcommodity off');
                            }
                            else{
                                that.$message(response.data.msg);
                            }
                        })
                        .catch(function(response){
                            console.log(response);
                        })
                    } else {
                        this.$alert('请将表单填写完整！', '提示', {confirmButtonText: '确定'});
                        return false;
                    }
                });
            }
        },
        created: function() {
            this.$root.$on('showWindowss', (data) => {
                this.$nextTick(() => {
                    this.getType();
                    if (data.type != 'no') {
                        this.dialogVisible = true;
                        this.ruleForm.textInfo = '编辑活动';
                        console.log(data.rowData);
                        this.getActivityInfo(data.rowData)
                    }else{
                        this.dialogVisible = true;
                        this.ruleForm.textInfo = '新增活动';
                        this.ruleForm.type="";
                    }
                })
            });
            this.$root.$on('saveActivityTemplateInfos', (data) => {
                this.ruleForm.note = data.templateName
                this.ruleForm.detailTemplateInfoId = data.templateID
            })
        },
        beforeDestroy(){
            this.$root.$off('showWindowss');
            this.$root.$off('saveActivityTemplateInfos');
        }
    }
</script>
<style>
    .imgBox {
        width: 100px;
        height: 100px;
        border: 1px solid #ddd;
    }
    .lineBline {
        border-bottom: 1px solid #ddd;
    }
    @media screen and (min-width:1200px){
    .eventtempdialogs .el-dialog{
        height:69%;
    }
    }
    @media screen and (min-width:1400px){
    .eventtempdialogs .el-dialog{
        height:68%;
    }
    }
    @media screen and (min-width:1700px){
     .eventtempdialogs .el-dialog{
        height:59%;
    }
    }
    @media screen and (min-width:1800px){
     .eventtempdialogs .el-dialog{
        height:56%;
    }
    }
    @media screen and (min-width:1900px){
    .eventtempdialogs .el-dialog{
        height:52%;
    }
    }

     @keyframes fadeIn {
    0% {
    opacity: 0; /*初始状态 透明度为0*/
    }
    50% {
    opacity: 0; /*中间状态 透明度为0*/
    }
    100% {
    opacity: 1; /*结尾状态 透明度为0.7*/
    }
    }
     #eventPicture{width:270px;background:#fff;float:left;position: relative;}
    .center{width: 100%;height: 100%;}
    .microImg{width: 100%;height: 100%;}
    #eventPicture .eventimgcontent {width: 270px;height: 145px;display: block;background-color: #ebeef5;}
    .reLoadingImg{width:100%;height:100%;color:#fff;background-color:rgba(0,0,0,.5);filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity: 0;opacity: 0;position:absolute;top:0;left:0;}
    .reLoadingImg:hover{filter:alpha(opacity=1);-moz-opacity:1;-khtml-opacity: 1;opacity: 1;cursor: pointer;animation-name: fadeIn; /*动画名称*/animation-duration: 0.4s; /*动画持续时间*/animation-iteration-count: 1; /*动画次数*/animation-delay: 0s; /*延迟时间*/}
    #eventPicture .avatar-uploader .el-upload {border: 1px dashed #ffffff !important;}
    #eventPicture .el-upload {filter:alpha(opacity=0) !important;-moz-opacity:0 !important;-khtml-opacity: 0 !important;opacity: 0 !important;width: 100% !important;height: 100% !important;}
    #eventPicture .carouselListInfo .avatar-uploader .el-upload {border-radius: 6px;cursor: pointer;position: relative;overflow: hidden;}
    #eventPicture .avatar-uploader .el-upload:hover {border-color: #ffffff !important;}
    #eventPicture .carouselListInfo .avatar-uploader-icon {font-size: 28px;color: #8c939d;width: 178px;height: 141px;line-height: 178px;text-align: center;}
</style>
