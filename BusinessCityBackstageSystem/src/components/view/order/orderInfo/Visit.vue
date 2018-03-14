<template>
    <div id="visit">
        <div class="visitHeader">
            <el-button type="primary" @click="diagShow">新增</el-button>
        </div>
        <div class="visitMain" v-loading="isLoading">
            <el-form :model="dataList[index]" ref="ruleForm" 
            label-width="100px" class="demo-ruleForm" 
            v-for="(item,index) in dataList" :key="index">
                <el-form-item class="visit-item">
                    <p class="visit-round"></p>
                    <ul class="visit-des">
                        <li>{{item.createTime}}</li>
                        <li>回访时间 : {{item.time}}</li>
                        <li>回访人 : {{item.customerAccount.name}}</li>
                        <li>类型 : {{item.visitType}}</li>
                    </ul>
                    <el-form-item label="客户反馈:" prop="Feedback">
                        <el-input class="text" type="textarea" :disabled='edit[index]' v-model="item.feedback"></el-input>
                    </el-form-item>
                    <el-form-item label="回访内容:" prop="visitCont">
                        <el-input class="text" type="textarea" :disabled='edit[index]' v-model="item.report"></el-input>
                    </el-form-item>
                    <el-form-item class="visit-btn">
                        <el-button type="primary" :data-id="item.id" plain :disabled="!edit[index]" @click="editData(index,$event)">编辑</el-button>
                        <el-button type="primary" :data-id="item.id" :disabled="edit[index]" @click="submitForm(index,$event)">保存</el-button>
                    </el-form-item>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog
            id="chatting-box"
            :append-to-body="true"
            :title="diagForm.title"
            :visible.sync="dialogVisible"
            :before-close="handleClose">
            <el-form 
            :model="diagForm"
            :rules="rules" ref="diagForm" 
            label-width="100px" 
            class="demo-diagForm">
                <el-form-item class="visit-item" label="回访时长:" prop="time">
                    <el-input v-model="diagForm.time"></el-input>
                </el-form-item>
                <el-form-item class="visit-item" label="回访用户:" prop="userId">
                    <el-input v-model="diagForm.userId"></el-input>
                </el-form-item>
                <el-form-item class="visit-item" label="回访类型:" prop="visitType">
                    <el-col :span="10">
                    <el-select v-model="diagForm.visitType" placeholder="请选择">
                        <el-option
                        :popper-append-to-body="false"
                        v-for="item in visitTypes"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                    </el-col>
                </el-form-item>   
                <el-form-item label="客户反馈:" prop="Feedback">
                    <el-input type="textarea" v-model="diagForm.Feedback"></el-input>
                </el-form-item>
                <el-form-item label="回访内容:" prop="report">
                    <el-input type="textarea" v-model="diagForm.report"></el-input>
                </el-form-item>
                <el-form-item class="visit-btn">
                    <el-button type="primary" @click="submitDiag">保存</el-button>
                </el-form-item>
            </el-form>        
        </el-dialog>
    </div>
