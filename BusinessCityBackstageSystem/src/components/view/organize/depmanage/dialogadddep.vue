<template>
  <el-dialog title="新增部门" :visible="dialogDepVisible" width='40%' :modal='true' :before-close="ai_dialog_close"> 
            <el-form @submit.native.prevent :model='dataform' status-icon ref="depForm" :rules="rules"  label-width="100px" class="demo-ruleForm">
                <el-form-item label="部门名称：" prop="departmentName">
                    <el-input placeholder="请输入部门名称" v-model="dataform.departmentName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="部门描述：" prop="departmentDescription">
                    <el-input
                        type="textarea"
                        :rows="5"
                        placeholder="请输入内容"
                        auto-complete="off"
                        v-model="dataform.departmentDescription">
                    </el-input>
                     <span class="pull-right infoText">不超过50个字</span>
                </el-form-item>
                <el-form-item label="所属部门：">
                    <div class="grid-content valueName">
                         {{depfathername}}
                     </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" :center='true'>
                <el-button type="primary" round   @click="adddata">新增</el-button>
            </div>
        </el-dialog>
</template>
<script>
export default {
    props:['ishow'],
    data(){
        return {
            dialogDepVisible:true,
            depfathername:'',
            deplastchildnum:'',
            depfathernum:'',
            dataform:{
                departmentName:'',
                departmentDescription:'',
                departmentFather:'',
                departmentNumber:'',
            },
            rules:{
                departmentName:[
                    {required:true,message:'请输入部门名称',trigger:'blur'}
                ],
                departmentDescription:[
                    {validator:function(rule,value,callback){
                        if(value.length>50){
                            callback(new Error('部门描述部门超过50字！'));
                        }else{
                            callback();
                        }
                    }, trigger: 'blur'}
                ]
            }
        }
    },
    created:function(){
        console.log(this.ishow);
        this.dialogDepVisible=this.ishow;
        this.$root.$on('exportvis',(data)=>{
            this.dataform.departmentFather=data.departmentFatherid;
            this.depfathernum=data.departmentFathernum;
            this.depfathername=data.departmentFathername;
            this.deplastchildnum=data.deplastchildnum;
            this.dialogDepVisible=true;
        });
        
    },
    methods:{
        adddata(){
            let that=this;
            //父部们为空，创建根部门
            if(this.dataform.departmentFather==''){
                let ranNum = Math.ceil(Math.random() * 25);
                // 随机生成一个大写字母
                let strRandom=String.fromCharCode(65+ranNum);
                let numRandom=Math.floor(Math.random()*9000)+1000;
                // 拼接公司编号
                this.dataform.departmentNumber=strRandom+numRandom.toString();
            }
            // 父部们不为空，生成子部门
            else{
                // 生成第一个子节点
                if(this.deplastchildnum==''){
                    this.dataform.departmentNumber=this.depfathernum+'000001'
                }
                else{
                    let nums=Number(this.deplastchildnum.slice(5,11))+1;
                    let length=6-nums.toString().length;
                    for(let i=0;i<length;i++){
                        nums='0'+nums;
                    }
                    this.dataform.departmentNumber=this.deplastchildnum.slice(0,5)+nums;
                }
            }
            this.$refs.depForm.validate((valid)=>{
                if(valid){
                    console.log(this.dataform);
                    this.$http.post('/api/admin/manage/department/create',this.dataform)
                    .then(function (response) {
                        console.log(response);
                        that.$message({
                            type:'success',
                            message:'添加成功!'
                        });
                        that.$store.dispatch('getDeplisttree');
                        // that.$root.$emit('undatadep');
                    })
                    .catch(function (response) {
                        that.$message('添加失败！');
                    });
                    this.dialogDepVisible=false;
                }
            });
        },
        ai_dialog_close(){
            this.$refs.depForm.resetFields();
            this.dialogDepVisible = false;
        },
    },
     beforeDestroy:function(){
        this.$root.$off('exportvis');
    }
}
</script>
<style scoped>
/* 模态框 */
.el-dialog{
    width:40%;
}
.el-dialog__header{
        border-bottom: 4px solid #409eff;
    padding:20px 32px;
}
.el-dialog__title,.el-dialog__headerbtn .el-dialog__close{
    color:white;
}
.el-dialog__headerbtn{
    width: 29px;
	height: 29px;
	background: #fff;
	border-radius: 50%;
	line-height: 20px;
	opacity: 1;
	color: #dd460a;
	font-size: 22px;
}
.el-dialog__body{
    padding-bottom:0px;
}
.el-dialog__close{
    font-size:16px;
    color:#dd460a !important;
    font-style:normal;
}
.el-dialog__footer{
    border-top:1px solid #f1f1f1;
    width: 80%;
    margin: 0 auto;
}
.el-dialog__footer .el-button{
    width:140px;
    font-size:14px;
    background:#27a1f2;
    margin:0 auto;
    display: block;
}
.el-dialog .el-row{
    margin-bottom: 15px;
}
.el-dialog .grid-content{
    border:none;
}
/* .el-dialog .grid-content.labelName{
    text-align: right;
} */
.el-dialog .grid-content input{
    width: 80%;
    height: 20px;
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 3px;
    border:1px solid #ccc;
}
/* .el-dialog .grid-content textarea{
    border:1px solid #c7c7c7;
	width:80%;
	height:100px;
	border-radius:5px;
	resize:none;
	padding:5px 10px;
} */
.el-dialog  .infoText{
    color:#27a1f2;
    display: block;
    text-align: right;
}
</style>