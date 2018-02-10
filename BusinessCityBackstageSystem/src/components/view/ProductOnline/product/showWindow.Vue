<template>
    <el-dialog id="add_dialog" :title="ruleForm.title" :visible.sync="dialogVisible" width="50%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label='名称   :'>
                <el-row>
                    <el-col :span="24">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label='图片   :'>
                <el-row>
                    <el-col class="sec_item" :span="24">
                        <input id="upload_file" type="file" >
                        <el-button class="load_btn" type="primary"><i class="el-icon-plus"></i></el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-button class="save_btn" type="primary" @click="submitForm('ruleForm')">保存</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<style lang="less">
#add_dialog{
    .el-dialog{
        min-width: 675px;
        .el-dialog__header{
            background:#27a1f2;
        }
    }
    .el-form-item{
        display:flex;
        justify-content: center;
        align-items: center;
        .el-form-item__label{
            width: 50px !important;
        }
        .el-form-item__content{
            width: 90%;
            margin-left:0 !important;
        }
    }
    .el-form-item:nth-child(2){
        height:100px;
    }
    .el-form-item:last-child{
        .el-form-item__content{
            width: 100%;
            display:flex;
            justify-content: center;
            .el-button{
                // background:#00adab;
                // border-color:#00adab;
            }
        }
    }
}
</style>
<style lang="less" scoped>
.sec_item{
    position: relative;
    #upload_file{
        width: 110px;
        height: 110px;
        position: absolute;
        z-index:2;
        opacity:0;
        cursor: pointer;
        top:-50px;
    }
    .load_btn{
        position: absolute;
        z-index:1;
        top:-50px;
        .el-icon-plus{
            font-size:70px;
            color:#fff;
        }
    }
}

</style>
<script>
export default{
    data () {
        return {
            dialogVisible:false,
            ruleForm:{
                title:'新增产品',name:'',image:'',
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
            }
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
            this.$refs[formName].resetFields();
        },
    },
    beforeDestroy(){

    }
}
</script>