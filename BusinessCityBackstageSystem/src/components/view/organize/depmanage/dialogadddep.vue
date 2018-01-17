<template>
  <el-dialog title="新增部门" :visible="dialogDepVisible" width='40%' :modal='true' :before-close="ai_dialog_close"> 
            <el-row>
                 <el-col :span="4" :offset='1'>
                     <div class="grid-content labelName">
                         部门名称：
                     </div>
                 </el-col>
                 <el-col :span="16">
                     <div class="grid-content input">
                        <el-input placeholder="请输入部门名称" v-model="depname"></el-input>
                     </div>
                 </el-col>
            </el-row>
            <!-- <el-row>
                 <el-col :span="3" :offset='3'>
                     <div class="grid-content labelName">
                         部门编号：
                     </div>
                 </el-col>
                 <el-col :span="16">
                     <div class="grid-content input">
                         <el-input placeholder="请输入部门编号" v-model="depid"></el-input>
                     </div>
                 </el-col>
            </el-row> -->
            <el-row>
                 <el-col :span="4" :offset='1'>
                     <div class="grid-content labelName">
                         部门描述：
                     </div>
                 </el-col>
                 <el-col :span="15">
                     <div class="grid-content input">
                         <!-- <textarea class="tearteacher" name="" id="" cols="30" rows="10"></textarea> -->
                        <el-input
                            type="textarea"
                            :rows="5"
                            placeholder="请输入内容"
                            v-model="depdest">
                        </el-input>
                         <span class="pull-right infoText">不超过50个字</span>
                     </div>
                 </el-col>
            </el-row>
             <el-row>
                 <el-col :span="4" :offset='1'>
                     <div class="grid-content labelName">
                         所属部门：
                     </div>
                 </el-col>
                 <el-col :span="16">
                     <div class="grid-content valueName">
                         {{depfathername}}
                     </div>
                 </el-col>
            </el-row>
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
            depname:'',
            depdest:'',
            depfatherid:'',
            depfathernum:'',
            depfathername:'',
            deplastchildnum:''
        }
    },
    created:function(){
        console.log(this.ishow);
        this.dialogDepVisible=this.ishow;
        this.$root.$on('exportvis',(data)=>{
            this.depfatherid=data.departmentFatherid;
            this.depfathernum=data.departmentFathernum;
            this.depfathername=data.departmentFathername;
            this.deplastchildnum=data.deplastchildnum;
            this.dialogDepVisible=true;
            console.log(this.depfathername);
        });
    },
    methods:{
        adddata(){
            // 部门编号
            let numDep='';
            // 父部们为空，创建根部门
            if(this.depfatherid==''){
                let ranNum = Math.ceil(Math.random() * 25);
                // 随机生成一个大写字母
                let strRandom=String.fromCharCode(65+ranNum);
                let numRandom=Math.floor(Math.random()*9000)+1000;
                // 拼接公司编号
                numDep=strRandom+numRandom.toString();
                console.log(numDep);
            }
            
            // 副部们不为空，生成子部门
            else{
                // 生成第一个子节点
                if(this.deplastchildnum==''){
                    numDep=this.depfathernum+'000001'
                }
                else{
                    let nums=Number(this.deplastchildnum.slice(4,6));
                
                    numDep=this.deplastchildnum.slice(0,5)+nums.toString();
                }
            }
            // console.log(strRandom);
            this.$http.post('/api/admin/manage/department/create',{
                departmentName:this.depname,
                departmentFather:this.depfathername,
                departmentNumber:numDep,
                departmentDescription:this.depdest
            })
            .then(function (response) {
                this.$message('添加成功！');
            })
            .catch(function (response) {
                this.$message('添加失败！');
            });
            this.dialogDepVisible=false;
        },
        ai_dialog_close(){
            this.dialogDepVisible = false;
        },
    }
}
</script>
<style scoped>
/* 模态框 */
.el-dialog{
    width:40%;
}
.el-dialog__header{
    background:#109997;
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
    background:#00adab;
    margin:0 auto;
    display: block;
}
.el-dialog .el-row{
    margin-bottom: 15px;
}
.el-dialog .grid-content{
    border:none;
}
.el-dialog .grid-content.labelName,
.el-dialog .grid-content.valueName{
    font-size: 14px;
    padding-top: 5px;
    padding-right: 0;
}
.el-dialog .grid-content.labelName{
    text-align: right;
}
.el-dialog .grid-content.valueName{
    padding-left: 15px;
}
.el-dialog .grid-content input{
    width: 80%;
    height: 20px;
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 3px;
    border:1px solid #ccc;
}
.el-dialog .grid-content.input{
    padding-left: 15px;
}
/* .el-dialog .grid-content textarea{
    border:1px solid #c7c7c7;
	width:80%;
	height:100px;
	border-radius:5px;
	resize:none;
	padding:5px 10px;
} */
.el-dialog .grid-content .infoText{
    color:#00adab;
    display: block;
    text-align: right;
    padding-right: 12%;
}
</style>