<template>
  <el-dialog id='roledialog'  width='50%' top='40px'  title="创建角色" :visible="dialogroleVisible" :modal='true' :before-close="ai_dialog_close"> 
            <el-form @submit.native.prevent :model='dataform' status-icon ref="ruleForm" :rules="rules"  label-width="100px" class="demo-ruleForm">
                <el-row :gutter='20' class='topmsg'>
                    <el-col :span="11" :offset='1'>
                        <el-form-item label="角色名称：" prop="rolename">
                            <el-input placeholder="请输入角色名称" v-model="dataform.rolename" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset='1'>
                        <el-form-item label="所属部门：">
                            <div class="grid-content">
                                    {{depname}}
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row style='padding:0 5%;'>
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <el-checkbox-group v-model="checkedPromises" @change="handleCheckedPromiseChange">
                        <el-checkbox v-for="item in promiseslist" :key="item.id" :label="item">{{item.permissionsName}}</el-checkbox>
                    </el-checkbox-group>
                </el-row>
                
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
            dialogroleVisible:true,
            depname:'',
            depid:'',
            checkedPromises:[],
            promiseslist:[],
            isIndeterminate:true,
            checkAll:false,
            // test:'test',
            roleid:'',
            dataform:{
                rolename:''
            },
            rules:{
                rolename:[
                    {required:true,message:'请输入角色名称',trigger:'blur'}
                ]
            }
        }
    },
    created:function(){
        this.dialogroleVisible=this.ishow;
        this.$root.$on('exportvisrole',(data)=>{
            this.dialogroleVisible=true;
            this.depid=data.depid;
            this.depname=data.depname;
            this.getpromiselist();
        });
        // this.$root.$on("changestatu",(status,type)=>{
        //     let dom=document.getElementsByClassName('checkall');
        //     dom=this.getElementByAttr('typediv',type,dom)[0];
        //     if(status){
        //         dom.setAttribute('class','check  el-checkbox__input is-checked checkall');
        //     }
        //     else{
        //         dom.setAttribute('class','check  el-checkbox__input checkall');
        //     }
        //     dom.getElementsByTagName('input')[0].checked=status;
        // });
        
    },
    methods:{
        getpromiselist(){
            let that=this;
            this.$http.post('/api/admin/permissions/find',{
                type:'1'
            })
            .then(function (response) {
                let data=response.data;
                console.log(data);
                if(data.msg=='查询成功'){
                    that.promiseslist=data.info.currentPermissionsList;
                }
            })
            .catch(function (response) {
                that.$message('角色查询失败！');
            });
        },
        adddata(){
            let that=this;          
            this.$refs.ruleForm.validate((valid)=>{
                if(valid){
                    let checkedlist=[];
                    for(let i=0;i<this.checkedPromises.length;i++){
                        checkedlist.push(this.checkedPromises[i].id);
                    }
                    let checkedids=checkedlist.join(',');
                    this.$http.post('/api/admin/manage/group/insert',{
                        departmentId:that.depid,
                        groupName:that.dataform.rolename,
                        departmentName:that.depname,
                        permissionsId:checkedids
                    })
                    .then(function (response) {
                        console.log(response);
                        let data=response.data;
                        that.$message({
                            type:'success',
                            message:data.msg
                        });
                        that.$root.$emit('currentrole',{depid:that.depid,depname:that.depname});
                    })
                    .catch(function (response) {
                        that.$message('添加失败！');
                    });
                }
            });
            this.dialogroleVisible=false;
        },
        ai_dialog_close(){
            this.dialogroleVisible = false;
        },
        handleCheckAllChange(val) {
            this.checkedPromises = val ? this.promiseslist : [];
            this.isIndeterminate = false;
        },
        handleCheckedPromiseChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.promiseslist.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.promiseslist.length;
        }
    },
    beforeDestroy:function(){
        this.$root.$off('exportvisrole');
        this.$root.$off('changestatu');
    }
}
</script>
<style scoped>
/* .el-dialog{
    width:60%;
} */
.topmsg{
    margin-bottom: 0 !important;
}
.topmsg input{
    width: 45%;
}
.data{
    margin-top: -15px;
    /* height: 350px; */
}
.data .grid-content{
    border: 1px solid !important;
    border-radius: 5px;
    padding:10px 20px;
    overflow: hidden;
}
.labelfor{
    text-align: right;
}
.data .select{
    overflow: hidden;
}
.name{
    display: inline-block;
}
.name,.check{
    float: left;
}
div.check{
    width: 0;
    height: 0;
    position: absolute;
    
}
.check[typediv='opcan']{
    left: 68%;
}
.check[typediv='seecan']{
    left: 80%;
}
input[type='checkbox']{
    z-index: 1;
    opacity: 0;
}
.checkfor{
    display:inline-block;
    vertical-align: middle;
    position: absolute;
    left: 3px;
    top: 3px;
    width: 17px;
    height: 17px;
    border: 1px solid #cccccc;
    cursor: pointer;
    border-radius: 5px;
}
.el-checkbox{
    width: 25%;
}
.el-checkbox+.el-checkbox{
    margin-left: 0 !important;
}
</style>

<style>
/* 模态框 */

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
/* .el-dialog .el-row{
    margin-bottom: 15px;
} */
.el-dialog .el-col{
    /* height: 35px; */
    line-height: 35px;
}
.el-dialog .grid-content{
    border:none;
}
/* .el-dialog .grid-content.labelName,
.el-dialog .grid-content.valueName{
    font-size: 14px;
    padding-top: 5px;
    padding-right: 0;
} */
/* .el-dialog .grid-content.valueName{
    padding-left: 15px;
} */
.el-dialog .grid-content input{
    /* width: 80%; */
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
.el-dialog .grid-content .infoText{
    color:#00adab;
    display: block;
    text-align: right;
    padding-right: 12%;
}
</style>