</template>
<script>
export default{
    props:['memberId'],
    data () {
        var validateTime = (rule,value,callback) => {
            if(!value){
                return callback(new Error('时长不能为空'));
            }
            setTimeout(() => {
                if(isNaN(value)){
                    callback(new Error('请输入数字类型'));
                }
            },500);
        };
        return {
            dialogVisible: false,
            isLoading:true,
            memberIde:'',
            number:0,
            numbers:0,
            dataList:[],
            edit:{},
            diagForm:{
                userId:'',title:'新增回访记录',
                time:'',visitType:'',createTime:'',
                Feedback: '',report:''
            },
            visitTypes:[],
            rules: {
                userId: [
                    { required: true, message: '请输入回访用户', trigger: 'blur' }
                ],
                time: [
                    { validator: validateTime, trigger: 'blur' }
                ],
                visitType: [
                    { required: true, message: '请输入回访类型', trigger: 'blur' }
                ],
                Feedback: [
                    { required: true, message: '请输入反馈内容', trigger: 'blur' },
                    { min: 3, max: 200, message: '长度在 3 到 200个字符', trigger: 'blur' }
                ],
                report: [
                    { required: true, message: '请输入回访内容', trigger: 'blur' },
                    { min: 3, max: 200, message: '长度在 3 到 200个字符', trigger: 'blur' }
                ]
            }
        }
    },
    created(){
        this.searchInfo();
        this.memberIde = this.memberId;
    },
    methods:{
        diagShow(){
            this.$http.post(
                '/api/customer/visits/category/query',
            ).then(res => {
                this.visitTypes = res.data.info;
            }).catch(err => {console.log(err)});
            this.dialogVisible = true;
            this.edit[this.numbers] = true;
        },
        searchInfo(){
            let that = this;
            this.$http({
                url:'/api/customer/visits/findData',
                method:'POST'
            }).then((res) => {
                that.dataList = res.data.info.list;
                for(let i =  0;i<this.dataList.length;i++){
                    this.$set(this.edit,i,true);// 进行数据跟踪以便于动态数据渲染
                }
                that.isLoading = false;
                that.$root.$emit('load',false);
            }).catch((err) => {
                console.log(err);
            });
        },
        handleClose(done){
            this.dialogVisible = false;
            this.$refs.diagForm.resetFields();
        },
        editData(index,event) { 
            console.log(this.dataList[index]);
            this.edit[index] = false;
            this.numbers = index;
        },
        submitForm(index) {
            console.log(this.dataList[index]);
            let that = this;
            this.edit[index] = true;
            let data = {
                id:this.dataList[index].id,
                customerId:this.dataList[index].customerId,
                feedback:this.dataList[index].feedback,
                report:this.dataList[index].report
            };
            this.$http.post('/api/customer/visits/update',
                data
            ).then(res => {
                console.log(res.data.msg);
                that.isActive = true;
                that.searchInfo();
            }).catch(err => {console.log(err)});
        },
        submitDiag(){
            let that = this;
            let data = [{
                adminUserId:this.diagForm.adminUserId,//回访用户ID
                feedback:this.diagForm.Feedback,
                report:this.diagForm.report,
                time:this.diagForm.time,              //回访时长
                visitTypeId:this.diagForm.visitTypeId,
                customerId:this.memberIde             //会员的ID
            }];
            this.$refs['diagForm'].validate((valid) => {
                if (valid) {
                    data.forEach((e,i) => {
                        if(e.adminUserId == '' || e.feedback == '' || e.report == '' || e.visitTypeId == '' || e.customerId == ''){
                            this.$message.error('内容不能有空!');
                            return false;
                        }else{
                            this.$http.post('/api/customer/visits/insert',
                                data
                            ).then(res => {
                                console.log(res.data.msg);
                                that.searchInfo();
                                that.isLoading = true;
                                that.dialogVisible = false;
                                that.$refs.diagForm.resetFields();
                            }).catch(err => {console.log(err)});
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });  
        }
    }
}
</script>
<style lang="less">
.visitMain{
    table{
        width: 100%;
    }
    table td:nth-child(3) .cell{
        border:none;
    }
    .el-table thead{
        color:#000;
    }
    .visit-item{  
        .el-form-item__content{
            margin-left: 0 !important;
        }
        .el-form-item{
            .el-form-item__content{
                width:80%;
            }
            .el-textarea__inner{
                resize:none;
            }
        }
        .visit-btn{
            .el-form-item__content{
                width:100%;
            }
        }
    }
}
#chatting-box{ 
    .el-dialog__header{
        background: #409EFF;
    }
    .el-form-item__content{
        margin-left: 0 !important;
        .el-form-item{
            margin-left:20px;
        }
        
    }
    .visit-des{
        display:flex;
        margin-left:25px;
        color:#777;
        // letter-spacing:1px;
        margin-bottom: 20px;
        li:nth-child(n+2){
            margin-left:30px;
        }
    }
    .el-form-item{
        margin-bottom: 30px;
        display:flex;
        .el-form-item__content{
            width:100%;
        }
        .el-textarea__inner{
            resize:none;
        }
    }
    .visit-btn{
        .el-form-item__content{
            width:100%;
        }
    }
    .visit-btn{
        height: 40px;
        margin-bottom:0;
        position: relative;
        .el-button{
            position: absolute;
            left: 45%;
        }
    }
}
</style>
<style scoped lang="less">
#visit{
    padding:40px 20px 40px;
    height:500px;
    overflow-y:scroll;
    .visitHeader{
        position: relative;
        height:40px;
        .el-button{
            padding:10px 20px;
            position:absolute;
            right:0;
        }
    }
    .visitHeader::before{
        content:'';
        display:block;
        width: 0px;
        height: 40px;
        border-left:3px solid #409EFF;
        position:absolute;
        z-index:20;
    }
    .visitMain{
        .visit-item{
            position: relative;
            border-left:3px solid #409EFF;
            margin-bottom: 0;
            .visit-round{
                content:'';
                width: 26px;
                height: 26px;
                border-radius:50%;
                background: #ECEFFE;
                position:absolute;
                left: -14px;
                top:0;
                z-index:20;
            }
            .visit-round::before{
                display:block;
                content:'';
                width: 13px;
                height: 13px;
                border-radius:50%;
                position:absolute;
                background: #BFD0F7;
                top: 0;
                bottom: 0;
                right: 0;
                left: 0;
                margin:auto;
                z-index:20;
            }
            .visit-des{
                display:flex;
                margin-left:25px;
                color:#777;
                // letter-spacing:1px;
                margin-bottom: 20px;
                li:nth-child(n+2){
                    margin-left:30px;
                }
            }
            .el-form-item{
                margin-bottom: 30px;
                display:flex;
            }
            .visit-btn{
                height: 40px;
                margin-bottom:0;
                position: relative;
                .el-button{
                    position: absolute;
                    right:30px;
                }
                .el-button:first-child{
                    right: 130px;
                }
            }
            
        }
    }
   
}
</style>

