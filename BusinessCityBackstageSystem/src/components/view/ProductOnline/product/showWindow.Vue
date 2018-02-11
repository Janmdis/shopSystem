<template>
    <el-dialog id="add_dialog" :title="ruleForm.title" :visible.sync="dialogVisible" width="50%">
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
                        <input id="upload_file" type="file" >
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
            <el-form-item class="show_img" label='图片   :'>
                <el-row>
                    <el-col :span="24">
                        <ul class="show_img_list">
                            <li><img src="" /><el-button><i class="el-icon-error"></i></el-button></li>
                            <li><img src="" /><el-button><i class="el-icon-error"></i></el-button></li>
                            <li><img src="" /><el-button><i class="el-icon-error"></i></el-button></li>
                            <li><img src="" /><el-button><i class="el-icon-error"></i></el-button></li>
                            <li><img src="" /><el-button><i class="el-icon-error"></i></el-button></li>
                        </ul>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item class="show_msg">
                <el-row>
                    <el-col :span="24">
                        <ul class="show_msg_list">
                            <li class="list_li_right" >品牌&nbsp;:&nbsp;&nbsp;&nbsp;<el-form-item prop="productBrand"><el-input v-model="ruleForm.productBrand"></el-input></el-form-item></li>
                            <li class="list_li_right">规格&nbsp;:&nbsp;&nbsp;&nbsp;<el-form-item prop="productSize"><el-input v-model="ruleForm.productSize"></el-input></el-form-item></li>
                            <li >&nbsp;单位:&nbsp;&nbsp;&nbsp;<el-form-item prop="productCompany"><el-input v-model="ruleForm.productCompany"></el-input></el-form-item></li>
                            <li class="list_li_right">库存&nbsp;:&nbsp;&nbsp;&nbsp;<el-form-item prop="productStock"><el-input v-model="ruleForm.productStock"></el-input></el-form-item></li>
                            <li class="list_li_right">分类&nbsp;:&nbsp;&nbsp;&nbsp;
                                <el-form-item prop="productClassify">
                                <el-select v-model="ruleForm.productClassify" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                </el-form-item>
                            </li>
                            <li>类型&nbsp;:&nbsp;&nbsp;&nbsp;
                                <el-form-item prop="productType">
                                <el-select v-model="ruleForm.productType" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                </el-form-item>
                            </li>
                            <li>
                                <p>出入库记录&nbsp;:</p>
                                <el-form-item prop="productFlowRecord">
                                <el-input
                                type="textarea"
                                :rows="4"
                                placeholder="请输入内容"
                                v-model="ruleForm.productFlowRecord">
                                </el-input>
                                </el-form-item>
                            </li>
                        </ul>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item class="btn_item">
                <el-button class="save_btn" type="primary" @click="submitForm('ruleForm')">保存</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<style lang="less">
#add_dialog{
    .el-dialog{
        min-width: 700px;
        margin-top:9vh !important;
        .el-dialog__header{
            background:#27a1f2;
        }
        .el-dialog__body{
            padding:30px 25px;
        }
    }
    .el-form-item{
        display:flex;
        justify-content: center;
        align-items: center;
        .el-form-item__label{
            width: 60px !important;
        }
        .el-form-item__content{
            width: 90%;
            margin-left:0 !important;
        }
    }
    .el-form-item.sec_form_item{
        // height:90px;
        margin-top:30px;
        margin-bottom:10px;
    }
    .el-form-item.show_img .el-form-item__label{
        visibility: hidden;
    }
    .show_msg{
        .el-form-item__content{
            width: 100%;
            .el-textarea__inner{
                resize:none !important;
            }
        }
    }
    // 保存按钮
    .el-form-item.btn_item{
        .el-form-item__content{
            width: 100%;
            display:flex;
            justify-content: center;
        }
    }
}
</style>
<style lang="less" scoped>
.sec_item{
    position: relative;
    #upload_file{
        display:block;
        width: 92px;
        height: 90px;
        position: absolute;
        z-index:2;
        opacity:0;
        cursor: pointer;
    }
    .load_btn{
        position: absolute;
        z-index:1;
        padding:9px 10px;
        background:#27A2F2;
        .el-icon-plus{
            font-size:70px;
            color:#fff;
        }
    }
    .sec_word{
        display:flex;
        padding:10px 0 20px 0;
        height:60px;
        margin-left:140px;
        .word_con {
            p{
                height:25px;
                letter-spacing:1px;
            }
            p:nth-child(1){
                margin-bottom:10px;
            }
        }
    }
}
.show_img_list{
    display:flex;
    justify-content:space-between;
    li{
        width: 100px;
        height: 100px;
        background:#E9E9E9;
        border-radius:5px;
        position:relative;
        .el-button{
            // background:#409EFF;
            padding:0;
            border-radius:50%;
            position:absolute;
            right: -10px;
            top: -10px;
            i{
                font-size: 20px;
                border-radius:50%;
            }
        }
    }
}
.show_msg{
    margin-bottom: 0;
}
.show_msg_list{
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
    li{
        width:30%;
        display:flex;
        align-items:center;
        margin-bottom:30px;
        .el-form-item{
            width:75%;
            .el-input{
                width: 100%;
            }
            .el-select{
                width: 100% !important;
            }
        }
    }
    li:nth-child(3n+1){
        padding-left:10px;
    }
    li:last-child{
        width:100%;
        display:flex;
        align-items:flex-start;
        p{
            width:50px;
            height:40px;
            line-height:25px;
        }
        .el-form-item{
            width:100%;
            .el-textarea{
                width:100%;
            }
        }
    }
}
</style>
<script>
export default{
    data () {
        return {
            dialogVisible:false,
            options:[
                {value:1,label:'产品1'},
                {value:2,label:'产品2'}
            ],
            ruleForm:{
                title:'新增产品',name:'',image:'',
                productBrand:'',productSize:'',productCompany:'',
                productStock:'',productClassify:'',productType:'',
                productFlowRecord:''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
                ],
                productBrand:[
                    {required: true, message: '请输入产品品牌', trigger: 'blur'}
                ],
                productSize:[
                    {required: true, message: '请输入产品规格', trigger: 'blur'}
                ],
                productCompany:[
                    {required: true, message: '请输入单位名称', trigger: 'blur'}
                ],
                productStock:[
                    {required: true, message: '请输入产品库存', trigger: 'blur'}
                ],
                productClassify:[
                    {required: true, message: '请选择产品分类', trigger: 'blur'}
                ],
                productType:[
                    {required: true, message: '请选择产品类型', trigger: 'blur'}
                ],
                productFlowRecord:[
                    {required: true, message: '请输入出入库记录', trigger: 'blur'}
                ]
            },

        }
    },
    created(){
        this.$root.$on('showWindow', () => {
            this.dialogVisible = true;
        })
    },
    mounted(){

    },
    methods:{
        submitForm(formName){
            this.dialogVisible = false;
            this.$refs[formName].resetFields();
        },
    },
    beforeDestroy(){

    }
}
</script>